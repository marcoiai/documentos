<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useDocumentosApp, type ReportConfig } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Relatorios' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Relatorios', disabled: true, href: '#' },
])

const dialog = ref(false)
const saving = ref(false)
const editing = ref<ReportConfig | null>(null)

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

const { tipos, atributos, reportConfigs, errorMessage, successMessage, loading, loadData, clearMessages, saveReportConfig, deleteReportConfig } = useDocumentosApp()

const rows = computed(() => {
  return reportConfigs.value.map(cfg => ({
    ...cfg,
    tipoNome: tipos.value.find(tipo => tipo.external_id === cfg.tipo_external_id)?.nome || cfg.tipo_external_id,
  }))
})

const availableAttrs = computed(() => atributos.value.filter(attr => attr.tipo_external_id === form.tipo_external_id))

function parseCsv(text: string) {
  return text
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
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
          <td class="text-right">
            <div class="d-inline-flex ga-2">
              <VBtn size="small" variant="text" color="primary" @click="openEdit(cfg)">Editar</VBtn>
              <VBtn size="small" variant="text" color="error" @click="deleteReportConfig(cfg.id)">Excluir</VBtn>
            </div>
          </td>
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
