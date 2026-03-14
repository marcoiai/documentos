<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Snackbar' })
const subContent = ref({ content: 'Snackbars provide brief notifications. The component is also known as a toast.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/snackbar' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/snackbars/' })

const primarysnackbar = ref(false)
const secondarysnackbar = ref(false)
const errorsnackbar = ref(false)
const successsnackbar = ref(false)
const warningsnackbar = ref(false)
const infosnackbar = ref(false)

const primary9snackbar = ref(false)
const secondary9snackbar = ref(false)
const error9snackbar = ref(false)
const success9snackbar = ref(false)
const warning9snackbar = ref(false)
const info9snackbar = ref(false)

const primary10snackbar = ref(false)
const secondary10snackbar = ref(false)
const error10snackbar = ref(false)
const success10snackbar = ref(false)
const warning10snackbar = ref(false)
const info10snackbar = ref(false)

const primary2snackbar = ref(false)
const secondary2snackbar = ref(false)
const info2snackbar = ref(false)
const error2snackbar = ref(false)
const success2snackbar = ref(false)
const warning2snackbar = ref(false)

const primary11snackbar = ref(false)
const secondary11snackbar = ref(false)
const info11snackbar = ref(false)
const error11snackbar = ref(false)
const success11snackbar = ref(false)
const warning11snackbar = ref(false)

const primary3snackbar = ref(false)
const primary4snackbar = ref(false)
const primary5snackbar = ref(false)
const primary6snackbar = ref(false)
const primary7snackbar = ref(false)
const primary8snackbar = ref(false)

const snackbar12 = ref(false)
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
          <VRow>
            <!-- Basic -->
            <VCol cols="12">
              <UiParentCard title="Basic">
                <div class="d-flex flex-column flex-sm-row align-center flex-wrap ga-4">
                  <VBtn
                    variant="flat"
                    color="primary"
                    rounded="md"
                    @click="primarysnackbar = true"
                  >
                    default
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="secondary"
                    rounded="md"
                    @click="secondarysnackbar = true"
                  >
                    secondary
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="success"
                    rounded="md"
                    class="text-surface"
                    @click="successsnackbar = true"
                  >
                    success
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="warning"
                    rounded="md"
                    class="text-surface"
                    @click="warningsnackbar = true"
                  >
                    warning
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="info"
                    rounded="md"
                    @click="infosnackbar = true"
                  >
                    info
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="error"
                    rounded="md"
                    @click="errorsnackbar = true"
                  >
                    error
                  </VBtn>
                </div>

                <VSnackbar
                  v-model="primarysnackbar"
                  color="primary"
                  variant="flat"
                  elevation-1
                  rounded="md"
                  location="bottom right"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                </VSnackbar>
                <VSnackbar
                  v-model="secondarysnackbar"
                  color="secondary"
                  variant="flat"
                  elevation-1
                  rounded="md"
                  location="bottom right"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is secondary message
                </VSnackbar>
                <VSnackbar
                  v-model="successsnackbar"
                  variant="flat"
                  color="success"
                  rounded="md"
                  class="text-surface"
                  location="bottom right"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Success message
                </VSnackbar>
                <VSnackbar
                  v-model="warningsnackbar"
                  variant="flat"
                  color="warning"
                  rounded="md"
                  class="text-surface"
                  location="bottom right"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                </VSnackbar>
                <VSnackbar
                  v-model="infosnackbar"
                  variant="flat"
                  color="info"
                  rounded="md"
                  class="text-surface"
                  location="bottom right"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Info message
                </VSnackbar>
                <VSnackbar
                  v-model="errorsnackbar"
                  variant="flat"
                  color="error"
                  rounded="md"
                  location="bottom right"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Error message
                </VSnackbar>
              </UiParentCard>
            </VCol>
            <!-- With Close -->
            <VCol cols="12">
              <UiParentCard title="With Close">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 flex-wrap">
                  <VBtn
                    variant="flat"
                    color="primary"
                    rounded="md"
                    @click="primary2snackbar = true"
                  >
                    default
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="secondary"
                    rounded="md"
                    @click="secondary2snackbar = true"
                  >
                    secondary
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="success"
                    rounded="md"
                    class="text-surface"
                    @click="success2snackbar = true"
                  >
                    success
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="warning"
                    rounded="md"
                    class="text-surface"
                    @click="warning2snackbar = true"
                  >
                    warning
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="info"
                    rounded="md"
                    class="text-surface"
                    @click="info2snackbar = true"
                  >
                    info
                  </VBtn>
                  <VBtn
                    variant="flat"
                    color="error"
                    rounded="md"
                    @click="error2snackbar = true"
                  >
                    error
                  </VBtn>
                </div>

                <VSnackbar
                  v-model="primary2snackbar"
                  color="primary"
                  variant="flat"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                  <template #actions>
                    <VBtn
                      color="white"
                      aria-label="close"
                      variant="text"
                      @click="primary2snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="secondary2snackbar"
                  color="secondary"
                  variant="flat"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                  <template #actions>
                    <VBtn
                      color="white"
                      aria-label="close"
                      variant="text"
                      @click="secondary2snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="success2snackbar"
                  color="success"
                  variant="flat"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Success message
                  <template #actions>
                    <VBtn
                      color="white"
                      aria-label="close"
                      variant="text"
                      @click="success2snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="warning2snackbar"
                  color="warning"
                  variant="flat"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                  <template #actions>
                    <VBtn
                      color="white"
                      aria-label="close"
                      variant="text"
                      @click="warning2snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="info2snackbar"
                  color="info"
                  variant="flat"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                  <template #actions>
                    <VBtn
                      color="white"
                      aria-label="close"
                      variant="text"
                      @click="info2snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="error2snackbar"
                  color="error"
                  aria-label="close"
                  variant="flat"
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Error message
                  <template #actions>
                    <VBtn
                      color="white"
                      aria-label="close"
                      variant="text"
                      @click="error2snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
              </UiParentCard>
            </VCol>
            <!-- Location -->
            <VCol cols="12">
              <UiParentCard title="Position">
                <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
                  <VBtn
                    color="primary"
                    variant="flat"
                    rounded="md"
                    @click="primary3snackbar = true"
                  >
                    Top Left
                  </VBtn>
                  <VBtn
                    color="primary"
                    variant="flat"
                    rounded="md"
                    @click="primary4snackbar = true"
                  >
                    Top Center
                  </VBtn>
                  <VBtn
                    color="primary"
                    variant="flat"
                    rounded="md"
                    @click="primary5snackbar = true"
                  >
                    Top Right
                  </VBtn>
                  <VBtn
                    color="primary"
                    variant="flat"
                    rounded="md"
                    @click="primary6snackbar = true"
                  >
                    Bottom Left
                  </VBtn>
                  <VBtn
                    color="primary"
                    variant="flat"
                    rounded="md"
                    @click="primary7snackbar = true"
                  >
                    Bottom
                  </VBtn>
                  <VBtn
                    color="primary"
                    variant="flat"
                    rounded="md"
                    @click="primary8snackbar = true"
                  >
                    Bottom Right
                  </VBtn>
                </div>

                <VSnackbar
                  v-model="primary3snackbar"
                  color="primary"
                  variant="flat"
                  elevation-1
                  rounded="md"
                  location="top left"
                >
                  I'm Top Left Message
                </VSnackbar>
                <VSnackbar
                  v-model="primary4snackbar"
                  color="primary"
                  variant="flat"
                  rounded="md"
                  location="top"
                >
                  I'm Top Center Message
                </VSnackbar>
                <VSnackbar
                  v-model="primary5snackbar"
                  color="primary"
                  variant="flat"
                  rounded="md"
                  location="top right"
                >
                  I'm Top Right Message
                </VSnackbar>
                <VSnackbar
                  v-model="primary6snackbar"
                  color="primary"
                  variant="flat"
                  rounded="md"
                  location="bottom left"
                >
                  I'm Bottom Left Message
                </VSnackbar>
                <VSnackbar
                  v-model="primary7snackbar"
                  color="primary"
                  variant="flat"
                  rounded="md"
                  location="bottom"
                >
                  I'm Bottom Center Message
                </VSnackbar>
                <VSnackbar
                  v-model="primary8snackbar"
                  color="primary"
                  variant="flat"
                  rounded="md"
                  location="bottom right"
                >
                  I'm Bottom Right Message
                </VSnackbar>
              </UiParentCard>
            </VCol>
            <VCol cols="12">
              <UiParentCard title="Vertical">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  rounded="md"
                  @click="snackbar12 = true"
                >
                  Open Snackbar
                </VBtn>

                <VSnackbar
                  v-model="snackbar12"
                  color="secondary"
                  variant="tonal"
                  vertical
                >
                  <div class="text-subtitle-1 pb-2">
                    This is a snackbar message
                  </div>

                  <p>This is a longer paragraph explaining something</p>

                  <template #actions>
                    <VBtn
                      color="secondary"
                      variant="text"
                      @click="snackbar12 = false"
                    >
                      Close
                    </VBtn>
                  </template>
                </VSnackbar>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>

        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <!-- Outlined -->
            <VCol cols="12">
              <UiParentCard title="Outlined">
                <div class="d-flex flex-column flex-sm-row align-center flex-wrap ga-4">
                  <VBtn
                    variant="outlined"
                    color="primary"
                    rounded="md"
                    @click="primary9snackbar = true"
                  >
                    default
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="secondary"
                    rounded="md"
                    @click="secondary9snackbar = true"
                  >
                    secondary
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="success"
                    rounded="md"
                    class="text-surface"
                    @click="success9snackbar = true"
                  >
                    success
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="warning"
                    rounded="md"
                    class="text-surface"
                    @click="warning9snackbar = true"
                  >
                    warning
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="info"
                    rounded="md"
                    @click="info9snackbar = true"
                  >
                    info
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="error"
                    rounded="md"
                    @click="error9snackbar = true"
                  >
                    error
                  </VBtn>
                </div>

                <VSnackbar
                  v-model="primary9snackbar"
                  color="primary"
                  variant="outlined"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                </VSnackbar>
                <VSnackbar
                  v-model="secondary9snackbar"
                  color="secondary"
                  variant="outlined"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is secondary message
                </VSnackbar>
                <VSnackbar
                  v-model="success9snackbar"
                  variant="outlined"
                  color="success"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Success message
                </VSnackbar>
                <VSnackbar
                  v-model="warning9snackbar"
                  variant="outlined"
                  color="warning"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                </VSnackbar>
                <VSnackbar
                  v-model="info9snackbar"
                  variant="outlined"
                  color="info"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Info message
                </VSnackbar>
                <VSnackbar
                  v-model="error9snackbar"
                  variant="outlined"
                  color="error"
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Error message
                </VSnackbar>
              </UiParentCard>
            </VCol>
            <!-- action -->
            <VCol cols="12">
              <UiParentCard title="With Close + Action">
                <div class="d-flex flex-column flex-sm-row align-center flex-wrap ga-4">
                  <VBtn
                    variant="outlined"
                    color="primary"
                    rounded="md"
                    @click="primary10snackbar = true"
                  >
                    default
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="secondary"
                    rounded="md"
                    @click="secondary10snackbar = true"
                  >
                    secondary
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="success"
                    rounded="md"
                    class="text-surface"
                    @click="success10snackbar = true"
                  >
                    success
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="warning"
                    rounded="md"
                    class="text-surface"
                    @click="warning10snackbar = true"
                  >
                    warning
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="info"
                    rounded="md"
                    @click="info10snackbar = true"
                  >
                    info
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    color="error"
                    rounded="md"
                    @click="error10snackbar = true"
                  >
                    error
                  </VBtn>
                </div>

                <VSnackbar
                  v-model="primary10snackbar"
                  color="primary"
                  variant="outlined"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                  <template #actions>
                    <VBtn
                      variant="text"
                      size="small"
                      @click="primary10snackbar = false"
                    >
                      Undo
                    </VBtn>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="primary10snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close-square-fill" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="secondary10snackbar"
                  color="secondary"
                  variant="outlined"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is secondary message
                  <template #actions>
                    <VBtn
                      variant="text"
                      size="small"
                      @click="secondary10snackbar = false"
                    >
                      Undo
                    </VBtn>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="secondary10snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close-square-fill" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="success10snackbar"
                  variant="outlined"
                  color="success"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Success message
                  <template #actions>
                    <VBtn
                      variant="text"
                      size="small"
                      @click="success10snackbar = false"
                    >
                      Undo
                    </VBtn>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="success10snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close-square-fill" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="warning10snackbar"
                  variant="outlined"
                  color="warning"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                  <template #actions>
                    <VBtn
                      variant="text"
                      size="small"
                      @click="warning10snackbar = false"
                    >
                      Undo
                    </VBtn>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="warning10snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close-square-fill" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="info10snackbar"
                  variant="outlined"
                  color="info"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Info message
                  <template #actions>
                    <VBtn
                      variant="text"
                      size="small"
                      @click="info10snackbar = false"
                    >
                      Undo
                    </VBtn>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="info10snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close-square-fill" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="error10snackbar"
                  variant="outlined"
                  color="error"
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Error message
                  <template #actions>
                    <VBtn
                      variant="text"
                      size="small"
                      @click="error10snackbar = false"
                    >
                      Undo
                    </VBtn>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="error10snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close-square-fill" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
              </UiParentCard>
            </VCol>
            <!-- Tonal -->
            <VCol cols="12">
              <UiParentCard title="With Close">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 flex-wrap">
                  <VBtn
                    variant="tonal"
                    color="primary"
                    rounded="md"
                    @click="primary11snackbar = true"
                  >
                    default
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    color="secondary"
                    rounded="md"
                    @click="secondary11snackbar = true"
                  >
                    secondary
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    color="success"
                    rounded="md"
                    class="text-surface"
                    @click="success11snackbar = true"
                  >
                    success
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    color="warning"
                    rounded="md"
                    class="text-surface"
                    @click="warning11snackbar = true"
                  >
                    warning
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    color="info"
                    rounded="md"
                    class="text-surface"
                    @click="info11snackbar = true"
                  >
                    info
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    color="error"
                    rounded="md"
                    @click="error11snackbar = true"
                  >
                    error
                  </VBtn>
                </div>

                <VSnackbar
                  v-model="primary11snackbar"
                  color="primary"
                  variant="tonal"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                  <template #actions>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="primary11snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="secondary11snackbar"
                  color="secondary"
                  variant="tonal"
                  elevation-1
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is default message
                  <template #actions>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="secondary11snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="success11snackbar"
                  color="success"
                  variant="tonal"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Success message
                  <template #actions>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="success11snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="warning11snackbar"
                  color="warning"
                  variant="tonal"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                  <template #actions>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="warning11snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="info11snackbar"
                  color="info"
                  variant="tonal"
                  rounded="md"
                  class="text-surface"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Warning message
                  <template #actions>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="info11snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
                <VSnackbar
                  v-model="error11snackbar"
                  color="error"
                  variant="tonal"
                  rounded="md"
                >
                  <svg
                    class="pc-icon"
                    style="width: 20px; height: 20px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-checkbox-marked-circle-outline" />
                  </svg>
                  This is Error message
                  <template #actions>
                    <VBtn
                      variant="text"
                      aria-label="close"
                      @click="error11snackbar = false"
                    >
                      <svg
                        class="pc-icon"
                        style="width: 20px; height: 20px; transform: rotate(45deg)"
                      >
                        <use xlink:href="/assets/svg/sprite.svg#custom-close" />
                      </svg>
                    </VBtn>
                  </template>
                </VSnackbar>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.v-snackbar--variant-outlined {
  background-color: rgb(var(--v-theme-containerBg));
}
.v-snackbar--vertical {
  font-family: 'Public sans', sans-serif;
}
</style>
