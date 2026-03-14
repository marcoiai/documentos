<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Tabs' })
const subContent = ref({ content: 'Tabs make it easy to explore and switch between different views.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/tabs' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/tabs/' })

// tabs data
const tab = ref(null)
const tab2 = ref(0)
const tab3 = ref(null)
const tab5 = ref(null)
const tab7 = ref(null)
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
          <UiTitleCard
            title="Basic"
            class-name="pt-5"
          >
            <VTabs
              v-model="tab"
              color="primary"
            >
              <VTab
                value="one"
                class="font-weight-medium"
              >
                Tab1
                <VChip
                  color="primary"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  99
                </VChip>
              </VTab>
              <VTab
                value="two"
                class="font-weight-medium"
              >
                Tab2
                <VChip
                  color="lightText"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  9
                </VChip>
              </VTab>
              <VTab
                value="three"
                class="font-weight-medium"
              >
                Tab3
              </VTab>
            </VTabs>
            <VDivider />
            <VCardText class="border-0 px-0 pb-0">
              <VWindow v-model="tab">
                <VWindowItem value="one">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper ligula.
                  Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                </VWindowItem>

                <VWindowItem value="two">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>

                <VWindowItem value="three">
                  Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula
                  placerat cursus in nec est.
                </VWindowItem>
              </VWindow>
            </VCardText>
          </UiTitleCard>
        </VCol>
        <!-- With Icons -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Color Tab with Disabled Tab + Scrollable Tabs"
            class-name="pt-5"
          >
            <VTabs
              v-model="tab2"
              color="primary"
            >
              <VTab
                value="1"
                class="font-weight-medium"
              >
                Tab1
                <VChip
                  color="primary"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  99
                </VChip>
              </VTab>
              <VTab
                value="2"
                class="font-weight-medium"
                disabled
              >
                Tab2
                <VChip
                  color="lightText"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  99
                </VChip>
              </VTab>
              <VTab
                value="3"
                class="font-weight-medium"
              >
                Tab3
                <VChip
                  color="lightText"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  9
                </VChip>
              </VTab>
              <VTab
                value="4"
                class="font-weight-medium"
              >
                Tab4
              </VTab>
              <VTab
                value="5"
                class="font-weight-medium"
              >
                Tab5
              </VTab>
              <VTab
                value="6"
                class="font-weight-medium"
              >
                Tab6
              </VTab>
              <VTab
                value="7"
                class="font-weight-medium"
              >
                Tab7
              </VTab>
              <VTab
                value="8"
                class="font-weight-medium"
              >
                Tab8
              </VTab>
              <VTab
                value="9"
                class="font-weight-medium"
              >
                Tab9
              </VTab>
            </VTabs>
            <VDivider />
            <VCardText class="border-0 px-0 pb-0">
              <VWindow v-model="tab2">
                <VWindowItem value="1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper ligula.
                  Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                </VWindowItem>

                <VWindowItem value="2">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch.
                </VWindowItem>

                <VWindowItem value="3">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>

                <VWindowItem value="4">
                  Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula
                  placerat cursus in nec est.
                </VWindowItem>

                <VWindowItem value="5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper ligula.
                  Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                </VWindowItem>

                <VWindowItem value="6">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>

                <VWindowItem value="7">
                  Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula
                  placerat cursus in nec est.
                </VWindowItem>

                <VWindowItem value="8">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>

                <VWindowItem value="9">
                  Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula
                  placerat cursus in nec est.
                </VWindowItem>
              </VWindow>
            </VCardText>
          </UiTitleCard>
        </VCol>
        <!-- Icons -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Icon tabs"
            class-name="pt-5"
          >
            <VTabs
              v-model="tab3"
              color="primary"
            >
              <VTab value="111">
                <SvgSprite
                  name="custom-user-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                /> Profile
              </VTab>
              <VTab value="222">
                <SvgSprite
                  name="custom-page-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                /> Followers
              </VTab>
              <VTab value="444">
                <SvgSprite
                  name="custom-multi-users"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                /> Friends
              </VTab>
              <VTab value="666">
                <SvgSprite
                  name="custom-picture-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                /> Gallery
              </VTab>
            </VTabs>
            <VDivider />
            <VCardText class="border-0 px-0 pb-0">
              <VWindow v-model="tab3">
                <VWindowItem value="111">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper ligula.
                  Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                </VWindowItem>

                <VWindowItem value="222">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>

                <VWindowItem value="444">
                  Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula
                  placerat cursus in nec est.
                </VWindowItem>

                <VWindowItem value="666">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>
              </VWindow>
            </VCardText>
          </UiTitleCard>
        </VCol>

        <!-- Center -->
        <VCol
          cols="12"
          md="6"
        >
          <UiTitleCard
            title="Centered Tabs"
            class-name="pt-5"
          >
            <VTabs
              v-model="tab5"
              align-tabs="center"
              color="primary"
            >
              <VTab
                value="11111"
                class="font-weight-medium"
              >
                Tab1
                <VChip
                  color="primary"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  99
                </VChip>
              </VTab>
              <VTab
                value="22222"
                class="font-weight-medium"
              >
                Tab2
                <VChip
                  color="lightText"
                  class="ms-2 font-weight-medium"
                  rounded="lg"
                  size="small"
                >
                  9
                </VChip>
              </VTab>
              <VTab
                value="44444"
                class="font-weight-medium"
              >
                Tab3
              </VTab>
            </VTabs>
            <VDivider />
            <VCardText class="border-0 px-0 pb-0">
              <VWindow v-model="tab5">
                <VWindowItem value="11111">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu, semper ligula.
                  Mauris purus sem, sagittis eu mauris et, viverra lobortis urna.
                </VWindowItem>

                <VWindowItem value="22222">
                  Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis.
                  Ut sed semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
                </VWindowItem>

                <VWindowItem value="44444">
                  Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula
                  placerat cursus in nec est.
                </VWindowItem>
              </VWindow>
            </VCardText>
          </UiTitleCard>
        </VCol>

        <!-- Vertical Tabs -->
        <VCol
          cols="12"
          lg="6"
          md="8"
        >
          <UiTitleCard
            title="Vertical Tabs"
            class-name="pt-5"
          >
            <VRow class="d-flex flex-row">
              <VCol
                cols="12"
                sm="3"
              >
                <VTabs
                  v-model="tab7"
                  class="vertical-tab-height"
                  direction="vertical"
                  color="primary"
                  prev-icon="$chevronUp"
                  next-icon="$chevronDown"
                >
                  <VTab
                    value="option-1"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 1
                  </VTab>
                  <VTab
                    value="option-2"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 2
                  </VTab>
                  <VTab
                    value="option-3"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 3
                  </VTab>
                  <VTab
                    value="option-4"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 4
                  </VTab>
                  <VTab
                    value="option-5"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 5
                  </VTab>
                  <VTab
                    value="option-6"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 6
                  </VTab>
                  <VTab
                    value="option-7"
                    rounded="md"
                    class="justify-center"
                  >
                    Tab 7
                  </VTab>
                </VTabs>
              </VCol>
              <VCol
                cols="12"
                sm="9"
              >
                <VWindow v-model="tab7">
                  <VWindowItem value="option-1">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In est quam, mattis non dui sed, pretium dignissim elit.
                          Nam auctor augue et magna rutrum dictum. Nulla facilisi. Sed consectetur libero vitae sem ultrices fermentum.
                          Donec ac tortor ullamcorper, posuere est congue, pharetra velit. Nullam vehicula elit elementum pellentesque
                          elementum. Duis consectetur sapien purus, et scelerisque erat fringilla quis.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                  <VWindowItem value="option-2">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Vestibulum felis felis, venenatis non eleifend nec, eleifend gravida enim. In tristique nunc ut dui sodales
                          dapibus. Aenean consequat eros sed erat sagittis lobortis. Proin turpis leo, pulvinar ac eros feugiat, feugiat
                          varius odio. Nullam quam massa, tempus ac egestas ac, dapibus sed nisl. Vivamus vehicula cursus magna vitae
                          pretium. Nunc dictum elit at felis malesuada, id sollicitudin leo elementum.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                  <VWindowItem value="option-3">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Curabitur vitae condimentum magna. In posuere rhoncus dolor sit amet mattis. Suspendisse ligula enim, varius at
                          consequat aliquam, pharetra ac velit. Morbi a augue vel leo suscipit convallis. Proin semper pretium dolor, ac
                          pharetra diam gravida non. Etiam velit orci, elementum et viverra ornare, vestibulum accumsan dui. Suspendisse
                          sagittis tristique metus non interdum. Nullam mollis sagittis dolor.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                  <VWindowItem value="option-4">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Quisque posuere luctus turpis vel aliquam. Maecenas consequat tempus nisl, ac ultrices lacus laoreet dignissim.
                          Donec pretium quis turpis sed rutrum. Etiam fermentum ipsum vel urna scelerisque vulputate. Phasellus nulla dui,
                          bibendum id ligula et, eleifend efficitur orci. Integer vel purus nec lectus porta interdum. Aliquam finibus
                          lectus id odio dictum, in facilisis quam hendrerit. Ut vitae tellus enim.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                  <VWindowItem value="option-5">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Vestibulum ullamcorper sem ac velit dictum ultricies. Vestibulum orci dolor, laoreet vehicula eleifend et,
                          pharetra eget nulla. Vivamus arcu nisl, tincidunt et turpis semper, ultrices porta neque. Nam vestibulum, sapien
                          sit amet malesuada dignissim, justo nisi dictum nisl, non maximus quam risus vitae nisi. Fusce vitae nisl
                          ultrices, hendrerit libero non, pellentesque ipsum.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                  <VWindowItem value="option-6">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Vestibulum felis felis, venenatis non eleifend nec, eleifend gravida enim. In tristique nunc ut dui sodales
                          dapibus. Aenean consequat eros sed erat sagittis lobortis. Proin turpis leo, pulvinar ac eros feugiat, feugiat
                          varius odio. Nullam quam massa, tempus ac egestas ac, dapibus sed nisl. Vivamus vehicula cursus magna vitae
                          pretium. Nunc dictum elit at felis malesuada, id sollicitudin leo elementum.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                  <VWindowItem value="option-7">
                    <VCard variant="text">
                      <VCardText class="border-0 pa-0">
                        <p class="mb-0">
                          Vestibulum ullamcorper sem ac velit dictum ultricies. Vestibulum orci dolor, laoreet vehicula eleifend et,
                          pharetra eget nulla. Vivamus arcu nisl, tincidunt et turpis semper, ultrices porta neque. Nam vestibulum, sapien
                          sit amet malesuada dignissim, justo nisi dictum nisl, non maximus quam risus vitae nisi. Fusce vitae nisl
                          ultrices, hendrerit libero non, pellentesque ipsum.
                        </p>
                      </VCardText>
                    </VCard>
                  </VWindowItem>
                </VWindow>
              </VCol>
            </VRow>
          </UiTitleCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
