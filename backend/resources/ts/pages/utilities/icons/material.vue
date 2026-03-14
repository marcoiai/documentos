<script setup lang="ts">
import { ref } from 'vue'

const page = ref({ title: 'Material Icons' })

const breadcrumbs = ref([
  {
    title: 'Icons',
    disabled: false,
    href: '#',
  },
  {
    title: 'Material Icons',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <UiParentCard title="Material Icons">
        <iframe
          src="https://materialdesignicons.com/"
          frameborder="0"
          aria-label="iframe"
          width="100%"
          height="1000"
        />
      </UiParentCard>
    </VCol>
  </VRow>
</template>
