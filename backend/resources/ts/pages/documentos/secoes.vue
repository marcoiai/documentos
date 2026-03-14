<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useDocumentosApp, type Secao } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Secoes' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Secoes', disabled: true, href: '#' },
])

const dialog = ref(false)
const saving = ref(false)
const editing = ref<Secao | null>(null)
const form = reactive({
  nome: '',
  cabecalho: '',
  rodape: '',
})

const { secoes, atributos, errorMessage, successMessage, loading, loadData, clearMessages, saveSecao, deleteSecao } = useDocumentosApp()

const rows = computed(() => {
  return secoes.value.map(secao => ({
    ...secao,
    totalAtributos: atributos.value.filter(attr => attr.secao_external_id === secao.external_id).length,
  }))
})

function resetForm() {
  form.nome = ''
  form.cabecalho = ''
  form.rodape = ''
  editing.value = null
}

function openCreate() {
  clearMessages()
  resetForm()
  dialog.value = true
}

function openEdit(secao: Secao) {
  clearMessages()
  editing.value = secao
  form.nome = secao.nome
  form.cabecalho = secao.cabecalho || ''
  form.rodape = secao.rodape || ''
  dialog.value = true
}

async function submit() {
  saving.value = true
  try {
    await saveSecao({
      id: editing.value?.id,
      external_id: editing.value?.external_id,
      nome: form.nome,
      cabecalho: form.cabecalho,
      rodape: form.rodape,
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
})
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <VAlert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable @click:close="clearMessages()">{{ errorMessage }}</VAlert>
  <VSnackbar :model-value="Boolean(successMessage)" color="success" location="top right" rounded="md" timeout="2500" @update:model-value="value => { if (!value) clearMessages() }">{{ successMessage }}</VSnackbar>

  <VCard rounded="lg" variant="outlined">
    <VCardItem title="Secoes" subtitle="Estruture cabecalhos e agrupamentos dos atributos">
      <template #append>
        <div class="d-flex ga-2">
          <VBtn variant="outlined" color="secondary" rounded="md" :loading="loading" @click="loadData(true)">Atualizar</VBtn>
          <VBtn color="primary" rounded="md" @click="openCreate">Nova secao</VBtn>
        </div>
      </template>
    </VCardItem>
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Atributos vinculados</th>
          <th>Identificador</th>
          <th class="text-right">Acoes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="secao in rows" :key="secao.id">
          <td>
            <div class="font-weight-bold">{{ secao.nome }}</div>
            <div class="text-caption text-lightText">{{ secao.cabecalho || 'Sem cabecalho' }}</div>
          </td>
          <td>{{ secao.totalAtributos }}</td>
          <td class="text-caption text-lightText">{{ secao.external_id }}</td>
          <td class="text-right">
            <div class="d-inline-flex ga-2">
              <VBtn size="small" variant="text" color="primary" @click="openEdit(secao)">Editar</VBtn>
              <VBtn size="small" variant="text" color="error" @click="deleteSecao(secao.id)">Excluir</VBtn>
            </div>
          </td>
        </tr>
        <tr v-if="!rows.length && !loading">
          <td colspan="4" class="text-center text-lightText py-8">Nenhuma secao cadastrada.</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>

  <VDialog v-model="dialog" max-width="760">
    <VCard rounded="lg">
      <VCardItem :title="editing ? 'Editar secao' : 'Nova secao'" subtitle="Formulario principal do modulo" />
      <VCardText>
        <VRow>
          <VCol cols="12"><VTextField v-model="form.nome" label="Nome" rounded="lg" /></VCol>
          <VCol cols="12"><VTextarea v-model="form.cabecalho" label="Cabecalho" rounded="lg" rows="3" /></VCol>
          <VCol cols="12"><VTextarea v-model="form.rodape" label="Rodape" rounded="lg" rows="3" /></VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pa-6 pt-0">
        <VSpacer />
        <VBtn variant="text" color="secondary" @click="dialog = false">Cancelar</VBtn>
        <VBtn color="primary" rounded="md" :loading="saving" :disabled="!form.nome.trim()" @click="submit">Salvar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
