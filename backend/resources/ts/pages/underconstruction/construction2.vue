<script setup lang="ts">
definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: false,
  },
})
</script>

<template>
  <VRow
    no-gutters
    class="bg-containerBg"
    style="min-height: 100vh"
  >
    <VCol class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="constructionWrapper">
          <img
            src="@images/maintenance/img-construction-2.svg"
            alt="under construction"
          >
        </div>
        <h1 class="text-sm-h1 text-h2 mt-9 mb-3">
          Under Construction
        </h1>
        <p class="text-h6 text-lightText constructionContent mb-4">
          Hey! Please check out this site later. We are doing some maintenance on it right now.
        </p>
        <VBtn
          variant="flat"
          color="primary"
          rounded="md"
          to="/dashboards/default"
        >
          Back To Home
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.constructionWrapper {
  img {
    @media (min-width: 0px) {
      width: 230px;
      margin-inline: auto;
    }
    @media (min-width: 768px) {
      width: 480px;
    }
  }
}
.constructionContent {
  width: 83%;
  margin-inline: auto;
}
</style>
