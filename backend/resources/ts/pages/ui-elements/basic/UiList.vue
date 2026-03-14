<script setup lang="ts">
import { ref, shallowRef } from 'vue'

// assets
import User1 from '@images/users/avatar-1.png'
import User2 from '@images/users/avatar-2.png'
import User3 from '@images/users/avatar-3.png'
import User4 from '@images/users/avatar-4.png'
import User5 from '@images/users/avatar-5.png'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Lists' })
const subContent = ref({ content: 'Lists are continuous, vertical indexes of text or images.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/uilist' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/lists/' })

// List 1,3 Data
const list1 = shallowRef([
  {
    name: 'List item 01',
    id: 1,
    link: '',
  },
  {
    name: 'List item 02',
    id: 2,
    link: '',
  },
  {
    name: 'Sample',
    icon: 'custom-layout-outline',
    id: 3,
    link: '/ui-elements/basic/uilist',
  },
  {
    name: 'Page',
    icon: 'custom-page-outline-1',
    id: 4,
    link: '',
  },
  {
    name: 'Ui elements',
    icon: 'custom-element-outline',
    id: 5,
    link: '',
  },
])

// List 2 data
const open = ref(['Users'])
const open1 = ref(['Users'])

// List 5 data
const folders = shallowRef([
  {
    image: User1,
    subtitle: '— I wll be in your neighborhood doing errands this…',
    title: 'Brunch this weekend?',
    submaintitle: 'Ali Connors',
  },
  {
    image: User2,
    subtitle: '— Wish I could come, but I\'m out of town this…',
    title: 'Summer BBQ',
    submaintitle: 'to Scott, Alex, Jennifer',
  },
  {
    image: User3,
    subtitle: '— Do you have Paris recommendations? Have you ever…',
    title: 'Oui Oui',
    submaintitle: 'Sandra Adams',
  },
])

// List folder data
const folders1 = shallowRef([
  {
    icon: 'custom-camera-fill',
    subtitle: 'Jan 9, 2023',
    title: 'Photos',
    color: 'warning',
  },
  {
    icon: 'custom-filter-fill',
    subtitle: 'Jan 7, 2023',
    title: 'Work',
    color: 'primary',
  },
  {
    icon: 'custom-aim-fill',
    subtitle: 'July 20, 2023',
    title: 'Vacation',
    color: 'info',
  },
])

const transaction = shallowRef([
  {
    icon: 'custom-gift-outline',
    subtitle: 'Today, 2:00 AM',
    title: 'Payment from #002434',
    color: 'success',
    price: '+ $1,430',
    pricepercent: '78%',
  },
  {
    icon: 'custom-message-dot-outline',
    subtitle: '5 August, 1:45 PM',
    title: 'Payment from #984947',
    color: 'primary',
    price: '+ $302',
    pricepercent: '8%',
  },
  {
    icon: 'custom-setup-outline',
    subtitle: '7 hours ago',
    title: 'Payment from #988784',
    color: 'error',
    price: '+ $682',
    pricepercent: '16%',
  },
])

const userList = shallowRef([
  {
    image: User4,
    subtitle: 'Developer',
    title: 'Jone Doe',
  },
  {
    image: User5,
    subtitle: 'Project leader',
    title: 'Aidal Danny',
  },
])

const notificationList = shallowRef([
  {
    image: User1,
    subtitle: '2 min ago',
    title: 'birthday today.',
    name: 'Cristina danny\'s',
    time: '3:00 AM',
  },
  {
    image: User2,
    subtitle: '5 August',
    title: 'commented your post.',
    name: 'Aida Burg',
    time: '6:00 PM',
  },
  {
    image: User3,
    subtitle: '7 hours ago',
    title: 'Profile Complete',
    lastContent: '60%',
    time: '2:45 PM',
  },
  {
    image: User4,
    subtitle: 'Daily scrum meeting time',
    title: 'invited to join',
    name: 'Cristina Danny',
    lastContent: 'Meeting.',
    time: '9:10 PM',
  },
])
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol cols="12">
      <VRow>
        <!-- Basic -->
        <VCol
          cols="12"
          sm="6"
        >
          <UiTitleCard
            title="Basic"
            class-name="px-0 pb-0"
          >
            <VList
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                v-for="(list, i) in list1"
                :key="i"
                :value="list"
                rounded="0"
                color="lightText"
                border
              >
                <template #prepend>
                  <SvgSprite
                    v-if="list.icon"
                    :name="list.icon || ''"
                    class="text-lightText me-2"
                    style="width: 18px; height: 18px"
                  />
                </template>
                <VListItemTitle class="text-h6 text-lightText">
                  {{ list.name }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- Nested List -->
        <VCol
          cols="12"
          sm="6"
        >
          <UiTitleCard
            title="Nested"
            class-name="px-0 pb-0"
          >
            <VList
              v-model:opened="open"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListGroup value="Users">
                <template #activator="{ props }">
                  <VListItem
                    v-bind="props"
                    rounded="0"
                    color="secondary"
                    border
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-layout-outline"
                        class="text-lightText me-2"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    <VListItemTitle class="text-h6 text-lightText">
                      Sample
                    </VListItemTitle>
                  </VListItem>
                </template>
                <VListItem
                  value="List item 01"
                  rounded="0"
                  variant="tonal"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 01
                  </VListItemTitle>
                </VListItem>
                <VListItem
                  value="List item 02"
                  rounded="0"
                  variant="tonal"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 02
                  </VListItemTitle>
                </VListItem>
              </VListGroup>
            </VList>
            <VList
              v-model:opened="open1"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListGroup value="Settings">
                <template #activator="{ props }">
                  <VListItem
                    v-bind="props"
                    rounded="0"
                    color="secondary"
                    border
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-setup-outline"
                        class="text-lightText me-2"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    <VListItemTitle class="text-h6 text-lightText">
                      Settings
                    </VListItemTitle>
                  </VListItem>
                </template>
                <VListItem
                  value="List item 03"
                  rounded="0"
                  variant="tonal"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 03
                  </VListItemTitle>
                </VListItem>
                <VListItem
                  value="List item 04"
                  rounded="0"
                  variant="tonal"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 04
                  </VListItemTitle>
                </VListItem>
              </VListGroup>
            </VList>
            <VList
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                value="Ui elements"
                color="secondary"
                rounded="md"
                border
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-element-outline"
                    class="text-lightText me-2"
                    style="width: 18px; height: 18px"
                  />
                </template>
                <VListItemTitle class="text-h6 text-lightText">
                  Ui elements
                </VListItemTitle>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- Selected List Item -->
        <VCol
          cols="12"
          sm="6"
        >
          <UiTitleCard
            title="Selected"
            class-name="px-0 pb-0"
          >
            <VList
              v-model:opened="open1"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListGroup value="Users">
                <template #activator="{ props }">
                  <VListItem
                    v-bind="props"
                    rounded="0"
                    color="primary"
                    border
                    active
                    variant="text"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-layout-outline"
                        class="text-lightText me-2"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    <VListItemTitle class="text-h6 text-lightText">
                      Sample
                    </VListItemTitle>
                  </VListItem>
                </template>
                <VListItem
                  value="List item 01"
                  rounded="0"
                  variant="text"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 01
                  </VListItemTitle>
                </VListItem>
                <VListItem
                  value="List item 02"
                  rounded="0"
                  variant="text"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 02
                  </VListItemTitle>
                </VListItem>
              </VListGroup>
            </VList>
            <VList
              v-model:opened="open1"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListGroup value="Settings">
                <template #activator="{ props }">
                  <VListItem
                    v-bind="props"
                    rounded="0"
                    color="primary"
                    border
                    variant="text"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-setup-outline"
                        class="text-lightText me-2"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    <VListItemTitle class="text-h6 text-lightText">
                      Settings
                    </VListItemTitle>
                  </VListItem>
                </template>
                <VListItem
                  value="List item 03"
                  rounded="0"
                  variant="text"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 03
                  </VListItemTitle>
                </VListItem>
                <VListItem
                  value="List item 04"
                  rounded="0"
                  variant="text"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    List item 04
                  </VListItemTitle>
                </VListItem>
              </VListGroup>
            </VList>
            <VList
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                value="Ui elements"
                color="secondary"
                rounded="md"
                border
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-element-outline"
                    class="text-lightText me-2"
                    style="width: 18px; height: 18px"
                  />
                </template>
                <VListItemTitle class="text-h6 text-lightText">
                  Ui elements
                </VListItemTitle>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- align List -->
        <VCol
          cols="12"
          sm="6"
        >
          <UiTitleCard
            title="Align Item"
            class-name="px-0 pb-0 user-list"
          >
            <VList
              lines="two"
              class="pt-3 pb-7"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                v-for="folder in folders"
                :key="folder.title"
                :subtitle="folder.subtitle"
                class="pe-0 pb-0 align-start"
              >
                <template #prepend>
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      :src="folder.image"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                </template>

                <template #title>
                  <h5 class="text-h6 mb-0">
                    {{ folder.title }}
                  </h5>
                </template>
                <template #subtitle>
                  <span class="text-subtitle-2 text-darkText">{{ folder.submaintitle }}</span>
                  <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                </template>
                <VDivider
                  inset
                  class="mt-3"
                />
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- Folder List -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Folder"
            class-name="px-0 pb-0"
          >
            <VList
              lines="two"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                v-for="folder in folders1"
                :key="folder.title"
                :subtitle="folder.subtitle"
              >
                <template #prepend>
                  <VAvatar
                    size="40"
                    :color="folder.color"
                    :class="`text-${folder.color} border-solid border-${folder.color} border-thin border-opacity-100`"
                    variant="tonal"
                  >
                    <SvgSprite
                      :name="folder.icon || ''"
                      style="width: 18px; height: 18px"
                    />
                  </VAvatar>
                </template>

                <template #title>
                  <h5 class="text-h6 mb-0">
                    {{ folder.title }}
                  </h5>
                </template>
                <template #subtitle>
                  <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                </template>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- transaction List -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Transaction History"
            class-name="px-0 pb-0"
          >
            <VList
              lines="two"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                v-for="history in transaction"
                :key="history.title"
                border
              >
                <template #prepend>
                  <VAvatar
                    size="40"
                    :color="history.color"
                    variant="flat"
                  >
                    <SvgSprite
                      :name="history.icon || ''"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                </template>
                <div class="d-flex align-center justify-space-between w-100 ga-2">
                  <div>
                    <h6 class="text-subtitle-1 text-lightText mb-0">
                      {{ history.title }}
                    </h6>
                    <span class="text-subtitle-2 text-lightText font-weight-regular">{{ history.subtitle }}</span>
                  </div>
                  <div class="text-end">
                    <h6 class="text-subtitle-1 text-lightText mb-0">
                      {{ history.price }}
                    </h6>
                    <span class="text-h6 text-lightText">{{ history.pricepercent }}</span>
                  </div>
                </div>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- Scrollable List -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Scrollable"
            class-name="px-0 pb-0"
          >
            <PerfectScrollbar style="max-height: 310px" :options="{ suppressScrollX: true }">
              <VList
                class="py-0"
                aria-label="list"
                aria-busy="true"
              >
                <VListItem
                  v-for="(n, index) in 200"
                  :key="index"
                  :value="n"
                  color="secondary"
                  border
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    Item {{ n }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </PerfectScrollbar>
          </UiTitleCard>
        </VCol>
        <!-- Notification List -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Notification"
            class-name="px-0 pb-0 user-list"
          >
            <VList
              lines="two"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                v-for="item in notificationList"
                :key="item.title"
                border
              >
                <template #prepend>
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      :src="item.image"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                </template>
                <div class="d-flex align-start justify-space-between w-100 ga-2">
                  <div>
                    <h6 class="text-subtitle-1 text-lightText mb-0">
                      <span class="mr-1">{{ item.name }}</span>
                      <span class="font-weight-regular">{{ item.title }}</span>
                      <span class="ml-1">{{ item.lastContent }}</span>
                    </h6>
                    <span class="text-subtitle-2 text-lightText font-weight-regular">{{ item.subtitle }}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-caption text-lightText">{{ item.time }}</span>
                  </div>
                </div>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
        <!-- Users List -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Users"
            class-name="px-0 pb-0 user-list"
          >
            <VList
              lines="two"
              class="py-0"
              aria-label="list"
              aria-busy="true"
            >
              <VListItem
                v-for="item in userList"
                :key="item.title"
                border
              >
                <template #prepend>
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      :src="item.image"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                </template>
                <div class="d-flex align-center justify-space-between w-100">
                  <div>
                    <h6 class="text-subtitle-1 mb-0">
                      {{ item.title }}
                    </h6>
                    <span class="text-subtitle-2 text-lightText font-weight-regular">{{ item.subtitle }}</span>
                  </div>
                  <div class="text-right">
                    <VBtn
                      variant="text"
                      aria-label="menu"
                      icon
                      color="secondary"
                      rounded="md"
                      size="small"
                    >
                      <SvgSprite
                        name="custom-more-outline"
                        style="width: 20px; height: 20px"
                      />
                    </VBtn>
                  </div>
                </div>
              </VListItem>
            </VList>
          </UiTitleCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.user-list {
  .v-list-item__prepend {
    align-self: flex-start;
  }
  .v-list-item-subtitle {
    padding-right: 40px;
    [dir="rtl"] & {
      padding-right: unset;
      padding-left: 40px;
    }
    @media (max-width: 991px) {
      padding-right: 20px;
      [dir="rtl"] & {
        padding-right: unset;
        padding-left: 20px;
      }
    }
  }
}
</style>
