<script setup lang="ts">
import { ref } from 'vue'

const sub1 = ref(true)
const sub2 = ref(false)
const sub3 = ref(false)
const sub4 = ref(false)

const checkbox1 = ref(false)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Subscription Preference Center
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <h5 class="text-subtitle-1 mb-2">
              I would like to receive:
            </h5>
            <VList
              density="compact"
              aria-label="notification list"
              aria-busy="true"
            >
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  Product Announcements and Updates
                </VListItemTitle>
                <template #append>
                  <VCheckbox
                    v-model="sub1"
                    color="primary"
                    aria-label="checkbox"
                    hide-details
                    density="compact"
                  />
                </template>
              </VListItem>
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  Events and Meetups
                </VListItemTitle>
                <template #append>
                  <VCheckbox
                    v-model="sub2"
                    color="primary"
                    aria-label="checkbox"
                    hide-details
                    density="compact"
                  />
                </template>
              </VListItem>
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  User Research Surveys
                </VListItemTitle>
                <template #append>
                  <VCheckbox
                    v-model="sub3"
                    color="primary"
                    aria-label="checkbox"
                    hide-details
                    density="compact"
                  />
                </template>
              </VListItem>
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  Hatch Startup Program
                </VListItemTitle>
                <template #append>
                  <VCheckbox
                    v-model="sub4"
                    color="primary"
                    aria-label="checkbox"
                    hide-details
                    density="compact"
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Opt me out instead
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VList
              density="compact"
              aria-label="notification list"
              aria-busy="true"
            >
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  Unsubscribe me from all of the above
                </VListItemTitle>
                <template #append>
                  <VCheckbox
                    v-model="checkbox1"
                    aria-label="checkbox"
                    hide-details
                    density="compact"
                  />
                </template>
              </VListItem>
            </VList>
            <VBtn
              color="primary"
              rounded="md"
              variant="flat"
              class="mt-4"
            >
              Update My Prefereces
            </VBtn>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
