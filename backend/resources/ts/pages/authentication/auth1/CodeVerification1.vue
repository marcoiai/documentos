<script setup lang="ts">
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
    class="bg-containerBg position-relative h-screen"
    no-gutters
  >
    <div class="bg-blur">
      <div class="round-1" />
      <div class="round-2" />
    </div>
    <!-- - Code verification Part -->
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
              lg="10"
              xl="6"
              md="7"
            >
              <VCard
                elevation="0"
                variant="outlined"
                rounded="md"
                class="loginBox bg-surface"
              >
                <VCardText class="pa-sm-9 pa-6">
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
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Code verification Part -->
  </VRow>
</template>

<style lang="scss">
@use "@styles/pages/_authentication.scss";
</style>
