<script setup lang="ts">
definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: false,
  },
})
</script>

<template>
  <VContainer>
    <VRow>
      <div class="bg-blur">
        <div class="round-1" />
        <div class="round-2" />
      </div>
      <VCol
        cols="12"
        lg="5"
        md="6"
        class="d-flex align-center justify-center position-relative"
      >
        <div>
          <h4 class="text-h4">
            Coming Soon
          </h4>
          <h2 class="text-h2 mb-2 mt-sm-7">
            <span class="text-primary">Able Pro</span> - The Bootstrap Admin Template
          </h2>
          <small class="text-h6 text-lightText">Presenting Vuetify-UI based Vue Dashboard Template to build performance centric websites and applications.</small>
          <VRow>
            <VCol
              cols="12"
              lg="8"
              class="d-sm-flex ga-2 align-center pt-12"
            >
              <VTextField
                variant="outlined"
                density="comfortable"
                single-line
                placeholder="Email Address"
                color="primary"
                hide-details
              />
              <VBtn
                color="primary"
                elevation="0"
                size="large"
                rounded="md"
                class="mt-4 mt-sm-0"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-notification"
                    style="width: 18px; height: 18px"
                  />
                </template>
                Notify Me
              </VBtn>
            </VCol>
            <VCol cols="12">
              <VBtn
                variant="text"
                href="https://www.facebook.com/Phoenixcoded/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="facebook"
                icon
                color="secondary"
              >
                <SvgSprite
                  name="custom-facebook"
                  style="width: 18px; height: 18px"
                />
              </VBtn>
              <VBtn
                variant="text"
                href="https://themeforest.net/user/phoenixcoded"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="google"
                icon
                color="secondary"
              >
                <SvgSprite
                  name="custom-google"
                  style="width: 18px; height: 18px"
                />
              </VBtn>
            </VCol>
          </VRow>
        </div>
      </VCol>
      <VCol
        cols="12"
        lg="7"
        md="6"
      >
        <div class="ComingsoonWrapper my-6">
          <VRow class="align-end">
            <VCol
              cols="6"
              class="text-right"
            >
              <img
                src="@images/maintenance/img-soon-1-1.png"
                alt="maintenance"
              >
            </VCol>
            <VCol cols="6">
              <img
                src="@images/maintenance/img-soon-1-2.png"
                alt="maintenance"
              >
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss">
@use "@styles/pages/_authentication.scss";
.ComingsoonWrapper {
  position: relative;
  img {
    height: 812px;
    @media (max-width: 1279px) {
      height: 630px;
    }
    @media (max-width: 500px) {
      height: 440px;
    }
  }
}
</style>
