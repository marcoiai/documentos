<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Buttons toggle' })
const subContent = ref({ content: 'Use data properties to control the visibility and methods to toggle them.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/buttontoggle' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/button-groups/' })

const toggle = ref(null)
const toggle1 = ref(null)
const toggle2 = ref(undefined)
const toggle3 = ref([])
const toggle4 = ref(null)
const toggle5 = ref(null)
const toggle6 = ref(2)
const toggle7 = ref(2)
const toggle8 = ref(1)
const toggle9 = ref(2)
const toggle10 = ref(3)

const alignment = ref(1)
const formatting = ref([])
const value = ref('Toggle button requirements.\r\rHave at least three toggle buttons in a group\rLabel buttons with text, an icon, or')
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
        <!-- Default -->
        <VCol
          cols="12"
          lg="3"
          md="6"
        >
          <UiParentCard title="Default">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle"
                color="primary"
              >
                <VBtn
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Outlined -->
        <VCol
          cols="12"
          lg="3"
          md="6"
        >
          <UiParentCard title="Outlined">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle1"
                variant="outlined"
                color="primary"
              >
                <VBtn
                  icon
                  aria-label="toggle1"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle1"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle1"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle1"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Text -->
        <VCol
          cols="12"
          lg="3"
          md="6"
        >
          <UiParentCard title="Text">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle4"
                variant="text"
                color="primary"
              >
                <VBtn
                  icon
                  aria-label="toggle4"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle4"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle4"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle4"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Plain -->
        <VCol
          cols="12"
          lg="3"
          md="6"
        >
          <UiParentCard title="Plain">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle5"
                variant="plain"
                color="primary"
              >
                <VBtn
                  icon
                  aria-label="toggle5"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle5"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle5"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  aria-label="toggle5"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Mandatory -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Mandatory">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle2"
                color="primary"
                mandatory
              >
                <VBtn
                  icon
                  value="left"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="center"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="right"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="justify"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
              <div class="font-weight-medium text-medium-emphasis pa-2">
                {{ toggle2 }}
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Multiple -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Multiple">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle3"
                color="primary"
                variant="text"
                multiple
              >
                <VBtn
                  size="small"
                  icon
                  value="italic"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-italic" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="bold"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-bold" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="underline"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-underline" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="color"
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-color" />
                  </svg>
                </VBtn>
              </VBtnToggle>
              <div class="font-weight-medium text-medium-emphasis pa-2">
                {{ toggle3 }}
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Rounded Sqaure -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Rounded Sqaure">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle6"
                color="primary"
                variant="outlined"
                rounded="0"
              >
                <VBtn
                  icon
                  value="left"
                  aria-label="toggle6"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="center"
                  aria-label="toggle6"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="right"
                  aria-label="toggle6"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="justify"
                  aria-label="toggle6"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Rounded Pill -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Rounded Pill">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle7"
                color="primary"
                variant="outlined"
                rounded="xl"
              >
                <VBtn
                  icon
                  value="left"
                  aria-label="toggle7"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="center"
                  aria-label="toggle7"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="right"
                  aria-label="toggle7"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="justify"
                  aria-label="toggle7"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>

        <!-- Density -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Density">
            <div class="text-center">
              <VBtnToggle
                v-model="toggle8"
                class="d-block mb-4"
                color="primary"
                variant="outlined"
                density="compact"
              >
                <VBtn
                  size="small"
                  icon
                  value="left"
                  aria-label="toggle8"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="center"
                  aria-label="toggle8"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="right"
                  aria-label="toggle8"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="justify"
                  aria-label="toggle8"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>

              <VBtnToggle
                v-model="toggle9"
                class="d-block mb-4"
                color="primary"
                variant="outlined"
                density="comfortable"
              >
                <VBtn
                  size="small"
                  icon
                  value="left"
                  aria-label="toggle9"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="center"
                  aria-label="toggle9"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="right"
                  aria-label="toggle9"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  size="small"
                  icon
                  value="justify"
                  aria-label="toggle9"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>

              <VBtnToggle
                v-model="toggle10"
                class="d-block mb-4"
                color="primary"
                variant="outlined"
              >
                <VBtn
                  icon
                  value="left"
                  aria-label="toggle10"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="center"
                  aria-label="toggle10"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="right"
                  aria-label="toggle10"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
                <VBtn
                  icon
                  value="justify"
                  aria-label="toggle10"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-justify" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>
          </UiParentCard>
        </VCol>

        <!-- Customized -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Customized">
            <div class="d-flex justify-space-between pb-4">
              <VBtnToggle
                v-model="formatting"
                multiple
                variant="outlined"
                class="overflow-auto"
                color="primary"
                divided
              >
                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-italic" />
                  </svg>
                </VBtn>

                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-bold" />
                  </svg>
                </VBtn>

                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-underline" />
                  </svg>
                </VBtn>

                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-color" />
                  </svg>
                </VBtn>
              </VBtnToggle>

              <VBtnToggle
                v-model="alignment"
                variant="outlined"
                color="primary"
                divided
              >
                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-right" />
                  </svg>
                </VBtn>

                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-center" />
                  </svg>
                </VBtn>

                <VBtn
                  size="small"
                  icon
                  aria-label="toggle"
                >
                  <svg
                    class="pc-icon"
                    style="width: 16px; height: 16px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-align-left" />
                  </svg>
                </VBtn>
              </VBtnToggle>
            </div>

            <VSheet class="text-center">
              <VTextarea
                v-model="value"
                aria-label="content"
                variant="outlined"
                auto-grow
                full-width
                rows="2"
                hide-details
              />
            </VSheet>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
