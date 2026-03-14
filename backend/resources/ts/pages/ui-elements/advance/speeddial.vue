<script setup lang="ts">
import { ref, computed } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// Define the Anchor type based on Vuetify's expected locations
type Anchor = 'top' | 'bottom' | 'left' | 'right' | 'center';

// component content
const page = ref({ title: 'Speed Dial' })

const subContent = ref({
  content: 'When pressed, a floating action button can display three to six related actions in the form of a speed dial.',
})

const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/speeddial' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/speed-dials/' })

const isSpeedDialOpen = ref(true)

// Define and initialize reactive references for location positions
const selectedItem = ref<Anchor>('bottom')
const selectedItem2 = ref<Anchor>('center')

// Define arrays of valid locations
const itemsAndLocations: Anchor[] = ['top', 'bottom', 'left', 'right']
const itemsAndLocations2: Anchor[] = ['top', 'bottom', 'center', 'left', 'right']

// Create reactive references for location arrays
const items = ref(itemsAndLocations)
const items2 = ref(itemsAndLocations2)

// Define and initialize reactive reference for transition type
const transitionItem = ref('fade-transition')

// Define array of valid transition types
const itemsAndTransition = [
  'fade-transition',
  'scale-transition',
  'slide-x-transition',
  'slide-y-transition',
  'slide-x-reverse-transition',
  'slide-y-reverse-transition',
]

// Create reactive reference for transition array
const items3 = ref(itemsAndTransition)

// Concatenate two locations into one valid Anchor type
const getLocation = (loc1: Anchor, loc2: Anchor): NonNullable<Anchor> | undefined => {
  const validLocations: Anchor[] = ['top', 'bottom', 'left', 'right', 'center']
  if (validLocations.includes(loc1) && validLocations.includes(loc2)) {
    return `${loc1} ${loc2}` as NonNullable<Anchor>
  }
  
  return undefined
}

// Compute combined location from selected items
const combinedLocation = computed(() => {
  return getLocation(selectedItem.value, selectedItem2.value)
})

// Compute transition type string from selected transition item
const transition = computed(() => {
  return `${transitionItem.value}`
})

// Compute visibility of speed dial based on selected locations
const showSpeedDial = computed(() => !!selectedItem.value || !!selectedItem2.value)
</script>

<template>
  <ComponentTitle :title="page.title" :subContent="subContent.content" :path="path.filepath" :link="link.filelink"></ComponentTitle>
  <VRow>
    <VCol cols="12">
      <VRow>
        <!-- Default -->
        <VCol cols="12" md="6">
          <UiParentCard title="Default">
            <VSheet height="205" class="fab-icon text-center mt-4">
              <VFab size="large" color="primary" rounded="circle" min-width="50" class="ms-n12 h-auto" height="50">
                <SvgSprite name="custom-plus" />
                <VSpeedDial
                  v-model="isSpeedDialOpen"
                  activator="parent"
                  scroll-strategy="none"
                  z-index="1"
                  min-width="34"
                  location="bottom center"
                  transition="fade-transition"
                >
                  <VBtn key="1" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-heart-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Like</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="2" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-share-outline" style="width: 20px; height: 20px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Share</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="3" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-printer-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Print</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="4" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-bookmark-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Save</span>
                    </VTooltip>
                  </VBtn>
                </VSpeedDial>
              </VFab>
            </VSheet>
          </UiParentCard>
        </VCol>

        <!-- On hover -->
        <VCol cols="12" md="6">
          <UiParentCard title="Open on hover">
            <VSheet height="205" class="fab-icon text-center mt-4">
              <VFab size="large" color="primary" rounded="circle" min-width="50" class="ms-n12 h-auto" height="50">
                <SvgSprite name="custom-plus" />
                <VSpeedDial
                  open-on-hover
                  activator="parent"
                  scroll-strategy="none"
                  z-index="1"
                  min-width="34"
                  location="bottom center"
                  transition="fade-transition"
                >
                  <VBtn key="1" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-heart-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Like</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="2" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-share-outline" style="width: 20px; height: 20px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Share</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="3" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-printer-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Print</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="4" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-bookmark-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Save</span>
                    </VTooltip>
                  </VBtn>
                </VSpeedDial>
              </VFab>
            </VSheet>
          </UiParentCard>
        </VCol>

        <!-- Positions -->
        <VCol cols="12" md="6">
          <UiParentCard title="Different Positions">
            <VRow>
              <VCol sm="6">
                <VLabel class="mb-2">Location</VLabel>
                <VAutocomplete
                  v-model="selectedItem"
                  aria-label="autocomplete"
                  :items="items"
                  hide-details
                  color="primary"
                  variant="outlined"
                  rounded="sm"
                  single-line
                />
              </VCol>
              <VCol sm="6">
                <VLabel class="mb-2">Location 2</VLabel>
                <VAutocomplete
                  v-model="selectedItem2"
                  aria-label="autocomplete"
                  :items="items2"
                  hide-details
                  color="primary"
                  variant="outlined"
                  rounded="sm"
                  single-line
                />
              </VCol>
            </VRow>

            <VSheet height="400" class="fab-icon text-center">
              <VFab size="large" color="primary" rounded="circle" min-width="50" class="ms-n12" height="50">
                <SvgSprite name="custom-plus" />
                <VSpeedDial
                  v-if="showSpeedDial"
                  activator="parent"
                  min-width="34"
                  :location="combinedLocation"
                  transition="fade-transition"
                >
                  <VBtn key="1" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary"
                    ><SvgSprite name="custom-heart-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Like</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="2" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-share-outline" style="width: 20px; height: 20px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Share</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="3" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-printer-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Print</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="4" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-bookmark-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Save</span>
                    </VTooltip>
                  </VBtn>
                </VSpeedDial>
              </VFab>
            </VSheet>
          </UiParentCard>
        </VCol>
        <!-- Animation -->
        <VCol cols="12" md="6">
          <UiParentCard title="Animation">
            <VLabel class="mb-2">Transition</VLabel>
            <VAutocomplete
              v-model="transitionItem"
              aria-label="autocomplete"
              :items="items3"
              hide-details
              color="primary"
              variant="outlined"
              rounded="sm"
              single-line
            />
            <VSheet height="400" class="fab-icon text-center">
              <VFab size="large" color="primary" rounded="circle" min-width="50" class="ms-n12" height="50">
                <SvgSprite name="custom-plus" />
                <VSpeedDial activator="parent" min-width="34" location="bottom center" :transition="transition">
                  <VBtn key="1" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary"
                    ><SvgSprite name="custom-heart-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Like</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="2" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-share-outline" style="width: 20px; height: 20px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Share</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="3" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-printer-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Print</span>
                    </VTooltip>
                  </VBtn>
                  <VBtn key="4" rounded="circle" class="px-0" min-width="34" height="34" variant="tonal" color="secondary">
                    <SvgSprite name="custom-bookmark-outline" style="width: 18px; height: 18px" />
                    <VTooltip activator="parent" aria-label="tooltip" location="start" content-class="smallTooltip">
                      <span class="text-caption">Save</span>
                    </VTooltip>
                  </VBtn>
                </VSpeedDial>
              </VFab>
            </VSheet>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.fab-icon {
  .v-btn.v-btn--size-large {
    padding: 0;
  }
}
</style>
