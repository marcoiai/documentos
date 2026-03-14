<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useDocumentosApp, type Atributo } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Atributos' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Atributos', disabled: true, href: '#' },
])

const dialog = ref(false)
const saving = ref(false)
const editing = ref<Atributo | null>(null)

const fieldTypes = ['texto', 'numero', 'data', 'boolean', 'textarea', 'textarea_template', 'texto_placeholder', 'assinatura']
const form = reactive({
  tipo_external_id: '',
  secao_external_id: '' as string | null,
  nome: '',
  tipo_campo: 'texto',
  validador: '',
  peso: '' as string | number,
  mascara: '',
  template_texto: '',
})

const { tipos, secoes, atributos, errorMessage, successMessage, loading, loadData, clearMessages, saveAtributo, deleteAtributo } = useDocumentosApp()

const rows = computed(() => {
  return atributos.value.map(attr => ({
    ...attr,
    tipoNome: tipos.value.find(tipo => tipo.external_id === attr.tipo_external_id)?.nome || attr.tipo_external_id,
    secaoNome: secoes.value.find(secao => secao.external_id === attr.secao_external_id)?.nome || 'Sem secao',
  }))
})

function resetForm() {
  form.tipo_external_id = tipos.value[0]?.external_id || ''
  form.secao_external_id = ''
  form.nome = ''
  form.tipo_campo = 'texto'
  form.validador = ''
  form.peso = ''
  form.mascara = ''
  form.template_texto = ''
  editing.value = null
}

function openCreate() {
  clearMessages()
  resetForm()
  dialog.value = true
}

function openEdit(attr: Atributo) {
  clearMessages()
  editing.value = attr
  form.tipo_external_id = attr.tipo_external_id
  form.secao_external_id = attr.secao_external_id || ''
  form.nome = attr.nome
  form.tipo_campo = attr.tipo_campo
  form.validador = attr.validador || ''
  form.peso = attr.peso ?? ''
  form.mascara = attr.mascara || ''
  form.template_texto = attr.template_texto || ''
  dialog.value = true
}

async function submit() {
  saving.value = true
  try {
    await saveAtributo({
      id: editing.value?.id,
      external_id: editing.value?.external_id,
      tipo_external_id: form.tipo_external_id,
      secao_external_id: form.secao_external_id || null,
      nome: form.nome,
      tipo_campo: form.tipo_campo,
      validador: form.validador || null,
      peso: form.peso,
      mascara: form.mascara || null,
      template_texto: form.template_texto || null,
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
    <VCardItem title="Atributos" subtitle="Defina os campos dinamicos para cada tipo">
      <template #append>
        <div class="d-flex ga-2">
          <VBtn variant="outlined" color="secondary" rounded="md" :loading="loading" @click="loadData(true)">Atualizar</VBtn>
          <VBtn color="primary" rounded="md" @click="openCreate">Novo atributo</VBtn>
        </div>
      </template>
    </VCardItem>
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Secao</th>
          <th>Campo</th>
          <th class="text-right">Acoes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attr in rows" :key="attr.id">
          <td>
            <div class="font-weight-bold">{{ attr.nome }}</div>
            <div class="text-caption text-lightText">{{ attr.external_id }}</div>
          </td>
          <td>{{ attr.tipoNome }}</td>
          <td>{{ attr.secaoNome }}</td>
          <td>{{ attr.tipo_campo }}</td>
          <td class="text-right">
            <div class="d-inline-flex ga-2">
              <VBtn size="small" variant="text" color="primary" @click="openEdit(attr)">Editar</VBtn>
              <VBtn size="small" variant="text" color="error" @click="deleteAtributo(attr.id)">Excluir</VBtn>
            </div>
          </td>
        </tr>
        <tr v-if="!rows.length && !loading">
          <td colspan="5" class="text-center text-lightText py-8">Nenhum atributo cadastrado.</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>

  <VDialog v-model="dialog" max-width="900">
    <VCard rounded="lg">
      <VCardItem :title="editing ? 'Editar atributo' : 'Novo atributo'" subtitle="Configure os campos do tipo" />
      <VCardText>
        <VRow>
          <VCol cols="12" md="6"><VSelect v-model="form.tipo_external_id" :items="tipos" item-title="nome" item-value="external_id" label="Tipo" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.secao_external_id" :items="[{ nome: 'Sem secao', external_id: '' }, ...secoes]" item-title="nome" item-value="external_id" label="Secao" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.nome" label="Nome" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VSelect v-model="form.tipo_campo" :items="fieldTypes" label="Tipo do campo" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.validador" label="Validador" rounded="lg" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.peso" label="Peso" rounded="lg" type="number" /></VCol>
          <VCol cols="12" md="6"><VTextField v-model="form.mascara" label="Mascara" rounded="lg" /></VCol>
          <VCol cols="12"><VTextarea v-model="form.template_texto" label="Template de texto" rounded="lg" rows="3" /></VCol>
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
