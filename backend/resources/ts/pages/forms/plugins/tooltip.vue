<script setup>
import { ref } from 'vue'

const show = ref(false)

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Tooltip' })
const subContent = ref({ content: 'Tooltips display informative text when users hover over, focus on, or tap an element.' })
const path = ref({ filepath: 'resources/ts/pages/forms/plugins/tooltip' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/tooltips/' })
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <UiParentCard title="Simple Tooltips">
        <div class="d-flex flex-column flex-sm-row ga-4 justify-space-around">
          <VBtn
            variant="outlined"
            color="primary"
            scrim="primary"
          >
            Start
            <VTooltip
              activator="parent"
              aria-label="tooltip"
              location="start"
            >
              Tooltip
            </VTooltip>
          </VBtn>

          <VBtn
            variant="outlined"
            color="primary"
          >
            End
            <VTooltip
              activator="parent"
              aria-label="tooltip"
              location="end"
            >
              Tooltip
            </VTooltip>
          </VBtn>

          <VBtn
            variant="outlined"
            color="primary"
          >
            Top
            <VTooltip
              activator="parent"
              aria-label="tooltip"
              location="top"
            >
              Tooltip
            </VTooltip>
          </VBtn>

          <VBtn
            variant="outlined"
            color="primary"
          >
            Bottom
            <VTooltip
              activator="parent"
              aria-label="tooltip"
              location="bottom"
            >
              Tooltip
            </VTooltip>
          </VBtn>
        </div>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Icon Tooltips">
        <div class="d-flex justify-space-around">
          <VTooltip
            location="bottom"
            aria-label="tooltip"
          >
            <template #activator="{ props }">
              <VIcon
                color="primary"
                v-bind="props"
              >
                <SvgSprite
                  name="custom-home-outline"
                  style="width: 20px; height: 20px"
                />
              </VIcon>
            </template>
            <span>Tooltip</span>
          </VTooltip>
          <VTooltip
            location="top"
            aria-label="tooltip"
          >
            <template #activator="{ props }">
              <VIcon
                color="primary"
                v-bind="props"
              >
                <SvgSprite
                  name="custom-copy"
                  style="width: 20px; height: 20px"
                />
              </VIcon>
            </template>
            <span>Copy</span>
          </VTooltip>
        </div>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Toggle Tolltip">
        <div class="d-flex justify-space-around">
          <VBtn
            variant="outlined"
            @click="show = !show"
          >
            {{ !show ? 'Show Tooltip' : 'Hide Tooltip' }}
          </VBtn>
          <VTooltip
            v-model="show"
            top
            aria-label="tooltip"
          >
            <template #activator="{ props }">
              <VBtn
                icon
                v-bind="props"
                aria-label="shopping cart"
              >
                <VIcon>
                  <SvgSprite
                    name="custom-shopping-cart"
                    style="width: 20px; height: 20px"
                  />
                </VIcon>
              </VBtn>
            </template>
            <span>Programmatic tooltip</span>
          </VTooltip>
        </div>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
