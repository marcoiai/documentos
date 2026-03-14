<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const tab = ref(null)

const transactionData = shallowRef([
  {
    title: 'Apple Inc.',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'AI',
    icon: 'custom-fall-down-outline',
    subcontent: '#ABLE-PRO-T00232',
    price: '$210,000',
    percentage: '10.6',
    color: 'error',
  },
  {
    title: 'Spotify Music',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'SM',
    icon: 'custom-rise-outline',
    subcontent: '#ABLE-PRO-T00233',
    price: '-10,000',
    percentage: '30.6',
    color: 'success',
  },
  {
    title: 'Medium',
    avatarVariant: 'tonal',
    avatarColor: 'primary',
    avatarName: 'MD',
    icon: 'custom-bidirectional',
    subcontent: '06:30 pm',
    price: '-26',
    percentage: '5',
    color: 'warning',
  },
  {
    title: 'Uber',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'U',
    icon: 'custom-rise-outline',
    subcontent: '08:40 pm',
    price: '+2,10,000',
    percentage: '10.6',
    color: 'success',
  },
  {
    title: 'Ola Cabs',
    avatarVariant: 'tonal',
    avatarColor: 'warning',
    avatarName: 'OC',
    icon: 'custom-rise-outline',
    subcontent: '07:40 pm',
    price: '+2,10,000',
    percentage: '10.6',
    color: 'success',
  },
])

const transactionData1 = shallowRef([
  {
    title: 'Uber',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'U',
    icon: 'custom-rise-outline',
    subcontent: '08:40 pm',
    price: '+2,10,000',
    percentage: '10.6',
    color: 'success',
  },
  {
    title: 'Ola Cabs',
    avatarVariant: 'tonal',
    avatarColor: 'warning',
    avatarName: 'OC',
    icon: 'custom-rise-outline',
    subcontent: '07:40 pm',
    price: '+2,10,000',
    percentage: '10.6',
    color: 'success',
  },
  {
    title: 'Apple Inc.',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'AI',
    icon: 'custom-fall-down-outline',
    subcontent: '#ABLE-PRO-T00232',
    price: '$210,000',
    percentage: '10.6',
    color: 'error',
  },
  {
    title: 'Spotify Music',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'SM',
    icon: 'custom-rise-outline',
    subcontent: '#ABLE-PRO-T00233',
    price: '-10,000',
    percentage: '30.6',
    color: 'success',
  },
  {
    title: 'Medium',
    avatarVariant: 'tonal',
    avatarColor: 'primary',
    avatarName: 'MD',
    icon: 'custom-bidirectional',
    subcontent: '06:30 pm',
    price: '-26',
    percentage: '5',
    color: 'warning',
  },
])

const transactionData2 = shallowRef([
  {
    title: 'Spotify Music',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'SM',
    icon: 'custom-rise-outline',
    subcontent: '#ABLE-PRO-T00233',
    price: '-10,000',
    percentage: '30.6',
    color: 'success',
  },
  {
    title: 'Medium',
    avatarVariant: 'tonal',
    avatarColor: 'primary',
    avatarName: 'MD',
    icon: 'custom-bidirectional',
    subcontent: '06:30 pm',
    price: '-26',
    percentage: '5',
    color: 'warning',
  },
  {
    title: 'Uber',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'U',
    icon: 'custom-rise-outline',
    subcontent: '08:40 pm',
    price: '+2,10,000',
    percentage: '10.6',
    color: 'success',
  },
  {
    title: 'Apple Inc.',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'AI',
    icon: 'custom-fall-down-outline',
    subcontent: '#ABLE-PRO-T00232',
    price: '$210,000',
    percentage: '10.6',
    color: 'error',
  },
  {
    title: 'Ola Cabs',
    avatarVariant: 'tonal',
    avatarColor: 'warning',
    avatarName: 'OC',
    icon: 'custom-rise-outline',
    subcontent: '07:40 pm',
    price: '+2,10,000',
    percentage: '10.6',
    color: 'success',
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
          Transactions
        </h5>
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
            aria-busy="true"
            aria-label="menu"
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
    <VTabs
      v-model="tab"
      color="primary"
      class="px-6"
    >
      <VTab
        value="one"
        class="font-weight-medium"
      >
        All transaction
      </VTab>
      <VTab
        value="two"
        class="font-weight-medium"
      >
        Success
      </VTab>
      <VTab
        value="three"
        class="font-weight-medium"
      >
        Pending
      </VTab>
    </VTabs>
    <VDivider />
    <VCardItem class="pa-0">
      <VWindow v-model="tab">
        <VWindowItem value="one">
          <VList
            border
            rounded="lg"
            class="py-0"
            aria-busy="true"
            aria-label="transaction data"
          >
            <VListItem
              v-for="(item, i) in transactionData"
              :key="i"
              class="py-4 px-6"
            >
              <template #prepend>
                <VAvatar
                  v-if="item.avatarVariant === 'tonal'"
                  size="40"
                  :color="item.avatarColor"
                  variant="tonal"
                  rounded="md"
                >
                  <span class="text-h5">
                    {{ item.avatarName }}
                  </span>
                </VAvatar>
                <VAvatar
                  v-else
                  size="40"
                  :color="item.avatarColor"
                  variant="outlined"
                  rounded="md"
                >
                  <span class="text-darkText text-h5">
                    {{ item.avatarName }}
                  </span>
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                {{ item.title }}
              </h6>
              <span class="text-caption text-lightText">{{ item.subcontent }}</span>
              <template #append>
                <div class="text-end">
                  <h6 class="text-subtitle-1 mb-0">
                    {{ item.price }}
                  </h6>
                  <p :class="`text-body-1 mb-0 text-${item.color}`">
                    <SvgSprite
                      :name="item.icon || ''"
                      style="width: 14px; height: 14px; vertical-align: -2px"
                      :style="item.icon === 'custom-bidirectional' ? '' : 'transform:rotate(45deg)'"
                    />
                    {{ item.percentage }}%
                  </p>
                </div>
              </template>
            </VListItem>
          </VList>
        </VWindowItem>
        <VWindowItem value="two">
          <VList
            border
            rounded="lg"
            class="py-0"
          >
            <VListItem
              v-for="(item, i) in transactionData1"
              :key="i"
              class="py-4 px-6"
            >
              <template #prepend>
                <VAvatar
                  v-if="item.avatarVariant === 'tonal'"
                  size="40"
                  :color="item.avatarColor"
                  variant="tonal"
                  rounded="md"
                >
                  <span class="text-h5">
                    {{ item.avatarName }}
                  </span>
                </VAvatar>
                <VAvatar
                  v-else
                  size="40"
                  :color="item.avatarColor"
                  variant="outlined"
                  rounded="md"
                >
                  <span class="text-darkText text-h5">
                    {{ item.avatarName }}
                  </span>
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                {{ item.title }}
              </h6>
              <span class="text-caption text-lightText">{{ item.subcontent }}</span>
              <template #append>
                <div class="text-end">
                  <h6 class="text-subtitle-1 mb-0">
                    {{ item.price }}
                  </h6>
                  <p :class="`text-body-1 mb-0 text-${item.color}`">
                    <SvgSprite
                      :name="item.icon || ''"
                      style="width: 14px; height: 14px; vertical-align: -2px"
                      :style="item.icon === 'custom-bidirectional' ? '' : 'transform:rotate(45deg)'"
                    />
                    {{ item.percentage }}%
                  </p>
                </div>
              </template>
            </VListItem>
          </VList>
        </VWindowItem>
        <VWindowItem value="three">
          <VList
            border
            rounded="lg"
            class="py-0"
          >
            <VListItem
              v-for="(item, i) in transactionData2"
              :key="i"
              class="py-4 px-6"
            >
              <template #prepend>
                <VAvatar
                  v-if="item.avatarVariant === 'tonal'"
                  size="40"
                  :color="item.avatarColor"
                  variant="tonal"
                  rounded="md"
                >
                  <span class="text-h5">
                    {{ item.avatarName }}
                  </span>
                </VAvatar>
                <VAvatar
                  v-else
                  size="40"
                  :color="item.avatarColor"
                  variant="outlined"
                  rounded="md"
                >
                  <span class="text-darkText text-h5">
                    {{ item.avatarName }}
                  </span>
                </VAvatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">
                {{ item.title }}
              </h6>
              <span class="text-caption text-lightText">{{ item.subcontent }}</span>
              <template #append>
                <div class="text-end">
                  <h6 class="text-subtitle-1 mb-0">
                    {{ item.price }}
                  </h6>
                  <p :class="`text-body-1 mb-0 text-${item.color}`">
                    <SvgSprite
                      :name="item.icon || ''"
                      style="width: 14px; height: 14px; vertical-align: -2px"
                      :style="item.icon === 'custom-bidirectional' ? '' : 'transform:rotate(45deg)'"
                    />
                    {{ item.percentage }}%
                  </p>
                </div>
              </template>
            </VListItem>
          </VList>
        </VWindowItem>
      </VWindow>
      <VDivider />
      <div class="pa-6">
        <VRow>
          <VCol
            cols="12"
            sm="6"
            class="pb-sm-3 pb-0"
          >
            <VBtn
              color="secondary"
              variant="outlined"
              rounded="md"
              block
            >
              Transaction History
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VBtn
              color="primary"
              variant="flat"
              rounded="md"
              block
            >
              Create new Transaction
            </VBtn>
          </VCol>
        </VRow>
      </div>
    </VCardItem>
  </VCard>
</template>
