<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useDocumentosApp, type Layout } from '@/composables/useDocumentosApp'

definePage({ meta: { layout: 'default' } })

const page = ref({ title: 'Layout' })
const breadcrumbs = ref([
  { title: 'Documentos', disabled: false, href: '#' },
  { title: 'Layout', disabled: true, href: '#' },
])

const saving = ref(false)
const dialog = ref(false)
const selectedTipo = ref('')
const form = reactive({
  itemsJson: '[]',
  sectionOrderJson: '[]',
})

const { tipos, layouts, atributos, errorMessage, successMessage, loading, loadData, clearMessages, saveLayout, deleteLayout } = useDocumentosApp()

const currentLayout = computed(() => layouts.value.find(item => item.tipo_external_id === selectedTipo.value) || null)
const availableAttrs = computed(() => atributos.value.filter(attr => attr.tipo_external_id === selectedTipo.value))

watch([selectedTipo, currentLayout], () => {
  form.itemsJson = JSON.stringify(currentLayout.value?.items || [], null, 2)
  form.sectionOrderJson = JSON.stringify(currentLayout.value?.section_order || [], null, 2)
}, { immediate: true })

function normalizeJson<T>(value: string, fallback: T): T {
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
  saving.value = true
  try {
    await saveLayout({
      id: currentLayout.value?.id,
      tipo_external_id: selectedTipo.value,
      items: normalizeJson(form.itemsJson, []),
      section_order: normalizeJson(form.sectionOrderJson, []),
    })
    dialog.value = false
  }
  finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadData()
  selectedTipo.value = tipos.value[0]?.external_id || ''
})
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <VAlert v-if="errorMessage" type="error" variant="tonal" class="mb-4" closable @click:close="clearMessages()">{{ errorMessage }}</VAlert>
  <VSnackbar :model-value="Boolean(successMessage)" color="success" location="top right" rounded="md" timeout="2500" @update:model-value="value => { if (!value) clearMessages() }">{{ successMessage }}</VSnackbar>

  <VRow>
    <VCol cols="12" lg="4">
      <VCard rounded="lg" variant="outlined">
        <VCardItem title="Selecionar tipo" subtitle="Edite o layout salvo por tipo" />
        <VCardText>
          <VSelect v-model="selectedTipo" :items="tipos" item-title="nome" item-value="external_id" label="Tipo" rounded="lg" />
          <VList lines="two" class="mt-4">
            <VListSubheader>Atributos disponiveis</VListSubheader>
            <VListItem v-for="attr in availableAttrs" :key="attr.external_id" :title="attr.nome" :subtitle="`${attr.tipo_campo} • ${attr.external_id}`" />
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" lg="8">
      <VCard rounded="lg" variant="outlined">
        <VCardItem title="Layout salvo" subtitle="Abra o formulario em dialog para editar o JSON do tipo selecionado">
          <template #append>
            <div class="d-flex ga-2">
              <VBtn variant="outlined" color="secondary" rounded="md" :loading="loading" @click="loadData(true)">Atualizar</VBtn>
              <VBtn color="primary" rounded="md" :disabled="!selectedTipo" @click="openEditor">Editar layout</VBtn>
            </div>
          </template>
        </VCardItem>
        <VCardText>
          <VList lines="two">
            <VListItem title="items" :subtitle="`${currentLayout?.items?.length || 0} registros no layout`" />
            <VListItem title="section_order" :subtitle="`${currentLayout?.section_order?.length || 0} secoes ordenadas`" />
          </VList>
        </VCardText>
        <VCardActions class="pa-6 pt-0">
          <VSpacer />
          <VBtn v-if="currentLayout" variant="text" color="error" @click="deleteLayout(currentLayout.id)">Excluir layout</VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>

  <VDialog v-model="dialog" max-width="1000">
    <VCard rounded="lg">
      <VCardItem title="Editor de layout" subtitle="JSON compativel com a estrutura salva pelo app antigo" />
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VTextarea v-model="form.itemsJson" label="items" rounded="lg" rows="12" auto-grow />
          </VCol>
          <VCol cols="12">
            <VTextarea v-model="form.sectionOrderJson" label="section_order" rounded="lg" rows="6" auto-grow />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="pa-6 pt-0">
        <VSpacer />
        <VBtn variant="text" color="secondary" @click="dialog = false">Cancelar</VBtn>
        <VBtn color="primary" rounded="md" :disabled="!selectedTipo" :loading="saving" @click="submit">Salvar layout</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
