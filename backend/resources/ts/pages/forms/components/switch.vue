<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Switch' })
const subContent = ref({ content: 'Switches toggle the state of a single setting on or off.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/switch' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/switches/' })

const model = ref(true)
const model1 = ref(true)
const model2 = ref(true)
const model3 = ref(true)
const model4 = ref(true)
const model5 = ref(true)
const model6 = ref(true)
const model7 = ref(true)
const model8 = ref(true)
const model9 = ref(true)
const model10 = ref(true)
const model11 = ref(true)
const model12 = ref(true)
const model13 = ref(true)
const model14 = ref(true)
const model15 = ref(true)
const model16 = ref(true)
const model17 = ref(true)
</script>

// ===============================|| Ui Switch ||=============================== //
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
        <!-- Basic Switch -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Basic Switch">
            <div class="d-sm-flex justify-space-between">
              <VSwitch
                v-model="model1"
                color="primary"
                aria-label="switch"
                hide-details
              />

              <VSwitch
                color="primary"
                aria-label="switch"
                :model-value="false"
                hide-details
              />
              <VSwitch
                v-model="model2"
                color="primary"
                aria-label="switch"
                disabled
                hide-details
              />

              <VSwitch
                color="primary"
                aria-label="switch"
                :model-value="false"
                disabled
                hide-details
              />
              <VSwitch
                v-model="model3"
                loading="error"
                aria-label="loading switch"
                hide-details
              />

              <VSwitch
                :model-value="false"
                aria-label="switch"
                loading="error"
                hide-details
              />
            </div>
          </UiParentCard>
        </VCol>
        <!-- With Label -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With Label">
            <div class="d-flex justify-space-around">
              <VSwitch
                v-model="model4"
                color="primary"
                aria-label="switch"
                label="Label"
                hide-details
              />

              <VSwitch
                color="primary"
                aria-label="switch"
                disabled
                label="Disabled"
                :model-value="false"
                hide-details
              />
            </div>
          </UiParentCard>
        </VCol>
        <!-- Inset -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Inset">
            <VSwitch
              v-model="model"
              aria-label="switch"
              hide-details
              color="primary"
              inset
              :label="`Switch: ${model.toString()}`"
            />
          </UiParentCard>
        </VCol>
        <!-- Inset Colors -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Inset Colors">
            <div class="d-flex ga-4 flex-column flex-sm-row">
              <VSwitch
                v-model="model5"
                aria-label="switch"
                color="primary"
                hide-details
                inset
              />
              <VSwitch
                v-model="model6"
                aria-label="switch"
                color="secondary"
                hide-details
                inset
              />
              <VSwitch
                v-model="model7"
                aria-label="switch"
                color="success"
                hide-details
                inset
              />
              <VSwitch
                v-model="model8"
                aria-label="switch"
                color="error"
                hide-details
                inset
              />
              <VSwitch
                v-model="model9"
                aria-label="switch"
                color="warning"
                hide-details
                inset
              />
            </div>
          </UiParentCard>
        </VCol>
        <!-- Colors -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Colors">
            <div class="d-flex ga-4 flex-column flex-sm-row">
              <VSwitch
                v-model="model10"
                aria-label="switch"
                color="primary"
                hide-details
              />
              <VSwitch
                v-model="model11"
                aria-label="switch"
                color="secondary"
                hide-details
              />
              <VSwitch
                v-model="model12"
                aria-label="switch"
                color="success"
                hide-details
              />
              <VSwitch
                v-model="model13"
                aria-label="switch"
                color="error"
                hide-details
              />
              <VSwitch
                v-model="model14"
                aria-label="switch"
                color="warning"
                hide-details
              />
            </div>
          </UiParentCard>
        </VCol>
        <!-- Density -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Density">
            <div class="d-flex ga-4 flex-column flex-sm-row">
              <VSwitch
                v-model="model15"
                aria-label="switch"
                color="primary"
                density="compact"
                hide-details
              />
              <VSwitch
                v-model="model16"
                aria-label="switch"
                color="primary"
                density="comfortable"
                hide-details
              />
              <VSwitch
                v-model="model17"
                aria-label="switch"
                color="primary"
                hide-details
              />
            </div>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
