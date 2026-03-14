<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Slider' })
const subContent = ref({ content: 'Sliders allow users to make selections from a range of values.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/slider' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/sliders/' })

const slider1 = ref(50)
const slider2 = ref(40)
const volume = ref(40)
const min = ref(-50)
const max = ref(90)
const slider3 = ref(40)
const slider4 = ref(40)
const slider5 = ref(40)
const slider6 = ref(40)
const slider7 = ref(40)
const slider8 = ref(40)
const slider9 = ref(60)
const slider10 = ref(40)
const slider11 = ref(90)
const slider12 = ref(30)
const slider13 = ref(70)
const slider14 = ref(10)
const red = ref(64)
const green = ref(128)
const blue = ref(10)
</script>

// ===============================|| Ui Slider ||=============================== //
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
        <!-- Basic Slider -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Basic Slider">
            <VSlider
              v-model="slider1"
              color="primary"
              label="basic"
            />
          </UiParentCard>
        </VCol>
        <!-- Disabled -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Disabled">
            <VSlider
              v-model="slider2"
              color="primary"
              label="basic"
              disabled
            />
          </UiParentCard>
        </VCol>
        <!-- Volume -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Volume">
            <VSlider
              v-model="volume"
              color="primary"
              min="40"
              max="218"
              :step="1"
            >
              <template #prepend>
                <VBtn
                  size="small"
                  icon
                  variant="text"
                  aria-label="volume"
                  color="primary"
                >
                  <div class="text-darkText mr-1">
                    <SvgSprite
                      name="custom-speaker-outline"
                      style="width: 20px; height: 20px"
                    />
                  </div>
                </VBtn>
              </template>

              <template #append>
                <VBtn
                  size="small"
                  icon
                  variant="text"
                  aria-label="volume"
                  color="primary"
                >
                  <div class="text-darkText mr-1">
                    <SvgSprite
                      name="custom-sound-outline"
                      style="width: 20px; height: 20px"
                    />
                  </div>
                </VBtn>
              </template>
            </VSlider>
          </UiParentCard>
        </VCol>
        <!-- With Label -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="With Label">
            <div class="d-flex ga-4 align-center flex-row">
              <VLabel class="text-subtitlte-1">
                Progress
              </VLabel>
              <VSlider
                v-model="slider3"
                class="align-center"
                :max="max"
                :min="min"
                step="1"
                hide-details
                color="primary"
              >
                <template #append>
                  <VTextField
                    v-model="slider3"
                    variant="plain"
                    aria-label="value"
                  />
                </template>
              </VSlider>
            </div>
            <div class="d-flex ga-4 align-center flex-row">
              <VLabel class="text-subtitlte-1">
                Progress
              </VLabel>
              <VSlider
                v-model="slider4"
                class="align-center"
                :max="max"
                :min="min"
                step="1"
                hide-details
                color="secondary"
              >
                <template #append>
                  <VTextField
                    v-model="slider4"
                    variant="plain"
                    aria-label="value"
                  />
                </template>
              </VSlider>
            </div>
          </UiParentCard>
        </VCol>
        <!-- With Popup value -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="With Popup value">
            <VSlider
              v-model="slider5"
              class="mt-3"
              color="primary"
              step="1"
              thumb-label="always"
            />
          </UiParentCard>
        </VCol>
        <!-- Steps With Popup Value -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Steps With Popup Value">
            <VSlider
              v-model="slider6"
              class="mt-3"
              color="primary"
              step="10"
              show-ticks="always"
              thumb-label="always"
            />
          </UiParentCard>
        </VCol>
        <!-- Vertical Slider -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Vertical Slider">
            <div class="d-flex">
              <VSlider
                v-model="slider7"
                direction="vertical"
                label="Regular"
                color="primary"
              />
              <VSlider
                v-model="slider8"
                direction="vertical"
                label="Regular"
                color="primary"
                disabled
              />
            </div>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Color">
            <VSlider
              v-model="slider9"
              color="primary"
            />
            <VSlider
              v-model="slider10"
              color="secondary"
            />
            <VSlider
              v-model="slider11"
              color="success"
            />
            <VSlider
              v-model="slider12"
              color="warning"
            />
            <VSlider
              v-model="slider13"
              color="info"
            />
            <VSlider
              v-model="slider14"
              color="error"
            />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="RGB color">
            <VResponsive
              :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
              height="150px"
            />

            <VCardText class="pa-0">
              <VSlider
                v-model="red"
                :max="255"
                :step="1"
                label="R"
                color="primary"
                hide-details
                class="ma-4"
              >
                <template #append>
                  <VTextField
                    v-model="red"
                    type="number"
                    aria-label="value"
                    style="width: 80px"
                    density="compact"
                    hide-details
                    variant="outlined"
                  />
                </template>
              </VSlider>

              <VSlider
                v-model="green"
                :max="255"
                :step="1"
                label="G"
                color="primary"
                hide-details
                class="ma-4"
              >
                <template #append>
                  <VTextField
                    v-model="green"
                    type="number"
                    aria-label="value"
                    style="width: 80px"
                    density="compact"
                    hide-details
                    variant="outlined"
                  />
                </template>
              </VSlider>

              <VSlider
                v-model="blue"
                :max="255"
                :step="1"
                label="B"
                color="primary"
                hide-details
                class="ma-4"
              >
                <template #append>
                  <VTextField
                    v-model="blue"
                    type="number"
                    aria-label="value"
                    style="width: 80px"
                    density="compact"
                    hide-details
                    variant="outlined"
                  />
                </template>
              </VSlider>
            </VCardText>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.v-slider {
  --v-input-padding-top: 15px;
  .v-input--density-default {
    --v-input-padding-top: 15px;
  }
}
</style>
