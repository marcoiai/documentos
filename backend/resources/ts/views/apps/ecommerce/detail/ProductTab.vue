<script setup lang="ts">
import { ref } from 'vue'
import ProductDescription from './ProductDescription.vue'
import ProductReview from './ProductReview.vue'
import ProductSpecification from './ProductSpecification.vue'

const tab = ref(null)
</script>

<template>
  <VTabs
    v-model="tab"
    color="primary"
    class="border-bottom"
  >
    <VTab value="one">
      Features
    </VTab>
    <VTab value="two">
      Specifications
    </VTab>
    <VTab value="three">
      Overview
    </VTab>
    <VTab value="four">
      Review <VChip
        color="secondary"
        size="small"
        class="ms-1"
      >
        275
      </VChip>
    </VTab>
  </VTabs>
  <div class="mt-5">
    <VTabsWindow v-model="tab" class="mx-n6 px-6">
      <VTabsWindowItem value="one">
        <ProductDescription />
      </VTabsWindowItem>
      <VTabsWindowItem value="two">
        <ProductSpecification />
      </VTabsWindowItem>
      <VTabsWindowItem value="three">
        <p class="text-h6 text-lightText">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text
          ever since the 1500s, <b>“When an unknown printer took a galley of type and scrambled it to make a type specimen book.”</b> It has
          survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p class="text-h6 text-lightText mb-0">
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
          desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </VTabsWindowItem>
      <VTabsWindowItem value="four">
        <ProductReview />
      </VTabsWindowItem>
    </VTabsWindow>
  </div>
</template>
