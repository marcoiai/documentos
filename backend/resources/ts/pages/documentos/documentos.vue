<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useDocumentosApp, type Documento } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Documentos' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Registros', disabled: true, href: '#' },
])

const dialog = ref(false)
const saving = ref(false)
const editing = ref<Documento | null>(null)

const form = reactive({
  titulo: '',
  tipo_external_id: '',
  valores: {} as Record<string, unknown>,
  pdf_visivel: {} as Record<string, boolean>,
})

const { tipos, atributos, documentos, errorMessage, successMessage, loading, loadData, clearMessages, saveDocumento, deleteDocumento } = useDocumentosApp()

const selectedTipoAttrs = computed(() => {
  return atributos.value
    .filter(attr => attr.tipo_external_id === form.tipo_external_id)
    .sort((a, b) => a.nome.localeCompare(b.nome))
})

const rows = computed(() => {
  return documentos.value.map(documento => {
    const tipo = tipos.value.find(item => item.external_id === documento.tipo_external_id)
    const filledCount = Object.values(documento.valores || {}).filter(value => {
      if (typeof value === 'boolean')
        return value
      return String(value ?? '').trim() !== ''
    }).length

    return {
      ...documento,
      tipoNome: tipo?.nome || documento.tipo_external_id,
      filledCount,
    }
  })
})

watch(() => form.tipo_external_id, value => {
  const nextValores: Record<string, unknown> = {}
  const nextPdfVisivel: Record<string, boolean> = {}

  atributos.value
    .filter(attr => attr.tipo_external_id === value)
    .forEach(attr => {
      const previousValue = form.valores[attr.external_id]
      nextValores[attr.external_id] = previousValue ?? (attr.tipo_campo === 'boolean' ? false : '')
      nextPdfVisivel[attr.external_id] = form.pdf_visivel[attr.external_id] ?? true
    })

  form.valores = nextValores
  form.pdf_visivel = nextPdfVisivel
})

function resetForm() {
  form.titulo = ''
  form.tipo_external_id = tipos.value[0]?.external_id || ''
  form.valores = {}
  form.pdf_visivel = {}
  editing.value = null
}

function openCreate() {
  clearMessages()
  resetForm()
  dialog.value = true
}

function openEdit(documento: Documento) {
  clearMessages()
  editing.value = documento
  form.titulo = documento.titulo
  form.tipo_external_id = documento.tipo_external_id
  form.valores = { ...(documento.valores || {}) }
  form.pdf_visivel = { ...(documento.pdf_visivel || {}) }
  dialog.value = true
}

function setFieldValue(attrExternalId: string, value: unknown) {
  form.valores = {
    ...form.valores,
    [attrExternalId]: value,
  }
}

function setPdfVisible(attrExternalId: string, value: boolean) {
  form.pdf_visivel = {
    ...form.pdf_visivel,
    [attrExternalId]: value,
  }
}

async function submit() {
  saving.value = true
  try {
    await saveDocumento({
      id: editing.value?.id,
      external_id: editing.value?.external_id,
      titulo: form.titulo,
      tipo_external_id: form.tipo_external_id,
      valores: form.valores,
      pdf_visivel: form.pdf_visivel,
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
    <VCardItem title="Documentos" subtitle="Formulario dinamico com base nos atributos do tipo">
      <template #append>
        <div class="d-flex ga-2">
          <VBtn variant="outlined" color="secondary" rounded="md" :loading="loading" @click="loadData(true)">Atualizar</VBtn>
          <VBtn color="primary" rounded="md" :disabled="!tipos.length" @click="openCreate">Novo documento</VBtn>
        </div>
      </template>
    </VCardItem>
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Tipo</th>
          <th>Campos preenchidos</th>
          <th>Identificador</th>
          <th class="text-right">Acoes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="documento in rows" :key="documento.id">
          <td class="font-weight-bold">{{ documento.titulo }}</td>
          <td>{{ documento.tipoNome }}</td>
          <td>{{ documento.filledCount }}</td>
          <td class="text-caption text-lightText">{{ documento.external_id }}</td>
          <td class="text-right">
            <div class="d-inline-flex ga-2">
              <VBtn size="small" variant="text" color="primary" @click="openEdit(documento)">Editar</VBtn>
              <VBtn size="small" variant="text" color="error" @click="deleteDocumento(documento.id)">Excluir</VBtn>
            </div>
          </td>
        </tr>
        <tr v-if="!rows.length && !loading">
          <td colspan="5" class="text-center text-lightText py-8">Nenhum documento cadastrado.</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>

  <VDialog v-model="dialog" max-width="960">
    <VCard rounded="lg">
      <VCardItem :title="editing ? 'Editar documento' : 'Novo documento'" subtitle="Campos montados a partir dos atributos cadastrados" />
      <VCardText>
        <VRow>
          <VCol cols="12" md="6"><VTextField v-model="form.titulo" label="Titulo" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.tipo_external_id" :items="tipos" item-title="nome" item-value="external_id" label="Tipo" rounded="lg" /></VCol>

          <VCol v-for="attr in selectedTipoAttrs" :key="attr.external_id" cols="12" md="6">
            <VSwitch
              v-if="attr.tipo_campo === 'boolean'"
              :model-value="Boolean(form.valores[attr.external_id])"
              :label="attr.nome"
              color="primary"
              inset
              @update:model-value="value => setFieldValue(attr.external_id, Boolean(value))"
            />
            <VTextarea
              v-else-if="attr.tipo_campo === 'textarea' || attr.tipo_campo === 'textarea_template'"
              :model-value="String(form.valores[attr.external_id] ?? '')"
              :label="attr.nome"
              rounded="lg"
              rows="3"
              @update:model-value="value => setFieldValue(attr.external_id, value)"
            />
            <VTextField
              v-else
              :model-value="String(form.valores[attr.external_id] ?? '')"
              :label="attr.nome"
              :type="attr.tipo_campo === 'numero' ? 'number' : (attr.tipo_campo === 'data' ? 'date' : 'text')"
              rounded="lg"
              @update:model-value="value => setFieldValue(attr.external_id, value)"
            />
            <VCheckbox
              :model-value="form.pdf_visivel[attr.external_id] !== false"
              label="Exibir no PDF"
              color="primary"
              density="compact"
              hide-details
              @update:model-value="value => setPdfVisible(attr.external_id, Boolean(value))"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pa-6 pt-0">
        <VSpacer />
        <VBtn variant="text" color="secondary" @click="dialog = false">Cancelar</VBtn>
        <VBtn color="primary" rounded="md" :loading="saving" :disabled="!form.titulo.trim() || !form.tipo_external_id" @click="submit">Salvar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
