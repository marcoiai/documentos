<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { format, isValid } from 'date-fns'
import { useEcomStore } from '@db/apps/ecommerce/index'

const store = useEcomStore()

onMounted(() => {
  store.fetchProducts()
})

const getProducts = computed(() => {
  return store.products
})

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: '#', value: 'image' },
  { text: 'Product detail', value: 'name', sortable: true },
  { text: 'Created', value: 'created', sortable: true },
  { text: 'Price', value: 'offerPrice', sortable: true },
  { text: 'Sale price', value: 'salePrice', sortable: true },
  { text: 'status', value: 'isStock' },
  { text: 'Action', value: 'operation' },
]

const items = ref(getProducts)
const themeColor = ref('rgb(var(--v-theme-primary))')

const itemsSelected = ref<Item[]>([])

const isValidDate = (date: string | number | Date) => {
  // Check if the date is valid
  return isValid(new Date(date))
}
</script>

<template>
  <VRow class="mt-0">
    <VCol
      cols="12"
      md="12"
    >
      <VCard
        variant="outlined"
        class="bg-surface overflow-hidden"
        rounded="lg"
      >
        <VCardItem>
          <VRow
            justify="space-between"
            class="align-center"
          >
            <VCol
              cols="12"
              md="3"
            >
              <VTextField
                v-model="searchValue"
                type="text"
                variant="outlined"
                persistent-placeholder
                density="comfortable"
                placeholder="Search Product"
                hide-details
              >
                <template #prepend-inner>
                  <SvgSprite
                    name="custom-search"
                    style="width: 16px; height: 16px"
                  />
                </template>
              </VTextField>
            </VCol>
            <VCol
              cols="12"
              md="3"
            >
              <div class="d-flex ga-2 justify-end">
                <VBtn
                  variant="flat"
                  rounded="md"
                  color="primary"
                  to="/apps/ecommerce/addproduct"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-plus"
                      style="width: 18px; height: 18px"
                    />
                  </template>
                  Add product
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="download"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-download-outline"
                    class="text-lightText"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VCardItem>
        <VDivider />
        <VCardText class="pa-0">
          <EasyDataTable
            v-model:items-selected="itemsSelected"
            :headers="headers"
            :items="items"
            table-class-name="customize-table invoice-table"
            :theme-color="themeColor"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="5"
          >
            <template #item-image="{ image }">
              <div class="player-wrapper">
                <img
                  alt="product"
                  width="32"
                  class="rounded-md bg-gray100"
                  :src="image"
                >
              </div>
            </template>
            <template #item-name="{ name }">
              <div class="player-wrapper">
                <h5 class="text-subtitle-1 mb-0">
                  {{ name }}
                </h5>
              </div>
            </template>
            <template #item-created="{ date }">
              <div class="player-wrapper">
                {{ isValidDate(date) ? format(new Date(date), 'E, MMM d') : 'Mon, Mar 10' }}
              </div>
            </template>
            <template #item-offerPrice="{ offerPrice }">
              <div class="player-wrapper">
                <span class="text-h6">${{ offerPrice }}</span>
              </div>
            </template>
            <template #item-salePrice="{ salePrice }">
              <div class="player-wrapper">
                <span class="text-h6">${{ salePrice }}</span>
              </div>
            </template>
            <template #item-isStock="{ isStock }">
              <div class="player-wrapper">
                <VChip
                  v-if="isStock"
                  color="success"
                  size="small"
                >
                  In Stock
                </VChip>
                <VChip
                  v-else
                  color="error"
                  size="small"
                >
                  Out of Stock
                </VChip>
              </div>
            </template>

            <template #item-operation>
              <div class="operation-wrapper">
                <VBtn
                  icon
                  variant="text"
                  aria-label="view"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-eye"
                    class="text-lightText"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
              </div>
            </template>
          </EasyDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
