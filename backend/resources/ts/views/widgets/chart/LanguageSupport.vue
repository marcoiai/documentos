<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const currentTheme = ref(theme.current.value.colors)

watch(() => theme.current.value.colors.primary, newValue => {
  currentTheme.value.primary = newValue
})

const menulist = ref(['Name', 'Date', 'Rating', 'Unread'])

const overviewList = ref(['React', 'Angular', 'Bootstrap', 'MUI'])

const chartOptions = computed(() => {
  const primaryColor = currentTheme.value.primary

  return {
    chart: {
      type: 'area',
      height: 130,
      fontFamily: 'inherit',
      foreColor: '#a1aab2',
      sparkline: { enabled: true },
      toolbar: {
        show: false,
      },
    },
    colors: [primaryColor],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    stroke: {
      curve: 'smooth',
      width: 1.5,
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: -10,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: {
          formatter: () => '',
        },
      },
    },
  }
})

const areaChart = {
  series: [
    {
      name: 'Income',
      data: [100, 140, 100, 250, 115, 125, 90, 100, 140, 100, 230, 115, 215, 90, 190, 100, 120, 180],
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
          Languages support
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
    <VCardItem class="pt-0">
      <div class="d-flex align-center mb-2">
        <VAvatar
          color="secondary"
          size="32"
          rounded="md"
          variant="tonal"
        >
          <SvgSprite
            name="custom-fall-outline"
            style="width: 18px; height: 18px"
          />
        </VAvatar>
        <h6 class="text-subtitle-1 mb-0 ms-3">
          Update version
          <VChip
            color="success"
            variant="flat"
            class="ms-3"
            rounded="md"
            size="small"
          >
            v1.1.0
          </VChip>
        </h6>
      </div>
      <VueApexCharts
        type="area"
        height="130"
        :options="chartOptions"
        :series="areaChart.series"
      />
      <VRow class="mt-2">
        <VCol
          v-for="(item, index) in overviewList"
          :key="index"
          cols="6"
          md="6"
          sm="3"
        >
          <VBtn
            color="secondary"
            variant="outlined"
            rounded="md"
            block
          >
            {{ item }}
          </VBtn>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>
