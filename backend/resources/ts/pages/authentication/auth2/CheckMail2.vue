<script setup lang="ts">
import leftImg from '@images/auth/img-auth-sideimg.png'
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
    <!-- - Check mail Part -->
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
              <div class="pa-sm-9 pa-6 loginBox">
                <!-- - Check mail Form -->
                <AuthCheckMail />
                <!-- - Check mail Form -->
              </div>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </VCol>
    <!-- - Check mail Part -->
  </VRow>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
