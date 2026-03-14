<script setup lang="ts">
import { ref } from 'vue'
import SimpleChart from '@/views/forms/charts/orgchart/SimpleChart.vue'
import HorizontalFlow from '@/views/forms/charts/orgchart/HorizontalFlow.vue'

const page = ref({ title: 'Org Chart' })

const breadcrumbs = ref([
  {
    title: 'Charts',
    disabled: false,
    href: '#',
  },
  {
    title: 'Org Chart',
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
      <UiParentCard title="Simple Flow Chart">
        <SimpleChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <UiParentCard title="Horizontal Flow Chart">
        <HorizontalFlow />
      </UiParentCard>
    </VCol>
  </VRow>
</template>
