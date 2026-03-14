<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import { useCustomers } from '@db/apps/customer/index'

import 'vue3-easy-data-table/dist/style.css'

const page = ref({ title: 'Customer list' })

const breadcrumbs = shallowRef([
  {
    title: 'Customer',
    disabled: false,
    href: '#',
  },
  {
    title: 'List',
    disabled: true,
    href: '#',
  },
])

const store = useCustomers()

const getCustomers = computed(() => {
  return store.getCustomers
})

onMounted(() => {
  store.fetchCustomers()
})

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: 'Customer name', value: 'name', sortable: true },
  { text: 'Contact', value: 'date', sortable: true },
  { text: 'Age', value: 'orders', sortable: true },
  { text: 'Country', value: 'location', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Action', value: 'operation' },
]

const items = ref(getCustomers)
const themeColor = ref('rgb(var(--v-theme-primary))')
const { deleteCustomer } = store

const itemsSelected = ref<Item[]>([])

const dialog = ref(false)
const switch1 = ref(true)
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
                placeholder="Search 200 records..."
                density="comfortable"
                hide-details
              >
                <template #prepend-inner>
                  <SvgSprite
                    name="custom-search"
                    class="text-lightText"
                    style="width: 14px; height: 14px"
                  />
                </template>
              </VTextField>
            </VCol>
            <VCol
              cols="12"
              md="3"
            >
              <div class="d-flex ga-2 justify-end">
                <VDialog
                  v-model="dialog"
                  class="customer-modal"
                >
                  <template #activator="{ props }">
                    <VBtn
                      variant="flat"
                      color="primary"
                      rounded="md"
                      v-bind="props"
                    >
                      <template #prepend>
                        <SvgSprite
                          name="custom-plus"
                          style="width: 14px; height: 14px"
                        />
                      </template>
                      Add customer
                    </VBtn>
                  </template>
                  <VCard>
                    <PerfectScrollbar style="max-height: calc(100vh - 48px)">
                      <VCardTitle class="pa-5 d-flex justify-space-between align-center">
                        <span class="text-h5">New Customer</span>
                        <VBtn
                            color="error"
                            aria-label="close"
                            variant="text"
                            icon
                            rounded="md"
                            size="small"
                            @click="dialog = false"
                          >
                            <SvgSprite
                              name="custom-close"
                              style="width: 16px; height: 16px; transform: rotate(45deg)"
                            />
                          </VBtn>
                      </VCardTitle>
                      <VDivider />
                      <VCardText>
                        <VContainer>
                          <VRow>
                            <VCol
                              md="3"
                              cols="12"
                              class="text-center"
                            >
                              <VAvatar
                                size="72"
                                variant="outlined"
                                color="primary"
                                class="border-dashed border-primary border-thin border-opacity-100"
                              >
                                <img
                                  src="@images/users/avatar-1.png"
                                  width="72"
                                  alt="profile"
                                >
                                <input
                                  type="file"
                                  aria-label="upload"
                                  class="preview-upload"
                                >
                              </VAvatar>
                            </VCol>
                            <VCol
                              md="9"
                              cols="12"
                            >
                              <VRow>
                                <VCol cols="12">
                                  <VLabel class="mb-2">
                                    First name
                                  </VLabel>
                                  <VTextField
                                    single-line
                                    placeholder="Enter first name"
                                    hide-details
                                    variant="outlined"
                                    required
                                    density="comfortable"
                                    rounded="0"
                                  />
                                </VCol>
                                <VCol cols="12">
                                  <VLabel class="mb-2">
                                    Email
                                  </VLabel>
                                  <VTextField
                                    single-line
                                    type="email"
                                    hide-details
                                    placeholder="Enter customer email"
                                    required
                                    variant="outlined"
                                    density="comfortable"
                                    rounded="0"
                                  />
                                </VCol>
                                <VCol cols="12">
                                  <VLabel class="mb-2">
                                    Status
                                  </VLabel>
                                  <VAutocomplete
                                    :items="['Single', 'Relationship', 'Complicated']"
                                    label="Single"
                                    rounded="0"
                                    color="primary"
                                    single-line
                                    density="comfortable"
                                    hide-details
                                    variant="outlined"
                                  />
                                </VCol>
                                <VCol cols="12">
                                  <VLabel class="mb-2">
                                    Location
                                  </VLabel>
                                  <VTextarea
                                    placeholder="Enter location"
                                    hide-details
                                    rows="2"
                                    variant="outlined"
                                    density="comfortable"
                                  />
                                </VCol>
                                <VCol cols="12">
                                  <div class="d-flex justify-space-between ga-2">
                                    <div class="pb-4">
                                      <h6 class="text-subtitle-1 mb-1">
                                        Make Contact Info Public
                                      </h6>
                                      <p class="text-caption text-lightText mb-0 me-5">
                                        Means that anyone viewing your profile will be able to see your contacts details
                                      </p>
                                    </div>
                                    <VSwitch
                                      v-model="switch1"
                                      color="primary"
                                      aria-label="switch"
                                      class="switchRight"
                                      hide-details
                                    />
                                  </div>
                                  <VDivider />
                                </VCol>
                                <VCol
                                  cols="12"
                                  class="pt-0"
                                >
                                  <div class="d-flex justify-space-between ga-2">
                                    <div class="pb-4 pt-1">
                                      <h6 class="text-subtitle-1 mb-1">
                                        Available to hire
                                      </h6>
                                      <p class="text-caption text-lightText mb-0 me-5">
                                        Toggling this will let your teammates know that you are available for acquiring new projects
                                      </p>
                                    </div>
                                    <VSwitch
                                      color="primary"
                                      aria-label="switch"
                                      class="switchRight"
                                      :model-value="false"
                                      hide-details
                                    />
                                  </div>
                                </VCol>
                              </VRow>
                            </VCol>
                          </VRow>
                        </VContainer>
                      </VCardText>
                      <VDivider />
                      <VCardActions>
                        <VSpacer />
                        <VBtn
                          color="error"
                          rounded="md"
                          variant="text"
                          @click="dialog = false"
                        >
                          Cancel
                        </VBtn>
                        <VBtn
                          color="primary"
                          rounded="md"
                          variant="flat"
                          @click="dialog = false"
                        >
                          Add
                        </VBtn>
                      </VCardActions>
                    </PerfectScrollbar>
                  </VCard>
                </VDialog>
                <VBtn
                  icon
                  variant="text"
                  aria-label="download"
                  rounded="md"
                  size="small"
                >
                  <SvgSprite
                    name="custom-document-2"
                    class="text-lightText"
                    style="width: 24px; height: 24px"
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
            :rows-per-page="10"
          >
            <template #item-name="{ name, email }">
              <div class="player-wrapper">
                <h6 class="text-subtitle-1 mb-0">
                  {{ name }}
                </h6>
                <small class="text-h6 text-lightText">{{ email }}</small>
              </div>
            </template>
            <template #item-status="{ status }">
              <VChip
                v-if="status === 1"
                color="success"
                size="small"
              >
                Relationship
              </VChip>
              <VChip
                v-if="status === 2"
                color="error"
                size="small"
              >
                Complicated
              </VChip>
              <VChip
                v-if="status === 3"
                color="info"
                size="small"
              >
                Single
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
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
                <VBtn
                  icon
                  color="primary"
                  aria-label="edit"
                  variant="text"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-edit-outline"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
                <VBtn
                  icon
                  color="error"
                  aria-label="trash"
                  variant="text"
                  rounded="md"
                  @click="deleteCustomer(item.name)"
                >
                  <SvgSprite
                    name="custom-trash"
                    style="width: 20px; height: 20px"
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

<style lang="scss">
.customer-modal {
  width: calc(100% - 48px);
  min-width: 340px;
  max-width: 820px;
}
</style>
