<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import { useCustomers } from '@db/apps/customer/index'
import 'vue3-easy-data-table/dist/style.css'
import ReviewPopup from '@/views/apps/customer/ReviewPopup.vue'

// theme breadcrumb
const page = ref({ title: 'Product review' })

const breadcrumbs = ref([
  {
    title: 'Customer',
    disabled: false,
    href: '#',
  },
  {
    title: 'Product review',
    disabled: true,
    href: '#',
  },
])

const store = useCustomers()

const getProductsreviews = computed(() => {
  return store.getProductsreviews
})

onMounted(() => {
  store.fetchReviews()
})

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: 'Product name', value: 'name', sortable: true },
  { text: 'Author', value: 'author', sortable: true },
  { text: 'Review', value: 'review', sortable: true },
  { text: 'Rating', value: 'rating', sortable: true },
  { text: 'Date', value: 'date', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Action', value: 'operation' },
]

const items = ref(getProductsreviews)
const themeColor = ref('rgb(var(--v-theme-primary))')
const ratingval = ref(3)
const itemsSelected = ref<Item[]>([])

const Rdialog = ref({
  dialog: false,
})

const closeDialog = () => {
  Rdialog.value.dialog = false
}
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
            <template #item-name="{ name }">
              <div class="player-wrapper">
                <span>{{ name }}</span>
              </div>
            </template>
            <template #item-rating="{ rating }">
              <VRating
                v-model="ratingval"
                background-color="orange lighten-3"
                color="warning"
                density="compact"
                half-increments
                hover
                size="18"
              >
                {{ rating }}
              </VRating>
            </template>
            <template #item-status="{ status }">
              <VChip
                v-if="status === 1"
                color="success"
                size="small"
              >
                Complete
              </VChip>
              <VChip
                v-if="status === 2"
                color="error"
                size="small"
              >
                Processing
              </VChip>
              <VChip
                v-if="status === 3"
                color="primary"
                size="small"
              >
                Confirm
              </VChip>
            </template>
            <template #item-operation>
              <div class="operation-wrapper">
                <VBtn
                  icon
                  color="secondary"
                  aria-label="view"
                  variant="text"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-eye"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
                <VBtn
                  icon
                  color="primary"
                  aria-label="edit"
                  variant="text"
                  rounded="md"
                  @click="Rdialog.dialog = true"
                >
                  <SvgSprite
                    name="custom-edit-outline"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
              </div>
            </template>
          </EasyDataTable>

          <ReviewPopup
            v-model:dialogs="Rdialog"
            @close="closeDialog"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
