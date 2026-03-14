<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Color' })
const subContent = ref({ content: 'Convey meaning through color. Out of the box you get access to all colors in the vuetify guidelines.' })
const path = ref({ filepath: 'resources/ts/pages/utilities/colors' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/styles/colors/' })

const colors = ref([
  'primary',
  'lightprimary',
  'secondary',
  'lightsecondary',
  'info',
  'lightinfo',
  'success',
  'lightsuccess',
  'warning',
  'lightwarning',
  'error',
  'lighterror',
  'darkText',
  'lightText',
  'borderLight',
  'inputBorder',
  'containerBg',
])
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
      <UiParentCard title="Color Palette">
        <VRow>
          <VCol
            v-for="(color, index) in colors"
            :key="index"
            md="3"
            cols="12"
          >
            <VSheet
              rounded="md"
              class="align-center justify-center d-flex"
              height="100"
              width="100%"
              :color="color"
            >
              class: {{ color }}
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
