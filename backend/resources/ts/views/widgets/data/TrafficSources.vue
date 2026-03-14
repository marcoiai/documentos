<script setup lang="ts">
import { shallowRef } from 'vue'

const sources = shallowRef([
  {
    text: 'Referral',
    percent: 20,
    color: 'primary',
  },
  {
    text: 'Bounce',
    percent: 58,
    color: 'secondary',
  },
  {
    text: 'Internet',
    percent: 40,
    color: 'primary',
  },
  {
    text: 'Social',
    percent: 90,
    color: 'primary',
  },
])
</script>

<template>
  <div
    v-for="(source, i) in sources"
    :key="i"
    class="py-3"
    :value="source.text"
  >
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-caption">{{ source.text }}</span>
      <span class="text-caption">{{ source.percent }}%</span>
    </div>
    <VProgressLinear
      :model-value="source.percent"
      rounded
      aria-label="progressbar"
      height="6"
      :color="source.color"
    />
  </div>
</template>
