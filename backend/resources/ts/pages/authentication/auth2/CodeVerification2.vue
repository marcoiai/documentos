<script setup lang="ts">
import leftImg from '@images/auth/img-auth-sideimg.png'
import AuthCodeVerification from '@/views/authentication/AuthCodeVerification.vue'

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
    <!-- - Code verification Part -->
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
              lg="12"
              xl="8"
              md="10"
            >
              <VCardText class="pa-sm-9 pa-6 loginBox">
                <h3 class="text-h3 mb-2">
                  Enter Verification Code
                </h3>
                <p class="text-h6 text-lightText">
                  We send you on mail.
                </p>

                <!-- - Code verification Form -->
                <AuthCodeVerification />
                <!-- - Code verification Form -->
              </VCardText>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Code verification Part -->
  </VRow>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
