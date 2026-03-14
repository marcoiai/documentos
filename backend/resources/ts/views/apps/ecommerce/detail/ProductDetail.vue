<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductCarousel from './ProductCarousel.vue'
import { useEcomStore } from '@db/apps/ecommerce/index'

const store = useEcomStore()
const route = useRoute()
const setColor = ref(1)

onMounted(() => {
  store.fetchProducts()
})

const getProduct = computed(() => {
  const productId = Number(route.params.id)

  // Assuming product IDs start from 1
  return store.products.find(product => product.id === productId)
})

function selectColor(e) {
  setColor.value = e
}
</script>

<template>
  <div v-if="getProduct">
    <VRow>
      <VCol
        md="4"
        sm="12"
        cols="12"
      >
        <ProductCarousel />
      </VCol>
      <VCol
        md="8"
        sm="12"
        cols="12"
      >
        <div class="d-flex align-top">
          <div>
            <div class="text-medium-emphasis align-center d-flex mb-1 ga-2">
              <VRating
                v-model="getProduct.rating"
                color="inputBorder"
                active-color="warning"
                half-increments
                density="compact"
              />
              <small>({{ getProduct.rating }}+)</small>
            </div>
            <h3 class="text-h3 mb-3">
              {{ getProduct.name }} <VChip
                color="info"
                variant="outlined"
                size="small"
              >
                New
              </VChip>
            </h3>
            <VChip
              v-if="getProduct.isStock"
              color="success"
              size="small"
              label
            >
              In Stock
            </VChip>
            <VChip
              v-else
              color="error"
              size="small"
              label
            >
              Out of Stock
            </VChip>
          </div>
        </div>
        <p class="v-col-lg-10 px-0 mb-0 text-h6 text-lightText">
          {{ getProduct.description }}
        </p>
        <VRow>
          <VCol
            lg="12"
            cols="12"
          >
            <div class="productCustomize">
              <h6 class="text-h6 text-lightText mb-1">
                Colors
              </h6>
              <template
                v-for="(color, i) in getProduct.colors"
                :key="i"
              >
                <VAvatar
                  :class="setColor === i ? 'avatar-border' : ''"
                  variant="flat"
                  :color="color"
                  size="x-small"
                  class="mr-1 cursor-pointer"
                  @click="selectColor(i)"
                />
              </template>
            </div>
            <div class="pt-6">
              <h6 class="text-h6 text-lightText mb-1">
                Quantity
              </h6>
              <VBtnToggle
                variant="outlined"
                rounded="0"
                size="small"
                divided
                color="primary"
              >
                <VBtn
                  size="small"
                  style="width: 260px"
                >
                  {{ getProduct.qty }}
                </VBtn>
                <div
                  style="width: 25px"
                  class="qty-icons"
                >
                  <VBtn
                    block
                    icon
                    color="secondary"
                    aria-label="add"
                    rounded="0"
                    class="py-1"
                    @click="store.incrementQty(getProduct, store.cart)"
                  >
                    <SvgSprite
                      name="custom-plus"
                      style="width: 18px; height: 18px"
                    />
                  </VBtn>
                  <VBtn
                    block
                    icon
                    color="secondary"
                    aria-label="remove"
                    rounded="0"
                    class="py-1"
                    @click="store.decrementQty(getProduct.id)"
                  >
                    <SvgSprite
                      name="custom-line"
                      style="width: 18px; height: 18px"
                    />
                  </VBtn>
                </div>
              </VBtnToggle>
            </div>
            <div class="d-flex align-end ga-2 mb-3 mt-4">
              <h3 class="text-h3 mb-n1">
                ${{ getProduct.salePrice }}
              </h3>
              <p class="text-decoration-line-through text-medium-emphasis mb-0">
                ${{ getProduct.offerPrice }}
              </p>
              <small class="text-medium-emphasis">(Inclusive of all taxes)</small>
            </div>
          </VCol>
          <VCol lg="12">
            <div class="d-flex flex-wrap ga-4">
              <VBtn
                color="primary"
                size="large"
                rounded="md"
                variant="flat"
                to="/apps/ecommerce/checkout"
                @click="store.AddToCart(getProduct)"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-shopping-cart"
                    style="width: 18px; height: 18px"
                  />
                </template>
                Buy Now
              </VBtn>
              <VBtn
                color="secondary"
                rounded="md"
                size="large"
                variant="outlined"
                @click="store.AddToCart(getProduct)"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-add-cart"
                    style="width: 18px; height: 18px"
                  />
                </template>
                Add To Cart
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.avatar-border {
  border: 3px solid rgba(var(--v-theme-darkText), 0.2);
}
.productCustomize tr td {
  padding: 15px 20px;
  vertical-align: center;
}
.qty-icons {
  .v-btn {
    border: 1px solid rgb(var(--v-theme-borderLight));
    height: 24px !important;
  }
}
</style>
