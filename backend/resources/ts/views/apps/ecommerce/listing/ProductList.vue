<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'
import { orderBy } from 'lodash'
import { useDisplay } from 'vuetify'
import FloatingCart from '../cart/FloatingCart.vue'
import ProductEmplty from './ProductEmplty.vue'
import ProductFilters from './ProductFilters.vue'
import ProductItemVue from './ProductItem.vue'
import { useEcomStore } from '@db/apps/ecommerce/index'

const store = useEcomStore()

onMounted(() => {
  store.fetchProducts()
})

const getProducts = computed(() => {
  return store.products
})

const sortbyname = shallowRef(['Price:High to Low', 'Price:Low to High', 'Popularity', 'Fresh Arrivals'])
const selected = ref('Price:Low to High')
const searchValue = ref('')
const sDrawer = ref(false)

const getVisibleProduct = (products, sortBy, search, gender, category) => {
  // SORT BY
  if (sortBy === 'Popularity')
    products = orderBy(products, ['rating'], ['desc'])

  if (sortBy === 'Price:High to Low')
    products = orderBy(products, ['salePrice'], ['desc'])

  if (sortBy === 'Price:Low to High')
    products = orderBy(products, ['salePrice'], ['asc'])

  if (sortBy === 'Fresh Arrivals')
    products = orderBy(products, ['created'], ['asc'])

  if (gender) {
    products = products.filter(product => {
      return product.gender.includes(gender)
    })
  }
  if (category !== 'all') {
    products = products.filter(product => {
      return product.categories.includes(category)
    })
  }
  if (search) {
    products = products.filter(product => {
      return product.name.toLowerCase().includes(search.value.toLowerCase())
    })
  }

  return products
}

const filteredProducts = computed(() => {
  return getVisibleProduct(getProducts.value, selected.value, searchValue, store.gender, store.category)
})

const toggleSide = ref(false)
const { lgAndUp } = useDisplay()

const handleToggle = () => {
  toggleSide.value = !toggleSide.value
}

const handleMobileDrawer = () => {
  sDrawer.value = !sDrawer.value
}

function AddCart(p) {
  store.AddToCart(p)
}
</script>

<template>
  <VRow>
    <VCol
      v-if="!toggleSide && lgAndUp"
      class="filterSidebar"
    >
      <VCard
        variant="outlined"
        class="bg-surface"
        rounded="lg"
      >
        <VCardItem class="py-3">
          <VCardTitle class="text-subtitle-1">
            Filter
          </VCardTitle>
        </VCardItem>
        <VDivider />
        <VCardText class="pa-5">
          <ProductFilters />
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols>
      <VCard
        variant="outlined"
        class="bg-surface mb-6"
        rounded="lg"
      >
        <VCardItem>
          <div class="d-flex ga-2 align-center">
            <VBtn
              variant="text"
              rounded="md"
              color="dark"
              @click="!lgAndUp ? handleMobileDrawer() : handleToggle()"
            >
              <SvgSprite
                name="custom-filter"
                class="me-1 text-secondary"
                style="width: 18px; height: 18px"
              />
              Filter
            </VBtn>
            <VTextField
              v-model="searchValue"
              variant="outlined"
              persistent-placeholder
              density="comfortable"
              placeholder="Search Product"
              hide-details
              color="primary"
              style="max-width: 250px"
            >
              <template #prepend-inner>
                <SvgSprite
                  name="custom-search"
                  class="text-lightText"
                  style="width: 18px; height: 18px"
                />
              </template>
            </VTextField>
            <div
              v-if="lgAndUp"
              class="ms-auto"
            >
              <VSelect
                v-model="selected"
                :items="sortbyname"
                role="link"
                color="primary"
                variant="outlined"
                hide-details
                density="comfortable"
              />
            </div>
          </div>
        </VCardItem>
      </VCard>
      <VRow v-if="filteredProducts.length >= 1">
        <VCol
          v-for="product in filteredProducts"
          :key="product.id"
          :xl="toggleSide ? '3' : '4'"
          :lg="toggleSide ? '3' : '6'"
          md="3"
        >
          <ProductItemVue
            :name="product.name"
            :image="product.image"
            :desc="product.description"
            :sale-price="product.salePrice"
            :offer-price="product.offerPrice"
            :rating="product.rating"
            :goto="product.id"
            @handlecart="AddCart(product)"
          />
        </VCol>
      </VRow>
      <ProductEmplty v-else />
    </VCol>
  </VRow>
  <VNavigationDrawer
    v-if="!lgAndUp"
    v-model="sDrawer"
    temporary
    location="left"
    width="300"
    top
  >
    <VCardText class="pa-5">
      <ProductFilters />
    </VCardText>
  </VNavigationDrawer>
  <FloatingCart />
</template>

<style>
.filterSidebar {
  max-width: 350px;
}
</style>
