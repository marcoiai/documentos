<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Pagination' })
const subContent = ref({ content: 'The Pagination component enables the user to select a specific page from a range of pages.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/pagination' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/paginations/' })

// pagination data
const pagination = ref(1)
const pagination2 = ref(1)
const pagination3 = ref(1)
const pagination4 = ref(1)
const pagination5 = ref(2)
const pagination6 = ref(1)
const pagination7 = ref(3)
const pagination8 = ref(6)
const pagination11 = ref(2)
const pagination12 = ref(3)
const pagination13 = ref(4)
const pagination14 = ref(2)
const pagination15 = ref(3)
const pagination16 = ref(6)
const pagination17 = ref(6)
const pagination18 = ref(6)
const pagination19 = ref(6)
const pagination20 = ref(6)
const pagination21 = ref(3)
const pagination22 = ref(2)
const pagination23 = ref(2)
const pagination24 = ref(3)
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
          lg="6"
        >
          <VRow>
            <VCol cols="12">
              <UiParentCard title="Basic">
                <div>
                  <VPagination
                    v-model="pagination"
                    density="compact"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination11"
                    density="compact"
                    variant="flat"
                    active-color="primary"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination12"
                    density="compact"
                    variant="outlined"
                    active-color="secondary"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination13"
                    density="compact"
                    disabled
                    active-color="primary"
                    :length="6"
                  />
                </div>
              </UiParentCard>
            </VCol>
            <!-- Size -->
            <VCol cols="12">
              <UiParentCard title="Size">
                <div class="text-center">
                  <VPagination
                    v-model="pagination6"
                    active-color="primary"
                    density="compact"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination21"
                    active-color="primary"
                    variant="outlined"
                    density="comfortable"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination22"
                    active-color="secondary"
                    variant="flat"
                    :length="6"
                  />
                </div>
              </UiParentCard>
            </VCol>
            <!-- Ranges -->
            <VCol cols="12">
              <UiParentCard title="Ranges">
                <VPagination
                  v-model="pagination4"
                  density="compact"
                  :length="15"
                />
                <VPagination
                  v-model="pagination5"
                  density="compact"
                  variant="flat"
                  active-color="primary"
                  :length="15"
                />
                <VPagination
                  v-model="pagination7"
                  density="compact"
                  variant="outlined"
                  active-color="secondary"
                  :length="15"
                />
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>

        <VCol
          cols="12"
          lg="6"
        >
          <VRow>
            <!-- variant -->
            <VCol cols="12">
              <UiParentCard title="Variants">
                <div class="text-center">
                  <VPagination
                    v-model="pagination2"
                    density="compact"
                    active-color="primary"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination14"
                    density="compact"
                    variant="outlined"
                    active-color="primary"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination15"
                    density="compact"
                    variant="flat"
                    active-color="primary"
                    :length="6"
                  />
                </div>
              </UiParentCard>
            </VCol>
            <!-- Rounded -->
            <VCol cols="12">
              <UiParentCard title="Circular">
                <div class="text-center">
                  <VPagination
                    v-model="pagination3"
                    rounded="circle"
                    density="compact"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination23"
                    rounded="circle"
                    density="compact"
                    variant="outlined"
                    active-color="primary"
                    :length="6"
                  />
                  <VPagination
                    v-model="pagination24"
                    rounded="circle"
                    density="compact"
                    variant="flat"
                    active-color="primary"
                    :length="6"
                  />
                </div>
              </UiParentCard>
            </VCol>
            <!-- Colors -->
            <VCol cols="12">
              <UiParentCard title="Colors">
                <div class="text-center">
                  <VPagination
                    v-model="pagination8"
                    density="compact"
                    :length="10"
                  />
                  <VPagination
                    v-model="pagination16"
                    density="compact"
                    variant="outlined"
                    active-color="secondary"
                    :length="10"
                  />
                  <VPagination
                    v-model="pagination17"
                    density="compact"
                    variant="flat"
                    active-color="success"
                    :length="10"
                  />
                  <VPagination
                    v-model="pagination18"
                    density="compact"
                    variant="flat"
                    active-color="warning"
                    :length="10"
                  />
                  <VPagination
                    v-model="pagination19"
                    density="compact"
                    rounded="circle"
                    active-color="info"
                    :length="10"
                  />
                  <VPagination
                    v-model="pagination20"
                    density="compact"
                    rounded="circle"
                    variant="flat"
                    active-color="error"
                    :length="10"
                  />
                </div>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
