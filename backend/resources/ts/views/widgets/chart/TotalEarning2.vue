<script setup lang="ts">
import { computed } from 'vue'

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'radialBar',
      width: 136,
      height: 150,
      offsetX: -25,
      offsetY: -10,
      fontFamily: 'inherit',
    },
    colors: ['rgba(var(--v-theme-error), var(--v-high-opacity))'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        hollow: {
          margin: 5,
          size: '60%',
        },
        track: {
          show: true,
          background: 'rgba(var(--v-theme-error), var(--v-high-opacity))',
          opacity: 0.5,
          strokeWidth: '50%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            formatter: (value: number) => value,
            fontSize: '20px',
            show: true,
            offsetY: 5,
            fontWeight: 700,
            color: 'rgba(var(--v-theme-error), var(--v-high-opacity))',
          },
        },
      },
    },
    grid: {
      padding: {
        right: -50,
        left: -35,
      },
    },
    legend: {
      show: false,
    },
  }
})

const redialChart = {
  series: [30],
}
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="py-5">
      <div class="d-flex align-center">
        <!-- ---------------------------------------------------- -->
        <!-- Radial Chart -->
        <!-- ---------------------------------------------------- -->
        <VueApexCharts
          type="radialBar"
          class="radial-widget"
          height="150"
          width="150"
          :options="chartOptions"
          :series="redialChart.series"
        />
        <div>
          <p class="text-body-1 mb-0">
            Total Earning
          </p>
          <h6 class="text-subtitle-1 mb-0">
            $45,890
          </h6>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
