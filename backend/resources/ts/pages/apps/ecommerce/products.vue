<script setup lang="ts">
import { ref } from 'vue'

import Products from '@/views/apps/ecommerce/listing/ProductList.vue'

const page = ref({ title: 'Products' })

const breadcrumbs = ref([
  {
    title: 'Ecommerce',
    disabled: false,
    href: '#',
  },
  {
    title: 'product Page',
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
  <Products />
</template>
