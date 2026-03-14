<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import { useCustomers } from '@db/apps/customer/index'
import 'vue3-easy-data-table/dist/style.css'

// theme breadcrumb
const page = ref({ title: 'Order List' })

const breadcrumbs = ref([
  {
    title: 'Customer',
    disabled: false,
    href: '#',
  },
  {
    title: 'Order List',
    disabled: true,
    href: '#',
  },
])

const store = useCustomers()

const getOrders = computed(() => {
  return store.getOrders
})

onMounted(() => {
  store.fetchOrders()
})

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Customer name', value: 'name', sortable: true },
  { text: 'Branch', value: 'company', sortable: true },
  { text: 'Payment Type', value: 'type', sortable: true },
  { text: 'Quantity', value: 'qty', sortable: true },
  { text: 'Registered', value: 'date', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Action', value: 'operation' },
]

const items = ref(getOrders)
const themeColor = ref('rgb(var(--v-theme-primary))')
const { deleteOrder } = store
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
                placeholder="Search Order"
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
            <template #item-operation="item">
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
                  aria-label="trash"
                  variant="text"
                  rounded="md"
                  @click="deleteOrder(item.id)"
                >
                  <SvgSprite
                    name="custom-trash"
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
