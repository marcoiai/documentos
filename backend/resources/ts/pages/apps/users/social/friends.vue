<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import Banner from '@/views/apps/socialprofile/BannerSection.vue'
import { useFrinedsStore } from '@db/apps/users/friends'

const store = useFrinedsStore()

onMounted(() => {
  store.fetchFrineds()
})

interface FriendItem {
  avatar: string
  name: string
  location: string

  // Add other properties as needed
}

const getfriends = computed<FriendItem[]>(() => {
  return store.friends
})

const searchValue = ref('')

// dropdown data
const actionDD = shallowRef([
  { title: 'Favorite', icon: 'custom-heart-outline' },
  { title: 'Edit Friend List', icon: 'custom-multi-users' },
  { title: 'Remove', icon: 'custom-trash' },
])

const page = ref({ title: 'Social Profile' })

const filteredCards = computed<FriendItem[]>(() => {
  return getfriends.value.filter(card => {
    return card.name.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})

const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '/',
  },
  {
    title: 'Social Profile',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <Banner />
    </VCol>
  </VRow>
  <VRow class="justify-content-end mt-5">
    <VCol cols="12">
      <UiParentCard title="Friends">
        <template #action>
          <VRow class="justify-end">
            <VCol
              cols="12"
              md="3"
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
                    style="width: 18px; height: 18px"
                  />
                </template>
              </VTextField>
            </VCol>
          </VRow>
        </template>

        <VRow>
          <VCol
            v-for="(card, i) in filteredCards"
            :key="i"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <VCard
              variant="outlined"
              rounded="lg"
              class="card-hover-border bg-containerBg friend-card"
            >
              <VCardText>
                <div class="d-flex align-center ga-2">
                  <img
                    :src="card.avatar"
                    :alt="card.avatar"
                    width="40"
                    class="rounded-md"
                  >
                  <div>
                    <h4 class="text-h5 mb-0">
                      {{ card.name }}
                    </h4>
                    <small class="opacity-50 d-block text-truncate d-flex align-center ga-2">
                      <SvgSprite
                        name="custom-navigation-outline"
                        style="width: 14px; height: 14px"
                      />
                      {{ card.location }}
                    </small>
                  </div>
                  <div class="ms-auto">
                    <VMenu rounded="md">
                      <template #activator="{ props }">
                        <VBtn
                          size="x-small"
                          aria-label="menu"
                          v-bind="props"
                          variant="text"
                        >
                          <SvgSprite
                            name="custom-more-outline"
                            style="width: 16px; height: 16px"
                          />
                        </VBtn>
                      </template>
                      <VList
                        elevation="24"
                        aria-label="menu"
                        aria-busy="true"
                        density="compact"
                        rounded="md"
                        class="py-0"
                      >
                        <VListItem
                          v-for="(item, index) in actionDD"
                          :key="index"
                          :value="index"
                          color="secondary"
                        >
                          <template #prepend>
                            <SvgSprite
                              :name="item.icon || ''"
                              class="v-icon--start opacity-50"
                              style="width: 16px; height: 16px"
                            />
                          </template>
                          <VListItemTitle class="text-h6">
                            {{ item.title }}
                          </VListItemTitle>
                        </VListItem>
                      </VList>
                    </VMenu>
                  </div>
                </div>
                <VRow class="mt-5">
                  <VCol cols="6">
                    <VBtn
                      variant="outlined"
                      aria-label="video"
                      color="secondary"
                      size="small"
                      block
                      icon
                      rounded="md"
                    >
                      <VTooltip
                        activator="parent"
                        location="top"
                        aria-label="tooltip"
                      >
                        Video
                      </VTooltip>
                      <SvgSprite
                        name="custom-video-outline"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                  </VCol>
                  <VCol cols="6">
                    <VBtn
                      variant="outlined"
                      aria-label="message"
                      color="primary"
                      size="small"
                      block
                      icon
                      rounded="md"
                    >
                      <VTooltip
                        activator="parent"
                        location="top"
                        aria-label="tooltip"
                      >
                        Message
                      </VTooltip>
                      <SvgSprite
                        name="custom-message-outline"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.friend-card {
  .text-truncate {
    white-space: unset !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
