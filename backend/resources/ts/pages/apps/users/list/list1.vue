<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Header } from 'vue3-easy-data-table'
import { useUserCardStore } from '@db/apps/users/UserCard'

import 'vue3-easy-data-table/dist/style.css'

// theme breadcrumb
const page = ref({ title: 'Style 01' })

const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '#',
  },
  {
    title: 'List',
    disabled: false,
    href: '#',
  },
  {
    title: 'Style 01',
    disabled: true,
    href: '#',
  },
])

const store = useUserCardStore()

onMounted(() => {
  store.fetchlistCards()
})
interface ListItem {
  avatar: string
  email: string
  name: string
  verify: boolean

  // Add other properties as needed
}

const listCards = computed<ListItem[]>(() => {
  return store.list
})

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: '#', value: 'id' },
  { text: 'User Profile', value: 'name', sortable: true },
  { text: 'Country', value: 'location', sortable: true },
  { text: 'Friends', value: 'friends', sortable: true },
  { text: 'Followers', value: 'followers', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Action', value: 'operation' },
]

const items = ref(listCards)
const themeColor = ref('rgb(var(--v-theme-secondary))')
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
      <UiParentCard title="Customer List">
        <VRow
          justify="space-between"
          class="align-center mb-3"
        >
          <VCol
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <VTextField
              v-model="searchValue"
              type="text"
              variant="outlined"
              persistent-placeholder
              density="comfortable"
              placeholder="Search Customer"
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
        </VRow>
        <div class="overflow-auto">
          <EasyDataTable
            :headers="headers"
            :items="items"
            table-class-name="customize-table"
            :theme-color="themeColor"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="8"
          >
            <template #item-name="{ name, email, avatar, verify }">
              <div class="d-flex align-center ga-4">
                <img
                  :src="avatar"
                  alt="avatar"
                  width="40"
                  class="rounded-md"
                >

                <div>
                  <h5 class="text-h5 mb-0">
                    {{ name }}
                    <VBtn
                      v-if="verify"
                      icon
                      aria-label="verify"
                      color="success"
                      rounded="md"
                      variant="tonal"
                      size="small"
                      class="verifybtn"
                    >
                      <SvgSprite
                        name="custom-check-circle-fill"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                  </h5>
                  <small class="text-subtitle text-lightText">{{ email }}</small>
                </div>
              </div>
            </template>
            <template #item-status="{ status }">
              <VChip
                v-if="status === 'Active'"
                color="success"
                size="small"
              >
                Active
              </VChip>
              <VChip
                v-if="status === 'Rejected'"
                color="error"
                size="small"
              >
                Rejected
              </VChip>
              <VChip
                v-if="status === 'Pending'"
                color="warning"
                size="small"
              >
                Pending
              </VChip>
            </template>
            <template #item-operation>
              <div class="operation-wrapper">
                <VBtn
                  icon
                  color="secondary"
                  aria-label="message"
                  rounded="md"
                  variant="text"
                >
                  <SvgSprite
                    name="custom-message-outline"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
                <VBtn
                  icon
                  color="error"
                  aria-label="block"
                  rounded="md"
                  variant="text"
                >
                  <SvgSprite
                    name="custom-slash-outline"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
              </div>
            </template>
          </EasyDataTable>
        </div>
      </UiParentCard>
    </VCol>
  </VRow>
</template>

<style>
.verifybtn {
  height: 12px !important;
  width: 12px !important;
  margin-top: -3px;
}

@media (max-width: 475px) {
  .easy-data-table__rows-selector {
    width: 50px !important;
    margin: 0 15px !important;
  }
}
</style>
