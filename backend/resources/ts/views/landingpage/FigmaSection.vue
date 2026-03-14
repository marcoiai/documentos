<script setup lang="ts">
import { computed } from 'vue'
import { useCustomizerStore } from '@layouts/stores/customizer'
// assets
import imageElement from '@images/landing/figma-light.png'
import imageDark from '@images/landing/figma-dark.png'

const customizer = useCustomizerStore()

const dark = computed(() => {
  if (customizer.actTheme === 'dark') {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <div class="spacer pt-0">
    <VContainer class="maxWidth">
      <VRow class="justify-center">
        <VCol md="6" cols="12">
          <div class="text-center">
            <h2 class="text-h2 mb-sm-4 mb-2">The Ultimate Figma Design System for Effortless Productivity</h2>
            <p class="text-h6 mb-0">
              Simplify your design process with Auto Layout, components, variables, and global styles—all in one powerful Figma system.
            </p>
          </div>
        </VCol>
        <VCol xl="10" md="8" sm="10" cols="10" class="pb-0">
          <VImg v-if="dark" :src="imageDark" alt="figma" />
          <VImg v-else :src="imageElement" alt="figma" />
          <div class="d-flex justify-center ga-2 mt-6">
            <VBtn color="primary" variant="outlined" href="https://codedthemes.com/item/able-pro-free-figma-ui-kit/" target="_">
              Free Figma
            </VBtn>
            <VBtn color="primary" variant="flat" href="https://codedthemes.com/item/able-pro-figma-ui-kit/" target="_"> Buy Figma </VBtn>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
