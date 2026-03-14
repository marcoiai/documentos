<script setup lang="ts">
// assets
import imageEmpty from '@images/e-commerce/empty.png'
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
  >
    <VCardText>
      <VRow class="justify-center align-center">
        <VCol
          lg="6"
          cols="12"
          class="text-center"
        >
          <VImg
            :src="imageEmpty"
            alt="cover"
            style="max-width: 450px"
            class="mx-auto"
            cover
          />
        </VCol>
        <VCol
          lg="6"
          cols="12"
        >
          <h1 class="text-sm-h1 text-h2 mb-0 mt-4">
            There is no Product
          </h1>
          <p class="text-h5 text-lightText">
            Try checking your spelling or use more general terms
          </p>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
