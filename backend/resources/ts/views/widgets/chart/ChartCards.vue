<script setup lang="ts">
import { computed, ref } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 50,
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

// chart 2
const chartOptions2 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 50,
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
    colors: ['rgba(var(--v-theme-warning), var(--v-medium-opacity))'],
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

// chart 3
const chartOptions3 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 50,
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
    colors: ['rgba(var(--v-theme-success), var(--v-medium-opacity))'],
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

// chart 4
const chartOptions4 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 50,
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
    colors: ['rgba(var(--v-theme-error), var(--v-medium-opacity))'],
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

// chart 2
const barChart2 = {
  series: [
    {
      name: 'Users',
      data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25],
    },
  ],
}

// chart 3
const barChart3 = {
  series: [
    {
      name: 'Users',
      data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25],
    },
  ],
}

// chart 4
const barChart4 = {
  series: [
    {
      name: 'Users',
      data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25],
    },
  ],
}
</script>

<template>
  <VRow class="mb-0">
    <!-- chart 1 -->
    <VCol
      cols="12"
      md="6"
      lg="3"
    >
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface"
        rounded="lg"
      >
        <VCardText>
          <VList
            class="pt-0"
            aria-busy="true"
            aria-label="chart content"
          >
            <VListItem class="pa-0">
              <template #prepend>
                <VAvatar
                  variant="tonal"
                  color="primary"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-wallet-outline"
                    style="width: 20px; height: 20px"
                  />
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                All Earnings
              </h6>
              <template #append>
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
                    aria-label="menu"
                    aria-busy="true"
                    class="pa-3"
                    rounded="md"
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
              </template>
            </VListItem>
          </VList>
          <VSheet
            class="pa-6 pb-3 mt-1"
            color="containerBg"
            rounded="lg"
          >
            <VRow class="widget-grid">
              <VCol cols="7">
                <VueApexCharts
                  type="bar"
                  height="50"
                  :options="chartOptions1"
                  :series="barChart1.series"
                />
              </VCol>
              <VCol cols="5">
                <h5 class="text-h5">
                  $3200
                </h5>
                <p class="text-body-1 text-primary mb-0">
                  <SvgSprite
                    name="custom-rise-outline"
                    style="width: 16px; height: 16px; transform: rotate(45deg)"
                  />
                  30.6%
                </p>
              </VCol>
            </VRow>
          </VSheet>
        </VCardText>
      </VCard>
    </VCol>

    <!-- chart 2 -->
    <VCol
      cols="12"
      md="6"
      lg="3"
    >
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface"
        rounded="lg"
      >
        <VCardText>
          <VList
            class="pt-0"
            aria-busy="true"
            aria-label="chart content"
          >
            <VListItem class="pa-0">
              <template #prepend>
                <VAvatar
                  variant="tonal"
                  color="warning"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-page-outline"
                    style="width: 20px; height: 20px"
                  />
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                Page Views
              </h6>
              <template #append>
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
                    aria-label="menu"
                    aria-busy="true"
                    class="pa-3"
                    rounded="md"
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
              </template>
            </VListItem>
          </VList>
          <VSheet
            class="pa-6 pb-3 mt-1"
            color="containerBg"
            rounded="lg"
          >
            <VRow class="widget-grid">
              <VCol cols="7">
                <VueApexCharts
                  type="bar"
                  height="50"
                  :options="chartOptions2"
                  :series="barChart2.series"
                />
              </VCol>
              <VCol cols="5">
                <h5 class="text-h5">
                  290+
                </h5>
                <p class="text-body-1 text-warning mb-0">
                  <SvgSprite
                    name="custom-fall-outline"
                    style="width: 16px; height: 16px; transform: rotate(45deg)"
                  />
                  30.6%
                </p>
              </VCol>
            </VRow>
          </VSheet>
        </VCardText>
      </VCard>
    </VCol>

    <!-- chart 3 -->
    <VCol
      cols="12"
      md="6"
      lg="3"
    >
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface"
        rounded="lg"
      >
        <VCardText>
          <VList
            class="pt-0"
            aria-busy="true"
            aria-label="chart content"
          >
            <VListItem class="pa-0">
              <template #prepend>
                <VAvatar
                  variant="tonal"
                  color="success"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-calendar-outline"
                    style="width: 20px; height: 20px"
                  />
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                Total task
              </h6>
              <template #append>
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
                    aria-label="menu"
                    aria-busy="true"
                    class="pa-3"
                    rounded="md"
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
              </template>
            </VListItem>
          </VList>
          <VSheet
            class="pa-6 pb-3 mt-1"
            color="containerBg"
            rounded="lg"
          >
            <VRow class="widget-grid">
              <VCol cols="7">
                <VueApexCharts
                  type="bar"
                  height="50"
                  :options="chartOptions3"
                  :series="barChart3.series"
                />
              </VCol>
              <VCol cols="5">
                <h5 class="text-h5">
                  1468
                </h5>
                <p class="text-body-1 text-success mb-0">
                  <SvgSprite
                    name="custom-rise-outline"
                    style="width: 16px; height: 16px; transform: rotate(45deg)"
                  />
                  30.6%
                </p>
              </VCol>
            </VRow>
          </VSheet>
        </VCardText>
      </VCard>
    </VCol>

    <!-- chart 4 -->
    <VCol
      cols="12"
      md="6"
      lg="3"
    >
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface"
        rounded="lg"
      >
        <VCardText>
          <VList
            class="pt-0"
            aria-busy="true"
            aria-label="chart content"
          >
            <VListItem class="pa-0">
              <template #prepend>
                <VAvatar
                  variant="tonal"
                  color="error"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-cloud-outline-1"
                    style="width: 20px; height: 20px"
                  />
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                Download
              </h6>
              <template #append>
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
                    aria-label="menu"
                    aria-busy="true"
                    class="pa-3"
                    rounded="md"
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
              </template>
            </VListItem>
          </VList>
          <VSheet
            class="pa-6 pb-3 mt-1"
            color="containerBg"
            rounded="lg"
          >
            <VRow class="widget-grid">
              <VCol cols="7">
                <VueApexCharts
                  type="bar"
                  height="50"
                  :options="chartOptions4"
                  :series="barChart4.series"
                />
              </VCol>
              <VCol cols="5">
                <h5 class="text-h5">
                  $300
                </h5>
                <p class="text-body-1 text-error mb-0">
                  <SvgSprite
                    name="custom-fall-outline"
                    style="width: 16px; height: 16px; transform: rotate(130deg)"
                  />
                  30.6%
                </p>
              </VCol>
            </VRow>
          </VSheet>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.widget-grid {
  > div {
    @media (max-width: 1540px) and (min-width: 1280px) {
      flex: 0 0 100%;
      max-width: 100%;
      text-align: center;
    }
  }
}
</style>
