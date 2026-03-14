<script setup lang="ts">
import { shallowRef } from 'vue'

const invoiceData = shallowRef([
  {
    icon: 'custom-file-text-fill',
    title: 'All Invoices',
    color: 'primary',
  },
  {
    icon: 'custom-report-fill',
    title: 'Reports',
    color: 'info',
  },
  {
    icon: 'custom-dollar-fill',
    title: 'Paid',
    color: 'success',
  },
  {
    icon: 'custom-pending-fill',
    title: 'Pending',
    color: 'warning',
  },
  {
    icon: 'custom-close-circle-fill',
    title: 'Cancelled',
    color: 'error',
  },
  {
    icon: 'custom-shopping-bag-fill',
    title: 'Draft',
    color: 'primary',
  },
])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
  >
    <VCardText>
      <VRow>
        <VCol
          v-for="item in invoiceData"
          :key="item.title"
          cols="6"
          lg="6"
          sm="4"
        >
          <VCard
            variant="outlined"
            class="text-center"
          >
            <VCardItem>
              <VAvatar :color="item.color">
                <SvgSprite
                  :name="item.icon || ''"
                  style="width: 20px; height: 20px"
                />
              </VAvatar>
              <h6 class="text-subtitle-1 text-lightText mb-0 mt-4">
                {{ item.title }}
              </h6>
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
