<script setup lang="ts">
import { ref, computed } from 'vue'

import EditAddress from './EditAddress.vue'
import { useEcomStore } from '@db/apps/ecommerce/index'
import { useCustomizerStore } from '@layouts/stores/customizer'

const customizer = useCustomizerStore()

const imageStyle = computed(() => ({
  filter: customizer.actTheme === 'dark' ? 'invert(1)' : 'unset',
}))

const payment = ref('credit')

const store = useEcomStore()
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardItem>
      <h5 class="text-subtitle-1 mb-0">
        Payment Method
      </h5>
    </VCardItem>
    <VDivider />
    <VCardText>
      <div
        v-for="address in store.addresses"
        :key="address.id"
      >
        <div v-if="address.isDefault">
          <EditAddress
            :name="address.name"
            :destination="address.destination"
            :is-default="address.isDefault"
            :building="address.building"
            :street="address.street"
            :city="address.city"
            :state="address.state"
            :country="address.country"
            :post="address.post"
            :phone="address.phone"
            :show-btn="false"
          />
        </div>
      </div>
      <VRow class="mt-3">
        <VCol cols="12">
          <VRadioGroup
            v-model="payment"
            hide-details
          >
            <VRow>
              <VCol
                cols="12"
                lg="auto"
                sm="6"
              >
                <div class="py-5 px-4 pr-6 border payment-method rounded-md">
                  <VRadio
                    value="credit"
                    color="primary"
                    class="label-op-1"
                  >
                    <template #label>
                      <div class="d-flex align-center w-100">
                        <div class="flex-1-1">
                          <div class="d-flex justify-space-between">
                            <h6 class="text-subtitle-1 text-darkText mb-1">
                              Credit Card
                            </h6>
                            <div class="ms-auto">
                              <img
                                src="@images/e-commerce/card.png"
                                width="50"
                                alt="img"
                              >
                            </div>
                          </div>
                          <span class="d-block text-caption text-lightText text-wrap">10% off with master card</span>
                        </div>
                      </div>
                    </template>
                  </VRadio>
                </div>
              </VCol>
              <VCol
                cols="12"
                lg="auto"
                sm="6"
              >
                <div class="py-5 px-4 pr-6 border payment-method rounded-md">
                  <VRadio
                    value="paypal"
                    color="primary"
                    class="label-op-1"
                  >
                    <template #label>
                      <div class="d-flex align-start w-100">
                        <div>
                          <h6 class="text-subtitle-1 text-darkText mb-1">
                            Pay with PayPal
                          </h6>
                          <span class="d-block text-caption text-lightText text-wrap">5% off on first payment</span>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/paypal.png"
                            width="55"
                            alt="img"
                          >
                        </div>
                      </div>
                    </template>
                  </VRadio>
                </div>
              </VCol>
              <VCol
                cols="12"
                lg="auto"
                sm="6"
              >
                <div class="py-5 px-4 pr-6 border payment-method rounded-md">
                  <VRadio
                    value="cash"
                    color="primary"
                    class="label-op-1"
                  >
                    <template #label>
                      <div class="d-flex align-center w-100">
                        <div>
                          <h6 class="text-subtitle-1 text-darkText mb-1">
                            Cash on Delivery
                          </h6>
                          <span class="d-block text-caption text-lightText text-wrap">When you use this payment</span>
                        </div>
                      </div>
                    </template>
                  </VRadio>
                </div>
              </VCol>
            </VRow>
          </VRadioGroup>
        </VCol>
        <VCol cols="12">
          <VCard
            v-if="payment === 'credit'"
            elevation="0"
            rounded="lg"
            variant="text"
            :disabled="payment !== 'credit'"
          >
            <VCardItem class="py-3 px-0">
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>Card Number :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter the 16 digit card number on the card</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VTextField
                    single-line
                    density="comfortable"
                    variant="outlined"
                    hide-details
                  >
                    <template #prepend-inner>
                      <img
                        src="@images/e-commerce/master-card.png"
                        width="20"
                        alt="img"
                      >
                    </template>
                    <template #append-inner>
                      <SvgSprite
                        name="custom-circle-check-outline"
                        class="text-lightText"
                        style="width: 24px; height: 24px"
                      />
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>Expiry Date :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter the expiration on the card</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VRow class="align-center">
                    <VCol
                      cols="5"
                      class="pe-0"
                    >
                      <VTextField
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="12"
                        variant="outlined"
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="2"
                      class="pa-0 text-center"
                    >
                      /
                    </VCol>
                    <VCol
                      cols="5"
                      class="ps-0"
                    >
                      <VTextField
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="2021"
                        variant="outlined"
                        hide-details
                      />
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>CVV Number :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter the 3 or 4 digit number on the card</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VTextField
                    single-line
                    density="comfortable"
                    variant="outlined"
                    hide-details
                  >
                    <template #prepend-inner>
                      <img
                        src="@images/e-commerce/cvv.png"
                        :style="imageStyle"
                        width="20"
                        alt="img"
                      >
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>Password :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter your dynamic password</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VTextField
                    single-line
                    density="comfortable"
                    variant="outlined"
                    hide-details
                  >
                    <template #prepend-inner>
                      <img
                        src="@images/e-commerce/lock.png"
                        :style="imageStyle"
                        width="20"
                        alt="img"
                      >
                    </template>
                  </VTextField>
                </VCol>
                <VCol
                  cols="12"
                  class="text-end"
                >
                  <VBtn
                    variant="outlined"
                    rounded="md"
                    class="me-2"
                    color="secondary"
                  >
                    Cancel
                  </VBtn>
                  <VBtn
                    variant="flat"
                    rounded="md"
                    color="primary"
                  >
                    Save
                  </VBtn>
                </VCol>
                <VCol
                  cols="12"
                  class="d-flex align-center"
                >
                  <VDivider />
                  <div class="px-2">
                    OR
                  </div>
                  <VDivider />
                </VCol>
              </VRow>
            </VCardItem>
            <VCardText class="mt-4 px-0 pb-0">
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <VCard
                    elevation="0"
                    variant="outlined"
                    rounded="lg"
                    class="object-card overflow-hidden"
                  >
                    <VCardText class="top-object pa-4">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">
                            John Smith
                          </h5>
                          <h6 class="text-h5">
                            **** **** **** 6790
                          </h6>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/mastercard.png"
                            width="42"
                            alt="img"
                          >
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">760</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">10/22</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <VCard
                    elevation="0"
                    variant="outlined"
                    rounded="lg"
                    class="object-card overflow-hidden"
                  >
                    <VCardText class="top-object pa-4">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">
                            Jennifer winget
                          </h5>
                          <h6 class="text-h5">
                            **** **** **** 5674
                          </h6>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/visa.png"
                            width="24"
                            alt="img"
                          >
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">678</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">3/25</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <VCard
            v-if="payment === 'paypal'"
            elevation="0"
            variant="text"
            rounded="lg"
          >
            <VCardItem class="py-3 px-0">
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>Card Number :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter the 16 digit card number on the card</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VTextField
                    single-line
                    density="comfortable"
                    variant="outlined"
                    hide-details
                  >
                    <template #prepend-inner>
                      <img
                        src="@images/e-commerce/paypal.png"
                        width="40"
                        alt="img"
                      >
                    </template>
                    <template #append-inner>
                      <SvgSprite
                        name="custom-circle-check-outline"
                        class="text-lightText"
                        style="width: 24px; height: 24px"
                      />
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>Expiry Date :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter the expiration on the card</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VRow class="align-center">
                    <VCol
                      cols="5"
                      class="pe-0"
                    >
                      <VTextField
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="12"
                        variant="outlined"
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="2"
                      class="pa-0 text-center"
                    >
                      /
                    </VCol>
                    <VCol
                      cols="5"
                      class="ps-0"
                    >
                      <VTextField
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="2021"
                        variant="outlined"
                        hide-details
                      />
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>CVV Number :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter the 3 or 4 digit number on the card</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VTextField
                    single-line
                    density="comfortable"
                    variant="outlined"
                    hide-details
                  >
                    <template #prepend-inner>
                      <img
                        src="@images/e-commerce/cvv.png"
                        :style="imageStyle"
                        width="20"
                        alt="img"
                      >
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  md="5"
                  cols="12"
                  class="pb-md-3 pb-1"
                >
                  <VLabel>Password :</VLabel>
                  <span class="text-caption text-lightText d-block">Enter your dynamic password</span>
                </VCol>
                <VCol
                  md="7"
                  cols="12"
                  class="pt-md-3 pt-0"
                >
                  <VTextField
                    single-line
                    density="comfortable"
                    variant="outlined"
                    hide-details
                  >
                    <template #prepend-inner>
                      <img
                        src="@images/e-commerce/lock.png"
                        :style="imageStyle"
                        width="20"
                        alt="img"
                      >
                    </template>
                  </VTextField>
                </VCol>
                <VCol
                  cols="12"
                  class="text-end"
                >
                  <VBtn
                    variant="outlined"
                    rounded="md"
                    class="me-2"
                    color="secondary"
                  >
                    Cancel
                  </VBtn>
                  <VBtn
                    variant="flat"
                    rounded="md"
                    color="primary"
                  >
                    Save
                  </VBtn>
                </VCol>
                <VCol
                  cols="12"
                  class="d-flex align-center"
                >
                  <VDivider />
                  <div class="px-2">
                    OR
                  </div>
                  <VDivider />
                </VCol>
              </VRow>
            </VCardItem>
            <VCardText class="mt-4 px-0 pb-0">
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <VCard
                    elevation="0"
                    variant="outlined"
                    class="object-card overflow-hidden"
                  >
                    <VCardText class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">
                            John Smith
                          </h5>
                          <h6 class="text-h5">
                            **** **** **** 6790
                          </h6>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/mastercard.png"
                            width="42"
                            alt="img"
                          >
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">760</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">10/22</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <VCard
                    elevation="0"
                    variant="outlined"
                    class="object-card overflow-hidden"
                  >
                    <VCardText class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">
                            Jennifer winget
                          </h5>
                          <h6 class="text-h5">
                            **** **** **** 5674
                          </h6>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/visa.png"
                            width="24"
                            alt="img"
                          >
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">678</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">3/25</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <VCard
            v-if="payment === 'cash'"
            elevation="0"
            variant="text"
            disabled
          >
            <VCardItem class="py-3 px-0">
              <VRow class="mb-md-n3 mb-n1">
                <VCol
                  cols="12"
                  class="d-flex align-center"
                >
                  <VDivider />
                  <div class="px-2">
                    OR
                  </div>
                  <VDivider />
                </VCol>
              </VRow>
            </VCardItem>
            <VCardText class="mt-4 px-0 pb-0">
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <VCard
                    elevation="0"
                    variant="outlined"
                    class="object-card overflow-hidden"
                  >
                    <VCardText class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">
                            John Smith
                          </h5>
                          <h6 class="text-h5">
                            **** **** **** 6790
                          </h6>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/mastercard.png"
                            width="42"
                            alt="img"
                          >
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">760</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">10/22</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  lg="5"
                >
                  <VCard
                    elevation="0"
                    variant="outlined"
                    class="object-card overflow-hidden"
                  >
                    <VCardText class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">
                            Jennifer winget
                          </h5>
                          <h6 class="text-h5">
                            **** **** **** 5674
                          </h6>
                        </div>
                        <div class="ms-auto">
                          <img
                            src="@images/e-commerce/visa.png"
                            width="24"
                            alt="img"
                          >
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">678</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">3/25</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.object-card {
  position: relative;
  background-color: rgb(var(--v-theme-containerBg));
}
html .label-op-1 label {
  opacity: 1 !important;
}
</style>
