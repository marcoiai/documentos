<script setup lang="ts">
import Logo from '@layouts/components/LogoMain.vue'

// assets
import facebookImg from '@images/icons/facebook.svg'
import twitterImg from '@images/icons/twitter.svg'
import googleImg from '@images/icons/google.svg'

import leftImg from '@images/auth/img-auth-sideimg.png'
import AuthRegister from '@/views/authentication/AuthRegister.vue'

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: false,
  },
})
</script>

<template>
  <VRow
    class="bg-surface position-relative"
    no-gutters
  >
    <VCol
      cols="12"
      lg="7"
      md="6"
      class="d-md-block d-none"
    >
      <VImg
        :src="leftImg"
        alt="banner"
        height="100%"
        cover
      />
    </VCol>
    <!-- - Register Part -->
    <VCol
      cols="12"
      lg="5"
      md="6"
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
              <div class="pa-sm-10 pa-6 loginBox">
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
              </div>
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
