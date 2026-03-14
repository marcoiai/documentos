<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserCardStore } from '@db/apps/users/UserCard'

const store = useUserCardStore()

onMounted(() => {
  store.fetchCards()
})

interface Card {
  name: string
  active: string
  avatar: string

  // Add other properties as needed
}

const cards = computed<Card[]>(() => {
  return store.cards
})

// theme breadcrumb
const page = ref({ title: 'Style 02' })

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
    title: 'Style 02',
    disabled: true,
    href: '#',
  },
])

// dropdown data
const actionDD = ref([{ title: 'Edit' }, { title: 'Delete' }])

// cards data

const page1 = ref(1)
const rows = ref([{ title: '10 Rows' }, { title: '20 Rows' }, { title: '30 Rows' }])
const searchValue = ref('')

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
              rounded="lg"
              class="card-hover-border bg-containerBg"
            >
              <VCardText>
                <div class="d-flex align-start">
                  <img
                    :src="card.avatar"
                    :alt="card.avatar"
                    width="60"
                    class="rounded-md"
                  >
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
                        rounded="md"
                        density="compact"
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
                <div class="d-flex align-center justify-space-between mt-3 mb-4">
                  <h4 class="text-h5">
                    {{ card.name }}
                  </h4>
                  <VChip
                    v-if="card.active"
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
                <div class="d-flex ga-4">
                  <VBtn
                    variant="tonal"
                    aria-label="google"
                    size="small"
                    color="error"
                    class="flex-fill"
                  >
                    <SvgSprite
                      name="custom-google-outline"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    aria-label="facebook"
                    size="small"
                    color="facebook"
                    class="flex-fill"
                  >
                    <SvgSprite
                      name="custom-facebook-fill"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    aria-label="apple"
                    size="small"
                    color="linkedin"
                    class="flex-fill"
                  >
                    <SvgSprite
                      name="custom-apple-fill"
                      style="width: 16px; height: 16px"
                    />
                  </VBtn>
                </div>
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
              density="compact"
              active-color="primary"
              class="left-pagination"
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
