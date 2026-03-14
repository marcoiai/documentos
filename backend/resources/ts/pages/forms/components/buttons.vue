<script setup lang="ts">
import { ref } from 'vue'

// component content
const page = ref({ title: 'Buttons' })
const subContent = ref({ content: 'Buttons allow users to take actions, and make choices, with a single tap.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/buttons' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/buttons' })

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// buttons color data
const btnsColor = ref(['primary', 'secondary', 'info', 'success', 'warning', 'error'])

const btnsColor1 = ref([
  {
    name: 'primary',
    color: 'darkprimary',
  },
  {
    name: 'secondary',
    color: 'darksecondary',
  },
  {
    name: 'info',
    color: 'darkinfo',
  },
  {
    name: 'success',
    color: 'darksuccess',
  },
  {
    name: 'warning',
    color: 'darkwarning',
  },
  {
    name: 'error',
    color: 'darkerror',
  },
])

// buttons size data
const btnsSize = ref(['x-small', 'small', 'large', 'x-large'])

// buttons data
const btnsContent = ref(['one', 'two', 'three'])

const loading = ref(false)

function load() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

// ===============================|| Ui Buttons ||=============================== //
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
        <!-- Base Buttons -->
        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <VCol cols="12">
              <UiParentCard title="Basic Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsColor"
                    :key="btn"
                    rounded="md"
                    :color="btn"
                  >
                    {{ btn }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Outlined Buttons -->
            <VCol cols="12">
              <UiParentCard title="Outlined Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsColor"
                    :key="btn"
                    rounded="md"
                    :color="btn"
                    variant="outlined"
                  >
                    {{ btn }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Dashed Buttons -->
            <VCol cols="12">
              <UiParentCard title="Dashed Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsColor"
                    :key="btn"
                    rounded="md"
                    :color="btn"
                    :border="`${btn} dashed thin opacity-100`"
                    variant="tonal"
                  >
                    {{ btn }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Flat Buttons -->
            <VCol cols="12">
              <UiParentCard title="Flat Button">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsColor"
                    :key="btn"
                    :color="btn"
                    variant="flat"
                    rounded="md"
                  >
                    {{ btn }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Text Buttons -->
            <VCol cols="12">
              <UiParentCard title="Text Button">
                <div class="d-flex flex-wrap ga-4 my-2 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsColor"
                    :key="btn"
                    rounded="md"
                    :color="btn"
                    variant="text"
                  >
                    {{ btn }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Shadow Button -->
            <VCol cols="12">
              <UiParentCard title="Shadow Button">
                <div class="d-flex flex-wrap ga-4 align-center flex-column flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsColor1"
                    :key="btn.name"
                    variant="flat"
                    rounded="md"
                    :color="btn.color"
                    :class="`${btn.name}-shadow`"
                  >
                    {{ btn.name }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- With Icons -->
            <VCol cols="12">
              <UiParentCard title="With Icons">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    flat
                    color="primary"
                    rounded="md"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-home-outline"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    Home
                  </VBtn>
                  <VBtn
                    flat
                    color="secondary"
                    rounded="md"
                  >
                    Profile
                    <template #append>
                      <SvgSprite
                        name="custom-smile-fill"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                  </VBtn>
                  <VBtn
                    flat
                    color="info"
                    rounded="md"
                    variant="outlined"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-navigation-outline"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    Address
                  </VBtn>
                  <VBtn
                    flat
                    color="success"
                    rounded="md"
                    variant="outlined"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-circle-plus-outline"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    Add
                  </VBtn>
                  <VBtn
                    flat
                    color="warning"
                    rounded="md"
                    variant="outlined"
                  >
                    Send
                    <template #append>
                      <SvgSprite
                        name="custom-send-outline"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                  </VBtn>
                  <VBtn
                    flat
                    color="error"
                    rounded="md"
                    variant="text"
                  >
                    Cancel
                    <template #append>
                      <SvgSprite
                        name="custom-close"
                        style="width: 18px; height: 18px; transform: rotate(45deg)"
                      />
                    </template>
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Sizes -->
            <VCol cols="12">
              <UiParentCard title="Button size">
                <div class="d-flex flex-wrap ga-4 align-start flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    v-for="btn in btnsSize"
                    :key="btn"
                    rounded="md"
                    :size="btn"
                    color="primary"
                  >
                    {{ btn }}
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Disabled -->
            <VCol cols="12">
              <UiParentCard title="Disabled Button">
                <div class="d-flex flex-wrap ga-4 align-start flex-wrap flex-row fill-height">
                  <VBtn
                    text="Default"
                    rounded="md"
                    variant="text"
                    disabled
                  />
                  <VBtn
                    text="Cotained"
                    rounded="md"
                    variant="tonal"
                    disabled
                  />
                  <VBtn
                    text="Outlined"
                    rounded="md"
                    variant="outlined"
                    disabled
                  />
                  <VBtn
                    text="Dashed"
                    rounded="md"
                    variant="tonal"
                    border="secondary dashed thin opacity-100"
                    disabled
                  />
                  <VBtn
                    icon
                    variant="tonal"
                    aria-label="button"
                    rounded="md"
                    disabled
                  >
                    <SvgSprite
                      name="custom-home-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                  <VBtn
                    icon
                    variant="outlined"
                    aria-label="button"
                    rounded="md"
                    disabled
                  >
                    <SvgSprite
                      name="custom-circle-plus-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                  <VBtn
                    icon
                    border="secondary dashed thin opacity-100"
                    aria-label="button"
                    rounded="md"
                    variant="tonal"
                    disabled
                  >
                    <SvgSprite
                      name="custom-send-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Block level -->
            <VCol cols="12">
              <UiParentCard title="Block level">
                <VRow>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VBtn
                      color="primary"
                      rounded="md"
                      block
                    >
                      Primary
                    </VBtn>
                  </VCol>
                  <VCol
                    cols="12"
                    sm="6"
                  >
                    <VBtn
                      color="secondary"
                      rounded="md"
                      variant="outlined"
                      block
                    >
                      Secondary
                    </VBtn>
                  </VCol>
                </VRow>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <!-- Button group -->
            <VCol cols="12">
              <UiParentCard title="Button group">
                <div class="d-flex flex-column ga-4">
                  <VBtnGroup
                    divided
                    variant="flat"
                    color="primary"
                    density="compact"
                  >
                    <VBtn
                      v-for="btn in btnsContent"
                      :key="btn"
                    >
                      {{ btn }}
                    </VBtn>
                  </VBtnGroup>
                  <VBtnGroup
                    divided
                    variant="outlined"
                    color="primary"
                    density="compact"
                  >
                    <VBtn
                      v-for="btn in btnsContent"
                      :key="btn"
                    >
                      {{ btn }}
                    </VBtn>
                  </VBtnGroup>
                  <VBtnGroup
                    divided
                    color="primary"
                    variant="text"
                    density="compact"
                  >
                    <VBtn
                      v-for="btn in btnsContent"
                      :key="btn"
                    >
                      {{ btn }}
                    </VBtn>
                  </VBtnGroup>
                  <VBtnGroup
                    divided
                    variant="outlined"
                    color="warning"
                    density="compact"
                  >
                    <VBtn
                      v-for="btn in btnsContent"
                      :key="btn"
                    >
                      {{ btn }}
                    </VBtn>
                  </VBtnGroup>
                </div>
              </UiParentCard>
            </VCol>
            <VCol cols="12">
              <UiParentCard title="Fab">
                <div class="d-flex ga-4 flex-wrap">
                  <VBtn
                    icon
                    size="large"
                    aria-label="button"
                    variant="elevated"
                    color="primary"
                    class="primary-shadow"
                  >
                    <SvgSprite
                      name="custom-plus"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                  <VBtn
                    icon
                    size="large"
                    aria-label="button"
                    variant="elevated"
                    color="info"
                    class="info-shadow"
                  >
                    <SvgSprite
                      name="custom-edit-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                  <VBtn
                    icon
                    size="large"
                    aria-label="button"
                    variant="elevated"
                    disabled
                  >
                    <SvgSprite
                      name="custom-mic-off"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                  <VBtn
                    size="large"
                    variant="elevated"
                    rounded="pill"
                    color="error"
                    class="error-shadow"
                  >
                    Extended
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <VCol cols="12">
              <h5 class="text-h5 mb-5">
                Extended Button
              </h5>
              <!-- Icon button -->
              <UiParentCard title="Icon Button">
                <VRow>
                  <VCol cols="12">
                    <div class="d-flex flex-wrap ga-4">
                      <VBtn
                        color="primary"
                        aria-label="button"
                        variant="flat"
                        icon
                        rounded="md"
                      >
                        <SvgSprite
                          name="custom-home-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="secondary"
                        aria-label="button"
                        variant="flat"
                        icon
                        rounded="md"
                      >
                        <SvgSprite
                          name="custom-smile-fill"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="info"
                        aria-label="button"
                        icon
                        rounded="md"
                        variant="outlined"
                      >
                        <SvgSprite
                          name="custom-navigation-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="success"
                        aria-label="button"
                        icon
                        rounded="md"
                        variant="outlined"
                      >
                        <SvgSprite
                          name="custom-circle-plus-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="warning"
                        aria-label="button"
                        icon
                        rounded="md"
                        variant="tonal"
                        border="warning dashed thin opacity-100"
                      >
                        <SvgSprite
                          name="custom-send-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="error"
                        aria-label="button"
                        icon
                        rounded="md"
                        variant="text"
                      >
                        <SvgSprite
                          name="custom-close"
                          style="width: 20px; height: 20px; transform: rotate(45deg)"
                        />
                      </VBtn>
                    </div>
                  </VCol>
                  <VCol cols="12">
                    <div class="d-flex flex-wrap ga-4">
                      <VBtn
                        color="primary"
                        aria-label="button"
                        icon
                      >
                        <SvgSprite
                          name="custom-home-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="secondary"
                        aria-label="button"
                        icon
                      >
                        <SvgSprite
                          name="custom-smile-fill"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="info"
                        aria-label="button"
                        icon
                        variant="outlined"
                      >
                        <SvgSprite
                          name="custom-navigation-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="success"
                        aria-label="button"
                        icon
                        variant="outlined"
                      >
                        <SvgSprite
                          name="custom-circle-plus-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="warning"
                        aria-label="button"
                        icon
                        variant="tonal"
                        border="warning dashed thin opacity-100"
                      >
                        <SvgSprite
                          name="custom-send-outline"
                          style="width: 20px; height: 20px"
                        />
                      </VBtn>
                      <VBtn
                        color="error"
                        aria-label="button"
                        icon
                        variant="text"
                      >
                        <SvgSprite
                          name="custom-close"
                          style="width: 20px; height: 20px; transform: rotate(45deg)"
                        />
                      </VBtn>
                    </div>
                  </VCol>
                </VRow>
              </UiParentCard>
            </VCol>
            <!-- Loading button -->
            <VCol cols="12">
              <UiParentCard title="Loading Button">
                <div class="d-flex flex-wrap ga-4">
                  <VBtn
                    :loading="loading"
                    rounded="md"
                    color="primary"
                    @click="load"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-home-outline"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    Home
                  </VBtn>
                  <VBtn
                    color="secondary"
                    variant="outlined"
                    rounded="md"
                  >
                    Edit
                    <VProgressCircular
                      size="16"
                      indeterminate
                      color="secondary"
                      aria-label="progressbar"
                      class="ms-2"
                    />
                  </VBtn>
                  <VBtn
                    color="info"
                    rounded="md"
                    variant="tonal"
                    text="Loading..."
                    border="info dashed thin opacity-100"
                  />
                  <VBtn
                    color="success"
                    variant="flat"
                    icon
                    rounded="md"
                  >
                    <VProgressCircular
                      size="16"
                      indeterminate
                      aria-label="progressbar"
                    />
                  </VBtn>
                  <VBtn
                    color="warning"
                    icon
                    variant="tonal"
                    border="warning dashed thin opacity-100"
                  >
                    <VProgressCircular
                      size="16"
                      indeterminate
                      aria-label="progressbar"
                    />
                  </VBtn>
                  <VBtn
                    color="error"
                    icon
                    variant="text"
                  >
                    <VProgressCircular
                      size="16"
                      indeterminate
                      aria-label="progressbar"
                    />
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Ripple button -->
            <VCol cols="12">
              <UiParentCard title="Ripple">
                <div class="d-flex flex-wrap ga-4">
                  <VBtn
                    color="primary"
                    rounded="md"
                  >
                    With Ripple
                  </VBtn>
                  <VBtn
                    color="primary"
                    rounded="md"
                    :ripple="false"
                  >
                    Without Ripple
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Density button -->
            <VCol cols="12">
              <UiParentCard title="Density">
                <div class="d-flex flex-wrap align-center ga-4">
                  <VBtn
                    density="compact"
                    rounded="md"
                    color="primary"
                  >
                    Compact Button
                  </VBtn>
                  <VBtn
                    density="comfortable"
                    rounded="md"
                    color="primary"
                  >
                    Comfortable Button
                  </VBtn>
                  <VBtn
                    density="default"
                    rounded="md"
                    color="primary"
                  >
                    Default Button
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Rounded -->
            <VCol cols="12">
              <UiParentCard title="Rounded">
                <div class="d-flex ga-4 align-center flex-column flex-wrap flex-sm-row fill-height">
                  <VBtn
                    rounded="0"
                    color="primary"
                  >
                    Rounded 0
                  </VBtn>
                  <VBtn
                    rounded="xs"
                    color="secondary"
                  >
                    Rounded xs
                  </VBtn>
                  <VBtn
                    rounded="sm"
                    color="success"
                  >
                    Rounded sm
                  </VBtn>
                  <VBtn color="info">
                    Rounded sm
                  </VBtn>
                  <VBtn
                    rounded="lg"
                    color="warning"
                  >
                    Rounded lg
                  </VBtn>
                  <VBtn
                    rounded="xl"
                    color="error"
                  >
                    Rounded xl
                  </VBtn>
                </div>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
