<script setup lang="ts">
import { ref } from 'vue'

import Logo from '@layouts/components/LogoMain.vue'

const invoices = ref([
  {
    name: 'Logo Design',
    quantity: 6,
    amount: 200,
  },
  {
    name: 'Landing Page',
    quantity: 7,
    amount: 100,
  },
  {
    name: 'Admin Template',
    quantity: 5,
    amount: 150,
  },
])
</script>

<template>
  <VRow class="justify-center">
    <VCol
      cols="12"
      lg="8"
    >
      <VCard
        id="printMe"
        variant="outlined"
        class="bg-surface"
        rounded="lg"
      >
        <VCardItem class="py-4">
          <div class="d-md-flex align-center justify-space-between">
            <h4 class="text-h4 mb-0">
              Invoice #125863478945
            </h4>
            <div class="d-md-block d-none">
              <Logo />
            </div>
          </div>
        </VCardItem>
        <VDivider />
        <VCardText>
          <h5 class="text-h5 mb-1">
            Demo Company Inc.
          </h5>
          <span class="text-subtitle-1 text-medium-emphasis">1065 Mandan Road, Columbia MO,</span> <br>
          <span class="text-subtitle-1 text-medium-emphasis">Missouri. (123)-65202</span><br>
          <a
            href="/"
            class="text-primary"
          >demo@company.com</a><br>
          <span class="text-subtitle-1 text-medium-emphasis">(+91) 9999 999 999</span>
          <VRow class="mt-4">
            <VCol
              cols="12"
              md="4"
            >
              <h5 class="text-h5 mb-1">
                Customer :
              </h5>
              <h5 class="text-h5 mb-1 mt-3">
                John Doe
              </h5>
              <span class="text-subtitle-1 text-medium-emphasis">1065 Mandan Road, Columbia MO,</span>
              <br>
              <span class="text-subtitle-1 text-medium-emphasis">Missouri. (123)-65202</span><br>
              <span class="text-subtitle-1 text-medium-emphasis">(+61) 9999 567 891</span><br>
              <a
                href="/"
                class="text-primary"
              >demo@company.com</a>
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
              <h5 class="text-h5 mb-1">
                Order Details :
              </h5>
              <VRow class="mt-3">
                <VCol
                  cols="6"
                  class="text-medium-emphasis text-subtitle-1"
                >
                  Date :
                </VCol>
                <VCol
                  cols="6"
                  class="text-medium-emphasis text-subtitle-1"
                >
                  November 14
                </VCol>
              </VRow>
              <VRow class="">
                <VCol
                  cols="6"
                  class="text-medium-emphasis text-subtitle-1"
                >
                  Status :
                </VCol>
                <VCol
                  cols="6"
                  class="text-medium-emphasis text-subtitle-1"
                >
                  <VChip
                    color="warning"
                    size="small"
                    variant="tonal"
                  >
                    Pending
                  </VChip>
                </VCol>
              </VRow>
              <VRow class="">
                <VCol
                  cols="6"
                  class="text-medium-emphasis text-subtitle-1"
                >
                  Order Id :
                </VCol>
                <VCol
                  cols="6"
                  class="text-medium-emphasis text-subtitle-1"
                >
                  <a href="/">#146859</a>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VTable class="mt-5 text-no-wrap">
            <thead class="bg-containerBg">
              <tr>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Description
                </th>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Quantity
                </th>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Amount
                </th>
                <th class="text-start text-uppercase text-caption font-weight-bold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="invoice in invoices"
                :key="invoice.name"
              >
                <td class="py-3">
                  <h5 class="text-subtitle-1">
                    {{ invoice.name }}
                  </h5>
                  <p class="mt-1">
                    lorem ipsum dolor sit amat, connecter adieu
                  </p>
                </td>
                <td class="py-3">
                  {{ invoice.quantity }}
                </td>
                <td class="py-3">
                  ${{ invoice.amount }}
                </td>
                <td class="py-3">
                  ${{ invoice.amount * invoice.quantity }}
                </td>
              </tr>
            </tbody>
          </VTable>
          <VSheet
            class="bg-containerBg pa-6 mt-6"
            rounded="lg"
          >
            <VRow class="justify-end">
              <VCol
                cols="6"
                sm="3"
                class="text-end"
              >
                <h5 class="py-2 text-subtitle-1">
                  Sub Total :
                </h5>
                <h5 class="py-2 text-subtitle-1">
                  Taxes (10%) :
                </h5>
                <h5 class="py-2 text-subtitle-1 text-no-wrap">
                  Discount (5%) :
                </h5>
                <h5 class="py-2 text-subtitle-1 text-primary mt-7">
                  Total
                </h5>
              </VCol>
              <VCol
                cols="6"
                sm="3"
                class="text-end"
              >
                <h5 class="py-2 text-subtitle-1 text-disabled">
                  $2,650.00
                </h5>
                <h5 class="py-2 text-subtitle-1 text-disabled">
                  $265.00
                </h5>
                <h5 class="py-2 text-subtitle-1 text-disabled">
                  $145.75
                </h5>
                <h5 class="py-2 text-subtitle-1 text-primary mt-7">
                  $2,769.25
                </h5>
              </VCol>
            </VRow>
          </VSheet>

          <h4 class="text-h5 mb-1 mt-4">
            Terms and Condition :
          </h4>
          <p class="text-subtitle-1 text-medium-emphasis font-weight-regular mb-0">
            lorem ipsum dolor sit connecter adieu siccing eliot, sed do elusion tempore incident ut laborer et dolors magna aliquot.
          </p>
        </VCardText>
      </VCard>
      <div class="text-center mt-6">
        <VBtn
          v-print="'#printMe'"
          color="primary"
          rounded="lg"
          variant="flat"
        >
          Print
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>
