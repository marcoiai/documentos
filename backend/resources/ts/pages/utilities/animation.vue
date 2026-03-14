<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Animation' })
const subContent = ref({ content: 'Animation allows you to give different effects in images or cards.' })
const path = ref({ filepath: 'resources/ts/pages/utilities/animation' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/styles/transitions/' })

const fadeTran = ref(true)
const expandTran = ref(true)
const fabTran = ref(true)
const slidxTran = ref(true)
const slidyTran = ref(true)
const scrolTran = ref(true)
const scrolyTran = ref(true)
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
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Slide X Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="slidxTran = !slidxTran"
            >
              Slide X Transition
            </VBtn>
            <br>
            <VSlideXTransition>
              <img
                v-show="slidxTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VSlideXTransition>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Slide y Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="slidyTran = !slidyTran"
            >
              Slide Y Transition
            </VBtn>
            <br>
            <VSlideYTransition>
              <img
                v-show="slidyTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VSlideYTransition>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Scroll x Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="scrolTran = !scrolTran"
            >
              Scroll x Transition
            </VBtn>
            <br>
            <VScrollXTransition>
              <img
                v-show="scrolTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VScrollXTransition>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Scroll y Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="scrolyTran = !scrolyTran"
            >
              Scroll Y Transition
            </VBtn>
            <br>
            <VScrollYTransition>
              <img
                v-show="scrolyTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VScrollYTransition>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Expand Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="expandTran = !expandTran"
            >
              Expand-transition
            </VBtn>
            <br>
            <VExpandTransition>
              <img
                v-show="expandTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VExpandTransition>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Fab Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="fabTran = !fabTran"
            >
              Fab-transition
            </VBtn>
            <br>
            <VFabTransition>
              <img
                v-show="fabTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VFabTransition>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="6"
        >
          <UiParentCard title="Fade Transition">
            <VBtn
              color="primary"
              variant="outlined"
              class="ma-2"
              @click="fadeTran = !fadeTran"
            >
              Fade-transition
            </VBtn>
            <br>
            <VFadeTransition>
              <img
                v-show="fadeTran"
                src="@images/background/img-profile-bg.png"
                alt="mantis"
                class="rounded-md mt-8 w-75"
              >
            </VFadeTransition>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
