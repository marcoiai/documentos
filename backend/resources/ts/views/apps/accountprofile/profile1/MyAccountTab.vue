<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const signing = ref(['Basic form', 'Firebase - Auth', 'Facebook', 'Twitter', 'Gmail', 'JWT', 'AUTH0'])

const textFname = ref('Asoka_Tana_16')
const textEmail = ref('user@tana.com')
const textLanguage = ref('New York')
const textSigning = ref<string>('Facebook')

const secure = ref(true)
const login = ref(true)
const approve = ref(true)

const recognizes = shallowRef([
  { text: 'Cent Desktop', subtext: '4351 Deans Lane, Chelmsford', active: true },
  { text: 'Imho Tablet', subtext: '4185 Michigan Avenue', active: false, time: ' 5 days ago' },
  { text: 'Albs Mobile', subtext: '3462 Fairfax Drive, Montcalm', active: false, time: ' 1 month ago' },
])

const activeSessions = shallowRef([
  { text: 'Cent Desktop', subtext: '4351 Deans Lane, Chelmsford' },
  { text: 'Moon Tablet', subtext: '4185 Michigan Avenue' },
])
</script>

<template>
  <VRow>
    <VCol cols="12">
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
              General Settings
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Username
                </VLabel>
                <VTextField
                  v-model="textFname"
                  color="primary"
                  single-line
                  aria-label="username"
                  variant="outlined"
                  density="comfortable"
                  type="text"
                  hide-details
                  hint="Your Profile URL: https://pc.com/Ashoka_Tano_16"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Account Email
                </VLabel>
                <VTextField
                  v-model="textEmail"
                  color="primary"
                  single-line
                  variant="outlined"
                  density="comfortable"
                  aria-label="email"
                  type="email"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Language
                </VLabel>
                <VTextField
                  v-model="textLanguage"
                  color="primary"
                  density="comfortable"
                  single-line
                  variant="outlined"
                  aria-label="language"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Signing Using
                </VLabel>
                <VSelect
                  v-model="textSigning"
                  color="primary"
                  single-line
                  density="comfortable"
                  role="link"
                  :items="signing"
                  label="Signing Using"
                  variant="outlined"
                  hide-details
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        variant="flat"
        class="overflow-hidden"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          class="overflow-hidden"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Advance Settings
            </h5>
          </div>
          <VDivider />
          <VCardText class="pa-0">
            <VList
              aria-label="setting list"
              aria-busy="true"
            >
              <VListItem
                border
                class="py-3"
              >
                <h5 class="text-h6 mb-0">
                  Secure Browsing
                </h5>
                <p class="text-caption text-lightText mb-0">
                  Browsing Securely ( https ) when it's necessary
                </p>
                <template #append>
                  <VSwitch
                    v-model="secure"
                    color="primary"
                    aria-label="switch"
                    hide-details
                    inset
                  />
                </template>
              </VListItem>
              <VListItem
                border
                class="py-3"
              >
                <h5 class="text-h6 mb-0">
                  Login Notifications
                </h5>
                <p class="text-caption text-lightText mb-0">
                  Notify when login attempted from other place
                </p>
                <template #append>
                  <VSwitch
                    v-model="login"
                    color="primary"
                    aria-label="switch"
                    hide-details
                    inset
                  />
                </template>
              </VListItem>
              <VListItem
                border
                class="py-3"
              >
                <h5 class="text-h6 mb-0">
                  Login Aprrovals
                </h5>
                <p class="text-caption text-lightText mb-0">
                  Approvals is not required when login from unrecognized devices.
                </p>
                <template #append>
                  <VSwitch
                    v-model="approve"
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
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        variant="outlined"
        class="overflow-hidden"
        rounded="lg"
      >
        <div class="pa-5">
          <h5 class="text-subtitle-1 mb-0">
            Recognized Devices
          </h5>
        </div>
        <VDivider />
        <VCardText class="pa-0">
          <VList
            lines="two"
            aria-label="device list"
            aria-busy="true"
          >
            <VListItem
              v-for="(recognize, i) in recognizes"
              :key="i"
              class="device-content"
              color="primary"
              border
            >
              <VListRecognizeTitle class="text-h6 mb-0">
                {{ recognize.text }}
              </VListRecognizeTitle>
              <p class="text-caption text-lightText mb-0">
                {{ recognize.subtext }}
              </p>
              <template #append>
                <span v-if="recognize.active">
                  <VBadge
                    dot
                    color="success"
                    inline
                  />
                  <span class="d-none d-sm-inline-block">Active</span>
                </span>
                <span v-else>
                  <VBadge
                    dot
                    color="lightText"
                    inline
                  />
                  <span class="d-none d-sm-inline-block"> Active {{ recognize.time }}</span>
                </span>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard
        variant="outlined"
        class="overflow-hidden"
        rounded="lg"
      >
        <div class="pa-5">
          <h5 class="text-subtitle-1 mb-0">
            Active sessions
          </h5>
        </div>
        <VDivider />
        <VCardText class="pa-0">
          <VList
            lines="two"
            aria-label="session list"
            aria-busy="true"
          >
            <VListItem
              v-for="(activeSession, i) in activeSessions"
              :key="i"
              color="primary"
              border
            >
              <h5 class="text-h5 mb-0">
                {{ activeSession.text }}
              </h5>
              <p class="text-caption text-lightText mb-0">
                {{ activeSession.subtext }}
              </p>
              <template #append>
                <VBtn
                  variant="text"
                  color="primary"
                  rounded="md"
                  class="ms-4"
                >
                  Logout
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
      <div class="text-end mt-6">
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
        >
          Update Profile
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.device-content {
  .v-list-item__append {
    align-self: center;
  }
}
</style>
