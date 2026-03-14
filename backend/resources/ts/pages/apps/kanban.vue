<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import KanbanList from '@/views/apps/kanban/KanbanList.vue'

const page = ref({ title: 'Kanban' })

const breadcrumbs = shallowRef([
  {
    title: 'Applications',
    disabled: false,
    href: '#',
  },
  {
    title: 'Kanban',
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
  <VRow>
    <VCol lg="12">
      <KanbanList />
    </VCol>
  </VRow>
</template>
