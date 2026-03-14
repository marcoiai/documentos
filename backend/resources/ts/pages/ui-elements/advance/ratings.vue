<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Rating' })

const subContent = ref({
  content: 'Ratings provide insight regarding others\' opinions and experiences, and can allow the user to submit a rating of their own.',
})

const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/ratings' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/ratings/' })

// rating data
const rating = ref(3)
const rating2 = ref(2)
const rating3 = ref(5)
const rating4 = ref(2)
const rating5 = ref(2)
const rating6 = ref(3)
const rating7 = ref(3.5)
const rating9 = ref(4)
const rating10 = ref(4)
const rating11 = ref(3)
const rating12 = ref(3.5)

const rating8 = ref(4.5)
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
          md="6"
        >
          <VRow>
            <VCol cols="12">
              <UiParentCard title="Basic">
                <VRow class="align-center mb-2 mx-0 mt-0">
                  <VCol
                    sm="3"
                    cols="12"
                    class="pa-0"
                  >
                    <h6 class="text-h6 mb-0">
                      Controlled
                    </h6>
                  </VCol>
                  <VCol
                    sm="9"
                    cols="12"
                    class="pa-0"
                  >
                    <VRating
                      v-model="rating"
                      color="inputBorder"
                      active-color="warning"
                      density="compact"
                    />
                  </VCol>
                </VRow>
                <VRow class="align-center mb-2 mx-0 mt-0">
                  <VCol
                    sm="3"
                    cols="12"
                    class="pa-0"
                  >
                    <h6 class="text-h6 mb-0">
                      Read only
                    </h6>
                  </VCol>
                  <VCol
                    sm="9"
                    cols="12"
                    class="pa-0"
                  >
                    <VRating
                      v-model="rating4"
                      readonly
                      color="inputBorder"
                      active-color="warning"
                      density="compact"
                    />
                  </VCol>
                </VRow>
                <VRow class="align-center mx-0 my-0">
                  <VCol
                    sm="3"
                    cols="12"
                    class="pa-0"
                  >
                    <h6 class="text-h6 mb-0">
                      Clearable
                    </h6>
                  </VCol>
                  <VCol
                    sm="9"
                    cols="12"
                    class="pa-0"
                  >
                    <VRating
                      v-model="rating3"
                      clearable
                      color="inputBorder"
                      active-color="warning"
                      density="compact"
                    />
                  </VCol>
                </VRow>
              </UiParentCard>
            </VCol>
            <!-- Hover -->
            <VCol cols="12">
              <UiParentCard title="Hover">
                <div>
                  <VRating
                    v-model="rating5"
                    color="warning"
                    hover
                  />
                </div>
              </UiParentCard>
            </VCol>
            <!-- Label -->
            <VCol cols="12">
              <UiParentCard title="Label">
                <div>
                  <VRating
                    v-model="rating6"
                    class="ma-2"
                    :item-labels="['sad', '', '', '', 'happy']"
                    item-label-position="top"
                    color="warning"
                    hover
                  />
                </div>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <!-- Size -->
            <VCol cols="12">
              <UiParentCard title="Size">
                <div>
                  <VRating
                    v-model="rating2"
                    class="d-block"
                    color="inputBorder"
                    active-color="warning"
                    value="3"
                    size="x-small"
                  />

                  <VRating
                    v-model="rating9"
                    class="d-block"
                    color="inputBorder"
                    active-color="warning"
                    value="3"
                    size="small"
                  />

                  <VRating
                    v-model="rating10"
                    class="d-block"
                    color="inputBorder"
                    active-color="warning"
                    value="3"
                    size="large"
                  />

                  <VRating
                    v-model="rating11"
                    class="d-block"
                    color="inputBorder"
                    active-color="warning"
                    value="3"
                    size="x-large"
                  />
                </div>
              </UiParentCard>
            </VCol>
            <!-- Icons -->
            <VCol cols="12">
              <UiParentCard title="Customization">
                <div>
                  <VRating
                    v-model="rating8"
                    class="d-block"
                    color="error"
                    hover
                  >
                    <template #item="props">
                      <svg :class="`pc-icon ${props.isFilled ? 'text-warning mr-1' : 'text-lightText mr-1'}`">
                        <use xlink:href="/assets/svg/sprite.svg#custom-smile-outline" />
                      </svg>
                    </template>
                  </VRating>

                  <VRating
                    v-model="rating7"
                    class="d-block mt-3"
                    color="error"
                    empty-icon="$heartOutline"
                    full-icon="$heart"
                    half-icon="$heartHalf"
                    half-increments
                    hover
                  >
                    <template #item="props">
                      <svg
                        v-if="props.isFilled"
                        class="pc-icon text-error mr-1"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-heart-fill" />
                      </svg>
                      <svg
                        v-else
                        class="pc-icon text-lightText mr-1"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-heart-outline" />
                      </svg>
                    </template>
                  </VRating>
                </div>
              </UiParentCard>
            </VCol>
            <VCol cols="12">
              <UiParentCard title="Half increments">
                <div>
                  <VRating
                    v-model="rating12"
                    hover
                    half-increments
                    color="inputBorder"
                    active-color="warning"
                  />
                  <pre class="mb-0 ml-2">{{ rating12 }}</pre>
                </div>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
