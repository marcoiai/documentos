<script setup lang="ts">
import { ref } from 'vue'

// apexcharts types
import ApexColumnChart from '@/views/forms/charts/apexchart/ApexColumnChart.vue'
import ApexBarChart from '@/views/forms/charts/apexchart/ApexBarChart.vue'
import ApexLineChart from '@/views/forms/charts/apexchart/ApexLineChart.vue'
import ApexAreaChart from '@/views/forms/charts/apexchart/ApexAreaChart.vue'
import ApexMixedChart from '@/views/forms/charts/apexchart/ApexMixedChart.vue'
import ApexRedialChart from '@/views/forms/charts/apexchart/ApexRedialChart.vue'
import ApexPolarChart from '@/views/forms/charts/apexchart/ApexPolarChart.vue'
import ApexPieChart from '@/views/forms/charts/apexchart/ApexPieChart.vue'

// theme breadcrumb
const page = ref({ title: 'Apex Chart' })

const breadcrumbs = ref([
  {
    title: 'Charts',
    disabled: false,
    href: '#',
  },
  {
    title: 'Apex Chart',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <!-- ---------------------------------------------------- -->
  <!-- Apex Chart -->
  <!-- ---------------------------------------------------- -->
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Column Chart">
        <ApexColumnChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Bar Chart">
        <ApexBarChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Line Chart">
        <ApexLineChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Area Chart">
        <ApexAreaChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      lg="7"
      md="6"
    >
      <UiParentCard title="Mixed Chart">
        <ApexMixedChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      class="d-flex align-stretch"
      lg="5"
      md="6"
    >
      <UiParentCard title="Redial Chart">
        <ApexRedialChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      lg="4"
      class="d-flex align-stretch"
      md="6"
    >
      <UiParentCard
        title="Polar Chart"
        class="legend-center"
      >
        <ApexPolarChart />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      lg="4"
      class="d-flex align-stretch"
      md="6"
    >
      <UiParentCard
        title="Pie Chart"
        class="legend-center"
      >
        <ApexPieChart />
      </UiParentCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.legend-center {
  .apexcharts-legend-marker {
    vertical-align: middle;
  }
}
</style>
