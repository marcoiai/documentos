<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDocumentosApp } from '@/composables/useDocumentosApp'

definePage({
  meta: {
    layout: 'default',
  },
})

const page = ref({ title: 'Documentos Hub' })
const breadcrumbs = ref([
  { title: 'Apps', disabled: false, href: '#' },
  { title: 'Documentos', disabled: true, href: '#' },
])

const { stats, tipos, documentos, atributos, loadData } = useDocumentosApp()

const latestTipos = computed(() => tipos.value.slice().reverse().slice(0, 5))
const latestDocumentos = computed(() => documentos.value.slice().reverse().slice(0, 5))
const densestTipos = computed(() => {
  return tipos.value
    .map(tipo => ({
      ...tipo,
      totalAtributos: atributos.value.filter(attr => attr.tipo_external_id === tipo.external_id).length,
    }))
    .sort((a, b) => b.totalAtributos - a.totalAtributos)
    .slice(0, 5)
})

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <VRow>
    <VCol v-for="item in stats" :key="item.label" cols="12" sm="6" lg="3">
      <VCard :to="item.to" rounded="lg" variant="outlined" class="h-100">
        <VCardText class="d-flex align-center justify-space-between">
          <div>
            <div class="text-subtitle-1 text-lightText mb-1">{{ item.label }}</div>
            <div class="text-h3 font-weight-bold">{{ item.value }}</div>
          </div>
          <VAvatar :color="item.color" variant="tonal" size="52" rounded="lg">
            <SvgSprite :name="item.icon" style="width: 24px; height: 24px" />
          </VAvatar>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="12" lg="4">
      <VCard rounded="lg" variant="outlined" class="h-100">
        <VCardItem title="Migracao ativa" subtitle="Areas ja conectadas ao backend real" />
        <VList lines="two">
          <VListItem title="Tipos" subtitle="CRUD dedicado em /documentos/tipos" />
          <VListItem title="Secoes" subtitle="CRUD dedicado em /documentos/secoes" />
          <VListItem title="Atributos" subtitle="CRUD dedicado em /documentos/atributos" />
          <VListItem title="Documentos" subtitle="Formulario dinamico em /documentos/documentos" />
        </VList>
      </VCard>
    </VCol>

    <VCol cols="12" lg="4">
      <VCard rounded="lg" variant="outlined" class="h-100">
        <VCardItem title="Ultimos tipos" subtitle="Tipos criados no sistema" />
        <VList lines="two">
          <VListItem
            v-for="tipo in latestTipos"
            :key="tipo.external_id"
            :title="tipo.nome"
            :subtitle="tipo.external_id"
          />
          <VListItem v-if="!latestTipos.length" title="Sem tipos cadastrados" subtitle="Crie o primeiro tipo na area de Tipos." />
        </VList>
      </VCard>
    </VCol>

    <VCol cols="12" lg="4">
      <VCard rounded="lg" variant="outlined" class="h-100">
        <VCardItem title="Tipos com mais atributos" subtitle="Ajuda a identificar estruturas mais densas" />
        <VList lines="two">
          <VListItem
            v-for="tipo in densestTipos"
            :key="tipo.external_id"
            :title="tipo.nome"
            :subtitle="`${tipo.totalAtributos} atributos`"
          />
        </VList>
      </VCard>
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="12">
      <VCard rounded="lg" variant="outlined">
        <VCardItem title="Documentos recentes" subtitle="Atalho visual para o modulo de documentos" />
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Tipo</th>
              <th>Identificador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="documento in latestDocumentos" :key="documento.external_id">
              <td class="font-weight-bold">{{ documento.titulo }}</td>
              <td>{{ documento.tipo_external_id }}</td>
              <td class="text-caption text-lightText">{{ documento.external_id }}</td>
            </tr>
            <tr v-if="!latestDocumentos.length">
              <td colspan="3" class="text-center text-lightText py-8">Nenhum documento cadastrado ainda.</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
