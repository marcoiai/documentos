<script setup lang="ts">
import ProductDetail from '@/views/apps/ecommerce/detail/ProductDetail.vue'
import RelatedProducts from '@/views/apps/ecommerce/detail/RelatedProducts.vue'
import ProductTab from '@/views/apps/ecommerce/detail/ProductTab.vue'
</script>

<template>
  <VCard
    elevation="0"
    variant="outlined"
    rounded="lg"
    class="bg-surface mt-2 mb-4"
  >
    <VCardText><ProductDetail /> </VCardText>
  </VCard>
  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <VCard
        elevation="0"
        variant="outlined"
        class="bg-surface"
        rounded="lg"
      >
        <VCardText>
          <ProductTab />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <RelatedProducts />
    </VCol>
  </VRow>
</template>
