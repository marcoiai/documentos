<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Radio' })
const subContent = ref({ content: 'Radio buttons allow the user to select one option from a set.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/radio' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/radio-buttons/' })

const radioGroup = ref('1')
const radioGroup3 = ref('1')
const radioColumn = ref('1')
const radioInline = ref('1')
const radioColors = ref('success')

// radio color data
const radioColor = ref(['primary', 'secondary', 'success', 'warning', 'info', 'error'])
</script>

// ===============================|| Ui Radio ||=============================== //
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
        <!-- Basic Radio -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Basic Radio">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row radio-group-space">
              <VRadioGroup
                v-model="radioGroup"
                inline
                hide-details
              >
                <VRadio
                  color="primary"
                  value="1"
                  label="Female"
                />
                <VRadio
                  color="primary"
                  value="2"
                  label="Male"
                />
                <VRadio
                  disabled
                  color="primary"
                  value="3"
                  label="Other"
                />
              </VRadioGroup>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Radio with Label -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Density">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row radio-group-space">
              <VRadioGroup
                v-model="radioGroup3"
                hide-details
                inline
              >
                <VRadio
                  label="Compact"
                  color="primary"
                  value="1"
                  density="compact"
                />
                <VRadio
                  label="Comfortable"
                  color="primary"
                  value="2"
                  density="comfortable"
                />
                <VRadio
                  label="Default"
                  color="primary"
                  value="3"
                />
              </VRadioGroup>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Direction -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Direction">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row radio-group-space">
              <VRadioGroup
                v-model="radioColumn"
                column
              >
                <VRadio
                  label="Option 1"
                  color="primary"
                  value="1"
                />
                <VRadio
                  label="Option 2"
                  color="primary"
                  value="2"
                />
              </VRadioGroup>
              <VRadioGroup
                v-model="radioInline"
                inline
              >
                <VRadio
                  label="Option 1"
                  color="primary"
                  value="1"
                />
                <VRadio
                  label="Option 2"
                  color="primary"
                  value="2"
                />
              </VRadioGroup>
            </div>
          </UiParentCard>
        </VCol>
        <!-- With Colors -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With Colors">
            <div class="d-flex ga-4 align-center flex-column flex-sm-row radio-group-space">
              <VRadioGroup
                v-model="radioColors"
                inline
              >
                <VRadio
                  v-for="btn in radioColor"
                  :key="btn"
                  :color="btn"
                  :label="btn"
                  :value="btn"
                  hide-details
                />
              </VRadioGroup>
            </div>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.radio-group-space {
  .v-selection-control-group {
    gap: 10px;
  }
}
</style>
