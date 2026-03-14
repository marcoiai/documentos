<script setup lang="ts">
// imported components
import WelcomeBanner from '@/views/dashboards/default/WelcomeBanner.vue'
import ChartCards from '@/views/widgets/chart/ChartCards.vue'
import RepeatCustomer from '@/views/widgets/chart/RepeatCustomer.vue'
import ProjectOverview from '@/views/widgets/chart/ProjectOverview.vue'
import UserCard from '@/views/widgets/statistics/UserCard.vue'
import ProjectCard from '@/views/dashboards/default/ProjectCard.vue'
import TransactionCard from '@/views/widgets/data/TransactionCard.vue'
import TotalIncome from '@/views/widgets/chart/TotalIncome.vue'
</script>

<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- welcome banner -->
  <!-- -------------------------------------------------------------------- -->
  <VRow class="my-0">
    <VCol cols="12">
      <WelcomeBanner />
    </VCol>
  </VRow>

  <!-- -------------------------------------------------------------------- -->
  <!-- Chart widgets -->
  <!-- -------------------------------------------------------------------- -->
  <ChartCards />

  <VRow class="mb-0">
    <VCol
      cols="12"
      xl="9"
      md="8"
    >
      <VRow>
        <!-- -------------------------------------------------------------------- -->
        <!-- Repeat customer -->
        <!-- -------------------------------------------------------------------- -->
        <VCol cols="12">
          <RepeatCustomer />
        </VCol>

        <!-- -------------------------------------------------------------------- -->
        <!-- Project overview -->
        <!-- -------------------------------------------------------------------- -->
        <VCol cols="12">
          <ProjectOverview />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      xl="3"
      md="4"
    >
      <VRow>
        <!-- -------------------------------------------------------------------- -->
        <!-- Project -->
        <!-- -------------------------------------------------------------------- -->
        <VCol cols="12">
          <ProjectCard />
        </VCol>

        <!-- -------------------------------------------------------------------- -->
        <!-- User card -->
        <!-- -------------------------------------------------------------------- -->
        <VCol cols="12">
          <UserCard />
        </VCol>
      </VRow>
    </VCol>
  </VRow>

  <VRow>
    <!-- -------------------------------------------------------------------- -->
    <!-- Transactions -->
    <!-- -------------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="6"
    >
      <TransactionCard />
    </VCol>

    <!-- -------------------------------------------------------------------- -->
    <!-- Total income -->
    <!-- -------------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="6"
    >
      <TotalIncome />
    </VCol>
  </VRow>
</template>
