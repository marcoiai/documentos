<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Breadcrumbs' })
const subContent = ref({ content: 'Breadcrumbs allow users to make selections from a range of values.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/breadcrumb' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/breadcrumbs/' })

// breadcrumb data
const items = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'Kanban',
    disabled: true,
    href: '',
  },
])
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
          <UiParentCard title="Basic">
            <VToolbar
              rounded="md"
              color="containerBg"
              dark
              prominent
              border
            >
              <VBreadcrumbs
                :items="items"
                class="mb-0 pa-6"
              />
            </VToolbar>
          </UiParentCard>
        </VCol>
        <!-- Custom Separator -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Custom Separator">
            <VToolbar
              rounded="md"
              color="containerBg"
              dark
              prominent
              border
            >
              <VBreadcrumbs
                :items="items"
                class="mb-0 pa-6"
              >
                <template #divider>
                  <div class="d-flex align-center">
                    <SvgSprite
                      name="custom-line"
                      style="width: 14px; height: 14px"
                    />
                  </div>
                </template>
              </VBreadcrumbs>
            </VToolbar>
          </UiParentCard>
        </VCol>
        <!-- With Title -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With Title">
            <VToolbar
              rounded="md"
              color="containerBg"
              class="breadcrumb-with-title"
              dark
              prominent
              border
            >
              <div>
                <VToolbarTitle class="ms-6 mb-n2 text-h2 font-weight-bold">
                  Kanban
                </VToolbarTitle>
                <VBreadcrumbs
                  :items="items"
                  class="pb-0 mb-0 pa-6 pt-3"
                >
                  <template #divider>
                    <div class="d-flex align-center">
                      <SvgSprite
                        name="custom-chevron-outline"
                        style="width: 13px; height: 13px"
                      />
                    </div>
                  </template>
                </VBreadcrumbs>
              </div>
            </VToolbar>
          </UiParentCard>
        </VCol>
        <!-- Title Bottom -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Title Bottom">
            <VToolbar
              rounded="md"
              color="containerBg"
              class="breadcrumb-with-title"
              dark
              prominent
              border
            >
              <div>
                <VBreadcrumbs
                  :items="items"
                  class="pt-0 pb-3 pa-6"
                >
                  <template #divider>
                    <div class="d-flex align-center">
                      <SvgSprite
                        name="custom-chevron-outline"
                        style="width: 13px; height: 13px"
                      />
                    </div>
                  </template>
                </VBreadcrumbs>
                <VToolbarTitle class="ms-6 mt-n4 text-h2 font-weight-bold">
                  Kanban
                </VToolbarTitle>
              </div>
            </VToolbar>
          </UiParentCard>
        </VCol>
        <!-- With Icons -->
        <VCol cols="12">
          <UiParentCard title="With Icons">
            <VToolbar
              rounded="md"
              color="containerBg"
              class="breadcrumb-with-title"
              dark
              prominent
              border
            >
              <div>
                <VToolbarTitle class="ms-6 mb-n4 text-h2 font-weight-bold">
                  Kanban
                </VToolbarTitle>
                <VBreadcrumbs
                  :items="items"
                  class="pb-0 mb-0 pa-6"
                >
                  <template #divider>
                    <div class="d-flex align-center">
                      <SvgSprite
                        name="custom-chevron-outline"
                        style="width: 13px; height: 13px"
                      />
                    </div>
                  </template>
                  <template #prepend>
                    <SvgSprite
                      name="custom-home-outline"
                      class="me-1 text-lightText"
                      style="width: 16px; height: 16px"
                    />
                  </template>
                </VBreadcrumbs>
              </div>
            </VToolbar>
          </UiParentCard>
        </VCol>
        <!-- with Divider -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="No Card with Divider">
            <VToolbar
              rounded="md"
              class="pb-4 breadcrumb-height"
              color="transparent"
              dark
              prominent
            >
              <div>
                <VToolbarTitle class="mb-n2 text-h2 font-weight-bold">
                  Kanban
                </VToolbarTitle>
                <VBreadcrumbs
                  :items="items"
                  class="pb-0 mb-0 ps-0"
                >
                  <template #divider>
                    <div class="d-flex align-center">
                      <SvgSprite
                        name="custom-chevron-outline"
                        style="width: 13px; height: 13px"
                      />
                    </div>
                  </template>
                </VBreadcrumbs>
              </div>
            </VToolbar>
            <VDivider />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="No Card with Divider">
            <VToolbar
              rounded="md"
              class="breadcrumb-height"
              color="transparent"
              dark
              prominent
            >
              <div>
                <VToolbarTitle class="mb-n2 text-h2 font-weight-bold">
                  Kanban
                </VToolbarTitle>
                <VBreadcrumbs
                  :items="items"
                  class="pb-0 mb-0 ps-0"
                >
                  <template #divider>
                    <div class="d-flex align-center">
                      <SvgSprite
                        name="custom-chevron-outline"
                        style="width: 13px; height: 13px"
                      />
                    </div>
                  </template>
                </VBreadcrumbs>
              </div>
            </VToolbar>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
