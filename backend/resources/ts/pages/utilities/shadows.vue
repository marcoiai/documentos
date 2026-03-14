<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Shadows' })
const subContent = ref({ content: 'Add or remove shadows to elements with box-shadow utilities.' })
const path = ref({ filepath: 'resources/ts/pages/utilities/shadows' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/styles/elevation/' })

const colorShadow = ref(['primary', 'secondary', 'info', 'success', 'warning', 'error'])
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <UiParentCard title="Basic Shadow">
        <VRow justify="center">
          <VCol
            v-for="n in 25"
            :key="n"
            cols="auto"
          >
            <VCard
              height="100"
              width="100"
              class="mb-5 d-flex justify-center align-center flex-column"
              :class="[`elevation-${n}`]"
            >
              <h6 class="text-h6">
                elevation
              </h6>
              <div>{{ n - 1 }}</div>
            </VCard>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <UiParentCard title="Color Shadow">
        <VRow>
          <VCol
            v-for="color in colorShadow"
            :key="color"
            cols="6"
            lg="2"
            md="3"
            sm="4"
          >
            <VCard :class="`${color}-shadow bg-${color} px-4 py-6 text-center text-subtitle-1`">
              {{ color }}
            </VCard>
          </VCol>
        </VRow>
        <VRow class="mt-3">
          <VCol
            v-for="color in colorShadow"
            :key="color"
            cols="6"
            lg="2"
            md="3"
            sm="4"
          >
            <VCard :class="`${color}-outline-shadow text-${color} px-4 py-6 text-center text-subtitle-1`">
              {{ color }}
            </VCard>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
