<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Grid' })
const subContent = ref({ content: 'The grid is used to create specific layouts within an application\'s content.' })
const path = ref({ filepath: 'resources/ts/pages/utilities/grid' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/grids/' })
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
      md="6"
    >
      <!-- Basic Grid -->
      <UiParentCard title="Basic Grid">
        <VRow>
          <VCol
            xs="8"
            md="8"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=8
            </VSheet>
          </VCol>
          <VCol
            xs="4"
            md="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=4
            </VSheet>
          </VCol>
          <VCol
            xs="4"
            md="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=4
            </VSheet>
          </VCol>
          <VCol
            xs="8"
            md="8"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=8
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
      <!-- Basic Grid -->
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <!-- Multiple Breakpoints -->
      <UiParentCard title="Multiple Breakpoints">
        <VRow>
          <VCol
            xs="8"
            md="8"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=8 md=8
            </VSheet>
          </VCol>
          <VCol
            xs="4"
            md="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=4 md=4
            </VSheet>
          </VCol>
          <VCol
            xs="4"
            md="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=4 md=4
            </VSheet>
          </VCol>
          <VCol
            xs="8"
            md="8"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="align-center justify-center d-flex"
              height="40"
              width="100%"
            >
              xs=8 md=8
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
      <!-- Basic Grid -->
    </VCol>
    <!-- Breakpoint Grid -->
    <VCol
      md="12"
      cols="12"
    >
      <UiParentCard title="Breakpoint sizing">
        <VRow no-gutters>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
        </VRow>

        <VRow no-gutters>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
        </VRow>

        <VRow no-gutters>
          <VCol cols="2">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-2
            </VSheet>
          </VCol>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- Breakpoint Grid -->
    <VCol
      md="12"
      cols="12"
    >
      <UiParentCard title="Justify">
        <VRow justify="start">
          <VCol
            v-for="k in 2"
            :key="k"
            cols="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .justify-start
            </VSheet>
          </VCol>
        </VRow>

        <VRow justify="center">
          <VCol
            v-for="k in 2"
            :key="k"
            cols="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .justify-center
            </VSheet>
          </VCol>
        </VRow>

        <VRow justify="end">
          <VCol
            v-for="k in 2"
            :key="k"
            cols="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .justify-end
            </VSheet>
          </VCol>
        </VRow>

        <VRow justify="space-around">
          <VCol
            v-for="k in 2"
            :key="k"
            cols="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .justify-space-around
            </VSheet>
          </VCol>
        </VRow>

        <VRow justify="space-between">
          <VCol
            v-for="k in 2"
            :key="k"
            cols="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .justify-space-between
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- Offset Grid -->
    <VCol
      md="12"
      cols="12"
    >
      <UiParentCard title="Offset">
        <VRow
          class="mb-6"
          no-gutters
        >
          <VCol cols="4">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-4
            </VSheet>
          </VCol>
          <VCol
            cols="4"
            offset="4"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-4 .offset-4
            </VSheet>
          </VCol>
        </VRow>
        <VRow
          class="mb-6"
          no-gutters
        >
          <VCol
            cols="3"
            offset="3"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-3 .offset-3
            </VSheet>
          </VCol>
          <VCol
            cols="3"
            offset="3"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-3 .offset-3
            </VSheet>
          </VCol>
        </VRow>
        <VRow no-gutters>
          <VCol
            cols="6"
            offset="3"
          >
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-6 .offset-3
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- Offset Grid -->
    <!-- Order Grid -->
    <VCol
      md="12"
      cols="12"
    >
      <UiParentCard title="Order first and last">
        <VRow no-gutters>
          <VCol order="last">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              First, but last
            </VSheet>
          </VCol>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              Second, but unordered
            </VSheet>
          </VCol>
          <VCol order="first">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              Third, but first
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- Grow and Shrink Grid -->
    <VCol
      md="12"
      cols="12"
    >
      <UiParentCard title="Grow and Shrink">
        <VRow
          class="mb-6"
          no-gutters
        >
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>

          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>

          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>

          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
        </VRow>

        <VRow no-gutters>
          <VCol cols="8">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-8
            </VSheet>
          </VCol>

          <VCol cols="4">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-4
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- Grow and Shrink Grid -->
    <VCol
      md="12"
      cols="12"
    >
      <UiParentCard title="One column width">
        <VRow no-gutters>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>

          <VCol cols="6">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-6
            </VSheet>
          </VCol>

          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
        </VRow>

        <VRow no-gutters>
          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>

          <VCol cols="2">
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-2
            </VSheet>
          </VCol>

          <VCol>
            <VSheet
              color="containerBg"
              rounded="md"
              class="pa-2 ma-2"
            >
              .v-col-auto
            </VSheet>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
