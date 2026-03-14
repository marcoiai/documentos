<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserCardStore } from '@db/apps/users/UserCard'
import user1 from '@images/users/avatar-1.png'
import user2 from '@images/users/avatar-2.png'
import user3 from '@images/users/avatar-3.png'

// theme breadcrumb
const page = ref({ title: 'Style 02' })

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
    title: 'Style 02',
    disabled: true,
    href: '#',
  },
])

const store = useUserCardStore()

onMounted(() => {
  store.fetchlist2Cards()
})

const searchValue = ref('')
interface ListItem {
  image: string
  badgeStatus: string
  name: string
  designation: string
  subContent: string
  email: string
  phone: number
  location: string
  progressValue: number

  // Add other properties as needed
}

const listCards = computed<ListItem[]>(() => {
  return store.list2
})

const page1 = ref(1)
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
        <template #action>
          <VRow class="justify-end">
            <VCol
              cols="12"
              lg="3"
              md="4"
              sm="5"
            >
              <VTextField
                v-model="searchValue"
                color="primary"
                hide-details
                variant="outlined"
                density="comfortable"
                persistent-placeholder
                placeholder="Search"
                class="mt-sm-0 mt-2 w-100"
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
        </template>
        <VRow
          v-for="card in listCards"
          :key="card.name"
        >
          <VCol
            md="3"
            sm="5"
            cols="12"
            class="mt-2"
          >
            <div class="d-flex align-start ga-4">
              <img
                :src="card.image"
                alt="avatar"
                width="50"
                class="rounded-md"
              >

              <div>
                <h5 class="text-h5 mb-0">
                  {{ card.name }}
                  <VBtn
                    v-if="card.badgeStatus === 'active'"
                    icon
                    variant="tonal"
                    aria-label="verify"
                    rounded="md"
                    color="success"
                    size="small"
                    class="verifybtn"
                  >
                    <SvgSprite
                      name="custom-check-circle-fill"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                </h5>
                <small class="text-subtitle">{{ card.designation }}</small>
                <p class="text-subtitle-2 text-lightText mt-2">
                  {{ card.subContent }}
                </p>
              </div>
            </div>
          </VCol>
          <VCol
            md="2"
            sm="3"
            cols="6"
          >
            <small class="font-weight-bold">Email</small>
            <h5 class="text-h6">
              {{ card.email }}
            </h5>
            <small class="mt-2 d-block font-weight-bold">Phone</small>
            <h5 class="text-h6">
              {{ card.phone }}
            </h5>
          </VCol>
          <VCol
            md="2"
            sm="3"
            cols="6"
          >
            <small class="font-weight-bold">Location</small>
            <h5 class="text-h6">
              {{ card.location }}
            </h5>
            <div class="avatarBox">
              <VAvatar
                variant="flat"
                size="small"
              >
                <VImg
                  :src="user1"
                  alt="John"
                />
              </VAvatar>
              <VAvatar
                variant="flat"
                size="small"
              >
                <VImg
                  :src="user2"
                  alt="John"
                />
              </VAvatar>
              <VAvatar
                variant="flat"
                size="small"
              >
                <VImg
                  :src="user3"
                  alt="John"
                />
              </VAvatar>
              <VAvatar
                color="lightsecondary"
                variant="flat"
                size="small"
              >
                <span class="text-h5">2</span>
              </VAvatar>
            </div>
          </VCol>
          <VCol
            md="5"
            sm="6"
            cols="12"
          >
            <div class="d-flex align-center ga-4 mb-5">
              <span>Progress</span>
              <VProgressLinear
                :model-value="card.progressValue"
                style="left: unset; transform: unset"
                aria-label="progressbar"
                background-color="pink lighten-3"
                rounded
                color="primary"
              />
              <span>{{ card.progressValue }}</span>
            </div>
            <VRow>
              <VCol col="6">
                <VBtn
                  color="secondary"
                  variant="outlined"
                  rounded="md"
                  block
                  size="small"
                >
                  <SvgSprite
                    name="custom-message-outline"
                    class="mr-2"
                    style="width: 16px; height: 16px"
                  />
                  Message
                </VBtn>
              </VCol>
              <VCol col="6">
                <VBtn
                  color="error"
                  variant="outlined"
                  rounded="md"
                  block
                  size="small"
                >
                  <SvgSprite
                    name="custom-slash-outline"
                    class="mr-2"
                    style="width: 16px; height: 16px"
                  />
                  Block
                </VBtn>
              </VCol>
            </VRow>
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <VDivider />
          </VCol>
        </VRow><br>
        <VPagination
          v-model="page1"
          density="compact"
          class="left-pagination"
          active-color="primary"
          :length="6"
        />
      </UiParentCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.verifybtn {
  height: 12px !important;
  width: 12px !important;
  margin-top: -3px;
}
.avatarBox {
  .v-avatar {
    margin-left: -5px;
  }
}
.left-pagination .v-pagination__list {
  justify-content: start;
}
</style>
