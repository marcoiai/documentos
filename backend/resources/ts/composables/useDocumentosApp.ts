import { computed, ref } from 'vue'
import { $api } from '@/utils/api'

export interface Tipo {
  id: number
  external_id: string
  nome: string
  cabecalho: string
  rodape: string
}

export interface Secao {
  id: number
  external_id: string
  nome: string
  cabecalho: string
  rodape: string
}

export interface Atributo {
  id: number
  external_id: string
  tipo_external_id: string
  secao_external_id: string | null
  nome: string
  tipo_campo: string
  validador: string | null
  peso: number | null
  mascara: string | null
  template_texto: string | null
}

export interface Documento {
  id: number
  external_id: string
  tipo_external_id: string
  titulo: string
  valores: Record<string, unknown>
  pdf_visivel: Record<string, boolean>
}

export interface Layout {
  id: number
  tipo_external_id: string
  items: Array<Record<string, unknown>>
  section_order: string[]
}

export interface ReportConfig {
  id: number
  external_id: string
  nome: string
  tipo_external_id: string
  selected_attr_ids: string[]
  report_layout: Array<Record<string, unknown>>
  report_block_order: string[]
  report_block_visibility: Record<string, boolean>
  report_block_spacer_heights: Record<string, number>
  report_block_images: Record<string, unknown>
  report_footer_mode: string | null
  report_footer_anchor: string | null
  filtro_attr_id: string | null
  filtro_operador: string | null
  filtro_valor: string | null
  filtro_valor_de: string | null
  filtro_valor_ate: string | null
  filtro_data_modo: string | null
  filtro_data_attr_de: string | null
  filtro_data_attr_ate: string | null
  filtro_data_intervalo_dias: number | null
  somar_numericos: boolean
  total_attr_ids: string[]
  ordenacao: Array<Record<string, unknown>>
  ordenar_attr_id: string | null
  ordenar_direcao: string | null
}

const loading = ref(false)
const initialized = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const tipos = ref<Tipo[]>([])
const secoes = ref<Secao[]>([])
const atributos = ref<Atributo[]>([])
const documentos = ref<Documento[]>([])
const layouts = ref<Layout[]>([])
const reportConfigs = ref<ReportConfig[]>([])

function buildExternalId(prefix: string, label: string) {
  const base = String(label || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return `${prefix}_${base || 'item'}_${Date.now()}`
}

function normalizeError(error: any) {
  const validationErrors = error?.data?.errors
  if (validationErrors && typeof validationErrors === 'object') {
    const first = Object.values(validationErrors)[0]
    if (Array.isArray(first) && first[0])
      return String(first[0])
  }

  return String(error?.data?.message || error?.message || 'Nao foi possivel completar a operacao.')
}

async function loadData(force = false) {
  if (loading.value)
    return

  if (initialized.value && !force)
    return

  loading.value = true
  errorMessage.value = ''

  try {
    const data = await $api('/bootstrap')
    tipos.value = Array.isArray(data.tipos) ? data.tipos : []
    secoes.value = Array.isArray(data.secoes) ? data.secoes : []
    atributos.value = Array.isArray(data.atributos) ? data.atributos : []
    documentos.value = Array.isArray(data.documentos) ? data.documentos : []
    layouts.value = Array.isArray(data.layouts) ? data.layouts : []
    reportConfigs.value = Array.isArray(data.report_configs) ? data.report_configs : []
    initialized.value = true
  }
  catch (error: any) {
    errorMessage.value = normalizeError(error)
    throw error
  }
  finally {
    loading.value = false
  }
}

async function refresh() {
  await loadData(true)
}

async function runMutation(message: string, callback: () => Promise<unknown>) {
  errorMessage.value = ''

  try {
    await callback()
    successMessage.value = message
    await refresh()
  }
  catch (error: any) {
    errorMessage.value = normalizeError(error)
    throw error
  }
}

async function saveTipo(payload: Partial<Tipo>) {
  const body = {
    external_id: payload.external_id || buildExternalId('tipo', payload.nome || ''),
    nome: payload.nome || '',
    cabecalho: payload.cabecalho || '',
    rodape: payload.rodape || '',
  }

  if (payload.id) {
    await runMutation('Tipo atualizado com sucesso.', async () => {
      await $api(`/tipos/${payload.id}`, { method: 'PUT', body })
    })
    return
  }

  await runMutation('Tipo criado com sucesso.', async () => {
    await $api('/tipos', { method: 'POST', body })
  })
}

async function deleteTipo(id: number) {
  await runMutation('Tipo removido com sucesso.', async () => {
    await $api(`/tipos/${id}`, { method: 'DELETE' })
  })
}

async function saveSecao(payload: Partial<Secao>) {
  const body = {
    external_id: payload.external_id || buildExternalId('secao', payload.nome || ''),
    nome: payload.nome || '',
    cabecalho: payload.cabecalho || '',
    rodape: payload.rodape || '',
  }

  if (payload.id) {
    await runMutation('Secao atualizada com sucesso.', async () => {
      await $api(`/secoes/${payload.id}`, { method: 'PUT', body })
    })
    return
  }

  await runMutation('Secao criada com sucesso.', async () => {
    await $api('/secoes', { method: 'POST', body })
  })
}

async function deleteSecao(id: number) {
  await runMutation('Secao removida com sucesso.', async () => {
    await $api(`/secoes/${id}`, { method: 'DELETE' })
  })
}

async function saveAtributo(payload: Partial<Atributo>) {
  const body = {
    external_id: payload.external_id || buildExternalId('atributo', payload.nome || ''),
    tipo_external_id: payload.tipo_external_id || '',
    secao_external_id: payload.secao_external_id || null,
    nome: payload.nome || '',
    tipo_campo: payload.tipo_campo || 'texto',
    validador: payload.validador || null,
    peso: payload.peso === null || payload.peso === undefined || payload.peso === '' ? null : Number(payload.peso),
    mascara: payload.mascara || null,
    template_texto: payload.template_texto || null,
  }

  if (payload.id) {
    await runMutation('Atributo atualizado com sucesso.', async () => {
      await $api(`/atributos/${payload.id}`, { method: 'PUT', body })
    })
    return
  }

  await runMutation('Atributo criado com sucesso.', async () => {
    await $api('/atributos', { method: 'POST', body })
  })
}

async function deleteAtributo(id: number) {
  await runMutation('Atributo removido com sucesso.', async () => {
    await $api(`/atributos/${id}`, { method: 'DELETE' })
  })
}

async function saveDocumento(payload: Partial<Documento>) {
  const body = {
    external_id: payload.external_id || buildExternalId('documento', payload.titulo || ''),
    tipo_external_id: payload.tipo_external_id || '',
    titulo: payload.titulo || '',
    valores: payload.valores || {},
    pdf_visivel: payload.pdf_visivel || {},
  }

  if (payload.id) {
    await runMutation('Documento atualizado com sucesso.', async () => {
      await $api(`/documentos/${payload.id}`, { method: 'PUT', body })
    })
    return
  }

  await runMutation('Documento criado com sucesso.', async () => {
    await $api('/documentos', { method: 'POST', body })
  })
}

async function deleteDocumento(id: number) {
  await runMutation('Documento removido com sucesso.', async () => {
    await $api(`/documentos/${id}`, { method: 'DELETE' })
  })
}

async function saveLayout(payload: Partial<Layout>) {
  const body = {
    tipo_external_id: payload.tipo_external_id || '',
    items: Array.isArray(payload.items) ? payload.items : [],
    section_order: Array.isArray(payload.section_order) ? payload.section_order : [],
  }

  const existing = layouts.value.find(item => item.tipo_external_id === body.tipo_external_id)

  if (payload.id || existing?.id) {
    await runMutation('Layout salvo com sucesso.', async () => {
      await $api(`/layouts/${payload.id || existing?.id}`, { method: 'PUT', body })
    })
    return
  }

  await runMutation('Layout criado com sucesso.', async () => {
    await $api('/layouts', { method: 'POST', body })
  })
}

async function deleteLayout(id: number) {
  await runMutation('Layout removido com sucesso.', async () => {
    await $api(`/layouts/${id}`, { method: 'DELETE' })
  })
}

async function saveReportConfig(payload: Partial<ReportConfig>) {
  const body = {
    external_id: payload.external_id || buildExternalId('report', payload.nome || ''),
    nome: payload.nome || '',
    tipo_external_id: payload.tipo_external_id || '',
    selected_attr_ids: Array.isArray(payload.selected_attr_ids) ? payload.selected_attr_ids : [],
    report_layout: Array.isArray(payload.report_layout) ? payload.report_layout : [],
    report_block_order: Array.isArray(payload.report_block_order) ? payload.report_block_order : [],
    report_block_visibility: payload.report_block_visibility || {},
    report_block_spacer_heights: payload.report_block_spacer_heights || {},
    report_block_images: payload.report_block_images || {},
    report_footer_mode: payload.report_footer_mode || null,
    report_footer_anchor: payload.report_footer_anchor || null,
    filtro_attr_id: payload.filtro_attr_id || null,
    filtro_operador: payload.filtro_operador || null,
    filtro_valor: payload.filtro_valor || null,
    filtro_valor_de: payload.filtro_valor_de || null,
    filtro_valor_ate: payload.filtro_valor_ate || null,
    filtro_data_modo: payload.filtro_data_modo || null,
    filtro_data_attr_de: payload.filtro_data_attr_de || null,
    filtro_data_attr_ate: payload.filtro_data_attr_ate || null,
    filtro_data_intervalo_dias: payload.filtro_data_intervalo_dias ?? null,
    somar_numericos: Boolean(payload.somar_numericos),
    total_attr_ids: Array.isArray(payload.total_attr_ids) ? payload.total_attr_ids : [],
    ordenacao: Array.isArray(payload.ordenacao) ? payload.ordenacao : [],
    ordenar_attr_id: payload.ordenar_attr_id || null,
    ordenar_direcao: payload.ordenar_direcao || null,
  }

  if (payload.id) {
    await runMutation('Configuracao de relatorio atualizada com sucesso.', async () => {
      await $api(`/report-configs/${payload.id}`, { method: 'PUT', body })
    })
    return
  }

  await runMutation('Configuracao de relatorio criada com sucesso.', async () => {
    await $api('/report-configs', { method: 'POST', body })
  })
}

async function deleteReportConfig(id: number) {
  await runMutation('Configuracao de relatorio removida com sucesso.', async () => {
    await $api(`/report-configs/${id}`, { method: 'DELETE' })
  })
}

const stats = computed(() => ([
  { label: 'Tipos', value: tipos.value.length, color: 'primary', icon: 'custom-document-text-outline', to: '/documentos/tipos' },
  { label: 'Secoes', value: secoes.value.length, color: 'success', icon: 'custom-note-1', to: '/documentos/secoes' },
  { label: 'Atributos', value: atributos.value.length, color: 'warning', icon: 'custom-fatrows', to: '/documentos/atributos' },
  { label: 'Documentos', value: documentos.value.length, color: 'secondary', icon: 'custom-file-text-fill', to: '/documentos/documentos' },
]))

export function useDocumentosApp() {
  return {
    loading,
    errorMessage,
    successMessage,
    tipos,
    secoes,
    atributos,
    documentos,
    layouts,
    reportConfigs,
    stats,
    loadData,
    refresh,
    buildExternalId,
    setSuccessMessage: (value: string) => {
      successMessage.value = value
    },
    clearMessages: () => {
      errorMessage.value = ''
      successMessage.value = ''
    },
    saveTipo,
    deleteTipo,
    saveSecao,
    deleteSecao,
    saveAtributo,
    deleteAtributo,
    saveDocumento,
    deleteDocumento,
    saveLayout,
    deleteLayout,
    saveReportConfig,
    deleteReportConfig,
  }
}
