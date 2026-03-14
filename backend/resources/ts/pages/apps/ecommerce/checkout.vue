<script setup lang="ts">
import { ref } from 'vue'

import CartCheckout from '@/views/apps/ecommerce/cart/CartCheckout.vue'

const page = ref({ title: 'Checkout' })

const breadcrumbs = ref([
  {
    title: 'Ecommerce',
    disabled: false,
    href: '#',
  },
  {
    title: 'Checkout Page',
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
  <CartCheckout />
</template>
