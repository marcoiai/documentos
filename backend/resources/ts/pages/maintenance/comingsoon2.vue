<script setup lang="ts">
import { ref } from 'vue'

const years = ref(0)
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const lunchDate = new Date('31 December 2024')

setInterval(() => {
  const currentDate = new Date()
  const lunchTime = lunchDate - currentDate

  seconds.value = Number.parseInt(lunchTime / 1000)
  minutes.value = Number.parseInt(seconds.value / 60)
  hours.value = Number.parseInt(minutes.value / 60)
  days.value = Number.parseInt(hours.value / 24)
  years.value = Number.parseInt(days.value / 365)
}, 1000)

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: false,
  },
})
</script>

<template>
  <VContainer
    fluid
    class="bg-containerBg"
  >
    <VContainer style="height: calc(100vh - 32px); display: flex; align-items: center">
      <VRow no-gutters>
        <VCol
          cols="12"
          md="5"
        >
          <div class="ComingsoonWrapper my-6">
            <img
              src="@images/maintenance/img-soon-2.svg"
              alt="maintenance"
            >
          </div>
        </VCol>
        <VCol
          cols="12"
          md="7"
          class="d-flex align-center justify-center"
        >
          <div class="text-center">
            <h1 class="text-h1 mb-2 mt-sm-12">
              Coming Soon
            </h1>
            <small class="text-h6 text-lightText">Something new is on it's way</small>
            <div class="max380 align-center mt-5">
              <VRow class="ma-0 comingsoon-timer overflow-hidden">
                <VCol
                  cols="3"
                  sm="3"
                >
                  <VCard
                    variant="outlined"
                    class="bg-surface"
                  >
                    <VCardText class="pa-0">
                      <VSheet
                        rounded="md"
                        class="Timeblock text-h2 py-3 px-1"
                      >
                        {{ days % 365 }}
                      </VSheet>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol
                  cols="3"
                  sm="3"
                >
                  <VCard
                    variant="outlined"
                    class="bg-surface"
                  >
                    <VCardText class="pa-0">
                      <VSheet
                        rounded="md"
                        class="Timeblock text-h2 py-3 px-1"
                      >
                        {{ hours % 24 }}
                      </VSheet>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol
                  cols="3"
                  sm="3"
                >
                  <VCard
                    variant="outlined"
                    class="bg-surface"
                  >
                    <VCardText class="pa-0">
                      <VSheet
                        rounded="md"
                        class="Timeblock text-h2 py-3 px-1"
                      >
                        {{ minutes % 60 }}
                      </VSheet>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol
                  cols="3"
                  sm="3"
                >
                  <VCard
                    variant="outlined"
                    class="bg-surface"
                  >
                    <VCardText class="pa-0">
                      <VSheet
                        rounded="md"
                        class="Timeblock text-h2 py-3 px-1"
                      >
                        {{ seconds % 60 }}
                      </VSheet>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </div>
            <VRow class="ma-0">
              <VCol
                cols="12"
                lg="12"
                class="d-sm-flex ga-2 align-center pt-8"
              >
                <VTextField
                  variant="outlined"
                  density="comfortable"
                  single-line
                  placeholder="Email Address"
                  color="primary"
                  hide-details
                />
                <VBtn
                  color="primary"
                  elevation="0"
                  size="large"
                  rounded="md"
                  class="mt-4 mt-sm-0"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-notification"
                      style="width: 18px; height: 18px"
                    />
                  </template>
                  Notify Me
                </VBtn>
              </VCol>
              <VCol cols="12">
                <VBtn
                  variant="text"
                  href="https://www.facebook.com/Phoenixcoded/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                  icon
                  color="secondary"
                >
                  <SvgSprite
                    name="custom-facebook"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
                <VBtn
                  variant="text"
                  href="https://themeforest.net/user/phoenixcoded"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="google"
                  icon
                  color="secondary"
                >
                  <SvgSprite
                    name="custom-google"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
              </VCol>
            </VRow>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </VContainer>
</template>

<style lang="scss">
.ComingsoonWrapper {
  display: flex;
  justify-content: center;
  img {
    height: 440px;
    @media (max-width: 1280px) {
      height: 350px;
    }
    @media (max-width: 600px) {
      height: 280px;
    }
  }
}
.max380 {
  max-width: 380px;
  margin: 0 auto;
}
.Timeblock {
  @media (max-width: 768px) {
    font-size: 1.25rem !important;
    line-height: 1.4;
  }
}
.comingsoon-timer {
  > div {
    padding: 10px;
    position: relative;
    @media (max-width: 768px) {
      padding: 8px;
    }
  }
}
</style>
