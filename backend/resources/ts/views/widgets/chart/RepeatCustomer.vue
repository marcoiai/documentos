<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentTheme = ref(theme.current.value.colors)

watch(() => theme.current.value.colors.primary, newValue => {
  currentTheme.value.primary = newValue
})

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const chartOptions = computed(() => {
  const primaryColor = currentTheme.value.primary

  return {
    chart: {
      type: 'area',
      height: 260,
      fontFamily: 'inherit',
      foreColor: 'rgba(var(--v-theme-lightText), var(--v-high-opacity))',
      toolbar: false,
    },
    colors: [primaryColor],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      strokeDashArray: 4,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
    },
  }
})

const areaChart = {
  series: [
    {
      name: 'Page Views',
      data: [30, 60, 40, 70, 50, 90, 50, 55, 45, 60, 50, 65],
    },
  ],
}
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          Repeat customer rate
        </h5>
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
                style="width: 20px; height: 20px"
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
              :value="index"
            >
              <VListItemTitle class="text-h6 text-lightText">
                {{ item }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </VCardText>
    <VCardItem class="pt-0">
      <div class="text-right">
        <h6 class="text-subtitle-1">
          5.44%
          <VChip
            color="success"
            variant="flat"
            size="small"
            rounded="md"
          >
            +2.6%
          </VChip>
        </h6>
      </div>
      <VueApexCharts
        type="area"
        height="260"
        :options="chartOptions"
        :series="areaChart.series"
      />
    </VCardItem>
  </VCard>
</template>
