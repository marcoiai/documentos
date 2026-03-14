<script setup lang="ts">
import { shallowRef } from 'vue'

const revenues = shallowRef([
  {
    name: 'Bitcoin',
    price: 145.58,
  },
  {
    name: 'Ethereum',
    price: 6.368,
  },
  {
    name: 'Ripple',
    price: 458.63,
  },
  {
    name: 'Neo',
    price: 5.631,
  },
  {
    name: 'Ethereum',
    price: 6.368,
  },
  {
    name: 'Ripple',
    price: 458.63,
  },
  {
    name: 'Neo',
    price: 5.631,
  },
  {
    name: 'Ethereum',
    price: 6.368,
  },
  {
    name: 'Ripple',
    price: 458.63,
  },
  {
    name: 'Neo',
    price: 5.631,
  },
])
</script>

<template>
  <PerfectScrollbar :style="{ height: '335px' }" :options="{ suppressScrollX: true }">
    <VList
      class="py-0"
      aria-label="revenue list"
      aria-busy="true"
      border
    >
      <VListItem
        v-for="(revenue, i) in revenues"
        :key="i"
        class="px-6"
        :value="revenue"
        color="primary"
      >
        <template #prepend>
          <SvgSprite
            v-if="revenue.price > 145"
            name="custom-chevron-up-fill"
            class="me-12 text-success"
            style="width: 20px; height: 20px"
          />
          <SvgSprite
            v-else
            name="custom-chevron-down"
            class="me-12 text-error"
            style="width: 20px; height: 20px"
          />
        </template>
        <div class="d-inline-flex align-center justify-space-between w-100">
          <h6 class="text-h6 mb-0">
            {{ revenue.name }}
          </h6>
          <div
            v-if="revenue.price > 145"
            class="ms-auto text-subtitle-1 text-success"
          >
            + ${{ revenue.price }}
          </div>
          <div
            v-else
            class="ms-auto text-subtitle-1 text-error"
          >
            - ${{ revenue.price }}
          </div>
        </div>
      </VListItem>
    </VList>
  </PerfectScrollbar>
</template>
