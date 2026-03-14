<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserCardStore } from '@db/apps/users/UserCard'

const store = useUserCardStore()

onMounted(() => {
  store.fetchCards()
})

// theme breadcrumb
const page = ref({ title: 'Style 03' })

const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '#',
  },
  {
    title: 'Cards',
    disabled: false,
    href: '#',
  },
  {
    title: 'Style 03',
    disabled: true,
    href: '#',
  },
])

// cards data

const page1 = ref(1)
const rows = ref([{ title: '10 Rows' }, { title: '20 Rows' }, { title: '30 Rows' }])
const searchValue = ref('')

interface Card {
  name: string
  value: number
  profile: string
  avatar: string
  post: string
  status: string

  // Add other properties as needed
}

const cards = computed<Card[]>(() => {
  return store.cards
})

const filteredCards = computed<Card[]>(() => {
  return cards.value.filter(card => {
    return card.name.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow class="justify-content-end">
    <VCol cols="12">
      <UiParentCard title="Cards">
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
                density="comfortable"
                variant="outlined"
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

        <VRow>
          <VCol
            v-for="(card, i) in filteredCards"
            :key="i"
            cols="12"
            md="4"
            xl="3"
            sm="6"
          >
            <VCard
              variant="outlined"
              class="overflow-hidden"
              rounded="lg"
            >
              <VImg
                :src="card.profile"
                :alt="card.profile"
                height="125px"
                cover
              />

              <div class="text-center mt-n8 position-relative">
                <div class="d-flex justify-center">
                  <img
                    :src="card.avatar"
                    :alt="card.avatar"
                    width="72"
                    class="rounded-circle"
                  >
                </div>
                <h4 class="text-h4 mt-4 mb-3">
                  {{ card.name }}
                </h4>
                <span class="text-subtitle-1 text-medium-emphasis font-weight-medium d-block mb-2">{{ card.post }}</span>
                <VChip
                  v-if="card.status"
                  color="success"
                  size="small"
                >
                  Active
                </VChip>
                <VChip
                  v-else
                  color="error"
                  size="small"
                >
                  Rejected
                </VChip>
              </div>
              <VCardText>
                <div class="d-flex ga-4 mt-4 justify-center">
                  <VBtn
                    variant="tonal"
                    aria-label="google"
                    icon
                    color="error"
                  >
                    <SvgSprite
                      name="custom-google-outline"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    aria-label="facebook"
                    icon
                    color="facebook"
                  >
                    <SvgSprite
                      name="custom-facebook-fill"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    aria-label="apple"
                    icon
                    color="linkedin"
                  >
                    <SvgSprite
                      name="custom-apple-fill"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                </div>
                <VBtn
                  variant="outlined"
                  rounded="md"
                  color="primary"
                  class="flex-fill w-100 mt-4"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-message-fill"
                      style="width: 16px; height: 16px"
                    />
                  </template>
                  Message
                </VBtn>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <VRow class="justify-space-between mt-5">
          <VCol
            cols="12"
            lg="5"
            class="text-left"
          >
            <VPagination
              v-model="page1"
              class="left-pagination"
              density="compact"
              active-color="primary"
              :length="6"
            />
          </VCol>
          <VCol
            cols="12"
            lg="5"
            class="text-end"
          >
            <VMenu transition="scale-transition">
              <template #activator="{ props }">
                <VBtn
                  color="inherit"
                  rounded="md"
                  variant="text"
                  v-bind="props"
                >
                  10 Rows
                  <template #append>
                    <SvgSprite
                      name="custom-chevron-outline"
                      style="width: 16px; height: 16px; transform: rotate(90deg)"
                    />
                  </template>
                </VBtn>
              </template>

              <VList>
                <VListItem
                  v-for="(row, i) in rows"
                  :key="i"
                  :value="i"
                >
                  <VListItemTitle>{{ row.title }}</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>

<style>
.left-pagination .v-pagination__list {
  justify-content: start;
}
</style>
