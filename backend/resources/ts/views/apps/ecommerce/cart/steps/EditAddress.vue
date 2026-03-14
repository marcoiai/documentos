<script setup lang="ts">
import { ref } from 'vue'

const propsAddress = defineProps({
  name: String,
  destination: String,
  building: String,
  street: String,
  city: String,
  state: String,
  country: String,
  post: String,
  phone: String,
  isDefault: Boolean,
  showBtn: Boolean,
})

const dialog = ref(false)

const radioGroup = ref('1')
</script>

<template>
  <VCard
    variant="outlined"
    rounded="lg"
  >
    <VCardText>
      <div class="d-flex align-center ga-2">
        <h6 class="text-subtitle-1 mb-0">
          {{ propsAddress.name }}
        </h6>
        <small class="text-lightText text-body-1">({{ propsAddress.destination }})</small>
        <div class="ms-auto">
          <VDialog
            v-model="dialog"
            width="800"
          >
            <template #activator="{ props }">
              <VBtn
                color="secondary"
                size="small"
                rounded="md"
                variant="outlined"
                v-bind="props"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-edit-outline"
                    class="text-lightText"
                    style="width: 16px; height: 16px"
                  />
                </template>
                Change
              </VBtn>
            </template>
            <VCard>
              <VCardTitle class="py-4 d-flex justify-space-between align-center">
                <span class="text-subtitle-1">Edit Billing Address</span>
                <VBtn
                  icon
                  rounded="md"
                  color="primary"
                  aria-label="close"
                  class="ms-auto"
                  variant="text"
                  @click="dialog = false"
                >
                  <SvgSprite
                    name="custom-close-circle-outline"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </VCardTitle>
              <VDivider />
              <VCardText class="px-2">
                <VContainer>
                  <VRow>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        Name
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="name"
                        variant="outlined"
                        color="primary"
                        model-value="Andre Castillo"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        Destination
                      </VLabel>
                      <VRadioGroup
                        v-model="radioGroup"
                        inline
                        hide-details
                      >
                        <VRadio
                          color="primary"
                          value="1"
                          label="Home"
                        />
                        <VRadio
                          color="primary"
                          value="2"
                          label="Office"
                        />
                      </VRadioGroup>
                    </VCol>
                    <VCol cols="12">
                      <VLabel class="mb-2">
                        Building No./Name
                      </VLabel>
                      <VTextField
                        single-line
                        variant="outlined"
                        aria-label="building no"
                        color="primary"
                        model-value="1372 Lupeg Grv"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol cols="12">
                      <VLabel class="mb-2">
                        Street
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="street"
                        variant="outlined"
                        color="primary"
                        model-value="1042 Dihda Way"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        City
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="city"
                        variant="outlined"
                        color="primary"
                        model-value="Cijofkef"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        State
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="state"
                        variant="outlined"
                        color="primary"
                        model-value="Idaho"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        Country
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="country"
                        variant="outlined"
                        color="primary"
                        model-value="Canada"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        Area Code
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="area code"
                        variant="outlined"
                        color="primary"
                        model-value="TS0 0MC"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol cols="12">
                      <VLabel class="mb-2">
                        Contact
                      </VLabel>
                      <VTextField
                        single-line
                        aria-label="contact"
                        variant="outlined"
                        color="primary"
                        model-value="(713) 311-2815"
                        required
                        hide-details
                      />
                    </VCol>
                    <VCol cols="12">
                      <VSwitch
                        color="primary"
                        :model-value="false"
                        label="Default"
                        hide-details
                      />
                    </VCol>
                  </VRow>
                </VContainer>
              </VCardText>
              <VCardActions>
                <VSpacer />
                <VBtn
                  color="error"
                  rounded="md"
                  variant="text"
                  @click="dialog = false"
                >
                  Cancel
                </VBtn>
                <VBtn
                  color="primary"
                  rounded="md"
                  variant="flat"
                  @click="dialog = false"
                >
                  Submit
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </div>
      </div>
      <div class="mt-1 text-body1">
        <p class="text-caption text-lightText">
          {{ propsAddress.building }}, {{ propsAddress.street }}, {{ propsAddress.city }}, {{ propsAddress.state }}, {{ propsAddress.country }} - {{ propsAddress.post }}
        </p>
        <p class="text-caption text-lightText mb-0">
          {{ propsAddress.phone }}
        </p>
      </div>
    </VCardText>
  </VCard>
</template>
