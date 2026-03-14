<script setup lang="ts">
// assets
import imageEmpty from '@images/e-commerce/empty.png'
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText>
      <VRow class="justify-center align-center text-lg-start text-center pt-16 pb-6">
        <VCol
          lg="6"
          md="8"
          cols="8"
          class="text-center"
        >
          <VImg
            :src="imageEmpty"
            alt="cover"
            width="70%"
            class="mx-auto"
          />
        </VCol>
        <VCol
          lg="6"
          md="8"
          cols="12"
        >
          <h1 class="text-lg-h1 text-h3 mb-1">
            Add items to your cart
          </h1>
          <p class="text-h5 text-lightText">
            Explore around to add items in your shopping bag.
          </p>
          <VBtn
            class="mt-3"
            to="/apps/ecommerce/products"
            rounded="md"
            variant="flat"
            size="large"
            color="primary"
          >
            Explore your bag
            <template #append>
              <SvgSprite
                name="custom-chevron-outline"
                style="width: 18px; height: 18px"
              />
            </template>
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
