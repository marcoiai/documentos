<script setup lang="ts">
import { shallowRef } from 'vue'

interface GenealType {
  title: string
  desc: string
}

const generalItem = shallowRef<GenealType[]>([
  {
    title: 'Band :',
    desc: 'Smart Band',
  },
  {
    title: 'Compatible Devices :',
    desc: 'Smartphones',
  },
  {
    title: 'Ideal For :',
    desc: 'Unisex',
  },
  {
    title: 'Lifestyle :',
    desc: 'Fitness | Indoor | Sports | Swimming | Outdoor',
  },
  {
    title: 'Basic Features :',
    desc: 'Calendar | Date & Time | Timer/Stop Watch',
  },
  {
    title: 'Health Tracker :',
    desc: 'Heart Rate | Exercise Tracker',
  },
])
</script>

<template>
  <VTable>
    <tr
      v-for="(gen, i) in generalItem"
      :key="i"
    >
      <td class="py-2">
        <span class="text-h6 text-lightText">{{ gen.title }}</span>
      </td>
      <td>{{ gen.desc }}</td>
    </tr>
  </VTable>
</template>
