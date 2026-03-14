<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Banner from '@/views/apps/socialprofile/BannerSection.vue'
import { useGalleryStore } from '@db/apps/users/gallery'

const store = useGalleryStore()

onMounted(() => {
  store.fetchGallery()
})

interface GalleryItem {
  title: string
  image: string
  dateTime: string

  // Add other properties as needed
}

const getPhotos = computed<GalleryItem[]>(() => {
  return store.gallery
})

const searchValue = ref('')

// dropdown data
const actionDD = ref([
  { title: 'Remove Tag' },
  { title: 'Download' },
  { title: 'Make Profile Picture' },
  { title: 'Make Cover Photo' },
  { title: 'Find support or Report Photo' },
])

const page = ref({ title: 'Social Profile' })

const filteredCards = computed<GalleryItem[]>(() => {
  return getPhotos.value.filter(card => {
    return card.title.toLowerCase().includes(searchValue.value.toLowerCase())
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
      <UiParentCard title="Gallery">
        <template #action>
          <VRow class="justify-end">
            <VCol
              cols="12"
              md="5"
              sm="7"
            >
              <div class="d-sm-flex align-center ga-4 mt-4 mt-sm-0">
                <VTextField
                  v-model="searchValue"
                  color="primary"
                  hide-details
                  class="w-100"
                  variant="outlined"
                  density="comfortable"
                  persistent-placeholder
                  placeholder="Search"
                >
                  <template #prepend-inner>
                    <SvgSprite
                      name="custom-search"
                      class="text-lightText"
                      style="width: 18px; height: 18px"
                    />
                  </template>
                </VTextField>
                <VBtn
                  color="secondary"
                  rounded="md"
                  size="large"
                  variant="flat"
                  class="mt-4 mt-sm-0"
                >
                  Add Photos
                </VBtn>
              </div>
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
              class="card-hover-border bg-containerBg overflow-hidden"
            >
              <img
                :src="card.image"
                alt="gallery"
                class="w-100"
              >
              <VCardText class="pa-3">
                <div class="d-flex align-center ga-2">
                  <div style="min-width: 140px">
                    <h4 class="text-subtitle-1">
                      {{ card.title }}
                    </h4>
                    <small class="opacity-50 d-block text-truncate d-flex align-center ga-2">
                      <SvgSprite
                        name="custom-calendar-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                      {{ card.dateTime }}
                    </small>
                  </div>
                  <div class="ms-auto">
                    <VMenu rounded="md">
                      <template #activator="{ props }">
                        <VBtn
                          size="x-small"
                          aria-label="menu"
                          color="secondary"
                          v-bind="props"
                          icon
                          rounded="md"
                          variant="text"
                        >
                          <SvgSprite
                            name="custom-more-outline"
                            class="text-lightText"
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
                          <VListItemTitle class="text-h6">
                            {{ item.title }}
                          </VListItemTitle>
                        </VListItem>
                      </VList>
                    </VMenu>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
