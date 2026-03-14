<script setup lang="ts">
import { computed, ref } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 80,
      fontFamily: 'inherit',
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '80%',
      },
    },
    colors: ['rgba(var(--v-theme-primary), var(--v-medium-opacity))'],
    stroke: {
      curve: 'smooth',
      width: 0,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
    },
  }
})

// chart 1
const barChart1 = {
  series: [
    {
      name: 'Users',
      data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25],
    },
  ],
}
</script>

<template>
  <VCard
    variant="outlined"
    elevation="0"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText>
      <div class="d-flex justify-space-between align-center mb-5">
        <h5 class="text-h5 mb-0">
          New Orders
        </h5>
        <VAutocomplete
          id="autocomplete-input"
          model-value="Monthly"
          aria-label="select"
          :items="menulist"
          color="primary"
          variant="outlined"
          hide-details
          density="compact"
          class="text-caption"
          style="max-width: 120px"
        />
      </div>
      <VueApexCharts
        type="bar"
        height="80"
        :options="chartOptions1"
        :series="barChart1.series"
      />
      <div class="d-flex ga-2 justify-center py-4">
        <h6 class="text-subtitle-1 mb-0">
          $30,200
        </h6>
        <p class="text-body-1 text-primary mb-0">
          <SvgSprite
            name="custom-rise-outline"
            style="width: 16px; height: 16px; transform: rotate(45deg)"
          />
          30.6%
        </p>
      </div>
      <VBtn
        color="secondary"
        variant="outlined"
        rounded="md"
        block
      >
        View More
      </VBtn>
    </VCardText>
  </VCard>
</template>
