<script setup lang="ts">
import { ref } from 'vue'

import TabCard from '@/views/apps/invoice/dashboard/TabCard.vue'
import InvoiceStatus from '@/views/apps/invoice/dashboard/InvoiceStatus.vue'
import RecentInvoice from '@/views/apps/invoice/dashboard/RecentInvoice.vue'
import TotalExpense from '@/views/apps/invoice/dashboard/TotalExpense.vue'
import NotificationInvoice from '@/views/apps/invoice/dashboard/NotificationInvoice.vue'

// theme breadcrumb
const page = ref({ title: 'My Dashboard' })

const breadcrumbs = ref([
  {
    title: 'Invoice',
    disabled: false,
    href: '#',
  },
  {
    title: 'Invoice Summary',
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
      xl="9"
      lg="7"
    >
      <TabCard />
    </VCol>
    <VCol
      cols="12"
      xl="3"
      lg="5"
    >
      <InvoiceStatus />
    </VCol>
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <RecentInvoice />
    </VCol>
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <TotalExpense />
    </VCol>
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <NotificationInvoice />
    </VCol>
  </VRow>
</template>
