<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from 'moment'

import Flag1 from '@images/flags/1.jpg'
import Flag2 from '@images/flags/2.jpg'
import Flag3 from '@images/flags/3.jpg'
import Flag4 from '@images/flags/4.jpg'
import Flag5 from '@images/flags/5.jpg'

// theme breadcrumb
const page = ref({ title: 'Create' })

const breadcrumbs = ref([
  {
    title: 'Invoice',
    disabled: false,
    href: '#',
  },
  {
    title: 'Create',
    disabled: true,
    href: '#',
  },
])

const dialog = ref(false)
const dialog1 = ref(false)

const items = ref(['Paid', 'Unpaid', 'Cancelled'])

// datepicker
const selectedDate = ref(null)
const selectedDate1 = ref(null)

const computedDateFormattedMomentjs = computed(() => {
  return selectedDate.value ? moment(selectedDate.value).format('D/MM/YYYY') : ''
})

const computedDateFormattedMomentjs1 = computed(() => {
  return selectedDate1.value ? moment(selectedDate1.value).format('D/MM/YYYY') : ''
})

interface ListType {
  title: string
  address: string
  contact: string
  mail: string
}

const SearchList = ref<ListType[]>([
  {
    title: 'Ian Carpenter',
    address: '1754 Ureate, RhodSA5 5BO',
    contact: '+91 1234567890',
    mail: 'iacrpt65@gmail.com',
  },
  {
    title: 'Belle J. Richter',
    address: '1300 Mine RoadQuemado, NM 87829',
    contact: '305-829-7809',
    mail: 'belljrc23@gmail.com',
  },
  {
    title: 'Ritika Yohannan',
    address: '3488 Arbutus DriveMiami, FL',
    contact: '+91 1234567890',
    mail: 'rtyhn65@gmail.com',
  },
  {
    title: 'Jesse G. Hassen',
    address: '3488 Arbutus DriveMiami, FL 33012',
    contact: '+91 1234567890',
    mail: 'jessghs78@gmail.com',
  },
  {
    title: 'Christopher P. Iacovelli',
    address: '4388 House DriveWesrville, OH',
    contact: '+91 1234567890',
    mail: 'crpthl643@gmail.com',
  },
  {
    title: 'Thomas D. Johnson',
    address: '4388 House DriveWestville, OH',
    contact: '+91 1234567890',
    mail: 'thomshj56@gmail.com',
  },
])

const selectedItem = ref<ListType[]>([{ title: '', address: '', contact: '', mail: '' }])

let TitleContent = 'Belle J. Richter'
let AddressContent = '1300 Cooks Mine, NM 87829'
let ContactContent = '305-829-7809'
let MailContent = 'belljrc23@gmail.com'

let TitleContent1 = ''
let AddressContent1 = ''
let ContactContent1 = ''
let MailContent1 = ''

function selectItem(item: ListType) {
  // update content
  TitleContent = item.title
  AddressContent = item.address
  ContactContent = item.contact
  MailContent = item.mail

  TitleContent1 = item.title
  AddressContent1 = item.address
  ContactContent1 = item.contact
  MailContent1 = item.mail
}

function selectItem1(item: ListType) {
  // update content
  TitleContent1 = item.title
  AddressContent1 = item.address
  ContactContent1 = item.contact
  MailContent1 = item.mail
}

// table data
interface TableType {
  number: number
  name: string
  description: string
  qty: number
  price: string
}

const tableData = ref<TableType[]>([
  {
    number: 1,
    name: 'Item name',
    description: 'Description',
    qty: 1,
    price: '1.00',
  },
])

function tableItem() {
  const newItem: TableType = {
    number: tableData.value.length + 1,
    name: 'Item name',
    description: 'Description',
    qty: 1,
    price: '1.00',
  }

  tableData.value.push(newItem)
}

function deleteRow(index: number) {
  tableData.value.splice(index, 1)
}

const country = ref([
  { name: 'Anguilla', avatar: Flag1 },
  { name: 'Brazil', avatar: Flag2 },
  { name: 'Germany', avatar: Flag3 },
  { name: 'United Kingdom', avatar: Flag4 },
  { name: 'United States', avatar: Flag5 },
])

const countryflag = ref(['United States'])
const isUpdating = ref(false)
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
        variant="outlined"
        class="bg-surface"
        rounded="lg"
      >
        <VCardItem class="px-0">
          <VRow class="mx-0 px-3">
            <VCol
              cols="12"
              md="3"
              sm="6"
            >
              <VLabel class="mb-2">
                Invoice Id
              </VLabel>
              <VTextField
                single-line
                variant="outlined"
                aria-label="id"
                hide-details
                type="number"
                color="primary"
                density="comfortable"
                placeholder="1701150654836"
              />
            </VCol>
            <VCol
              cols="12"
              md="3"
              sm="6"
            >
              <VLabel class="mb-2">
                Status
              </VLabel>
              <VAutocomplete
                aria-label="autocomplete"
                model-value="Unpaid"
                :items="items"
                color="primary"
                variant="outlined"
                hide-details
                single-line
                density="comfortable"
              />
            </VCol>
            <VCol
              cols="12"
              md="3"
              sm="6"
            >
              <VLabel class="mb-2">
                Date
              </VLabel>
              <VMenu :close-on-content-click="false">
                <template #activator="{ props }">
                  <VTextField
                    v-model="computedDateFormattedMomentjs"
                    single-line
                    v-bind="props"
                    hide-details
                    variant="outlined"
                    placeholder="DD/MM/YYYY"
                    readonly
                    density="comfortable"
                    color="primary"
                  >
                    <template #append-inner>
                      <SvgSprite
                        name="custom-calendar"
                        class="text-lightText"
                        style="width: 20px; height: 20px"
                      />
                    </template>
                  </VTextField>
                </template>
                <VDatePicker
                  v-model="selectedDate"
                  hide-header
                  color="primary"
                />
              </VMenu>
            </VCol>
            <VCol
              cols="12"
              md="3"
              sm="6"
            >
              <VLabel class="mb-2">
                Due Date
              </VLabel>
              <VMenu :close-on-content-click="false">
                <template #activator="{ props }">
                  <VTextField
                    v-bind="props"
                    v-model="computedDateFormattedMomentjs1"
                    single-line
                    variant="outlined"
                    hide-details
                    placeholder="DD/MM/YYYY"
                    readonly
                    density="comfortable"
                    color="primary"
                  >
                    <template #append-inner>
                      <SvgSprite
                        name="custom-calendar"
                        class="text-lightText"
                        style="width: 20px; height: 20px"
                      />
                    </template>
                  </VTextField>
                </template>
                <VDatePicker
                  v-model="selectedDate1"
                  hide-header
                  color="primary"
                />
              </VMenu>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VCard variant="outlined">
                <VCardItem>
                  <div class="d-flex justify-space-between">
                    <div>
                      <h5 class="text-h5 mb-4">
                        From:
                      </h5>
                      <h6
                        v-if="selectedItem"
                        class="text-subtitle-1 mb-0"
                      >
                        {{ TitleContent }}
                      </h6>
                      <p
                        v-if="selectedItem"
                        class="text-h6 text-lightText mb-0"
                      >
                        {{ AddressContent }}
                      </p>
                      <p
                        v-if="selectedItem"
                        class="text-h6 text-lightText mb-0"
                      >
                        {{ ContactContent }}
                      </p>
                      <p
                        v-if="selectedItem"
                        class="text-h6 text-lightText mb-0"
                      >
                        {{ MailContent }}
                      </p>
                    </div>
                    <VBtn
                      color="secondary"
                      size="small"
                      rounded="md"
                      variant="outlined"
                      @click="dialog = true"
                    >
                      <template #prepend>
                        <SvgSprite
                          name="custom-edit-outline"
                          style="width: 16px; height: 16px"
                        />
                      </template>
                      Change
                    </VBtn>
                    <VDialog
                      v-model="dialog"
                      width="540"
                    >
                      <VCard>
                        <VCardTitle class="py-4 px-6">
                          <div class="d-flex justify-space-between align-center">
                            <h5 class="text-h5 mb-0">
                              Select Address
                            </h5>
                            <VBtn
                              variant="text"
                              color="primary"
                              @click="dialog = false"
                            >
                              <template #prepend>
                                <SvgSprite
                                  name="custom-plus"
                                  style="width: 18px; height: 18px"
                                />
                              </template>
                              Add New
                            </VBtn>
                          </div>
                        </VCardTitle>
                        <VDivider />
                        <VCardText class="pt-5">
                          <div class="custom-scroll overflow-auto" style="height: 360px">
                            <VTextField
                              type="text"
                              variant="outlined"
                              density="comfortable"
                              persistent-placeholder
                              placeholder="Search"
                              hide-details
                            >
                              <template #prepend-inner>
                                <SvgSprite
                                  name="custom-search"
                                  class="text-lightText"
                                  style="width: 18px; height: 18px"
                                />
                              </template>
                            </VTextField>
                            <VList
                              class="py-0 mt-4"
                              aria-label="search address"
                              aria-busy="true"
                            >
                              <VListItem
                                v-for="(item, i) in SearchList"
                                :key="i"
                                class="pa-0 mb-3 rounded-md"
                                color="primary"
                                :value="item.title"
                                @click="selectItem(item)"
                              >
                                <VCard
                                  variant="outlined"
                                  class="overflow-hidden"
                                >
                                  <VCardItem class="pa-3">
                                    <h6 class="text-subtitle-1 mb-0">
                                      {{ item.title }}
                                    </h6>
                                    <div class="d-flex ga-1 flex-wrap">
                                      <p class="text-caption text-lightText mb-0">
                                        {{ item.address }}
                                      </p>
                                      <p class="text-caption text-lightText mb-0">
                                        {{ item.contact }}
                                      </p>
                                      <p class="text-caption text-lightText mb-0">
                                        {{ item.mail }}
                                      </p>
                                    </div>
                                  </VCardItem>
                                </VCard>
                              </VListItem>
                            </VList>
                          </div>
                        </VCardText>
                        <VDivider />
                        <VCardActions class="ms-auto">
                          <VBtn
                            color="error"
                            variant="text"
                            rounded="md"
                            @click="dialog = false"
                          >
                            Cancel
                          </VBtn>
                          <VBtn
                            color="primary"
                            variant="flat"
                            rounded="md"
                            @click="dialog = false"
                          >
                            Add
                          </VBtn>
                        </VCardActions>
                      </VCard>
                    </VDialog>
                  </div>
                </VCardItem>
              </VCard>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VCard
                variant="outlined"
                class="h-100"
              >
                <VCardItem>
                  <div class="d-flex justify-space-between">
                    <div>
                      <h5 class="text-h5 mb-4">
                        To:
                      </h5>
                      <h6
                        v-if="selectedItem"
                        class="text-subtitle-1 mb-0"
                      >
                        {{ TitleContent1 }}
                      </h6>
                      <p
                        v-if="selectedItem"
                        class="text-h6 text-lightText mb-0"
                      >
                        {{ AddressContent1 }}
                      </p>
                      <p
                        v-if="selectedItem"
                        class="text-h6 text-lightText mb-0"
                      >
                        {{ ContactContent1 }}
                      </p>
                      <p
                        v-if="selectedItem"
                        class="text-h6 text-lightText mb-0"
                      >
                        {{ MailContent1 }}
                      </p>
                    </div>
                    <VBtn
                      color="secondary"
                      size="small"
                      rounded="md"
                      variant="outlined"
                      @click="dialog1 = true"
                    >
                      <template #prepend>
                        <SvgSprite
                          name="custom-plus"
                          style="width: 16px; height: 16px"
                        />
                      </template>
                      Add
                    </VBtn>
                    <VDialog
                      v-model="dialog1"
                      width="510"
                    >
                      <VCard>
                        <VCardTitle class="py-4 px-6">
                          <div class="d-flex justify-space-between align-center">
                            <h5 class="text-h5 mb-0">
                              Select Address
                            </h5>
                            <VBtn
                              variant="text"
                              color="primary"
                            >
                              <template #prepend>
                                <SvgSprite
                                  name="custom-plus"
                                  style="width: 18px; height: 18px"
                                />
                              </template>
                              Add New
                            </VBtn>
                          </div>
                        </VCardTitle>
                        <VDivider />
                        <VCardText class="pt-5">
                          <div class="custom-scroll overflow-auto" style="height: 360px">
                            <VTextField
                              type="text"
                              variant="outlined"
                              density="comfortable"
                              persistent-placeholder
                              placeholder="Search"
                              hide-details
                            >
                              <template #prepend-inner>
                                <SvgSprite
                                  name="custom-search"
                                  class="text-lightText"
                                  style="width: 18px; height: 18px"
                                />
                              </template>
                            </VTextField>
                            <VList
                              class="py-0 mt-4"
                              aria-label="search address"
                              aria-busy="true"
                            >
                              <VListItem
                                v-for="(item, i) in SearchList"
                                :key="i"
                                class="pa-0 mb-3 rounded-md"
                                color="primary"
                                :value="item.title"
                                @click="selectItem1(item)"
                              >
                                <VCard
                                  variant="outlined"
                                  class="overflow-hidden"
                                >
                                  <VCardItem class="pa-3">
                                    <h6 class="text-subtitle-1 mb-0">
                                      {{ item.title }}
                                    </h6>
                                    <div class="d-flex ga-1 flex-wrap">
                                      <p class="text-caption text-lightText mb-0">
                                        {{ item.address }}
                                      </p>
                                      <p class="text-caption text-lightText mb-0">
                                        {{ item.contact }}
                                      </p>
                                      <p class="text-caption text-lightText mb-0">
                                        {{ item.mail }}
                                      </p>
                                    </div>
                                  </VCardItem>
                                </VCard>
                              </VListItem>
                            </VList>
                            </div>
                        </VCardText>
                        <VDivider />
                        <VCardActions class="ms-auto">
                          <VBtn
                            color="error"
                            variant="text"
                            rounded="md"
                            @click="dialog1 = false"
                          >
                            Cancel
                          </VBtn>
                          <VBtn
                            color="primary"
                            variant="flat"
                            rounded="md"
                            @click="dialog1 = false"
                          >
                            Add
                          </VBtn>
                        </VCardActions>
                      </VCard>
                    </VDialog>
                  </div>
                </VCardItem>
              </VCard>
            </VCol>
            <VCol cols="12">
              <h5 class="text-h5 mb-4">
                Detail
              </h5>
              <VDivider />
              <VTable
                class="bordered-table"
                hover
              >
                <thead class="bg-containerBg">
                  <tr>
                    <th
                      class="text-start text-uppercase text-caption font-weight-bold"
                      style="width: 50px"
                    >
                      #
                    </th>
                    <th
                      class="text-start text-uppercase text-caption font-weight-bold"
                      style="min-width: 270px"
                    >
                      Name
                    </th>
                    <th
                      class="text-start text-uppercase text-caption font-weight-bold"
                      style="min-width: 270px"
                    >
                      Description
                    </th>
                    <th
                      class="text-start text-uppercase text-caption font-weight-bold"
                      style="width: 270px; min-width: 100px"
                    >
                      Qty
                    </th>
                    <th
                      class="text-start text-uppercase text-caption font-weight-bold"
                      style="width: 270px; min-width: 100px"
                    >
                      Price
                    </th>
                    <th
                      class="text-end text-uppercase text-caption font-weight-bold"
                      style="width: 97px"
                    >
                      Amount
                    </th>
                    <th
                      class="text-center text-uppercase text-caption font-weight-bold"
                      style="width: 124px"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in tableData"
                    :key="index"
                    class="text-lighttext"
                  >
                    <td class="text-subtitle-1 font-weight-regular py-3">
                      {{ item.number }}
                    </td>
                    <td class="text-subtitle-1 font-weight-regular py-3">
                      <VTextField
                        variant="outlined"
                        density="comfortable"
                        single-line
                        hide-details
                        :placeholder="item.name"
                      />
                    </td>
                    <td class="text-subtitle-1 font-weight-regular py-3">
                      <VTextField
                        variant="outlined"
                        density="comfortable"
                        single-line
                        hide-details
                        :placeholder="item.description"
                      />
                    </td>
                    <td class="text-subtitle-1 font-weight-regular py-3">
                      <VTextField
                        variant="outlined"
                        aria-label="quantity"
                        type="number"
                        single-line
                        hide-details
                        density="comfortable"
                        :model-value="item.qty"
                      />
                    </td>
                    <td class="text-subtitle-1 font-weight-regular py-3">
                      <VTextField
                        variant="outlined"
                        aria-label="price"
                        type="number"
                        single-line
                        hide-details
                        density="comfortable"
                        :model-value="item.price"
                      />
                    </td>
                    <td class="text-subtitle-1 font-weight-regular py-3 text-end">
                      ${{ item.price }}
                    </td>
                    <td class="text-subtitle-1 font-weight-regular py-3 text-center">
                      <VBtn
                        color="error"
                        aria-label="trash"
                        icon
                        rounded
                        variant="text"
                        @click="deleteRow(index)"
                      >
                        <SvgSprite
                          name="custom-trash"
                          style="width: 18px; height: 18px"
                        />
                      </VBtn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
              <VDivider />
              <VRow class="mt-2">
                <VCol
                  cols="12"
                  sm="7"
                  md="8"
                >
                  <VBtn
                    color="primary"
                    border="primary dashed thin opacity-100"
                    rounded="md"
                    variant="tonal"
                    @click="tableItem"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-plus"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    Add item
                  </VBtn>
                </VCol>
                <VCol
                  cols="12"
                  sm="5"
                  md="4"
                >
                  <VRow>
                    <VCol cols="6">
                      <VLabel class="mb-2">
                        Discount(%)
                      </VLabel>
                      <VTextField
                        variant="outlined"
                        aria-label="discount"
                        single-line
                        hide-details
                        type="number"
                        density="comfortable"
                        model-value="0"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VLabel class="mb-2">
                        Tax(%)
                      </VLabel>
                      <VTextField
                        variant="outlined"
                        aria-label="tax"
                        single-line
                        hide-details
                        type="number"
                        density="comfortable"
                        model-value="0"
                      />
                    </VCol>
                  </VRow>
                  <VList
                    density="compact"
                    aria-label="total list"
                    aria-busy="true"
                  >
                    <VListItem class="px-0">
                      <p class="text-h6 text-lightText mb-0">
                        Sub Total:
                      </p>
                      <template #append>
                        <p class="text-h6 mb-0">
                          $0.00
                        </p>
                      </template>
                    </VListItem>
                    <VListItem class="px-0">
                      <p class="text-h6 text-lightText mb-0">
                        Discount:
                      </p>
                      <template #append>
                        <p class="text-h6 mb-0 text-success">
                          $0.00
                        </p>
                      </template>
                    </VListItem>
                    <VListItem class="px-0">
                      <p class="text-h6 text-lightText mb-0">
                        Tax:
                      </p>
                      <template #append>
                        <p class="text-h6 mb-0">
                          $0.00
                        </p>
                      </template>
                    </VListItem>
                    <VListItem class="px-0">
                      <p class="text-subtitle-1 mb-0">
                        Grand Total:
                      </p>
                      <template #append>
                        <p class="text-subtitle-1 mb-0">
                          $0.00
                        </p>
                      </template>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="12">
              <VLabel class="mb-2">
                Notes
              </VLabel>
              <VTextarea
                variant="outlined"
                single-line
                hide-details
                placeholder="Address"
              />
            </VCol>
            <VRow class="mx-0 mb-0 mt-2 align-end">
              <VCol
                cols="12"
                md="5"
                lg="3"
                sm="6"
              >
                <VLabel class="mb-2">
                  Set Currency*
                </VLabel>
                <VAutocomplete
                  v-model="countryflag"
                  :disabled="isUpdating"
                  :items="country"
                  variant="outlined"
                  item-title="name"
                  item-value="name"
                  hide-details
                  label="Select"
                  single-line
                  color="primary"
                  density="comfortable"
                  clearable
                  aria-label="autocomplete"
                  clear-icon="$close"
                >
                  <template #item="{ props, item }">
                    <VListItem
                      v-bind="props"
                      :title="item?.raw?.name"
                    >
                      <template #prepend>
                        <VAvatar
                          size="18"
                          rounded="sm"
                        >
                          <img
                            :src="item?.raw?.avatar"
                            width="18"
                            alt="flag"
                          >
                        </VAvatar>
                      </template>
                    </VListItem>
                  </template>
                </VAutocomplete>
              </VCol>
              <VCol
                cols="12"
                md="7"
                lg="9"
              >
                <div class="text-end d-flex flex-wrap justify-end ga-2">
                  <VBtn
                    color="secondary"
                    rounded="md"
                    variant="tonal"
                    disabled
                  >
                    Preview
                  </VBtn>
                  <VBtn
                    color="secondary"
                    rounded="md"
                    variant="outlined"
                  >
                    Save
                  </VBtn>
                  <VBtn
                    color="primary"
                    rounded="md"
                    variant="flat"
                  >
                    Create & Send
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
