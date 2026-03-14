<script setup lang="ts">
import { ref } from 'vue'

const page = ref({ title: 'Tabler Icons' })

const breadcrumbs = ref([
  {
    title: 'Icons',
    disabled: false,
    href: '#',
  },
  {
    title: 'Tabler Icons',
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
      <UiParentCard title="Tabler Icons">
        <iframe
          src="https://tabler.io/icons"
          frameborder="0"
          width="100%"
          height="600"
        />
      </UiParentCard>
    </VCol>
  </VRow>
</template>
