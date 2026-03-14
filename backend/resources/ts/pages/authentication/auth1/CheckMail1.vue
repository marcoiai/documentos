<script setup lang="ts">
import AuthCheckMail from '@/views/authentication/AuthCheckMail.vue'

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
    <!-- - Check mail Part -->
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
                <VCardText class="pa-sm-9 pa-6">
                  <!-- - Check mail Form -->
                  <AuthCheckMail />
                  <!-- - Check mail Form -->
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Check mail Part -->
  </VRow>
</template>

<style lang="scss">
@use "@styles/pages/_authentication.scss";
</style>
