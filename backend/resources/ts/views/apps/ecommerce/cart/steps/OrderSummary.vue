<script setup lang="ts">
import { onMounted } from 'vue'
import { useEcomStore } from '@db/apps/ecommerce/index'

const store = useEcomStore()

onMounted(() => {
  store.getsubTotal()
  store.getTotal()
  store.getDiscount()
})
</script>

<template>
  <VCard
    variant="outlined"
    class="my-6 bg-surface"
    rounded="lg"
  >
    <h6 class="text-subtitle-1 pa-4 mb-0">
      Order Summary
    </h6>
    <VDivider />
    <VTable
      density="compact"
      class="py-2"
    >
      <tbody>
        <tr>
          <td class="text-h6">
            Sub Total
          </td>
          <td class="text-end text-subtitle-1">
            ${{ store.subTotal }}
          </td>
        </tr>
        <tr>
          <td class="text-h6">
            Coupon Discount 5%
          </td>
          <td class="text-end text-h6">
            - ${{ store.discount }}
          </td>
        </tr>
        <tr>
          <td class="text-h6">
            Shipping Charges
          </td>
          <td class="text-end text-h6">
            -
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
  <VCard
    variant="outlined"
    rounded="lg"
  >
    <VTable class="py-2">
      <tbody>
        <tr>
          <td class="text-subtitle-1">
            Total
          </td>
          <td class="text-end text-subtitle-1">
            ${{ store.total }}
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
