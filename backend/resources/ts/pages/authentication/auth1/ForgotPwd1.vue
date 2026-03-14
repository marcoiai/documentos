<script setup lang="ts">
import AuthForgotPwd from '@/views/authentication/AuthForgotPwd.vue'

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
    <!-- - Forgot pwd Part -->
    <VCol
      cols="12"
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
              <VCard
                elevation="0"
                variant="outlined"
                rounded="lg"
                class="loginBox bg-surface"
              >
                <VCardText class="pa-sm-10 pa-4">
                  <div class="d-flex justify-space-between align-center">
                    <h3 class="text-h3 text-center mb-0">
                      Forgot Password
                    </h3>
                    <RouterLink
                      to="/authentication/auth1/login1"
                      class="text-primary text-decoration-none"
                    >
                      Back to Login
                    </RouterLink>
                  </div>

                  <!-- - Forgot pwd Form -->
                  <AuthForgotPwd />
                  <!-- - Forgot pwd Form -->
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Forgot pwd Part -->
  </VRow>
</template>

<style lang="scss">
@use "@styles/pages/_authentication.scss";
</style>
