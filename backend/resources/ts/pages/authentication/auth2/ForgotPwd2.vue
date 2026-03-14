<script setup lang="ts">
import leftImg from '@images/auth/img-auth-sideimg.png'
import AuthForgotPwd from '@/views/authentication/AuthForgotPwd.vue'

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
    <!-- - Forgot pwd Part -->
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
            >
              <div class="pa-sm-10 pa-4 loginBox">
                <div class="d-flex justify-space-between align-center">
                  <h3 class="text-h3 text-center mb-0">
                    Forgot Password
                  </h3>
                  <RouterLink
                    to="/authentication/auth2/login2"
                    class="text-primary text-decoration-none"
                  >
                    Back to Login
                  </RouterLink>
                </div>

                <!-- - Forgot pwd Form -->
                <AuthForgotPwd />
                <!-- - Forgot pwd Form -->
              </div>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Forgot pwd Part -->
  </VRow>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
