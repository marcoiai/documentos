<script setup lang="ts">
import { ref } from 'vue'

import visaImg from '@images/pages/visa.png'
import discoverImg from '@images/pages/discover.png'
import masterImg from '@images/pages/mastercard.png'

const bills = ref([
  {
    title: 'Bill Due',
    color: 'error',
    subtitle: '$150.00',
    moveto: 'Pay Now',
  },
  {
    title: 'Total Credits',
    color: 'warning',
    subtitle: '1570 GB',
    moveto: 'Full Report',
  },
  {
    title: 'Plan',
    color: 'success',
    subtitle: 'Basic',
    moveto: 'Upgrade ?',
  },
])

const methods = ref([
  {
    img: visaImg,
    name: 'Visa card',
    excode: '5269 07XX XXXX 8110',
    default: true,
    divider: true,
  },
  {
    img: discoverImg,
    name: 'Discover',
    excode: '6109 07XX XXXX 8020',
    default: false,
    divider: true,
  },
  {
    img: masterImg,
    name: 'Mastercard',
    excode: '7278 07XX XXXX 4290',
    default: false,
    divider: false,
  },
])

const billhistory = ref([
  {
    orderno: '12877227695',
    date: '26 Feb 2021 9:16 am',
    price: '56.32',
    wait: true,
  },
  {
    orderno: '12901477937',
    date: '30 Jan 2021 2:54 pm',
    price: '75.56',
    wait: false,
  },
  {
    orderno: '12767886919',
    date: '22 Jan 2021 12:01 pm',
    price: '34.23',
    wait: false,
  },
])
</script>

<template>
  <VRow>
    <VCol
      v-for="(bill, i) in bills"
      :key="i"
      cols="12"
      md="4"
      sm="6"
    >
      <div :class="`pa-5 rounded-lg v-alert--border v-alert--border-start  position-relative bg-light${bill.color}`">
        <div :class="`v-alert__border bg-${bill.color}`" />
        <span>{{ bill.title }}</span>
        <h2 class="text-h2 mb-3 font-weight-medium">
          {{ bill.subtitle }}
        </h2>
        <span :class="`text-subtitle-1 cursor-pointer font-weight-medium text-decoration-none d-flex align-center text-${bill.color}`">
          {{ bill.moveto }}
          <SvgSprite
            name="custom-arrow-right"
            class="ms-1"
            style="width: 16px; height: 16px"
          />
        </span>
      </div>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard
        variant="flat"
        rounded="lg"
        class="mt-3"
      >
        <VCard
          variant="outlined"
          class="overflow-hidden"
          rounded="lg"
        >
          <VList
            aria-label="title"
            aria-busy="true"
          >
            <VListItem class="d-sm-flex d-block">
              <template #title>
                <h5 class="text-subtitle-1 mt-1 mb-3 mb-sm-0">
                  Payment Methods
                </h5>
              </template>
              <template #append>
                <VBtn
                  size="small"
                  color="primary"
                  rounded="md"
                  variant="flat"
                  class="ms-2"
                >
                  Add New Method
                </VBtn>
              </template>
            </VListItem>
          </VList>
          <VDivider />
          <VCardText class="pa-0">
            <VList
              lines="two"
              density="compact"
              aria-label="method list"
              aria-busy="true"
            >
              <template
                v-for="(method, i) in methods"
                :key="i"
              >
                <VListItem>
                  <template #prepend>
                    <img
                      :src="method.img"
                      :alt="method.img"
                      width="60"
                      class="me-3"
                    >
                  </template>
                  <template #title>
                    <div class="d-none d-sm-block">
                      <h5 class="text-subtitle-1 mt-1 mb-0">
                        {{ method.name }}
                      </h5>
                      <span class="text-subtitle-2 text-disabled font-weight-medium">Ending in {{ method.excode }}</span>
                    </div>
                  </template>
                  <template #append>
                    <div class="d-flex align-center">
                      <VChip
                        v-if="method.default"
                        color="primary"
                        size="small"
                        variant="tonal"
                      >
                        Default
                      </VChip>
                      <VChip
                        v-else
                        color="secondary"
                        size="small"
                        variant="tonal"
                      >
                        make default
                      </VChip>
                      <VDivider
                        vertical
                        class="mx-4 my-1"
                      />
                      <VBtn
                        size="small"
                        rounded="md"
                        variant="flat"
                        color="primary"
                      >
                        Edit
                      </VBtn>
                    </div>
                  </template>
                </VListItem>
                <VDivider v-if="method.divider" />
              </template>
            </VList>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard
        variant="flat"
        rounded="lg"
        class="overflow-hidden"
      >
        <VCard
          variant="outlined"
          rounded="lg"
          class="overflow-hidden"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Billing History
            </h5>
          </div>

          <VDivider />

          <VTable
            class="text-no-wrap bordered-table invoice-table"
            hover
          >
            <thead class="bg-containerBg">
              <tr>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Order No.
                </th>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Date
                </th>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Price
                </th>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="history in billhistory"
                :key="history.orderno"
              >
                <td>{{ history.orderno }}</td>
                <td>{{ history.date }}</td>
                <td>${{ history.price }}</td>
                <td>
                  <VChip
                    v-if="history.wait"
                    color="warning"
                    size="small"
                  >
                    Awaiting
                  </VChip>
                  <VChip
                    v-else
                    color="success"
                    size="small"
                  >
                    Paid
                  </VChip>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
