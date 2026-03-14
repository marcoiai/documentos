<script setup lang="ts">
import { ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import user1 from '@images/users/avatar-5.png'
import user2 from '@images/users/avatar-4.png'
import user3 from '@images/users/avatar-7.png'
import user4 from '@images/users/avatar-1.png'
import user5 from '@images/users/avatar-2.png'

const searchField = ref('name')
const searchValue = ref('')

const headers: Header[] = [
  { text: 'Invoice ID', value: 'id', sortable: true },
  { text: 'User Name', value: 'name', sortable: true },
  { text: 'Create date', value: 'date', sortable: true },
  { text: 'Due date', value: 'due', sortable: true },
  { text: 'Quantity', value: 'qty', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Action', value: 'operation' },
]

const items = ref([
  {
    id: 1,
    name: 'Tessi Eneas',
    image: user1,
    mail: 'tass23@gmail.com',
    date: '05/01/2023',
    due: '06/02/2023',
    qty: '1000',
    status: 1,
  },
  {
    id: 2,
    name: 'Abey Boseley',
    image: user2,
    mail: 'aabsl32@gmail.com',
    date: '7/15/2023',
    due: '2/15/2023',
    qty: '2030',
    status: 2,
  },
  {
    id: 3,
    name: 'Shelba Thews',
    image: user3,
    mail: 'slbt37@gmail.com',
    date: '7/6/2023',
    due: '7/8/2023',
    qty: '3000',
    status: 3,
  },
  {
    id: 4,
    name: 'Salvatore Boncore',
    image: user4,
    mail: 'sabf231@gmail.com',
    date: '2/8/2023',
    due: '3/30/2023',
    qty: '2000',
    status: 2,
  },
  {
    id: 5,
    name: 'Mickie Melmoth',
    image: user5,
    mail: 'mmsht23@gmail.com',
    date: '5/5/2023',
    due: '7/11/2023',
    qty: '3000',
    status: 1,
  },
])

const items1 = ref([
  {
    id: 1,
    name: 'Tessi Eneas',
    image: user1,
    mail: 'tass23@gmail.com',
    date: '05/01/2023',
    due: '06/02/2023',
    qty: '1000',
    status: 1,
  },
  {
    id: 5,
    name: 'Mickie Melmoth',
    image: user5,
    mail: 'mmsht23@gmail.com',
    date: '5/5/2023',
    due: '7/11/2023',
    qty: '3000',
    status: 1,
  },
])

const items2 = ref([
  {
    id: 2,
    name: 'Abey Boseley',
    image: user2,
    mail: 'aabsl32@gmail.com',
    date: '7/15/2023',
    due: '2/15/2023',
    qty: '2030',
    status: 2,
  },
  {
    id: 4,
    name: 'Salvatore Boncore',
    image: user4,
    mail: 'sabf231@gmail.com',
    date: '2/8/2023',
    due: '3/30/2023',
    qty: '2000',
    status: 2,
  },
])

const items3 = ref([
  {
    id: 3,
    name: 'Shelba Thews',
    image: user3,
    mail: 'slbt37@gmail.com',
    date: '7/6/2023',
    due: '7/8/2023',
    qty: '3000',
    status: 3,
  },
])

const themeColor = ref('rgb(var(--v-theme-primary))')
const itemsSelected = ref<Item[]>([])

// tabs data
const tab = ref(0)

function deleteRow(index: number) {
  items.value.splice(index, 1)
}
function deleteRow1(index: number) {
  items1.value.splice(index, 1)
}
function deleteRow2(index: number) {
  items2.value.splice(index, 1)
}
function deleteRow3(index: number) {
  items3.value.splice(index, 1)
}
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface overflow-hidden"
    rounded="lg"
  >
    <VCardItem>
      <VTabs
        v-model="tab"
        color="primary"
      >
        <VTab
          value="1"
          class="font-weight-medium"
        >
          All
          <VChip
            color="primary"
            class="ms-2 font-weight-medium"
            size="small"
          >
            5
          </VChip>
        </VTab>
        <VTab
          value="2"
          class="font-weight-medium"
        >
          Paid
          <VChip
            color="success"
            class="ms-2 font-weight-medium"
            size="small"
          >
            2
          </VChip>
        </VTab>
        <VTab
          value="3"
          class="font-weight-medium"
        >
          Unpaid
          <VChip
            color="warning"
            class="ms-2 font-weight-medium"
            size="small"
          >
            2
          </VChip>
        </VTab>
        <VTab
          value="4"
          class="font-weight-medium"
        >
          Cancelled
          <VChip
            color="error"
            class="ms-2 font-weight-medium"
            size="small"
          >
            1
          </VChip>
        </VTab>
      </VTabs>
      <VDivider />
    </VCardItem>
    <VWindow v-model="tab">
      <VWindowItem value="1">
        <div class="px-6">
          <VRow
            justify="space-between"
            class="align-center mb-3"
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
                placeholder="Search 5 records..."
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
                  color="primary"
                  variant="flat"
                  rounded="md"
                  to="/apps/invoice/create"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-plus"
                      style="width: 18px; height: 18px"
                    />
                  </template>
                  Add invoice
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="download"
                  color="secondary"
                  rounded="md"
                  size="small"
                >
                  <SvgSprite
                    name="custom-document-2"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </div>
        <VDivider />
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
          <template #item-name="{ name, image, mail }">
            <div class="player-wrapper d-flex align-center">
              <VAvatar size="32">
                <img
                  :src="image"
                  width="32"
                  alt="profile"
                >
              </VAvatar>
              <div class="ms-2">
                <h5 class="text-subtitle-1 mb-0">
                  {{ name }}
                </h5>
                <p class="text-h6 text-lightText mb-0">
                  {{ mail }}
                </p>
              </div>
            </div>
          </template>
          <template #item-status="{ status }">
            <VChip
              v-if="status === 1"
              color="success"
              size="small"
            >
              Paid
            </VChip>
            <VChip
              v-if="status === 2"
              color="info"
              size="small"
            >
              Unpaid
            </VChip>
            <VChip
              v-if="status === 3"
              color="error"
              size="small"
            >
              Cancelled
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
                to="/apps/invoice/details"
              >
                <SvgSprite
                  name="custom-eye"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">View</span>
                </VTooltip>
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
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Edit</span>
                </VTooltip>
              </VBtn>
              <VBtn
                icon
                color="error"
                aria-label="trash"
                variant="text"
                rounded="md"
                @click="deleteRow"
              >
                <SvgSprite
                  name="custom-trash"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Delete</span>
                </VTooltip>
              </VBtn>
            </div>
          </template>
        </EasyDataTable>
      </VWindowItem>

      <VWindowItem value="2">
        <div class="px-6">
          <VRow
            justify="space-between"
            class="align-center mb-3"
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
                placeholder="Search 5 records..."
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
                  color="primary"
                  variant="flat"
                  rounded="md"
                  to="/apps/invoice/create"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-plus"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Add invoice
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="download"
                  rounded="md"
                  color="secondary"
                  size="small"
                >
                  <SvgSprite
                    name="custom-document-2"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </div>
        <VDivider />
        <EasyDataTable
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="items1"
          table-class-name="customize-table invoice-table"
          :theme-color="themeColor"
          :search-field="searchField"
          :search-value="searchValue"
          :rows-per-page="5"
        >
          <template #item-name="{ name, image, mail }">
            <div class="player-wrapper d-flex align-center">
              <VAvatar size="32">
                <img
                  :src="image"
                  width="32"
                  alt="profile"
                >
              </VAvatar>
              <div class="ms-2">
                <h5 class="text-subtitle-1 mb-0">
                  {{ name }}
                </h5>
                <p class="text-h6 text-lightText mb-0">
                  {{ mail }}
                </p>
              </div>
            </div>
          </template>
          <template #item-status="{ status }">
            <VChip
              v-if="status === 1"
              color="success"
              label
              size="small"
            >
              Paid
            </VChip>
            <VChip
              v-if="status === 2"
              color="info"
              label
              size="small"
            >
              Unpaid
            </VChip>
            <VChip
              v-if="status === 3"
              color="error"
              label
              size="small"
            >
              Cancelled
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
                to="/apps/invoice/details"
              >
                <SvgSprite
                  name="custom-eye"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">View</span>
                </VTooltip>
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
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Edit</span>
                </VTooltip>
              </VBtn>
              <VBtn
                icon
                color="error"
                aria-label="trash"
                variant="text"
                rounded="md"
                @click="deleteRow1"
              >
                <SvgSprite
                  name="custom-trash"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Delete</span>
                </VTooltip>
              </VBtn>
            </div>
          </template>
        </EasyDataTable>
      </VWindowItem>

      <VWindowItem value="3">
        <div class="px-6">
          <VRow
            justify="space-between"
            class="align-center mb-3"
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
                placeholder="Search 5 records..."
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
                  color="primary"
                  variant="flat"
                  rounded="md"
                  to="/apps/invoice/create"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-plus"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Add invoice
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="download"
                  rounded="md"
                  color="secondary"
                  size="small"
                >
                  <SvgSprite
                    name="custom-document-2"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </div>
        <VDivider />
        <EasyDataTable
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="items2"
          table-class-name="customize-table invoice-table"
          :theme-color="themeColor"
          :search-field="searchField"
          :search-value="searchValue"
          :rows-per-page="5"
        >
          <template #item-name="{ name, image, mail }">
            <div class="player-wrapper d-flex align-center">
              <VAvatar size="32">
                <img
                  :src="image"
                  width="32"
                  alt="profile"
                >
              </VAvatar>
              <div class="ms-2">
                <h5 class="text-subtitle-1 mb-0">
                  {{ name }}
                </h5>
                <p class="text-h6 text-lightText mb-0">
                  {{ mail }}
                </p>
              </div>
            </div>
          </template>
          <template #item-status="{ status }">
            <VChip
              v-if="status === 1"
              color="success"
              label
              size="small"
            >
              Paid
            </VChip>
            <VChip
              v-if="status === 2"
              color="info"
              label
              size="small"
            >
              Unpaid
            </VChip>
            <VChip
              v-if="status === 3"
              color="error"
              label
              size="small"
            >
              Cancelled
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
                to="/apps/invoice/details"
              >
                <SvgSprite
                  name="custom-eye"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">View</span>
                </VTooltip>
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
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Edit</span>
                </VTooltip>
              </VBtn>
              <VBtn
                icon
                color="error"
                aria-label="trash"
                variant="text"
                rounded="md"
                @click="deleteRow2"
              >
                <SvgSprite
                  name="custom-trash"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Delete</span>
                </VTooltip>
              </VBtn>
            </div>
          </template>
        </EasyDataTable>
      </VWindowItem>

      <VWindowItem value="4">
        <div class="px-6">
          <VRow
            justify="space-between"
            class="align-center mb-2"
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
                placeholder="Search 5 records..."
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
                  color="primary"
                  variant="flat"
                  rounded="md"
                  to="/apps/invoice/create"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-plus"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Add invoice
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  aria-label="download"
                  rounded="md"
                  color="secondary"
                  size="small"
                >
                  <SvgSprite
                    name="custom-document-2"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </div>
        <VDivider />
        <EasyDataTable
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="items3"
          table-class-name="customize-table invoice-table"
          :theme-color="themeColor"
          :search-field="searchField"
          :search-value="searchValue"
          :rows-per-page="5"
        >
          <template #item-name="{ name, image, mail }">
            <div class="player-wrapper d-flex align-center">
              <VAvatar size="32">
                <img
                  :src="image"
                  width="32"
                  alt="profile"
                >
              </VAvatar>
              <div class="ms-2">
                <h5 class="text-subtitle-1 mb-0">
                  {{ name }}
                </h5>
                <p class="text-h6 text-lightText mb-0">
                  {{ mail }}
                </p>
              </div>
            </div>
          </template>
          <template #item-status="{ status }">
            <VChip
              v-if="status === 1"
              color="success"
              label
              size="small"
            >
              Paid
            </VChip>
            <VChip
              v-if="status === 2"
              color="info"
              label
              size="small"
            >
              Unpaid
            </VChip>
            <VChip
              v-if="status === 3"
              color="error"
              label
              size="small"
            >
              Cancelled
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
                to="/apps/invoice/details"
              >
                <SvgSprite
                  name="custom-eye"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">View</span>
                </VTooltip>
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
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Edit</span>
                </VTooltip>
              </VBtn>
              <VBtn
                icon
                color="error"
                aria-label="trash"
                variant="text"
                rounded="md"
                @click="deleteRow3"
              >
                <SvgSprite
                  name="custom-trash"
                  style="width: 20px; height: 20px"
                />
                <VTooltip
                  activator="parent"
                  aria-label="tooltip"
                  location="bottom"
                  content-class="smallTooltip"
                >
                  <span class="text-caption">Delete</span>
                </VTooltip>
              </VBtn>
            </div>
          </template>
        </EasyDataTable>
      </VWindowItem>
    </VWindow>
  </VCard>
</template>

<style lang="scss">
.v-tooltip {
  > .v-overlay__content.smallTooltip {
    padding: 2px 10px;
  }
}
</style>
