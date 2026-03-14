<script setup lang="ts">
import { ref } from 'vue'

// import components
import ChartCards from '@/views/widgets/chart/ChartCards.vue'
import IncomeOverview from '@/views/widgets/chart/IncomeOverview.vue'
import IncomeCompare from '@/views/widgets/chart/IncomeCompare.vue'
import SalesReport from '@/views/widgets/chart/SalesReport.vue'
import AcquisitionChannels from '@/views/widgets/chart/AcquisitionChannels.vue'
import RepeatCustomer from '@/views/widgets/chart/RepeatCustomer.vue'
import ProjectOverview from '@/views/widgets/chart/ProjectOverview.vue'
import TotalEarning from '@/views/widgets/chart/TotalEarning.vue'
import TotalEarning2 from '@/views/widgets/chart/TotalEarning2.vue'
import NewOrder from '@/views/widgets/chart/NewOrder.vue'
import NewUser from '@/views/widgets/chart/NewUser.vue'
import NewUser2 from '@/views/widgets/chart/NewUser2.vue'
import OverviewTab from '@/views/widgets/chart/OverviewTab.vue'
import OverviewCard from '@/views/widgets/chart/OverviewCard.vue'
import TotalIncome from '@/views/widgets/chart/TotalIncome.vue'
import LanguageSupport from '@/views/widgets/chart/LanguageSupport.vue'
import MonthlyReport from '@/views/widgets/chart/MonthlyReport.vue'

const page = ref({ title: 'Charts' })

const breadcrumbs = ref([
  {
    title: 'Widget',
    disabled: false,
    href: '#',
  },
  {
    title: 'Charts',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />

  <ChartCards />

  <VRow class="mb-0">
    <VCol
      cols="12"
      xl="9"
      md="8"
    >
      <VRow>
        <VCol cols="12">
          <RepeatCustomer />
        </VCol>
        <VCol cols="12">
          <ProjectOverview />
        </VCol>
        <VCol
          cols="12"
          md="6"
          sm="6"
        >
          <IncomeOverview />
        </VCol>
        <VCol
          cols="12"
          md="6"
          sm="6"
        >
          <VRow>
            <VCol cols="12">
              <TotalEarning />
            </VCol>
            <VCol cols="12">
              <TotalEarning2 />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
    <VCol
      cols="12"
      xl="3"
      md="4"
    >
      <VRow>
        <VCol cols="12">
          <NewOrder />
        </VCol>
        <VCol
          cols="12"
          md="12"
          sm="6"
        >
          <NewUser />
        </VCol>
        <VCol
          cols="12"
          md="12"
          sm="6"
        >
          <NewUser2 />
        </VCol>
      </VRow>
    </VCol>
  </VRow>

  <VRow class="mb-0">
    <VCol cols="12">
      <OverviewTab />
    </VCol>
  </VRow>

  <VRow class="mb-0">
    <VCol
      cols="12"
      md="6"
    >
      <OverviewCard />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <TotalIncome />
    </VCol>
  </VRow>

  <VRow class="mb-0">
    <VCol
      cols="12"
      md="4"
    >
      <LanguageSupport />
    </VCol>
    <VCol
      cols="12"
      md="8"
    >
      <MonthlyReport />
    </VCol>
  </VRow>

  <VRow class="mb-0">
    <VCol
      cols="12"
      md="8"
    >
      <SalesReport />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <AcquisitionChannels />
    </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <IncomeCompare />
    </VCol>
  </VRow>
</template>
