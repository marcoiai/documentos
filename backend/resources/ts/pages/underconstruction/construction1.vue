<script setup lang="ts">
definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: false,
  },
})
</script>

<template>
  <VContainer
    fluid
    class="bg-containerBg construction-bg align-center pa-0"
    style="min-height: 100vh"
  >
    <VContainer no-gutters>
      <VRow
        class="align-center"
        style="min-height: calc(100vh - 10px)"
      >
        <VCol
          cols="12"
          md="6"
          class="text-center"
        >
          <h1 class="text-md-h1 text-h2 mt-9 mb-3">
            Under Construction
          </h1>
          <p class="text-h6 text-lightText constructionContent mb-7">
            Hey! Please check out this site later. We are doing some maintenance on it right now.
          </p>
          <VBtn
            variant="flat"
            rounded="md"
            color="primary"
            to="/dashboards/default"
          >
            Back To Home
          </VBtn>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <div class="constructionWrapper">
            <img
              src="@images/maintenance/img-cunstruct-1.svg"
              alt="under construction"
            >
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </VContainer>
</template>

<style lang="scss">
.construction-bg {
  background-image: url('@images/maintenance/img-cunstruct-1-bg.png');
  background-position: top right;
  background-size: 100%;
  background-repeat: no-repeat;
}
.constructionWrapper {
  text-align: center;
  img {
    height: 400px;
    @media (max-width: 991px) {
      height: 300px;
      margin-inline: auto;
    }
    @media (max-width: 575px) {
      height: 250px;
    }
  }
}
.constructionContent {
  width: 83%;
  margin-inline: auto;
}
</style>
