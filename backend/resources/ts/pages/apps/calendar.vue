<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const page = ref({ title: 'Calendar' })

const breadcrumbs = shallowRef([
  {
    title: 'Applications',
    disabled: false,
    href: '#',
  },
  {
    title: 'Calendar',
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
    <VCol
      cols="12"
      xl="4"
      md="6"
      sm="12"
    >
      <UiParentCard title="Default Calendar">
        <VDatePicker width="337" />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      xl="4"
      md="6"
      sm="12"
    >
      <UiParentCard title="Color Calendar">
        <VDatePicker
          width="337"
          color="primary"
        />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      xl="4"
      md="6"
      sm="12"
    >
      <UiParentCard title="Show adjacent months">
        <VDatePicker
          width="337"
          show-adjacent-months
        />
      </UiParentCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.v-date-picker-month__day {
  width: 43px;
  height: 43px;
  .v-btn {
    --v-btn-size: 0.65rem;
  }
}
@media (max-width: 480px) {
  .v-date-picker {
    width: 280px !important;
  }
  .v-date-picker-month__days {
    justify-content: start;
  }
  .v-date-picker-month__day {
    width: 35px;
    height: 35px;
  }
  .v-date-picker-controls,
  .v-picker-title,
  .v-picker__header {
    width: 280px;
  }
}
</style>
