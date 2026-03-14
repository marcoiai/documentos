<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import { useCustomers } from '@db/apps/customer/index'
import 'vue3-easy-data-table/dist/style.css'

// theme breadcrumb
const page = ref({ title: 'Product List' })

const breadcrumbs = ref([
  {
    title: 'Customer',
    disabled: false,
    href: '#',
  },
  {
    title: 'Product List',
    disabled: true,
    href: '#',
  },
])

const store = useCustomers()

const getProducts = computed(() => {
  return store.getProducts
})

onMounted(() => {
  store.fetchProducts()
})

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Product name', value: 'name', sortable: true },
  { text: 'Category', value: 'category', sortable: true },
  { text: 'Price', value: 'price', sortable: true },
  { text: 'Date', value: 'date', sortable: true },
  { text: 'Qty', value: 'qty', sortable: true },
  { text: 'Action', value: 'operation' },
]

const items = ref(getProducts)
const themeColor = ref('rgb(var(--v-theme-primary))')

const itemsSelected = ref<Item[]>([])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <VCard
        elevation="0"
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
                placeholder="Search Product"
                density="comfortable"
                hide-details
              >
                <template #prepend-inner>
                  <SvgSprite
                    name="custom-search"
                    class="text-lightText"
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
                  icon
                  variant="text"
                  aria-label="copy"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-copy"
                    style="width: 16px; height: 16px"
                  />
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="print"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-printer-outline"
                    style="width: 16px; height: 16px"
                  />
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="filter"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-filter"
                    style="width: 16px; height: 16px"
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
            <template #item-id="{ id }">
              <div class="player-wrapper">
                <h5 class="text-h5">
                  #{{ id }}
                </h5>
              </div>
            </template>
            <template #item-name="{ name }">
              <div class="player-wrapper">
                <h5 class="text-h5">
                  {{ name }}
                </h5>
              </div>
            </template>
            <template #item-price="{ price }">
              <div class="player-wrapper">
                <h5 class="text-h5">
                  ${{ price }}
                </h5>
              </div>
            </template>
            <template #item-operation>
              <div class="operation-wrapper">
                <VBtn
                  icon
                  aria-label="menu"
                  variant="text"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-more-outline"
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
