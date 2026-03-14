<script setup lang="ts">
import { ref, shallowRef } from 'vue'

// import
import WidgetFive from '@/views/widgets/statistics/WidgetFive.vue'
import FundCard from '@/views/widgets/statistics/FundCard.vue'
import UserCard from '@/views/widgets/statistics/UserCard.vue'
import FeatureCard from '@/views/widgets/statistics/FeatureCard.vue'
import StorageCard from '@/views/widgets/statistics/StorageCard.vue'

const page = ref({ title: 'Statistics' })

const breadcrumbs = ref([
  {
    title: 'Widget',
    disabled: false,
    href: '#',
  },
  {
    title: 'Statistics',
    disabled: true,
    href: '#',
  },
])

const cards = shallowRef([
  { earn: '$30200', text: 'All Earnings', icon: 'custom-graph-outline', color: 'secondary' },
  { earn: '145', text: 'Task', icon: 'custom-calendar-outline', color: 'error' },
  { earn: '290+', text: 'Page Views', icon: 'custom-document-text-outline', color: 'success' },
  { earn: '500', text: 'Downloads', icon: 'custom-document-2', color: 'primary' },
])

const twocards = shallowRef([
  { title: 'Revenue', earn: '$4,500', text: '$50,032 Last Month', icon: 'custom-dollar-circle-fill', color: 'primary' },
  { title: 'Orders Received', earn: '486', text: '20% Increase', icon: 'custom-calendar-plus', color: 'warning' },
  { title: 'Total Sales', earn: '1641', text: '$1,055 Revenue Generated', icon: 'e-commerce-cart', color: 'success' },
])

const threecards = shallowRef([
  { earn: '1165 +', text: 'Facebook Users', icon: 'custom-facebook-fill', color: 'primary' },
  { earn: '780 +', text: 'Dribbble Posts', icon: 'custom-dribble-fill', color: 'info' },
  { earn: '998 +', text: 'iOS Users', icon: 'custom-apple-fill', color: 'darksecondary' },
  { earn: '650 +', text: 'YouTube Videos', icon: 'custom-youtube-fill', color: 'error' },
])

const fourcards = shallowRef([
  { earn: '1,563', text: 'Impressions', icon: 'custom-eye', color: 'primary', color2: 'lightprimary', duedate: 'May 23 - June 01 (2022)' },
  {
    earn: '30,564',
    text: 'Goal',
    icon: 'custom-goal-outline',
    color: 'success',
    color2: 'lightsuccess',
    duedate: 'May 28 - June 01 (2022)',
  },
  {
    earn: '42.6%',
    text: 'Impact',
    icon: 'custom-clock-outline',
    color: 'warning',
    color2: 'lightwarning',
    duedate: 'May 30 - June 01 (2022)',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 1 -->
  <!-- --------------------------------------------------------------------- -->
  <VRow class="mb-0">
    <VCol
      v-for="(card1, i) in cards"
      :key="i"
      cols="12"
      sm="6"
      md="3"
      :value="card1"
    >
      <VCard
        elevation="0"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <VCardText>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h3 class="text-h3 mb-1">
                  {{ card1.earn }}
                </h3>
                <span class="text-lightText">{{ card1.text }}</span>
              </div>
              <span class="d-flex align-center">
                <SvgSprite
                  :name="card1.icon || ''"
                  style="width: 44px; height: 44px"
                  :class="`text-${card1.color}`"
                />
              </span>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 2 -->
  <!-- --------------------------------------------------------------------- -->
  <VRow class="mb-0">
    <VCol
      v-for="(card3, i) in threecards"
      :key="i"
      cols="12"
      sm="6"
      md="3"
      :value="card3"
    >
      <VCard
        elevation="0"
        :class="`hover-icon-card bg-${card3.color}`"
      >
        <VCard
          elevation="0"
          :class="`bg-${card3.color}`"
        >
          <VCardText>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h3 class="text-h3 text-white mb-0">
                  {{ card3.earn }}
                </h3>
                <span class="text-h6 text-white">{{ card3.text }}</span>
              </div>
              <span class="d-flex align-center">
                <SvgSprite
                  :name="card3.icon || ''"
                  style="width: 52px; height: 52px"
                  class="text-white opacity-50 hover-icon"
                />
              </span>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 3 -->
  <!-- --------------------------------------------------------------------- -->
  <WidgetFive />

  <VRow class="mb-0">
    <VCol
      cols="12"
      md="4"
    >
      <FundCard />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <VCol cols="12">
          <UserCard />
        </VCol>
        <VCol cols="12">
          <FeatureCard />
        </VCol>
      </VRow>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <StorageCard />
    </VCol>
  </VRow>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 4 -->
  <!-- --------------------------------------------------------------------- -->
  <VRow class="mb-0">
    <VCol
      v-for="(card2, i) in twocards"
      :key="i"
      cols="12"
      md="4"
      :value="card2"
    >
      <VCard
        elevation="0"
        rounded="lg"
        :class="`bg-${card2.color} widget-gradient overflow-hidden`"
      >
        <VCard
          variant="outlined"
          class="overflow-hidden"
          rounded="lg"
        >
          <VCardText class="px-md-9 py-md-8 px-5 py-5">
            <div class="d-flex justify-space-between">
              <span class="d-flex">
                <SvgSprite
                  :name="card2.icon || ''"
                  style="width: 52px; height: 52px"
                  class="text-white opacity-50"
                />
              </span>
              <div class="text-end">
                <h5 class="text-h5 font-weight-medium mb-2">
                  {{ card2.title }}
                </h5>
                <h3 class="text-h3 mb-4">
                  {{ card2.earn }}
                </h3>
                <span class="opacity-80 text-h5 font-weight-regular text-white">{{ card2.text }}</span>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 5 -->
  <!-- --------------------------------------------------------------------- -->
  <VRow>
    <VCol
      v-for="(card4, i) in fourcards"
      :key="i"
      cols="12"
      md="4"
      :value="card4"
    >
      <VCard
        elevation="0"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <VCardText>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h5 class="text-h5">
                  {{ card4.text }}
                </h5>
                <h4 class="text-h4 my-2">
                  {{ card4.earn }}
                </h4>
                <h6 class="text-subtitle-2 mb-0">
                  {{ card4.duedate }}
                </h6>
              </div>
              <span class="d-flex align-center">
                <VAvatar
                  variant="tonal"
                  size="52"
                  :color="card4.color"
                  rounded="md"
                >
                  <SvgSprite
                    :name="card4.icon || ''"
                    style="width: 28px; height: 28px"
                  />
                </VAvatar>
              </span>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
