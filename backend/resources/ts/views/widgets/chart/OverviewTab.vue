<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const overviewData = shallowRef([
  {
    color: 'error',
    icon: 'custom-graph-outline',
    name: 'Total Sales',
    price: '1,800',
    interest: '-245',
    rateicon: 'custom-fall-outline',
    rate: '10.6%',
  },
  {
    color: 'success',
    icon: 'custom-home-trending-outline',
    name: 'Revenue',
    price: '$5,667',
    interest: '+2,100',
    rateicon: 'custom-rise-outline',
    rate: '30.6%',
  },
  {
    color: 'warning',
    icon: 'custom-shopping-cart',
    name: 'Abandon Cart',
    price: '128',
    interest: '-26',
    rateicon: 'custom-bidirectional',
    rate: '5%',
  },
  {
    color: 'success',
    icon: 'custom-spent-outline',
    name: 'Ads Spent',
    price: '$2,500',
    interest: '+200',
    rateicon: 'custom-rise-outline',
    rate: '10.6%',
  },
])

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 250,
      fontFamily: 'inherit',
      foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))',
      toolbar: {
        show: false,
      },
    },
    colors: ['rgba(var(--v-theme-primary), var(--v-high-opacity))', 'rgba(var(--v-theme-darkprimary), var(--v-half-opacity))'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent'],
    },
    fill: {
      opacity: [1, 0.5],
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      strokeDashArray: 4,
      padding: {
        bottom: -10,
      },
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
      position: 'top',
      horizontalAlign: 'left',
    },
  }
})

// chart 1
const barChart1 = {
  series: [
    {
      name: 'Net Profit',
      data: [76, 85, 101, 98, 87, 105, 91],
    },
    {
      name: 'Revenue',
      data: [44, 55, 57, 56, 61, 58, 63],
    },
  ],
}

const barChart2 = {
  series: [
    {
      name: 'Net Profit',
      data: [80, 101, 90, 65, 120, 105, 85],
    },
    {
      name: 'Revenue',
      data: [45, 30, 57, 45, 78, 48, 63],
    },
  ],
}

const barChart3 = {
  series: [
    {
      name: 'Net Profit',
      data: [79, 85, 107, 95, 83, 115, 97],
    },
    {
      name: 'Revenue',
      data: [48, 56, 50, 54, 68, 53, 65],
    },
  ],
}

const barChart4 = {
  series: [
    {
      name: 'Net Profit',
      data: [90, 111, 105, 55, 70, 65, 75],
    },
    {
      name: 'Revenue',
      data: [55, 80, 57, 45, 38, 48, 43],
    },
  ],
}

const tab = ref(0)
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardItem class="py-0">
      <VTabs
        v-model="tab"
        color="primary"
        height="58"
      >
        <VTab
          value="one"
          class="mr-1 py-6"
          rounded="0"
        >
          Overview
        </VTab>
        <VTab
          value="two"
          class="py-6"
          rounded="0"
        >
          Marketing
        </VTab>
        <VTab
          value="three"
          class="py-6"
          rounded="0"
        >
          Project
        </VTab>
        <VTab
          value="four"
          class="py-6"
          rounded="0"
        >
          Order
        </VTab>
      </VTabs>
    </VCardItem>
    <VDivider />
    <VCardText class="rounded-md overflow-hidden">
      <VRow>
        <VCol
          cols="12"
          class="text-right"
        >
          <VRow>
            <VCol
              cols="12"
              md="8"
              sm="6"
              class="pb-sm-3 pb-0"
            >
              <div class="d-flex justify-end ga-2 align-center mb-4">
                <VAutocomplete
                  id="autocomplete-input"
                  model-value="Today"
                  aria-label="select"
                  :items="menulist"
                  color="primary"
                  variant="outlined"
                  hide-details
                  density="compact"
                  style="max-width: 120px"
                />
                <VBtn
                  icon
                  rounded="md"
                  aria-label="tab"
                  size="small"
                  color="secondary"
                  variant="outlined"
                >
                  <SvgSprite
                    name="custom-edit-outline"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
                <VBtn
                  icon
                  rounded="md"
                  aria-label="tab"
                  size="small"
                  color="secondary"
                  variant="outlined"
                >
                  <SvgSprite
                    name="custom-full-screen-outline"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
                <VBtn
                  icon
                  rounded="md"
                  aria-label="tab"
                  size="small"
                  color="secondary"
                  variant="outlined"
                >
                  <SvgSprite
                    name="custom-more-outline"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
              </div>
              <VWindow v-model="tab">
                <VWindowItem value="one">
                  <VueApexCharts
                    type="bar"
                    height="250"
                    :options="chartOptions1"
                    :series="barChart1.series"
                  />
                </VWindowItem>
                <VWindowItem value="two">
                  <VueApexCharts
                    type="bar"
                    height="250"
                    :options="chartOptions1"
                    :series="barChart2.series"
                  />
                </VWindowItem>
                <VWindowItem value="three">
                  <VueApexCharts
                    type="bar"
                    height="250"
                    :options="chartOptions1"
                    :series="barChart3.series"
                  />
                </VWindowItem>
                <VWindowItem value="four">
                  <VueApexCharts
                    type="bar"
                    height="250"
                    :options="chartOptions1"
                    :series="barChart4.series"
                  />
                </VWindowItem>
              </VWindow>
            </VCol>
            <VCol
              cols="12"
              md="4"
              sm="6"
              class="pt-sm-3 pt-0"
            >
              <VList
                border
                aria-label="overview list"
                aria-busy="true"
                class="py-0 border-0"
              >
                <VListItem
                  v-for="(item, i) in overviewData"
                  :key="i"
                  class="py-5"
                >
                  <template #prepend>
                    <VAvatar
                      size="40"
                      color="secondary"
                      rounded="md"
                      variant="tonal"
                    >
                      <SvgSprite
                        :name="item.icon || ''"
                        style="width: 20px; height: 20px"
                      />
                    </VAvatar>
                  </template>
                  <div class="text-start">
                    <p class="text-body-1 mb-0 text-lightText">
                      {{ item.name }}
                    </p>
                    <h6 class="text-subtitle-1 ml-auto mb-0">
                      {{ item.price }}
                    </h6>
                  </div>
                  <template #append>
                    <div>
                      <h6 class="text-subtitle-1 mb-0 text-end">
                        {{ item.interest }}
                      </h6>
                      <p :class="`mb-0 text-${item.color}`">
                        <SvgSprite
                          :name="item.rateicon || ''"
                          style="width: 14px; height: 14px; vertical-align: -3px"
                          :style="item.rateicon === 'custom-bidirectional' ? '' : 'transform:rotate(45deg)'"
                        />
                        {{ item.rate }}
                      </p>
                    </div>
                  </template>
                </VListItem>
              </VList>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
