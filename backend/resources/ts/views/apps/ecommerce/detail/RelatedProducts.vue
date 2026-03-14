<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FloatingCart from '../cart/FloatingCart.vue'
import { useEcomStore } from '@db/apps/ecommerce/index'
import 'vue3-carousel/dist/carousel.css'

const emit = defineEmits(['handlecart', 'handlewishlist'])

const store = useEcomStore()

onMounted(() => {
  store.fetchProducts()
})

const getProducts = computed(() => {
  return store.products
})

const wishlist = ref<number[]>([])
const successSnackbar = ref(false)
const snackbarMessage = ref('')

function toggleWishlist(productId: number) {
  if (wishlist.value.includes(productId)) {
    wishlist.value = wishlist.value.filter(id => id !== productId)
    snackbarMessage.value = 'Removed from favourites'
  } else {
    wishlist.value.push(productId)
    snackbarMessage.value = 'Added to favourites'
  }
  emit('handlewishlist', wishlist.value)
  successSnackbar.value = true
}

function isInWishlist(productId: number) {
  return wishlist.value.includes(productId)
}
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface overflow-hidden"
    rounded="lg"
  >
    <VCardItem>
      <VCardTitle class="text-subtitle-1 pa-0">
        Related Products
      </VCardTitle>
    </VCardItem>
    <VDivider />
    <VCardText class="pa-0">
      <PerfectScrollbar style="height: 265px" :options="{ suppressScrollX: true }">
        <VList
          class="relatedCar py-0"
          aria-label="product list"
          aria-busy="true"
        >
          <VListItem
            v-for="(product, i) in getProducts"
            :key="i"
            :value="product.name"
            class="py-2 pt-4"
            border
          >
            <div class="d-flex">
              <VAvatar
                size="62"
                rounded="md"
                variant="outlined"
                color="borderLight"
                class="bg-containerBg"
              >
                <img
                  :src="product.image"
                  alt="product"
                  width="62"
                  style="min-width: 62px"
                >
              </VAvatar>
              <div class="ms-3">
                <h5 class="text-subtitle-1 text-lightText mb-0">
                  {{ product.name }}
                </h5>
                <p class="text-h6 text-lightText text-truncate mb-1">
                  {{ product.description }}
                </p>
                <h5 class="text-h5 text-lightText mb-1">
                  ${{ product.salePrice }}
                </h5>
                <VRating
                  color="inputBorder"
                  size="small"
                  active-color="warning"
                  half-increments
                  :model-value="3.5"
                  density="compact"
                />
              </div>
            </div>

            <template #append>
              <VBtn
                icon
                variant="text"
                aria-label="wishlist"
                color="lightText"
                rounded="md"
                @click="toggleWishlist(product.id)"
              >
                <SvgSprite
                  :name="isInWishlist(product.id) ? 'custom-heart-fill' : 'custom-heart-outline'"
                  :class="isInWishlist(product.id) ? 'text-error' : 'text-lightText'"
                  style="width: 20px; height: 20px"
                />
              </VBtn>
            </template>
          </VListItem>
          <VListItem class="pa-6">
            <VBtn
              color="secondary"
              rounded="md"
              variant="outlined"
              block
            >
              View all products
            </VBtn>
          </VListItem>
        </VList>
      </PerfectScrollbar>
    </VCardText>
    <VSnackbar
      v-model="successSnackbar"
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-surface"
    >
      <VIcon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></VIcon>
      {{ snackbarMessage }}
    </VSnackbar>
  </VCard>

  <FloatingCart />
</template>

<style lang="scss">
.relatedCar {
  .v-list-item {
    .v-list-item__append {
      align-self: flex-start;
    }
    .text-truncate {
      white-space: unset !important;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
