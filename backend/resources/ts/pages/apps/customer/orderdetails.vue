<script setup lang="ts">
import { ref } from 'vue'

import DetailsTab from '@/views/apps/customer/order-details/DetailsTab.vue'
import InvoiceTab from '@/views/apps/customer/order-details/InvoiceTab.vue'
import StatusTab from '@/views/apps/customer/order-details/StatusTab.vue'

// theme breadcrumb
const page = ref({ title: 'Order Details' })

const breadcrumbs = ref([
  {
    title: 'Customer',
    disabled: false,
    href: '#',
  },
  {
    title: 'Order Details',
    disabled: true,
    href: '#',
  },
])

const tab2 = ref(null)
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <!-- customer detail table -->
      <VTabs
        v-model="tab2"
        color="primary"
      >
        <VTab value="11">
          <SvgSprite
            name="custom-document-text-outline"
            class="v-icon--start"
            style="width: 16px; height: 16px"
          /> Details
        </VTab>
        <VTab value="22">
          <SvgSprite
            name="custom-wallet-outline"
            class="v-icon--start"
            style="width: 16px; height: 16px"
          /> Invoice
        </VTab>
        <VTab value="33">
          <SvgSprite
            name="custom-page-outline"
            class="v-icon--start"
            style="width: 16px; height: 16px"
          /> Status
        </VTab>
      </VTabs>
      <VDivider class="mb-6" />
      <VCardText class="px-0 py-0 mx-n6 mb-n6">
        <VTabsWindow v-model="tab2" class="px-6 pb-6">
          <VTabsWindowItem value="11">
            <!-- Details tab -->
            <DetailsTab />
          </VTabsWindowItem>

          <VTabsWindowItem value="22">
            <InvoiceTab />
          </VTabsWindowItem>

          <VTabsWindowItem value="33">
            <StatusTab />
          </VTabsWindowItem>
        </VTabsWindow>
      </VCardText>
    </VCol>
  </VRow>
</template>
