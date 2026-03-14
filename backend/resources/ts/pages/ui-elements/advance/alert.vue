<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Alert' })

const subContent = ref({
  content: 'An alert displays a short, important message in a way that attracts the user\'s attention without interrupting the user\'s task.',
})

const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/alert' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/alerts/' })
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
                <VAlert
                  color="primary"
                  variant="tonal"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-alert-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Primary Text
                </VAlert>
                <VAlert
                  color="secondary"
                  variant="tonal"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-database-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Secondary Text
                </VAlert>
                <VAlert
                  color="success"
                  variant="tonal"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-check-square-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Success Text
                </VAlert>
                <VAlert
                  color="warning"
                  variant="tonal"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-warning-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Warning Text
                </VAlert>
                <VAlert
                  color="info"
                  variant="tonal"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-circle-info-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Info Text
                </VAlert>
                <VAlert
                  color="error"
                  variant="tonal"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-bug-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Error Text
                </VAlert>
              </UiParentCard>
            </VCol>
            <!-- With Action -->
            <VCol cols="12">
              <UiParentCard title="Actions">
                <VAlert
                  type="success"
                  variant="tonal"
                  density="compact"
                  class="mb-4 border-solid border-success border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                  closable
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-checkbox-marked-circle-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <div>Success Text</div>
                </VAlert>
                <VAlert
                  type="warning"
                  variant="tonal"
                  density="compact"
                  class="mb-4 border-solid border-warning border-thin border-opacity-25"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-warning-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <div>Warning Text</div>
                  <template #append>
                    <VBtn
                      variant="text"
                      rounded="md"
                      color="warning"
                      class="ml-auto"
                    >
                      Undo
                    </VBtn>
                  </template>
                </VAlert>
                <VAlert
                  color="primary"
                  variant="tonal"
                  density="compact"
                  class="mb-4 border-solid border-primary border-thin border-opacity-25"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-alert-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <div>Primary Text</div>
                  <template #append>
                    <VBtn
                      variant="flat"
                      rounded="md"
                      color="primary"
                      size="small"
                      class="ml-auto"
                    >
                      Continue
                    </VBtn>
                  </template>
                </VAlert>
              </UiParentCard>
            </VCol>
            <!-- Fill alert -->
            <VCol cols="12">
              <UiParentCard title="Filled">
                <VAlert
                  color="primary"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-alert-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Primary Text
                </VAlert>
                <VAlert
                  color="secondary"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-database-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Secondary Text
                </VAlert>
                <VAlert
                  color="success"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-check-square-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Success Text
                </VAlert>
                <VAlert
                  color="warning"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-warning-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Warning Text
                </VAlert>
                <VAlert
                  color="info"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-circle-info-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Info Text
                </VAlert>
                <VAlert
                  color="error"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-bug-fill"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Error Text
                </VAlert>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <!-- Description -->
            <VCol cols="12">
              <UiParentCard title="Description">
                <VAlert
                  color="primary"
                  variant="tonal"
                  class="mb-4 border-solid border-primary border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-alert-fill"
                      class="mt-1"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <h6 class="text-h6 text-capitalize mb-1">
                    Primary text
                  </h6>
                  <div>This is an primary text</div>
                </VAlert>
                <VAlert
                  color="secondary"
                  variant="tonal"
                  class="mb-4 border-solid border-secondary border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-database-outline"
                      class="mt-1"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <h6 class="text-h6 text-capitalize mb-1">
                    Secondary text
                  </h6>
                  <div>This is an secondary text</div>
                </VAlert>
                <VAlert
                  color="success"
                  variant="tonal"
                  class="mb-4 border-solid border-success border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-check-square-fill"
                      class="mt-1"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <h6 class="text-h6 text-capitalize mb-1">
                    Success text
                  </h6>
                  <div>This is an success text</div>
                </VAlert>
                <VAlert
                  color="warning"
                  variant="tonal"
                  class="mb-4 border-solid border-warning border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-warning-fill"
                      class="mt-1"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <h6 class="text-h6 text-capitalize mb-1">
                    Warning text
                  </h6>
                  <div>This is an warning text</div>
                </VAlert>
                <VAlert
                  color="info"
                  variant="tonal"
                  class="mb-4 border-solid border-info border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-circle-info-fill"
                      class="mt-1"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <h6 class="text-h6 text-capitalize mb-1">
                    Info text
                  </h6>
                  <div>This is an info text</div>
                </VAlert>
                <VAlert
                  color="error"
                  variant="tonal"
                  class="border-solid border-error border-thin border-opacity-25"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-bug-fill"
                      class="mt-1"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  <h6 class="text-h6 text-capitalize mb-1">
                    Error text
                  </h6>
                  <div>This is an error text</div>
                </VAlert>
              </UiParentCard>
            </VCol>
            <!-- Outlined -->
            <VCol cols="12">
              <UiParentCard title="Outlined">
                <VAlert
                  color="primary"
                  variant="outlined"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-alert-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Primary Text
                </VAlert>
                <VAlert
                  color="secondary"
                  variant="outlined"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-database-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Secondary Text
                </VAlert>
                <VAlert
                  color="success"
                  variant="outlined"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-square-check-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Success Text
                </VAlert>
                <VAlert
                  color="warning"
                  variant="outlined"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-warning-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Warning Text
                </VAlert>
                <VAlert
                  color="info"
                  variant="outlined"
                  class="mb-4"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-info-circle-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Info Text
                </VAlert>
                <VAlert
                  color="error"
                  variant="outlined"
                  icon="false"
                  rounded="md"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-bug-outline"
                      style="width: 20px; height: 20px"
                    />
                  </template>
                  Error Text
                </VAlert>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
