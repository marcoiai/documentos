<script setup lang="ts">
import { ref } from 'vue'

// assets
import imageCard from '@images/component/card-media.png'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Card' })
const subContent = ref({ content: 'Cards contain content and actions about a single subject.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/cards' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/cards/' })

// tabs data
const tab = ref(null)
const tab1 = ref(null)
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
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Basic">
            <VRow>
              <VCol
                cols="12"
                sm="6"
              >
                <VCard class="card-shadow pa-5 h-100">
                  <h6 class="text-h6 pa-0 mb-0">
                    Card Subtitle
                  </h6>
                  <VCardSubtitle class="px-0">
                    This is card description
                  </VCardSubtitle>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VCard class="card-shadow">
                  <div class="card-header pa-5">
                    <VCardTitle class="text-h6 pa-0">
                      Card Title
                    </VCardTitle>
                  </div>
                  <VDivider />
                  <div class="pa-5">
                    <h6 class="text-h6 pa-0 mb-0">
                      Card Subtitle
                    </h6>
                    <VCardSubtitle class="px-0">
                      This is card description
                    </VCardSubtitle>
                  </div>
                </VCard>
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Outlined">
            <VRow>
              <VCol
                cols="12"
                sm="6"
              >
                <VCard
                  class="pa-5 h-100"
                  variant="outlined"
                >
                  <h6 class="text-h6 pa-0 mb-0">
                    Card Subtitle
                  </h6>
                  <VCardSubtitle class="px-0">
                    This is card description
                  </VCardSubtitle>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VCard variant="outlined">
                  <div class="card-header pa-5">
                    <VCardTitle class="text-h6 pa-0">
                      Card Title
                    </VCardTitle>
                  </div>
                  <VDivider />
                  <div class="pa-5">
                    <h6 class="text-h6 pa-0 mb-0">
                      Card Subtitle
                    </h6>
                    <VCardSubtitle class="px-0">
                      This is card description
                    </VCardSubtitle>
                  </div>
                </VCard>
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Actions">
            <VRow>
              <VCol cols="12">
                <VCard variant="outlined">
                  <VCardItem class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                      <VCardTitle class="text-h6 pa-0">
                        Card Title
                      </VCardTitle>
                      <VBtn
                        color="primary"
                        variant="text"
                      >
                        More
                      </VBtn>
                    </div>
                  </VCardItem>
                  <VDivider />
                  <VCardItem class="pa-5">
                    <VCardSubtitle class="text-h5 pb-3">
                      Card Subtitle
                    </VCardSubtitle>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim.
                    </p>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VCard variant="outlined">
                  <VCardItem class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                      <VCardTitle class="text-h6 pa-0">
                        Card Title
                      </VCardTitle>
                      <VBtn
                        color="secondary"
                        aria-label="menu"
                        variant="text"
                        icon
                        rounded="md"
                        size="small"
                      >
                        <SvgSprite
                          name="custom-more-outline"
                          style="width: 16px; height: 16px"
                        />
                      </VBtn>
                    </div>
                  </VCardItem>
                  <VDivider />
                  <VCardItem class="pa-5">
                    <VCardSubtitle class="text-h5 pb-3">
                      Card Subtitle
                    </VCardSubtitle>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper
                      ligula. Mauris purus sem.
                    </p>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VCard variant="outlined">
                  <VCardItem class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                      <VCardTitle class="text-h6 pa-0">
                        Card Title
                      </VCardTitle>
                      <VBtn
                        color="secondary"
                        aria-label="menu"
                        variant="text"
                        icon
                        rounded="md"
                        size="small"
                      >
                        <SvgSprite
                          name="custom-more-outline"
                          style="width: 16px; height: 16px"
                        />
                      </VBtn>
                    </div>
                  </VCardItem>
                  <VDivider />
                  <VCardItem class="pa-5">
                    <VCardSubtitle class="text-h5 pb-3">
                      Card Subtitle
                    </VCardSubtitle>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </VCardItem>
                  <VDivider />
                  <VCardActions class="pa-2">
                    <VBtn
                      class="flex-grow-1"
                      aria-label="setting"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-setting-outline-2"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn
                      class="flex-grow-1 ms-0"
                      aria-label="edit"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-edit-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn
                      class="flex-grow-1 ms-0"
                      aria-label="menu"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-more-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px; transform: rotate(90deg)"
                      />
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Complex Interaction">
            <VRow>
              <VCol cols="12">
                <VCard variant="outlined">
                  <VTabs
                    v-model="tab"
                    color="primary"
                  >
                    <VTab value="one">
                      Article
                    </VTab>
                    <VTab value="two">
                      App
                    </VTab>
                    <VTab value="three">
                      Project
                    </VTab>
                  </VTabs>
                  <VDivider />
                  <VCardText>
                    <VWindow v-model="tab">
                      <VWindowItem value="one">
                        <h5 class="text-h5 text-lightText">
                          Article Content
                        </h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper
                          ligula. Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                        </p>
                        <p class="mb-0">
                          Suspendisse sed lectus ac nunc rhoncus scelerisque.
                        </p>
                      </VWindowItem>

                      <VWindowItem value="two">
                        <h5 class="text-h5 text-lightText">
                          App Content
                        </h5>
                        <p class="mb-0">
                          Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non
                          mattis. Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                        </p>
                      </VWindowItem>

                      <VWindowItem value="three">
                        <h5 class="text-h5 text-lightText">
                          Project Content
                        </h5>
                        <p class="mb-0">
                          Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu
                          ligula placerat cursus in nec est.
                        </p>
                      </VWindowItem>
                    </VWindow>
                  </VCardText>
                </VCard>
              </VCol>
              <VCol cols="12">
                <VCard variant="outlined">
                  <VCardItem class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                      <VCardTitle class="text-h6 pa-0">
                        Card Title
                      </VCardTitle>
                      <VBtn
                        color="primary"
                        variant="text"
                      >
                        More
                      </VBtn>
                    </div>
                  </VCardItem>
                  <VTabs
                    v-model="tab1"
                    color="primary"
                  >
                    <VTab value="one">
                      Article
                    </VTab>
                    <VTab value="two">
                      App
                    </VTab>
                    <VTab value="three">
                      Project
                    </VTab>
                  </VTabs>
                  <VDivider />
                  <VCardText>
                    <VWindow v-model="tab1">
                      <VWindowItem value="one">
                        <h5 class="text-h5 text-lightText">
                          Article Content
                        </h5>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper
                          ligula. Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                        </p>
                      </VWindowItem>

                      <VWindowItem value="two">
                        <h5 class="text-h5 text-lightText">
                          App Content
                        </h5>
                        <p class="mb-0">
                          Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non
                          mattis. Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                        </p>
                      </VWindowItem>

                      <VWindowItem value="three">
                        <h5 class="text-h5 text-lightText">
                          Project Content
                        </h5>
                        <p class="mb-0">
                          Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu
                          ligula placerat cursus in nec est.
                        </p>
                      </VWindowItem>
                    </VWindow>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          lg="9"
        >
          <UiParentCard title="Media">
            <VRow>
              <VCol
                cols="12"
                md="4"
                sm="6"
              >
                <VCard variant="outlined">
                  <VImg
                    cover
                    height="250"
                    alt="card image"
                    :src="imageCard"
                  />
                  <VCardItem class="pa-5">
                    <VCardSubtitle class="text-h5 pb-3">
                      Card Subtitle
                    </VCardSubtitle>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu.
                    </p>
                  </VCardItem>
                  <VDivider />
                  <VCardActions class="pa-2">
                    <VBtn
                      class="flex-grow-1"
                      aria-label="setting"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-setting-outline-2"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn
                      class="flex-grow-1 ms-0"
                      aria-label="edit"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-edit-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn
                      class="flex-grow-1 ms-0"
                      aria-label="menu"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-more-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px; transform: rotate(90deg)"
                      />
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                md="4"
                sm="6"
              >
                <VCard variant="outlined">
                  <VCardItem class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                      <VCardTitle class="text-h6 pa-0">
                        Card Title
                      </VCardTitle>
                      <VBtn
                        color="secondary"
                        aria-label="menu"
                        variant="text"
                        icon
                        rounded="md"
                        size="small"
                      >
                        <SvgSprite
                          name="custom-more-outline"
                          style="width: 16px; height: 16px"
                        />
                      </VBtn>
                    </div>
                  </VCardItem>
                  <VImg
                    cover
                    height="250"
                    alt="card image"
                    :src="imageCard"
                  />
                  <VCardItem class="pa-5">
                    <VCardSubtitle class="text-h5 pb-3">
                      Card Subtitle
                    </VCardSubtitle>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu,
                    </p>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                md="4"
                sm="6"
              >
                <VCard variant="outlined">
                  <VCardItem class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                      <VCardTitle class="text-h6 pa-0">
                        Card Title
                      </VCardTitle>
                      <VBtn
                        color="secondary"
                        aria-label="menu"
                        variant="text"
                        icon
                        rounded="md"
                        size="small"
                      >
                        <SvgSprite
                          name="custom-more-outline"
                          style="width: 16px; height: 16px"
                        />
                      </VBtn>
                    </div>
                  </VCardItem>
                  <VImg
                    cover
                    height="250"
                    alt="card image"
                    :src="imageCard"
                  />
                  <VCardItem class="pa-5">
                    <VCardSubtitle class="text-h5 pb-3">
                      Card Subtitle
                    </VCardSubtitle>
                    <p class="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </VCardItem>
                  <VDivider />
                  <VCardActions class="pa-2">
                    <VBtn
                      class="flex-grow-1"
                      aria-label="setting"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-setting-outline-2"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn
                      class="flex-grow-1 ms-0"
                      aria-label="edit"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-edit-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px"
                      />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn
                      class="flex-grow-1 ms-0"
                      aria-label="menu"
                      icon
                      rounded
                    >
                      <SvgSprite
                        name="custom-more-outline"
                        class="text-lightText"
                        style="width: 16px; height: 16px; transform: rotate(90deg)"
                      />
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
