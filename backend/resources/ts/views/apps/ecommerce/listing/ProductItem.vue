<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  name: String,
  image: String,
  desc: String,
  rating: Number,
  salePrice: Number,
  offerPrice: Number,
  goto: Number || String || Object || Array,
})

const emit = defineEmits(['handlecart', 'handlewishlist'])

const successsnackbar = ref(false)
const isInWishlist = ref(false)
const successsnackbar2 = ref(false)
const rate = ref(props.rating)

function toggleWishlist() {
  isInWishlist.value = !isInWishlist.value
  emit('handlewishlist', isInWishlist.value)
  successsnackbar2.value = true
}
</script>

<template>
  <VCard
    variant="outlined"
    rounded="lg"
    class="white bg-surface overflow-hidden"
  >
    <RouterLink :to="`/apps/ecommerce/details/${goto}`">
      <img
        alt="product"
        :src="image"
        class="w-100"
      >
    </RouterLink>
    <VBtn
      icon
      color="secondary"
      aria-label="wishlist"
      variant="text"
      class="wishlist-icon"
      rounded="md"
      @click="toggleWishlist"
    >
      <SvgSprite
        :name="isInWishlist ? 'custom-heart-fill' : 'custom-heart-outline'"
        :class="isInWishlist ? 'text-error' : 'text-lightText'"
        style="width: 18px; height: 18px"
      />
    </VBtn>
    <VDivider />
    <VCardItem class="pb-2 px-4 pt-3">
      <VCardTitle class="text-h5">
        {{ name }}
      </VCardTitle>
      <p class="text-lightText mb-3 text-h6 descriptionH">
        {{ desc }}
      </p>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-end ga-2 justify-space-between flex-wrap">
        <div>
          <div class="d-flex align-center">
            <h4 class="text-h5 mb-0">
              ${{ salePrice }}
            </h4>
            <p class="text-decoration-line-through text-lightText text-h6 mb-0 ms-2">
              ${{ offerPrice }}
            </p>
          </div>
          <div class="text-medium-emphasis align-center d-flex ga-2">
            <VRating
              v-model="rate"
              color="inputBorder"
              active-color="warning"
              half-increments
              size="small"
              density="compact"
            />
            <small>({{ rating }}+)</small>
          </div>
        </div>
        <VBtn
          icon
          rounded="md"
          color="primary"
          aria-label="cart"
          variant="flat"
          size="small"
          @click="$emit('handlecart', (successsnackbar = true))"
        >
          <SvgSprite
            name="custom-shopping-cart"
            style="width: 18px; height: 18px"
          />
        </VBtn>
      </div>
    </VCardText>
    <VSnackbar
      v-model="successsnackbar"
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-surface"
    >
      <VIcon
        class="mr-1"
        size="small"
        icon="$checkboxMarkedCircleOutline"
      />
      Add To cart success
    </VSnackbar>
    <VSnackbar
      v-model="successsnackbar2"
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-surface"
    >
      <VIcon
        class="mr-1"
        size="small"
        icon="$checkboxMarkedCircleOutline"
      />
      {{ isInWishlist ? 'Added to favourites' : 'Removed from favourites' }}
    </VSnackbar>
  </VCard>
</template>

<style>
.descriptionH {
  height: 40px;
  overflow: hidden;
}
.wishlist-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  [dir="rtl"] & {
    right: unset;
    left: 10px;
  }
}
</style>
