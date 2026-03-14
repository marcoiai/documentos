<script setup lang="ts">
// imported components
import IncomeOverview from '@/views/widgets/chart/IncomeOverview.vue'
import LanguageSupport from '@/views/widgets/chart/LanguageSupport.vue'
import NewOrder from '@/views/widgets/chart/NewOrder.vue'
import NewUser from '@/views/widgets/chart/NewUser.vue'
import NewUser2 from '@/views/widgets/chart/NewUser2.vue'
import OverviewCard from '@/views/widgets/chart/OverviewCard.vue'
import OverviewTab from '@/views/widgets/chart/OverviewTab.vue'
import TotalEarning from '@/views/widgets/chart/TotalEarning.vue'
import TotalEarning2 from '@/views/widgets/chart/TotalEarning2.vue'
import PaymentHistory from '@/views/widgets/data/PaymentHistory.vue'
import StorageCard from '@/views/widgets/statistics/StorageCard.vue'
</script>

<template>
  <VRow class="mt-0">
    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <NewOrder />
    </VCol>

    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <NewUser />
    </VCol>

    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <NewUser2 />
    </VCol>

    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <StorageCard />
    </VCol>

    <VCol cols="12">
      <OverviewTab />
    </VCol>

    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <VRow>
        <VCol cols="12">
          <IncomeOverview />
        </VCol>
        <VCol cols="12">
          <LanguageSupport />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      xl="6"
      md="6"
    >
      <OverviewCard />
    </VCol>

    <VCol
      cols="12"
      xl="3"
      md="12"
    >
      <VRow>
        <VCol
          cols="12"
          xl="12"
          md="4"
        >
          <PaymentHistory />
        </VCol>
        <VCol
          cols="12"
          xl="12"
          md="4"
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
  </VRow>
</template>
