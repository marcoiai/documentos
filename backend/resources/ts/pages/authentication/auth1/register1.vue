<script setup lang="ts">
import Logo from '@layouts/components/LogoMain.vue'

// assets
import facebookImg from '@images/icons/facebook.svg'
import twitterImg from '@images/icons/twitter.svg'
import googleImg from '@images/icons/google.svg'
import AuthRegister from '@/views/authentication/AuthRegister.vue'

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})
</script>

<template>
  <VRow
    class="bg-containerBg position-relative h-screen"
    no-gutters
  >
    <div class="bg-blur">
      <div class="round-1" />
      <div class="round-2" />
    </div>
    <!-- - Register Part -->
    <VCol
      cols="12"
      lg="12"
      class="d-flex align-center"
    >
      <VContainer>
        <div
          class="d-flex align-center justify-center"
          style="min-height: calc(100vh - 148px)"
        >
          <VRow justify="center">
            <VCol
              cols="12"
              md="12"
            >
              <VCard
                elevation="0"
                variant="outlined"
                rounded="lg"
                class="loginBox bg-surface"
              >
                <VCardText class="pa-sm-10 pa-6">
                  <div class="text-center">
                    <Logo class="mb-3" />
                    <VList
                      aria-label="social list"
                      aria-busy="true"
                    >
                      <VListItem
                        color="secondary"
                        variant="tonal"
                        href="#"
                        rounded="md"
                        class="mb-2"
                      >
                        <VImg
                          :src="facebookImg"
                          alt="social icon"
                          class="me-2 d-inline-flex"
                          style="vertical-align: text-top"
                          width="9"
                          height="16"
                        />
                        Sign in with facebook
                      </VListItem>
                      <VListItem
                        color="secondary"
                        variant="tonal"
                        href="#"
                        rounded="md"
                        class="mb-2"
                      >
                        <VImg
                          :src="twitterImg"
                          alt="social icon"
                          class="me-2 d-inline-flex"
                          style="vertical-align: middle"
                          width="16"
                          height="13"
                        />
                        Sign in with twitter
                      </VListItem>
                      <VListItem
                        color="secondary"
                        variant="tonal"
                        href="#"
                        rounded="md"
                        class="mb-2"
                      >
                        <VImg
                          :src="googleImg"
                          alt="social icon"
                          class="me-2 d-inline-flex"
                          style="vertical-align: text-top"
                          width="16"
                          height="16"
                        />
                        Sign in with google
                      </VListItem>
                    </VList>
                    <VRow>
                      <VCol
                        cols="12"
                        class="d-flex align-center"
                      >
                        <VDivider />
                        <div class="orbtn">
                          OR
                        </div>
                        <VDivider />
                      </VCol>
                    </VRow>
                  </div>
                  <!-- - Register Form -->
                  <AuthRegister />
                  <!-- - Register Form -->
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Register Part -->
  </VRow>
</template>

<style lang="scss">
@use "@styles/pages/_authentication.scss";
</style>
