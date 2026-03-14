<script setup lang="ts">
import { ref } from 'vue'

import masterCard from '@images/icons/master-card.png'
import paypal from '@images/icons/paypal.png'

const tab = ref('11')
function changeTab(e: string) {
  tab.value = e
}

const show1 = ref(false)
</script>

<template>
  <VCard
    class="bg-surface"
    variant="outlined"
    rounded="lg"
  >
    <VCardText>
      <h5 class="text-subtitle-1 mb-0">
        Payment
      </h5>
    </VCardText>
    <VDivider />
    <VCardItem>
      <div class="d-flex justify-space-between flex-wrap ga-2">
        <VTabs
          v-model="tab"
          color="primary"
        >
          <VTab
            value="11"
            variant="outlined"
            hide-slider
            density="compact"
            class="me-2"
            rounded="md"
          >
            <img
              :src="masterCard"
              class="me-2"
              alt="payment icon"
            > Card
          </VTab>
          <VTab
            value="22"
            variant="outlined"
            hide-slider
            density="compact"
            rounded="md"
          >
            <img
              :src="paypal"
              class="me-2"
              alt="payment icon"
            > PayPal
          </VTab>
        </VTabs>
        <VBtn
          color="primary"
          variant="flat"
          rounded="md"
          @click="changeTab('33')"
        >
          <template #prepend>
            <SvgSprite
              name="custom-plus"
              style="width: 18px; height: 18px"
            />
          </template>
          Add new card
        </VBtn>
      </div>
      <VWindow
        v-model="tab"
        class="mt-sm-3 mt-6"
      >
        <VWindowItem value="11">
          <VRadioGroup hide-details>
            <VRow>
              <VCol
                cols="12"
                sm="6"
              >
                <div class="py-5 px-4 border payment-method rounded-lg">
                  <VRadio
                    value="credit"
                    color="primary"
                    class="label-op-1"
                  >
                    <template #label>
                      <div class="d-flex align-center w-100">
                        <div class="flex-1-1">
                          <div class="d-flex justify-space-between">
                            <div>
                              <p class="text-h6 text-lightText mb-1">
                                Selena Litten
                              </p>
                              <span class="d-block text-subtitle-1 text-darkText text-wrap">**** **** **** 3456</span>
                            </div>
                            <div class="ms-auto d-flex align-center">
                              <img
                                src="@images/icons/master-card.png"
                                width="22"
                                alt="img"
                              >
                              <VBtn
                                icon
                                rounded="md"
                                aria-label="trash"
                                color="secondary"
                                variant="text"
                                size="small"
                                class="ms-1"
                              >
                                <SvgSprite
                                  name="custom-trash"
                                  style="width: 20px; height: 20px"
                                />
                              </VBtn>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </VRadio>
                </div>
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <div class="py-5 px-4 border payment-method rounded-lg">
                  <VRadio
                    value="paypal"
                    color="primary"
                    class="label-op-1"
                  >
                    <template #label>
                      <div class="d-flex align-start w-100">
                        <div>
                          <p class="text-h6 text-lightText mb-1">
                            Stebin Ben
                          </p>
                          <span class="d-block text-subtitle-1 text-darkText text-wrap">**** **** **** 7654</span>
                        </div>
                        <div class="ms-auto d-flex align-center">
                          <img
                            src="@images/icons/visa-card.png"
                            width="30"
                            alt="img"
                          >
                          <VBtn
                            icon
                            rounded="md"
                            aria-label="trash"
                            color="secondary"
                            variant="text"
                            size="small"
                            class="ms-1"
                          >
                            <SvgSprite
                              name="custom-trash"
                              style="width: 20px; height: 20px"
                            />
                          </VBtn>
                        </div>
                      </div>
                    </template>
                  </VRadio>
                </div>
              </VCol>
            </VRow>
          </VRadioGroup>
          <div class="text-end mt-6">
            <VBtn
              variant="outlined"
              rounded="md"
              color="secondary"
            >
              Cancel
            </VBtn>
            <VBtn
              variant="flat"
              rounded="md"
              color="primary"
              class="ms-3"
            >
              Save
            </VBtn>
          </div>
        </VWindowItem>
        <VWindowItem value="22">
          <VLabel class="mb-2">
            Email Address
          </VLabel>
          <VTextField
            single-line
            aria-label="email"
            variant="outlined"
            density="comfortable"
            hide-details
            type="email"
            model-value="stebin.ben@paypal.co"
          />
          <div class="text-end mt-6">
            <VBtn
              variant="text"
              rounded="md"
              color="error"
            >
              Cancel
            </VBtn>
            <VBtn
              variant="flat"
              rounded="md"
              color="primary"
              class="ms-3"
            >
              Save
            </VBtn>
          </div>
        </VWindowItem>
        <VWindowItem value="33">
          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <VLabel class="mb-2">
                Name on Card
              </VLabel>
              <VTextField
                single-line
                variant="outlined"
                density="comfortable"
                color="primary"
                hide-details
                placeholder="Name on Card"
              />
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VLabel class="mb-2">
                Card Number
              </VLabel>
              <VTextField
                single-line
                variant="outlined"
                density="comfortable"
                type="number"
                color="primary"
                hide-details
                placeholder="Card Number"
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VLabel class="mb-2">
                Expiry Date
              </VLabel>
              <VTextField
                single-line
                aria-label="expiry date"
                density="comfortable"
                variant="outlined"
                color="primary"
                hide-details
                model-value="01/2024"
              >
                <template #append-inner>
                  <SvgSprite
                    name="custom-calendar"
                    class="text-lightText"
                    style="width: 20px; height: 20px"
                  />
                </template>
              </VTextField>
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VLabel class="mb-2">
                CVV Number
              </VLabel>
              <VTextField
                single-line
                variant="outlined"
                density="comfortable"
                type="number"
                color="primary"
                hide-details
                placeholder="CVV Number"
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VLabel class="mb-2">
                Security Code
              </VLabel>
              <VTextField
                aria-label="password"
                required
                variant="outlined"
                density="comfortable"
                color="primary"
                hide-details="auto"
                :type="show1 ? 'text' : 'password'"
                class="pwdInput"
              >
                <template #append-inner>
                  <VBtn
                    color="secondary"
                    aria-label="status"
                    icon
                    rounded="md"
                    variant="text"
                  >
                    <SvgSprite
                      v-if="show1 === false"
                      name="custom-eye-invisible"
                      style="width: 20px; height: 20px"
                      @click="show1 = !show1"
                    />
                    <SvgSprite
                      v-if="show1 === true"
                      name="custom-eye"
                      style="width: 20px; height: 20px"
                      @click="show1 = !show1"
                    />
                  </VBtn>
                </template>
              </VTextField>
            </VCol>
            <VCol
              cols="12"
              class="text-end"
            >
              <VBtn
                variant="outlined"
                color="secondary"
                rounded="md"
              >
                Cancel
              </VBtn>
              <VBtn
                variant="flat"
                color="primary"
                rounded="md"
                class="ms-3"
              >
                Save
              </VBtn>
            </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VCardItem>
  </VCard>
</template>

<style lang="scss">
.payment-method {
  .v-label {
    width: 100%;
  }
}
</style>
