<script setup lang="ts">
import leftImg from '@images/auth/img-auth-sideimg.png'
import AuthResetPwd from '@/views/authentication/AuthResetPwd.vue'

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
    <!-- - Reset pwd Part -->
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
            <VCol cols="12">
              <div class="pa-sm-10 pa-6 loginBox">
                <h3 class="text-h3 mb-2">
                  Reset Password
                </h3>
                <p class="text-h6 text-lightText">
                  Please choose your new password
                </p>

                <!-- - Reset pwd Form -->
                <AuthResetPwd />
                <!-- - Reset pwd Form -->
              </div>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Reset pwd Part -->
  </VRow>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
