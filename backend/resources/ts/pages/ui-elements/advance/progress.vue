<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Progress' })

const subContent = ref({
  content: 'Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.',
})

const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/progress' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/progress-circular/' })

// progress data
const pcolors = ref([
  {
    color: '#fe0000',
    value: 25,
  },
  {
    color: 'secondary',
    value: 50,
  },
  {
    color: 'success',
    value: 75,
  },
  {
    color: 'warning',
    value: 100,
  },
  {
    color: 'info',
    value: 30,
  },
  {
    color: 'error',
    value: 45,
  },
])

const pvalue = ref([
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
])

const psize = ref([
  {
    color: 'primary',
    size: 25,
  },
  {
    color: 'secondary',
    size: 50,
  },
  {
    color: 'error',
    size: 55,
  },
  {
    color: 'warning',
    size: 65,
  },
  {
    color: 'success',
    size: 75,
  },
])

const pheight = ref([
  {
    color: 'primary',
    size: 6,
    value: 80,
  },
  {
    color: 'secondary',
    size: 6,
    value: 75,
  },
  {
    color: 'success',
    size: 8,
    value: 99,
  },
  {
    color: 'warning',
    size: 10,
    value: 35,
  },
  {
    color: 'info',
    size: 12,
    value: 60,
  },
  {
    color: 'error',
    size: 2,
    value: 15,
  },
])

// linear data

const p1 = ref(29)
const withLabel = ref(100)
const withLabel1 = ref(60)
const withLabel2 = ref(20)
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
            <!-- Circular Indeterminate -->
            <VCol cols="12">
              <UiParentCard title="Circular Indeterminate">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 justify-center">
                  <div
                    v-for="progress in pcolors"
                    :key="progress.color"
                  >
                    <VProgressCircular
                      aria-label="circular progressbar"
                      indeterminate
                      size="40"
                      :model-value="progress.value"
                      :color="progress.color"
                    />
                  </div>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Circular -->
            <VCol cols="12">
              <UiParentCard title="Circular Indeterminate with path">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 justify-center">
                  <div
                    v-for="progress in pcolors"
                    :key="progress.color"
                  >
                    <VProgressCircular
                      aria-label="circular progressbar"
                      indeterminate
                      size="40"
                      :model-value="progress.value"
                      bg-opacity="1"
                      bg-color="borderLight"
                      :color="progress.color"
                    />
                  </div>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Circular Determinate -->
            <VCol cols="12">
              <UiParentCard title="Circular Determinate">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 justify-center">
                  <div
                    v-for="progress in pvalue"
                    :key="progress.value"
                  >
                    <VProgressCircular
                      aria-label="circular progressbar"
                      size="40"
                      :model-value="progress.value"
                      color="primary"
                    />
                  </div>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Circular Determinate With Path -->
            <VCol cols="12">
              <UiParentCard title="Circular Determinate With Path">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 justify-center">
                  <div
                    v-for="progress in pvalue"
                    :key="progress.value"
                  >
                    <VProgressCircular
                      aria-label="circular progressbar"
                      size="40"
                      :model-value="progress.value"
                      color="primary"
                      bg-opacity="1"
                      bg-color="borderLight"
                    />
                  </div>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Circular Size -->
            <VCol cols="12">
              <UiParentCard title="Circular Size">
                <div class="d-flex flex-column flex-sm-row align-center ga-4 justify-center">
                  <div
                    v-for="progress in psize"
                    :key="progress.color"
                  >
                    <VProgressCircular
                      aria-label="circular progressbar"
                      :size="progress.size"
                      indeterminate
                      :color="progress.color"
                      bg-opacity="1"
                      bg-color="borderLight"
                    />
                  </div>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Linear striped -->
            <VCol cols="12">
              <UiParentCard title="Striped">
                <div class="d-flex flex-column ga-4">
                  <div
                    v-for="progress in pcolors"
                    :key="progress.color"
                  >
                    <VProgressLinear
                      aria-label="progressbar"
                      rounded
                      :color="progress.color"
                      :model-value="progress.value"
                      striped
                      height="10"
                    />
                  </div>
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
            <!-- Linear Intermidiate -->
            <VCol cols="12">
              <UiParentCard title="Linear Intermidiate">
                <VProgressLinear
                  aria-label="progressbar"
                  color="primary"
                  indeterminate
                />
              </UiParentCard>
            </VCol>
            <!-- Linear -->
            <VCol cols="12">
              <UiParentCard title="Linear">
                <VProgressLinear
                  v-model="p1"
                  aria-label="progressbar"
                  color="primary"
                />
              </UiParentCard>
            </VCol>
            <!-- Linear Reverse Intermidiate -->
            <VCol cols="12">
              <UiParentCard title="Linear Reverse Intermidiate">
                <VProgressLinear
                  aria-label="progressbar"
                  color="primary"
                  reverse
                  indeterminate
                />
              </UiParentCard>
            </VCol>
            <!-- Linear Reverse -->
            <VCol cols="12">
              <UiParentCard title="Linear Reverse">
                <VProgressLinear
                  aria-label="progressbar"
                  color="primary"
                  reverse
                  model-value="15"
                />
              </UiParentCard>
            </VCol>
            <!-- Linear with label -->
            <VCol cols="12">
              <UiParentCard title="Linear With Label">
                <VProgressLinear
                  v-model="withLabel"
                  aria-label="progressbar"
                  color="success"
                  class="mb-3"
                  height="25"
                >
                  <template #default="{ value }">
                    <strong class="text-surface">{{ Math.ceil(value) }}%</strong>
                  </template>
                </VProgressLinear>
                <VProgressLinear
                  v-model="withLabel1"
                  aria-label="progressbar"
                  color="primary"
                  class="mb-3"
                  height="25"
                >
                  <template #default="{ value }">
                    <strong class="text-surface">{{ Math.ceil(value) }}%</strong>
                  </template>
                </VProgressLinear>
                <VProgressLinear
                  v-model="withLabel2"
                  aria-label="progressbar"
                  color="error"
                  height="25"
                >
                  <template #default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </VProgressLinear>
              </UiParentCard>
            </VCol>
            <!-- Height -->
            <VCol cols="12">
              <UiParentCard title="Linear Color With Height">
                <div class="d-flex flex-column ga-4">
                  <div
                    v-for="progress in pheight"
                    :key="progress.color"
                    class="d-flex align-center"
                  >
                    <VProgressLinear
                      aria-label="progressbar"
                      rounded
                      :color="progress.color"
                      :model-value="progress.value"
                      :height="progress.size"
                      style="left: unset; transform: unset"
                    />
                    <span class="text-caption text-lightText ms-3">{{ progress.value }}%</span>
                  </div>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Linear Stream -->
            <VCol cols="12">
              <UiParentCard title="Linear Stream">
                <VProgressLinear
                  aria-label="progressbar"
                  color="primary"
                  model-value="20"
                  buffer-value="0"
                  stream
                />
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
