<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useDocumentosApp } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Layout Relatorio' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Layout Relatorio', disabled: true, href: '#' },
])

const saving = ref(false)
const dialog = ref(false)
const selectedConfigId = ref<number | null>(null)
const form = reactive({
  reportLayoutJson: '[]',
  reportBlockOrderJson: '[]',
  reportBlockVisibilityJson: '{}',
  reportBlockSpacerHeightsJson: '{}',
  reportBlockImagesJson: '{}',
  reportFooterMode: '',
  reportFooterAnchor: '',
})

const { reportConfigs, errorMessage, successMessage, loading, loadData, clearMessages, saveReportConfig } = useDocumentosApp()

const selectedConfig = computed(() => reportConfigs.value.find(cfg => cfg.id === selectedConfigId.value) || null)

watch(selectedConfig, value => {
  form.reportLayoutJson = JSON.stringify(value?.report_layout || [], null, 2)
  form.reportBlockOrderJson = JSON.stringify(value?.report_block_order || [], null, 2)
  form.reportBlockVisibilityJson = JSON.stringify(value?.report_block_visibility || {}, null, 2)
  form.reportBlockSpacerHeightsJson = JSON.stringify(value?.report_block_spacer_heights || {}, null, 2)
  form.reportBlockImagesJson = JSON.stringify(value?.report_block_images || {}, null, 2)
  form.reportFooterMode = value?.report_footer_mode || ''
  form.reportFooterAnchor = value?.report_footer_anchor || ''
}, { immediate: true })

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T
  }
  catch {
    return fallback
  }
}

function openEditor() {
  dialog.value = true
}

async function submit() {
  if (!selectedConfig.value)
    return

  saving.value = true
  try {
    await saveReportConfig({
      ...selectedConfig.value,
      id: selectedConfig.value.id,
      external_id: selectedConfig.value.external_id,
      nome: selectedConfig.value.nome,
      tipo_external_id: selectedConfig.value.tipo_external_id,
      selected_attr_ids: selectedConfig.value.selected_attr_ids,
      total_attr_ids: selectedConfig.value.total_attr_ids,
      ordenacao: selectedConfig.value.ordenacao,
      filtro_attr_id: selectedConfig.value.filtro_attr_id,
      filtro_operador: selectedConfig.value.filtro_operador,
      filtro_valor: selectedConfig.value.filtro_valor,
      filtro_valor_de: selectedConfig.value.filtro_valor_de,
      filtro_valor_ate: selectedConfig.value.filtro_valor_ate,
      filtro_data_modo: selectedConfig.value.filtro_data_modo,
      filtro_data_attr_de: selectedConfig.value.filtro_data_attr_de,
      filtro_data_attr_ate: selectedConfig.value.filtro_data_attr_ate,
      filtro_data_intervalo_dias: selectedConfig.value.filtro_data_intervalo_dias,
      somar_numericos: selectedConfig.value.somar_numericos,
      ordenar_attr_id: selectedConfig.value.ordenar_attr_id,
      ordenar_direcao: selectedConfig.value.ordenar_direcao,
      report_layout: parseJson(form.reportLayoutJson, []),
      report_block_order: parseJson(form.reportBlockOrderJson, []),
      report_block_visibility: parseJson(form.reportBlockVisibilityJson, {}),
      report_block_spacer_heights: parseJson(form.reportBlockSpacerHeightsJson, {}),
      report_block_images: parseJson(form.reportBlockImagesJson, {}),
      report_footer_mode: form.reportFooterMode || null,
      report_footer_anchor: form.reportFooterAnchor || null,
    })
    dialog.value = false
  }
  finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadData()
  selectedConfigId.value = reportConfigs.value[0]?.id || null
})
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <VAlert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable @click:close="clearMessages()">{{ errorMessage }}</VAlert>
  <VSnackbar :model-value="Boolean(successMessage)" color="success" location="top right" rounded="md" timeout="2500" @update:model-value="value => { if (!value) clearMessages() }">{{ successMessage }}</VSnackbar>

  <VCard rounded="lg" variant="outlined">
    <VCardItem title="Layout de relatorio" subtitle="Abra o formulario em dialog para editar os blocos e metadados">
      <template #append>
        <div class="d-flex ga-2">
          <VBtn variant="outlined" color="secondary" rounded="md" :loading="loading" @click="loadData(true)">Atualizar</VBtn>
          <VBtn color="primary" rounded="md" :disabled="!selectedConfig" @click="openEditor">Editar layout</VBtn>
        </div>
      </template>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol cols="12" md="6">
          <VSelect v-model="selectedConfigId" :items="reportConfigs" item-title="nome" item-value="id" label="Configuracao" rounded="lg" />
        </VCol>
        <VCol cols="12" md="3"><VTextField :model-value="form.reportFooterMode" label="Footer mode" rounded="lg" readonly /></VCol>
        <VCol cols="12" md="3"><VTextField :model-value="form.reportFooterAnchor" label="Footer anchor" rounded="lg" readonly /></VCol>
        <VCol cols="12" md="4"><VTextField :model-value="String(selectedConfig?.report_layout?.length || 0)" label="Blocos de layout" rounded="lg" readonly /></VCol>
        <VCol cols="12" md="4"><VTextField :model-value="String(selectedConfig?.report_block_order?.length || 0)" label="Ordem de blocos" rounded="lg" readonly /></VCol>
        <VCol cols="12" md="4"><VTextField :model-value="String(Object.keys(selectedConfig?.report_block_visibility || {}).length)" label="Visibilidade configurada" rounded="lg" readonly /></VCol>
      </VRow>
    </VCardText>
  </VCard>

  <VDialog v-model="dialog" max-width="1100">
    <VCard rounded="lg">
      <VCardItem title="Editor de layout de relatorio" subtitle="Campos avancados do layout antigo em formato editavel" />
      <VCardText>
        <VRow>
          <VCol cols="12" md="3"><VTextField v-model="form.reportFooterMode" label="Footer mode" rounded="lg" /></VCol>
          <VCol cols="12" md="3"><VTextField v-model="form.reportFooterAnchor" label="Footer anchor" rounded="lg" /></VCol>
          <VCol cols="12"><VTextarea v-model="form.reportLayoutJson" label="report_layout" rounded="lg" rows="8" auto-grow /></VCol>
          <VCol cols="12"><VTextarea v-model="form.reportBlockOrderJson" label="report_block_order" rounded="lg" rows="5" auto-grow /></VCol>
          <VCol cols="12" md="6"><VTextarea v-model="form.reportBlockVisibilityJson" label="report_block_visibility" rounded="lg" rows="8" auto-grow /></VCol>
          <VCol cols="12" md="6"><VTextarea v-model="form.reportBlockSpacerHeightsJson" label="report_block_spacer_heights" rounded="lg" rows="8" auto-grow /></VCol>
          <VCol cols="12"><VTextarea v-model="form.reportBlockImagesJson" label="report_block_images" rounded="lg" rows="8" auto-grow /></VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pa-6 pt-0">
        <VSpacer />
        <VBtn variant="text" color="secondary" @click="dialog = false">Cancelar</VBtn>
        <VBtn color="primary" rounded="md" :disabled="!selectedConfig" :loading="saving" @click="submit">Salvar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
