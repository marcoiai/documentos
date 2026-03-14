<script setup lang="ts">
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
    class="bg-containerBg position-relative h-screen"
    no-gutters
  >
    <div class="bg-blur">
      <div class="round-1" />
      <div class="round-2" />
    </div>
    <!-- - Reset pwd Part -->
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
            <VCol cols="12">
              <VCard
                elevation="0"
                variant="outlined"
                rounded="lg"
                class="loginBox bg-surface"
              >
                <VCardText class="pa-sm-10 pa-6">
                  <h3 class="text-h3 mb-2">
                    Reset Password
                  </h3>
                  <p class="text-h6 text-lightText">
                    Please choose your new password
                  </p>

                  <!-- - Reset pwd Form -->
                  <AuthResetPwd />
                  <!-- - Reset pwd Form -->
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Reset pwd Part -->
  </VRow>
</template>

<style lang="scss">
@use "@styles/pages/_authentication.scss";
</style>
