<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentTheme = ref(theme.current.value.colors)
const errorColor = theme.current.value.colors.error

const menulist = ref(['Today', 'Weekly', 'Monthly'])

watch(() => theme.current.value.colors.primary, newValue => {
  currentTheme.value.primary = newValue
})

const chartOptions = computed(() => {
  const primaryColor = currentTheme.value.primary

  return {
    chart: {
      type: 'area',
      height: 60,
      fontFamily: 'inherit',
      foreColor: 'rgba(var(--v-theme-lightText), var(--v-high-opacity))',
      toolbar: false,
      stacked: true,
      sparkline: {
        enabled: true,
      },
      offsetX: -20,
    },
    colors: [primaryColor],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dataLabels: {
      enabled: false,
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
    stroke: { curve: 'smooth', width: 2 },
    grid: {
      show: false,
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
    legend: {
      show: true,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  }
})

const areaChart = {
  series: [
    {
      name: 'Orders',
      data: [5, 25, 3, 10, 4, 50, 0],
    },
  ],
}

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 60,
      fontFamily: 'inherit',
      foreColor: 'rgba(var(--v-theme-lightText), var(--v-high-opacity))',
      toolbar: false,
      stacked: true,
      sparkline: {
        enabled: true,
      },
      offsetX: -20,
    },
    colors: [errorColor],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dataLabels: {
      enabled: false,
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
    stroke: { curve: 'smooth', width: 2 },
    grid: {
      show: false,
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
    legend: {
      show: true,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  }
})

const areaChart1 = {
  series: [
    {
      name: 'Orders',
      data: [0, 50, 4, 10, 3, 25, 5],
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
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          Project overview
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
      <VRow>
        <VCol
          cols="12"
          md="4"
          sm="6"
        >
          <VRow class="align-end">
            <VCol cols="6">
              <p class="text-body-1 mb-0">
                Total Tasks
              </p>
              <h5 class="text-h5 mb-0">
                34,686
              </h5>
            </VCol>
            <VCol cols="6">
              <VueApexCharts
                type="area"
                height="60"
                class="overview-chart"
                :options="chartOptions"
                :series="areaChart.series"
              />
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="4"
          sm="6"
        >
          <VRow class="align-end">
            <VCol cols="6">
              <p class="text-body-1 mb-0">
                Pending Tasks
              </p>
              <h5 class="text-h5 mb-0">
                3,6786
              </h5>
            </VCol>
            <VCol cols="6">
              <VueApexCharts
                type="area"
                height="60"
                class="overview-chart"
                :options="chartOptions1"
                :series="areaChart1.series"
              />
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <VBtn
            color="primary"
            variant="flat"
            block
            rounded="md"
            size="large"
          >
            <template #prepend>
              <SvgSprite
                name="custom-plus"
                style="width: 20px; height: 20px"
              />
            </template>
            Add Project
          </VBtn>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>
