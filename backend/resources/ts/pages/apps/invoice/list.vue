<script setup lang="ts">
import { ref } from 'vue'

import WidgetCharts from '@/views/apps/invoice/lists/WidgetCharts.vue'
import RecievableCard from '@/views/apps/invoice/lists/RecievableCard.vue'
import OrderTab from '@/views/apps/invoice/lists/OrderTab.vue'

// theme breadcrumb
const page = ref({ title: 'List' })

const breadcrumbs = ref([
  {
    title: 'Invoice',
    disabled: false,
    href: '#',
  },
  {
    title: 'List',
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
      lg="8"
    >
      <WidgetCharts />
    </VCol>
    <VCol
      cols="12"
      lg="4"
    >
      <RecievableCard />
    </VCol>
    <VCol cols="12">
      <OrderTab />
    </VCol>
  </VRow>
</template>
