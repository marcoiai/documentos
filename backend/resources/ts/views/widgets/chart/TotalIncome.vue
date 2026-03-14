<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentTheme = ref(theme.current.value.colors)

watch(() => theme.current.value.colors.primary, newValue => {
  currentTheme.value.primary = newValue
})

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const overviewList = shallowRef([
  {
    color: 'primary',
    name: 'Total Income',
    subcontent: '$23,876',
    price: '$76,343',
  },
  {
    color: 'primary200',
    name: 'Views',
    subcontent: '$23,876',
    price: '$76,343',
  },
  {
    color: 'warning',
    name: 'Total Rent',
    subcontent: '$23,876',
    price: '$76,343',
  },
  {
    color: 'success',
    name: 'Download',
    subcontent: '$23,876',
    price: '$76,343',
  },
])

const chartOptions = computed(() => {
  const primaryColor = currentTheme.value.primary

  return {
    chart: {
      type: 'donut',
      height: 300,
      width: 300,
      fontFamily: 'inherit',
      foreColor: 'rgba(var(--v-theme-darkText), var(--v-high-opacity))',
    },
    labels: ['Total income', 'Total rent', 'Download', 'Views'],
    colors: [primaryColor, 'rgba(var(--v-theme-warning), var(--v-high-opacity))', 'rgba(var(--v-theme-success), var(--v-high-opacity))', primaryColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [1, 1, 1, 0.3],
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 250,
            height: 250,
          },
          legend: {
            show: false,
          },
        },
      },
      {
        breakpoint: 960,
        options: {
          legend: {
            show: false,
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          legend: {
            show: false,
          },
        },
      },
      {
        breakpoint: 1550,
        chart: {
          width: 300,
          height: 300,
        },
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  }
})

const pieChart = {
  series: [31, 26, 23, 20],
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
          Total Income
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
    <VCardItem class="pa-0 chart-visible">
      <div class="apexchart-center">
        <VueApexCharts
          type="donut"
          height="300"
          :options="chartOptions"
          :series="pieChart.series"
        />
      </div>
      <VRow class="mt-2 mx-0 mb-0 px-3 pb-3">
        <VCol
          v-for="(item, index) in overviewList"
          :key="index"
          cols="12"
          sm="6"
        >
          <VSheet
            rounded="lg"
            class="pa-4"
            color="containerBg"
          >
            <p class="text-body-1 mb-0">
              <VAvatar
                size="8"
                :color="item.color"
                variant="flat"
                class="mr-2"
              />
              {{ item.name }}
            </p>
            <h6 class="text-subtitle-1 mb-0">
              {{ item.subcontent }}
              <span
                class="text-lightText text-caption"
                style="font-weight: 600"
              >
                <SvgSprite
                  name="custom-rise-outline"
                  style="width: 14px; height: 14px; vertical-align: text-top"
                />
                {{ item.price }}
              </span>
            </h6>
          </VSheet>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style lang="scss">
.chart-visible {
  .v-card-item__content {
    overflow: visible;
  }
}
</style>
