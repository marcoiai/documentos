<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Checkbox' })
const subContent = ref({ content: 'Checkboxes allow the user to select one or more items from a set.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/checkbox' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/checkboxes/' })

const checkbox = ref(false)
const checkbox2 = ref(true)
const checkbox3 = ref(true)
const checkbox4 = ref(false)
const checkbox5 = ref(true)
const checkbox6 = ref(true)
const checkbox7 = ref(true)
const checkbox8 = ref(true)
const checkbox9 = ref(false)
const checkbox10 = ref(true)
const checkbox11 = ref(true)
const checkbox12 = ref(false)
const checked = ref(true)
const unchecked = ref(false)
const includeFiles = ref(true)
const enabled = ref(false)

// checks color data
const checksColor = ref([
  {
    color: 'primary',
    value: true,
  },
  {
    color: 'secondary',
    value: true,
  },
  {
    color: 'success',
    value: true,
  },
  {
    color: 'warning',
    value: true,
  },
  {
    color: 'info',
    value: true,
  },
  {
    color: 'error',
    value: true,
  },
])
</script>

// ===============================|| Ui Checkbox ||=============================== //
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
        <!-- Basic checkboxes -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Basic Checkboxes">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row">
              <VCheckboxBtn
                v-model="checkbox"
                aria-label="checkbox"
                color="success"
                hide-details
              />
              <VCheckboxBtn
                v-model="checkbox2"
                aria-label="checkbox"
                color="primary"
                hide-details
              />
              <VCheckboxBtn
                v-model="checkbox3"
                aria-label="checkbox"
                hide-details
                disabled
              />
              <VCheckboxBtn
                v-model="checkbox4"
                aria-label="checkbox"
                color="secondary"
                hide-details
                disabled
              />
            </div>
          </UiParentCard>
        </VCol>
        <!-- With label -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With label">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row">
              <VCheckboxBtn
                v-model="checked"
                aria-label="checkbox"
                color="primary"
                hide-details
                label="Checked"
              />
              <VCheckboxBtn
                v-model="unchecked"
                aria-label="checkbox"
                color="primary"
                disabled
                hide-details
                label="Unchecked"
              />
            </div>
          </UiParentCard>
        </VCol>
        <!-- With Colors -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With Colors">
            <div class="d-flex ga-4 align-center flex-wrap">
              <VCheckboxBtn
                v-for="(btn, index) in checksColor"
                :key="index"
                v-model="btn.value"
                aria-label="checkbox"
                :color="btn.color"
                hide-details
              ></VCheckboxBtn>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Density -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Density">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row">
              <VCheckboxBtn
                v-model="checkbox5"
                aria-label="checkbox"
                color="primary"
                hide-details
                density="compact"
              />
              <VCheckboxBtn
                v-model="checkbox6"
                aria-label="checkbox"
                color="primary"
                hide-details
                density="comfortable"
              />
              <VCheckboxBtn
                v-model="checkbox7"
                aria-label="checkbox"
                color="primary"
                hide-details
              />
            </div>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="States">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row">
              <div>
                <h6 class="text-h6 text-center">
                  On
                </h6>
                <VCheckboxBtn
                  v-model="checkbox8"
                  aria-label="checkbox"
                  color="primary"
                  hide-details
                />
              </div>
              <div>
                <h6 class="text-h6 text-center">
                  Off
                </h6>
                <VCheckboxBtn
                  v-model="checkbox9"
                  aria-label="checkbox"
                  color="primary"
                  hide-details
                />
              </div>
              <div>
                <h6 class="text-h6 text-center">
                  Indeterminate
                </h6>
                <VCheckboxBtn
                  v-model="checkbox10"
                  aria-label="checkbox"
                  color="primary"
                  aria-checked="true"
                  class="justify-center"
                  hide-details
                  indeterminate
                />
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Model as boolean">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row">
              <div>
                <VCheckboxBtn
                  v-model="checkbox11"
                  aria-label="checkbox"
                  color="primary"
                  hide-details
                  :label="`Checkbox 1: ${checkbox11.toString()}`"
                />
                <VCheckboxBtn
                  v-model="checkbox12"
                  aria-label="checkbox"
                  color="primary"
                  hide-details
                  :label="`Checkbox 2: ${checkbox12.toString()}`"
                />
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <!-- With Inline Textfield -->
        <VCol cols="12">
          <UiParentCard title="With Inline Textfield">
            <div class="d-flex">
              <VCheckboxBtn
                v-model="includeFiles"
                aria-label="checkbox"
                class="pr-2"
              />
              <VTextField
                variant="outlined"
                single-line
                label="Include files"
                hide-details
              />
            </div>
            <div class="d-flex mt-3">
              <VCheckboxBtn
                v-model="enabled"
                aria-label="checkbox"
                class="pr-2"
              />
              <VTextField
                variant="outlined"
                single-line
                :disabled="!enabled"
                hide-details
                label="I only work if you check the box"
              />
            </div>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
