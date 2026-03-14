<script setup lang="ts">
import { computed, ref } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 100,
      fontFamily: 'inherit',
      foreColor: '#a1aab2',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '85%',
      },
    },
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    colors: ['rgba(var(--v-theme-success), var(--v-medium-opacity))'],
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: -15,
      },
    },
    tooltip: {
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
      <div class="d-flex justify-space-between">
        <div>
          <VAvatar
            size="40"
            variant="tonal"
            color="secondary"
            rounded="md"
          >
            <SvgSprite
              name="custom-dollar-circle-outline"
              style="width: 20px; height: 20px"
            />
          </VAvatar>
          <h6 class="text-subtitle-1 mb-0 mt-3">
            $30,200.00
          </h6>
          <span class="text-caption">Income</span>
        </div>
        <VMenu
          width="150"
          location="start"
        >
          <template #activator="{ props }">
            <VBtn
              icon
              color="secondary"
              aria-label="menu"
              variant="text"
              rounded="md"
              size="small"
              v-bind="props"
            >
              <SvgSprite
                name="custom-more-outline"
                style="width: 20px; height: 20px; transform: rotate(90deg)"
              />
            </VBtn>
          </template>
          <VList
            elevation="24"
            class="pa-3"
            rounded="md"
            aria-label="menu"
            aria-busy="true"
          >
            <VListItem
              v-for="(item, index) in menulist"
              :key="index"
              density="compact"
              rounded="md"
              color="secondary"
              aria-label="menu"
              aria-busy="true"
              :value="index"
            >
              <VListItemTitle class="text-h6 text-lightText">
                {{ item }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
      <VueApexCharts
        type="bar"
        height="80"
        class="mb-n3"
        :options="chartOptions1"
        :series="barChart1.series"
      />
    </VCardText>
  </VCard>
</template>
