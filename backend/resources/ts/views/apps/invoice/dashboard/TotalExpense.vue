<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const successColor = theme.current.value.colors.success
const warningColor = theme.current.value.colors.warning
const errorColor = theme.current.value.colors.error

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'donut',
      height: 230,
      fontFamily: 'inherit',
    },
    colors: [warningColor, successColor, errorColor, 'rgba(var(--v-theme-lightprimary), var(--v-high-opacity))'],
    plotOptions: {
      donut: {
        size: '15%',
      },
    },
    stroke: {
      width: 0,
    },
    labels: ['Pending', 'Paid', 'Overdue', 'Draft'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'light',
      fillSeriesColor: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  }
})

const redialChart = {
  series: [30, 28, 22, 20],
}

const Expensedata = shallowRef([
  {
    status: 'Pending',
    color: 'warning',
    price: '$3,202',
  },
  {
    status: 'Paid',
    color: 'success',
    price: '$45,050',
  },
  {
    status: 'Overdue',
    color: 'error',
    price: '$25,000',
  },
  {
    status: 'Draft',
    color: 'lightprimary',
    price: '$7,694',
  },
])
</script>

<template>
  <CardHeader
    title="Total Expenses"
    class="overflow-hidden"
  >
    <template #header>
      <VBtn
        variant="text"
        aria-label="menu"
        color="secondary"
        icon
        rounded="md"
        size="small"
      >
        <SvgSprite
          name="custom-more-outline"
          style="width: 20px; height: 20px"
        />
      </VBtn>
    </template>
    <div class="pa-5">
      <VueApexCharts
        type="donut"
        height="230"
        :options="chartOptions"
        class="invoiceChart"
        :series="redialChart.series"
      />
      <VList
        density="compact"
        class="pb-0"
        aria-label="expense list"
        aria-busy="true"
      >
        <VListItem
          v-for="(item, i) in Expensedata"
          :key="i"
          class="pa-0"
        >
          <h6 class="text-subtitle-1 text-lightText mb-0">
            <VBadge
              dot
              :color="item.color"
              size="large"
              inline
            />
            {{ item.status }}
          </h6>
          <template #append>
            <h5 class="text-h6 font-weight-medium mb-0">
              {{ item.price }}
            </h5>
          </template>
        </VListItem>
      </VList>
    </div>
  </CardHeader>
</template>

<style lang="scss">
.invoiceChart {
  .apexcharts-canvas {
    margin: 0 auto;
  }
}
</style>
