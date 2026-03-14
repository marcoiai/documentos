<script setup lang="ts">
import { ref } from 'vue'

const email1 = ref(true)
const email2 = ref(false)
const email3 = ref(true)
const email4 = ref(false)
const email5 = ref(true)
const email6 = ref(true)
const email7 = ref(false)
const email8 = ref(true)

const checkbox1 = ref(true)
const checkbox2 = ref(true)
const checkbox3 = ref(false)
const checkbox4 = ref(false)
const checkbox5 = ref(false)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
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
              Email Settings
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <h5 class="text-subtitle-1 mb-2">
              Setup Email Notification
            </h5>
            <VList
              density="compact"
              aria-label="setup list"
              aria-busy="true"
            >
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  Email Notification
                </VListItemTitle>
                <template #append>
                  <VSwitch
                    v-model="email1"
                    color="primary"
                    aria-label="switch"
                    hide-details
                    inset
                  />
                </template>
              </VListItem>
              <VListItem class="pa-0">
                <VListItemTitle class="text-h6 text-lightText">
                  Send Copy To Personal Email
                </VListItemTitle>
                <template #append>
                  <VSwitch
                    v-model="email2"
                    color="primary"
                    aria-label="switch"
                    hide-details
                    inset
                  />
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCard>
      <VCard
        variant="outlined"
        class="mt-6"
        rounded="lg"
      >
        <div class="pa-5">
          <h5 class="text-subtitle-1 mb-0">
            Updates from system notification
          </h5>
        </div>
        <VDivider />
        <VCardText>
          <h5 class="text-subtitle-1 mb-1">
            Email you with?
          </h5>
          <VList
            density="compact"
            aria-label="email list"
            aria-busy="true"
          >
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                News about PCT-themes products and feature updates
              </VListItemTitle>
              <template #append>
                <VCheckbox
                  v-model="checkbox1"
                  color="primary"
                  hide-details
                  aria-label="checkbox"
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                Tips on getting more out of PCT-themes
              </VListItemTitle>
              <template #append>
                <VCheckbox
                  v-model="checkbox2"
                  color="primary"
                  hide-details
                  aria-label="checkbox"
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                Things you missed since you last logged into PCT-themes
              </VListItemTitle>
              <template #append>
                <VCheckbox
                  v-model="checkbox3"
                  color="primary"
                  hide-details
                  aria-label="checkbox"
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                News about products and other services
              </VListItemTitle>
              <template #append>
                <VCheckbox
                  v-model="checkbox4"
                  color="primary"
                  hide-details
                  aria-label="checkbox"
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                Tips and Document business products
              </VListItemTitle>
              <template #append>
                <VCheckbox
                  v-model="checkbox5"
                  color="primary"
                  hide-details
                  aria-label="checkbox"
                />
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        variant="outlined"
        rounded="lg"
      >
        <div class="pa-5">
          <h5 class="text-subtitle-1 mb-0">
            Activity Related Emails
          </h5>
        </div>
        <VDivider />
        <VCardText>
          <h5 class="text-subtitle-1 mb-1">
            When to email?
          </h5>
          <VList
            density="compact"
            aria-label="activity list"
            aria-busy="true"
            class="pb-5"
          >
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                Have new notifications
              </VListItemTitle>
              <template #append>
                <VSwitch
                  v-model="email3"
                  color="primary"
                  aria-label="switch"
                  hide-details
                  inset
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                You're sent a direct message
              </VListItemTitle>
              <template #append>
                <VSwitch
                  v-model="email4"
                  color="primary"
                  aria-label="switch"
                  hide-details
                  inset
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                Someone adds you as a connection
              </VListItemTitle>
              <template #append>
                <VSwitch
                  v-model="email5"
                  color="primary"
                  aria-label="switch"
                  hide-details
                  inset
                />
              </template>
            </VListItem>
          </VList>
          <VDivider />

          <h5 class="text-subtitle-1 mb-1 mt-6">
            When to escalate emails?
          </h5>
          <VList
            density="compact"
            aria-label="email list"
            aria-busy="true"
          >
            <VListItem
              class="pa-0"
              disabled
            >
              <VListItemTitle class="text-h6 text-lightText">
                Upon new order
              </VListItemTitle>
              <template #append>
                <VSwitch
                  v-model="email6"
                  color="primary"
                  aria-label="switch"
                  hide-details
                  inset
                />
              </template>
            </VListItem>
            <VListItem
              class="pa-0"
              disabled
            >
              <VListItemTitle class="text-h6 text-lightText">
                New membership approval
              </VListItemTitle>
              <template #append>
                <VSwitch
                  v-model="email7"
                  color="primary"
                  aria-label="switch"
                  hide-details
                  inset
                />
              </template>
            </VListItem>
            <VListItem class="pa-0">
              <VListItemTitle class="text-h6 text-lightText">
                Member registration
              </VListItemTitle>
              <template #append>
                <VSwitch
                  v-model="email8"
                  color="primary"
                  aria-label="switch"
                  hide-details
                  inset
                />
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      class="text-end"
    >
      <VBtn
        color="secondary"
        rounded="md"
        variant="outlined"
        class="me-3"
      >
        Cancel
      </VBtn>
      <VBtn
        color="primary"
        rounded="md"
        variant="flat"
      >
        Update profile
      </VBtn>
    </VCol>
  </VRow>
</template>
