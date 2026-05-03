<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useDocumentosApp, type Atributo, type Documento, type ReportConfig } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Relatorios' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Relatorios', disabled: true, href: '#' },
])

const dialog = ref(false)
const saving = ref(false)
const editing = ref<ReportConfig | null>(null)
const renderingPdfId = ref<number | null>(null)

const form = reactive({
  nome: '',
  tipo_external_id: '',
  filtro_attr_id: '',
  filtro_operador: 'contains',
  filtro_valor: '',
  somar_numericos: false,
  ordenar_attr_id: '',
  ordenar_direcao: 'asc',
  selectedAttrIdsText: '',
  totalAttrIdsText: '',
  ordenacaoJson: '[]',
})

const { tipos, atributos, documentos, reportConfigs, errorMessage, successMessage, loading, loadData, clearMessages, saveReportConfig, deleteReportConfig, setSuccessMessage } = useDocumentosApp()

const rows = computed(() => {
  return reportConfigs.value.map(cfg => ({
    ...cfg,
    tipoNome: tipos.value.find(tipo => tipo.external_id === cfg.tipo_external_id)?.nome || cfg.tipo_external_id,
    documentosCount: documentos.value.filter(documento => documento.tipo_external_id === cfg.tipo_external_id).length,
  }))
})

const availableAttrs = computed(() => atributos.value.filter(attr => attr.tipo_external_id === form.tipo_external_id))

type SortRule = {
  attr_id?: string
  attrId?: string
  direcao?: string
  direction?: string
}

type ReportPreview = {
  title: string
  tipoNome: string
  columns: string[]
  rows: string[][]
  totalValues: string[]
}

function parseCsv(text: string) {
  return text
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
}

function getAttrLabel(attr: Atributo | undefined) {
  return attr?.nome || ''
}

function normalizeValue(value: unknown) {
  if (typeof value === 'boolean')
    return value ? 'Sim' : 'Nao'

  return String(value ?? '').trim()
}

function asNumber(value: unknown) {
  if (typeof value === 'number')
    return Number.isFinite(value) ? value : null

  const normalized = String(value ?? '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim()

  if (!normalized)
    return null

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function matchesFilter(documento: Documento, config: ReportConfig) {
  if (!config.filtro_attr_id)
    return true

  const raw = documento.valores?.[config.filtro_attr_id]
  const value = normalizeValue(raw)
  const filterValue = String(config.filtro_valor ?? '').trim()

  switch (config.filtro_operador) {
    case 'equals':
      return value === filterValue
    case 'not_equals':
      return value !== filterValue
    case 'empty':
      return value === ''
    case 'not_empty':
      return value !== ''
    case 'contains':
    default:
      return filterValue === '' || value.toLowerCase().includes(filterValue.toLowerCase())
  }
}

function compareDocuments(left: Documento, right: Documento, sortRules: SortRule[]) {
  for (const rule of sortRules) {
    const attrId = rule.attr_id || rule.attrId
    if (!attrId)
      continue

    const leftValue = normalizeValue(left.valores?.[attrId]).toLowerCase()
    const rightValue = normalizeValue(right.valores?.[attrId]).toLowerCase()
    const comparison = leftValue.localeCompare(rightValue, 'pt-BR', { numeric: true, sensitivity: 'base' })

    if (comparison !== 0)
      return (rule.direcao || rule.direction) === 'desc' ? comparison * -1 : comparison
  }

  return 0
}

function buildPreview(config: ReportConfig): ReportPreview {
  const tipo = tipos.value.find(item => item.external_id === config.tipo_external_id)
  const attrs = atributos.value.filter(attr => attr.tipo_external_id === config.tipo_external_id)
  const attrMap = new Map(attrs.map(attr => [attr.external_id, attr]))
  const selectedAttrIds = Array.isArray(config.selected_attr_ids) && config.selected_attr_ids.length
    ? config.selected_attr_ids
    : attrs.map(attr => attr.external_id)
  const selectedAttrs = selectedAttrIds
    .map(attrId => attrMap.get(attrId))
    .filter((attr): attr is Atributo => Boolean(attr))

  const sortRules = Array.isArray(config.ordenacao) && config.ordenacao.length
    ? config.ordenacao as SortRule[]
    : config.ordenar_attr_id
      ? [{ attr_id: config.ordenar_attr_id, direcao: config.ordenar_direcao || 'asc' }]
      : []

  const matchingDocumentos = documentos.value
    .filter(documento => documento.tipo_external_id === config.tipo_external_id)
    .filter(documento => matchesFilter(documento, config))
    .slice()
    .sort((left, right) => compareDocuments(left, right, sortRules))

  const rows = matchingDocumentos.map(documento => selectedAttrs.map(attr => normalizeValue(documento.valores?.[attr.external_id])))
  const totalAttrIds = new Set(config.somar_numericos ? (config.total_attr_ids || []) : [])
  const totalValues = selectedAttrs.map(attr => {
    if (!totalAttrIds.has(attr.external_id))
      return ''

    const total = matchingDocumentos.reduce((sum, documento) => {
      return sum + (asNumber(documento.valores?.[attr.external_id]) || 0)
    }, 0)

    return formatNumber(total)
  })

  return {
    title: config.nome,
    tipoNome: tipo?.nome || config.tipo_external_id,
    columns: selectedAttrs.map(attr => getAttrLabel(attr)),
    rows,
    totalValues,
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildPrintableHtml(preview: ReportPreview) {
  const headerCells = preview.columns.map(column => `<th>${escapeHtml(column)}</th>`).join('')
  const bodyRows = preview.rows.map(row => {
    const cells = row.map(value => `<td>${escapeHtml(value)}</td>`).join('')
    return `<tr>${cells}</tr>`
  }).join('')
  const hasTotals = preview.totalValues.some(value => value.trim() !== '')
  const firstTotalIndex = preview.totalValues.findIndex(value => value.trim() === '')
  const totalCells = preview.totalValues.map((value, index) => {
    const cellValue = value.trim() === '' && index === firstTotalIndex ? 'Total' : value
    return `<td>${escapeHtml(cellValue)}</td>`
  }).join('')

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>${escapeHtml(preview.title)}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 32px; color: #17313b; }
      h1 { margin: 0 0 6px; font-size: 24px; }
      p { margin: 0 0 18px; color: #48616b; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #d7e2e7; padding: 10px 12px; text-align: left; vertical-align: top; }
      th { background: #f4f9fb; }
      tfoot td { font-weight: 700; background: #fafdfd; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(preview.title)}</h1>
    <p>${escapeHtml(preview.tipoNome)} - ${preview.rows.length} registro(s)</p>
    <table>
      <thead><tr>${headerCells}</tr></thead>
      <tbody>${bodyRows}</tbody>
      ${hasTotals ? `<tfoot><tr>${totalCells}</tr></tfoot>` : ''}
    </table>
  </body>
</html>`
}

async function renderPdf(config: ReportConfig) {
  renderingPdfId.value = config.id

  try {
    const preview = buildPreview(config)
    const popup = window.open('', '_blank', 'noopener,noreferrer')

    if (!popup) {
      throw new Error('Nao foi possivel abrir a janela de impressao do navegador.')
    }

    popup.document.open()
    popup.document.write(buildPrintableHtml(preview))
    popup.document.close()
    popup.focus()
    popup.print()

    setSuccessMessage('Visualizacao pronta. Use o dialogo do navegador para salvar em PDF.')
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Nao foi possivel renderizar o PDF.'
  }
  finally {
    renderingPdfId.value = null
  }
}

function resetForm() {
  form.nome = ''
  form.tipo_external_id = tipos.value[0]?.external_id || ''
  form.filtro_attr_id = ''
  form.filtro_operador = 'contains'
  form.filtro_valor = ''
  form.somar_numericos = false
  form.ordenar_attr_id = ''
  form.ordenar_direcao = 'asc'
  form.selectedAttrIdsText = ''
  form.totalAttrIdsText = ''
  form.ordenacaoJson = '[]'
  editing.value = null
}

function openCreate() {
  clearMessages()
  resetForm()
  dialog.value = true
}

function openEdit(cfg: ReportConfig) {
  clearMessages()
  editing.value = cfg
  form.nome = cfg.nome
  form.tipo_external_id = cfg.tipo_external_id
  form.filtro_attr_id = cfg.filtro_attr_id || ''
  form.filtro_operador = cfg.filtro_operador || 'contains'
  form.filtro_valor = cfg.filtro_valor || ''
  form.somar_numericos = Boolean(cfg.somar_numericos)
  form.ordenar_attr_id = cfg.ordenar_attr_id || ''
  form.ordenar_direcao = cfg.ordenar_direcao || 'asc'
  form.selectedAttrIdsText = (cfg.selected_attr_ids || []).join(', ')
  form.totalAttrIdsText = (cfg.total_attr_ids || []).join(', ')
  form.ordenacaoJson = JSON.stringify(cfg.ordenacao || [], null, 2)
  dialog.value = true
}

async function submit() {
  saving.value = true
  try {
    await saveReportConfig({
      id: editing.value?.id,
      external_id: editing.value?.external_id,
      nome: form.nome,
      tipo_external_id: form.tipo_external_id,
      filtro_attr_id: form.filtro_attr_id || null,
      filtro_operador: form.filtro_operador || null,
      filtro_valor: form.filtro_valor || null,
      somar_numericos: form.somar_numericos,
      ordenar_attr_id: form.ordenar_attr_id || null,
      ordenar_direcao: form.ordenar_direcao || null,
      selected_attr_ids: parseCsv(form.selectedAttrIdsText),
      total_attr_ids: parseCsv(form.totalAttrIdsText),
      ordenacao: JSON.parse(form.ordenacaoJson || '[]'),
    })
    dialog.value = false
    resetForm()
  }
  finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadData()
  resetForm()
})
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <VAlert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable @click:close="clearMessages()">{{ errorMessage }}</VAlert>
  <VSnackbar :model-value="Boolean(successMessage)" color="success" location="top right" rounded="md" timeout="2500" @update:model-value="value => { if (!value) clearMessages() }">{{ successMessage }}</VSnackbar>

  <VCard rounded="lg" variant="outlined">
    <VCardItem title="Configuracoes de relatorio" subtitle="Gerencie filtros, campos e ordenacao">
      <template #append>
        <div class="d-flex ga-2">
          <VBtn variant="outlined" color="secondary" rounded="md" :loading="loading" @click="loadData(true)">Atualizar</VBtn>
          <VBtn color="primary" rounded="md" @click="openCreate">Novo relatorio</VBtn>
        </div>
      </template>
    </VCardItem>
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Campos</th>
          <th>Filtro</th>
          <th>Documentos</th>
          <th class="text-right">Acoes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cfg in rows" :key="cfg.id">
          <td>
            <div class="font-weight-bold">{{ cfg.nome }}</div>
            <div class="text-caption text-lightText">{{ cfg.external_id }}</div>
          </td>
          <td>{{ cfg.tipoNome }}</td>
          <td>{{ cfg.selected_attr_ids?.length || 0 }}</td>
          <td>{{ cfg.filtro_attr_id || 'Sem filtro' }}</td>
          <td>{{ cfg.documentosCount }}</td>
          <td class="text-right">
            <div class="d-inline-flex ga-2">
              <VBtn size="small" variant="text" color="secondary" :loading="renderingPdfId === cfg.id" @click="renderPdf(cfg)">Render PDF</VBtn>
              <VBtn size="small" variant="text" color="primary" @click="openEdit(cfg)">Editar</VBtn>
              <VBtn size="small" variant="text" color="error" @click="deleteReportConfig(cfg.id)">Excluir</VBtn>
            </div>
          </td>
        </tr>
        <tr v-if="!rows.length && !loading">
          <td colspan="6" class="text-center text-lightText py-8">Nenhuma configuracao de relatorio cadastrada.</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>

  <VDialog v-model="dialog" max-width="1000">
    <VCard rounded="lg">
      <VCardItem :title="editing ? 'Editar relatorio' : 'Novo relatorio'" subtitle="Edicao principal da configuracao" />
      <VCardText>
        <VRow>
          <VCol cols="12" md="6"><VTextField v-model="form.nome" label="Nome" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.tipo_external_id" :items="tipos" item-title="nome" item-value="external_id" label="Tipo" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.filtro_attr_id" :items="availableAttrs" item-title="nome" item-value="external_id" label="Atributo do filtro" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.filtro_operador" label="Operador do filtro" rounded="lg" /></VCol>
          <VCol cols="12"><VTextField v-model="form.filtro_valor" label="Valor do filtro" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.selectedAttrIdsText" label="selected_attr_ids (csv)" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.totalAttrIdsText" label="total_attr_ids (csv)" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.ordenar_attr_id" :items="availableAttrs" item-title="nome" item-value="external_id" label="Ordenar por" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.ordenar_direcao" :items="['asc', 'desc']" label="Direcao" rounded="lg" /></VCol>
          <VCol cols="12"><VSwitch v-model="form.somar_numericos" label="Somar numericos" color="primary" inset /></VCol>
          <VCol cols="12"><VTextarea v-model="form.ordenacaoJson" label="ordenacao (json)" rounded="lg" rows="6" auto-grow /></VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pa-6 pt-0">
        <VSpacer />
        <VBtn variant="text" color="secondary" @click="dialog = false">Cancelar</VBtn>
        <VBtn color="primary" rounded="md" :loading="saving" :disabled="!form.nome.trim() || !form.tipo_external_id" @click="submit">Salvar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
