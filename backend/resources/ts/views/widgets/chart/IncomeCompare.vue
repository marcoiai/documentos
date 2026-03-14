<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentTheme = ref(theme.current.value.colors)

watch(() => theme.current.value.colors.primary, newValue => {
  currentTheme.value.primary = newValue
})

const chartOptions1 = computed(() => {
  const primaryColor = currentTheme.value.primary

  return {
    chart: {
      type: 'area',
      height: 355,
      fontFamily: 'inherit',
      foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))',
      toolbar: {
        show: false,
      },
    },
    colors: [primaryColor],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    stroke: {
      curve: 'straight',
      width: 1,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      },
      axisTicks: {
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      },
    },
    dataLabels: {
      enabled: false,
    },
  }
})

// chart 1
const areaChart1 = {
  series: [
    {
      name: 'Income',
      data: [100, 20, 60, 20, 20, 80, 20],
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
    <VCardText>
      <VRow class="align-center">
        <VCol
          cols="12"
          sm="6"
        >
          <h5 class="text-h5 mb-0">
            Income Overview
          </h5>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <div class="d-flex align-center flex-wrap ga-2 justify-sm-end justify-center">
            <VBtnGroup
              divided
              variant="outlined"
              color="secondary"
              density="compact"
            >
              <VBtn>Week</VBtn>
              <VBtn>Month</VBtn>
            </VBtnGroup>
            <VBtn
              icon
              rounded="md"
              variant="outlined"
              aria-label="download"
              color="secondary"
              size="small"
              disabled
            >
              <SvgSprite
                name="custom-document-2"
                style="width: 20px; height: 20px"
              />
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCardItem class="pt-0">
      <VRow class="justify-sm-space-between justify-center">
        <VCol
          cols="12"
          sm="6"
        >
          <div class="d-flex align-center text-error justify-sm-start justify-center">
            <SvgSprite
              name="custom-chevron-down"
              style="width: 20px; height: 20px"
            />
            <h6 class="text-h6 mb-0 ml-1">
              $1,12,900 (45.67%)
            </h6>
          </div>
          <p class="text-h6 text-lightText mb-0 text-sm-start text-center">
            Compare to : 01 Dec 2021-08 Jan 2022
          </p>
        </VCol>
      </VRow>
      <VueApexCharts
        type="area"
        height="355"
        :options="chartOptions1"
        :series="areaChart1.series"
      />
    </VCardItem>
  </VCard>
</template>
