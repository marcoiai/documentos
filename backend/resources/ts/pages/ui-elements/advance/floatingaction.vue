<script setup lang="ts">
import { ref, shallowRef } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Floating Action Buttons' })

const subContent = ref({
  content: 'Floating action buttons can be attached to material to signify a promoted action in your application.',
})

const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/floatingaction' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/floating-action-buttons/' })

const hidden = ref(false)

const folders = shallowRef([
  {
    icon: 'custom-camera-fill',
    subtitle: 'Jan 9, 2024',
    title: 'Photos',
    color: 'warning',
  },
  {
    icon: 'custom-filter-fill',
    subtitle: 'Jan 7, 2024',
    title: 'Work',
    color: 'primary',
  },
  {
    icon: 'custom-aim-fill',
    subtitle: 'July 20, 2024',
    title: 'Vacation',
    color: 'info',
  },
])

const folders2 = ref([
  {
    icon: 'custom-file-text-fill',
    subtitle: 'Jan 7, 2024',
    title: 'Vacation itinerary',
    color: 'primary',
  },
  {
    icon: 'custom-right-circle-fill',
    subtitle: 'July 20, 2024',
    title: 'Kitchen remodel',
    color: 'info',
  },
])
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <VRow>
    <VCol cols="12">
      <VRow>
        <!-- Variant -->
        <VCol cols="12" md="6">
          <UiParentCard title="Basic variant">
            <div class="d-flex ga-2 align-start" style="height: 42px">
              <div style="min-width: 42px; height: 42px">
                <VFab color="primary" icon>
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Default</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="primary" variant="outlined">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Outlined</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="primary" variant="tonal">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Tonal</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="primary" variant="flat">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Flat</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="primary" variant="text">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Text</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="primary" variant="plain">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">Plain</span>
                  </VTooltip>
                </VFab>
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Size -->
        <VCol cols="12" md="6">
          <UiParentCard title="Size">
            <div class="d-flex ga-2 align-center" style="height: 58px">
              <div style="min-width: 58px; height: 58px">
                <VFab icon color="primary" variant="tonal" size="x-large">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">x-large</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 50px; height: 50px">
                <VFab icon color="primary" variant="tonal" size="large">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">large</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="primary" variant="tonal">
                  <SvgSprite name="custom-user-outline" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">default</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 34px; height: 34px">
                <VFab icon color="primary" variant="tonal" size="small">
                  <SvgSprite name="custom-user-outline" style="width: 14px; height: 14px" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">small</span>
                  </VTooltip>
                </VFab>
              </div>
              <div style="min-width: 26px; height: 26px">
                <VFab icon color="primary" variant="tonal" size="x-small">
                  <SvgSprite name="custom-user-outline" style="width: 14px; height: 14px" />
                  <VTooltip activator="parent" aria-label="tooltip" location="bottom" content-class="smallTooltip">
                    <span class="text-caption">x-small</span>
                  </VTooltip>
                </VFab>
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <VCol cols="12">
          <UiParentCard title="Color">
            <div class="d-flex ga-2 align-start" style="height: 42px">
              <div style="min-width: 42px; height: 42px">
                <VFab color="primary" variant="flat" icon><SvgSprite name="custom-user-outline" /></VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="secondary" variant="flat"><SvgSprite name="custom-user-outline" /></VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="success" variant="flat"><SvgSprite name="custom-user-outline" /></VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="warning" variant="flat"><SvgSprite name="custom-user-outline" /></VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="info" variant="flat"><SvgSprite name="custom-user-outline" /></VFab>
              </div>
              <div style="min-width: 42px; height: 42px">
                <VFab icon color="error" variant="flat"><SvgSprite name="custom-user-outline" /></VFab>
              </div>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Display Animation -->
        <VCol cols="12" md="6">
          <UiParentCard title="Display animation">
            <VCard class="mx-auto overflow-hidden" variant="outlined" max-width="360">
              <VLayout>
                <VAppBar absolute color="surface" extended>
                  <VAppBarNavIcon />

                  <template v-slot:extension>
                    <VFab
                      :active="!hidden"
                      color="primary"
                      class="ml-4"
                      icon="$plus"
                      location="bottom start"
                      size="small"
                      absolute
                      offset
                    />
                  </template>
                </VAppBar>

                <VMain>
                  <VSheet class="pa-4 text-center" color="containerBg" height="300">
                    <VBtn :text="hidden ? 'Show' : 'Hide'" color="surface-variant" width="80" @click="(hidden = !hidden)" />
                  </VSheet>

                  <VSheet height="125">
                    <VFab :active="!hidden" class="mr-4" color="primary" icon="$plus" location="top end" absolute offset />
                  </VSheet>
                </VMain>
              </VLayout>
            </VCard>
          </UiParentCard>
        </VCol>
        <!-- Small variant -->
        <VCol cols="12" md="6">
          <UiParentCard title="Small variant">
            <VCard class="mx-auto overflow-hidden" variant="outlined" max-width="365">
              <VToolbar color="containerBg" extended light>
                <VAppBarNavIcon color="darkText" />

                <VToolbarTitle>My files</VToolbarTitle>

                <VSpacer />

                <VBtn color="darkText" icon="$magnify" />

                <template v-slot:extension>
                  <VFab class="ml-4" color="primary" icon="$plus" location="bottom left" size="40" absolute offset></VFab>
                </template>
              </VToolbar>

              <VList lines="two" subheader aria-label="list" aria-busy="true">
                <VListSubheader title="Folders" inset />

                <VListItem v-for="folder in folders" :key="folder.title" :subtitle="folder.subtitle">
                  <template v-slot:prepend>
                    <VAvatar
                      size="40"
                      :color="folder.color"
                      :class="`text-${folder.color} border-solid border-${folder.color} border-thin border-opacity-100`"
                      variant="tonal"
                    >
                      <SvgSprite :name="folder.icon || ''" style="width: 18px; height: 18px" />
                    </VAvatar>
                  </template>

                  <template v-slot:title>
                    <h5 class="text-h6 mb-0">{{ folder.title }}</h5>
                  </template>
                  <template v-slot:subtitle>
                    <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                  </template>
                </VListItem>

                <VDivider inset />

                <VListSubheader title="Files" inset></VListSubheader>

                <VListItem v-for="folder in folders2" :key="folder.title" :subtitle="folder.subtitle">
                  <template v-slot:prepend>
                    <VAvatar
                      size="40"
                      :color="folder.color"
                      :class="`text-${folder.color} border-solid border-${folder.color} border-thin border-opacity-100`"
                      variant="tonal"
                    >
                      <SvgSprite :name="folder.icon || ''" style="width: 18px; height: 18px" />
                    </VAvatar>
                  </template>

                  <template v-slot:title>
                    <h5 class="text-h6 mb-0">{{ folder.title }}</h5>
                  </template>
                  <template v-slot:subtitle>
                    <span class="text-subtitle-2">{{ folder.subtitle }}</span>
                  </template>
                </VListItem>
              </VList>
            </VCard>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
