<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AddressCard from './AddressCard.vue'
import { useEcomStore } from '@db/apps/ecommerce/index'

const store = useEcomStore()

onMounted(() => {
  store.fetchAddress()
})

const selected = ref(['shipping'])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="pa-0">
      <h4 class="text-subtitle-1 pa-4">
        Shipping information
      </h4>
      <VDivider />
    </VCardText>
    <VCardText>
      <VRow>
        <VCol
          v-for="address in store.addresses"
          :key="address.id"
          sm="6"
          cols="12"
        >
          <AddressCard
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
            show-btn
          />
        </VCol>
        <VCol lg="12">
          <VRow class="align-center mb-sm-n3 mb-n1">
            <VCol
              cols="12"
              sm="3"
              class="pb-sm-3 pb-1"
            >
              <VLabel>First Name :</VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              class="pt-sm-3 pt-0"
            >
              <VTextField
                hide-details
                density="comfortable"
                color="primary"
                placeholder="Enter your first name"
                variant="outlined"
              />
            </VCol>
          </VRow>
          <VRow class="align-center mb-sm-n3 mb-n1">
            <VCol
              cols="12"
              sm="3"
              class="pb-sm-3 pb-1"
            >
              <VLabel>Last Name :</VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              class="pt-sm-3 pt-0"
            >
              <VTextField
                hide-details
                density="comfortable"
                color="primary"
                placeholder="Enter your last name"
                variant="outlined"
              />
            </VCol>
          </VRow>
          <VRow class="align-center mb-sm-n3 mb-n1">
            <VCol
              cols="12"
              sm="3"
              class="pb-sm-3 pb-1"
            >
              <VLabel>Email Id :</VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              class="pt-sm-3 pt-0"
            >
              <VTextField
                hide-details
                density="comfortable"
                color="primary"
                type="email"
                placeholder="Enter email id"
                variant="outlined"
              />
            </VCol>
          </VRow>
          <VRow class="align-center mb-sm-n3 mb-n1">
            <VCol
              cols="12"
              sm="3"
              class="pb-sm-3 pb-1"
            >
              <VLabel>Date of Birth :</VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              class="pt-sm-3 pt-0"
            >
              <VRow class="align-center">
                <VCol
                  cols="3"
                  class="pe-0"
                >
                  <VTextField
                    hide-details
                    density="comfortable"
                    color="primary"
                    type="number"
                    placeholder="31"
                    variant="outlined"
                  />
                </VCol>
                <VCol class="pa-0 text-center">
                  /
                </VCol>
                <VCol
                  cols="3"
                  class="px-0"
                >
                  <VTextField
                    hide-details
                    density="comfortable"
                    color="primary"
                    type="number"
                    placeholder="12"
                    variant="outlined"
                  />
                </VCol>
                <VCol class="pa-0 text-center">
                  /
                </VCol>
                <VCol
                  cols="4"
                  class="ps-0"
                >
                  <VTextField
                    hide-details
                    density="comfortable"
                    color="primary"
                    type="number"
                    placeholder="2023"
                    variant="outlined"
                  />
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow class="align-center mb-sm-n3 mb-n1">
            <VCol
              cols="12"
              sm="3"
              class="pb-sm-3 pb-1"
            >
              <VLabel>Phone number :</VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              class="pt-sm-3 pt-0"
            >
              <VRow>
                <VCol
                  cols="3"
                  sm="2"
                  class="pe-0"
                >
                  <VTextField
                    hide-details
                    density="comfortable"
                    color="primary"
                    type="number"
                    placeholder="+91"
                    variant="outlined"
                  />
                </VCol>
                <VCol
                  cols="9"
                  sm="10"
                >
                  <VTextField
                    hide-details
                    density="comfortable"
                    color="primary"
                    type="number"
                    placeholder="31"
                    variant="outlined"
                  >
                    <template #append-inner>
                      <SvgSprite
                        name="custom-phone-outline-1"
                        class="text-lightText"
                        style="width: 24px; height: 24px; opacity: 0.5"
                      />
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VRow class="align-center mb-sm-n3 mb-n1">
            <VCol
              cols="12"
              sm="3"
              class="pb-sm-3 pb-1"
            >
              <VLabel>City :</VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              class="pt-sm-3 pt-0"
            >
              <VTextField
                hide-details
                density="comfortable"
                color="primary"
                placeholder="Enter city name"
                variant="outlined"
              />
            </VCol>
          </VRow>
          <VCheckbox
            v-model="selected"
            class="mt-3"
            label="Save this new address for future shipping"
            color="primary"
            value="shipping"
            hide-details
          />
          <VRow class="mt-2">
            <VCol
              cols="12"
              class="text-end"
            >
              <VBtn
                color="secondary"
                rounded="md"
                class="me-2"
                variant="outlined"
              >
                Cancel
              </VBtn>
              <VBtn
                color="primary"
                rounded="md"
                variant="flat"
              >
                Save
              </VBtn>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
