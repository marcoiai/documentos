<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import paypal from '@images/widget/img-paypal.png'
import gpay from '@images/widget/img-gpay.png'
import phonePay from '@images/widget/img-phonepay.png'

const menulist = ref(['Name', 'Date', 'Rating', 'Unread'])

const historyData = shallowRef([
  {
    title: 'PayPal',
    avatar: paypal,
    subcontent: '+2,10,000',
    price: '$210,000',
    percentage: '+30.6',
    color: 'success',
  },
  {
    title: 'Gpay',
    avatar: gpay,
    subcontent: '-2000',
    price: '$210,000',
    percentage: '- 30.6',
    color: 'error',
  },
  {
    title: 'Phone Pay',
    avatar: phonePay,
    subcontent: '-2000',
    price: '$210,000',
    percentage: '-30.6',
    color: 'error',
  },
])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          Payment History
        </h5>
        <VBtn
          color="secondary"
          aria-label="add"
          variant="text"
          icon
          rounded="md"
          size="small"
        >
          <SvgSprite
            name="custom-plus"
            style="width: 20px; height: 20px"
          />
        </VBtn>
      </div>
    </VCardText>
    <VCardItem class="pa-0">
      <VList
        border
        rounded="lg"
        class="py-0"
        aria-label="history"
        aria-busy="true"
      >
        <VListItem
          v-for="(item, i) in historyData"
          :key="i"
          class="py-2 px-6"
        >
          <template #prepend>
            <VAvatar
              size="40"
              variant="text"
              rounded="md"
            >
              <img
                :src="item.avatar"
                width="24"
                alt="Julia"
              >
            </VAvatar>
          </template>
          <span class="text-body-1 mb-0">{{ item.title }}</span>
          <h6 class="text-subtitle-1">
            {{ item.subcontent }}
            <span :class="`text-caption text-${item.color}`">{{ item.percentage }}%</span>
          </h6>
          <template #append>
            <VMenu width="150">
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
                  v-for="(list, index) in menulist"
                  :key="index"
                  density="compact"
                  rounded="md"
                  color="secondary"
                  :value="index"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    {{ list }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
        </VListItem>
      </VList>
      <VDivider />
      <div class="pa-6">
        <VBtn
          color="secondary"
          variant="outlined"
          rounded="md"
          block
        >
          View all
        </VBtn>
      </div>
    </VCardItem>
  </VCard>
</template>
