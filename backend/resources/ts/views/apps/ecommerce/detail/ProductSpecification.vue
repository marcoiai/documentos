<script setup lang="ts">
import { shallowRef } from 'vue'

interface GenealType {
  title: string
  desc: string
}

interface SpecificationType {
  title: string
  desc: string
}

const generalItem = shallowRef<GenealType[]>([
  {
    title: 'Wearable Device Type:',
    desc: 'Smart Band',
  },
  {
    title: 'Compatible Devices:',
    desc: 'Smartphones',
  },
  {
    title: 'Ideal For :',
    desc: 'Unisex',
  },
])

const specificationItem = shallowRef<SpecificationType[]>([
  {
    title: 'Brand:',
    desc: 'Apple',
  },
  {
    title: 'Model Series:',
    desc: 'Watch SE',
  },
  {
    title: 'Model Number:',
    desc: 'MYDT2HN/A',
  },
])
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <h5 class="text-h5 mb-4">
        Product Category
      </h5>
      <VDivider />
      <VTable class="mt-4">
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
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <h5 class="text-h5 mb-4">
        Manufacturer Details
      </h5>
      <VDivider />
      <VTable class="mt-4">
        <tr
          v-for="(item, i) in specificationItem"
          :key="i"
        >
          <td class="py-2">
            <span class="text-h6 text-lightText">{{ item.title }}</span>
          </td>
          <td>{{ item.desc }}</td>
        </tr>
      </VTable>
    </VCol>
  </VRow>
</template>
