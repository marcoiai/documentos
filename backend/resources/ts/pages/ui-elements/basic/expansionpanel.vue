<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Accordion' })
const subContent = ref({ content: 'Lists are continuous, vertical indexes of text or images.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/expansionpanel' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/expansion-panels/' })

const panel = ref([0, 1])
const panel1 = ref([0])
const panel2 = ref([0])
const multiple = ref([0, 1])
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
            <VExpansionPanels v-model="panel1">
              <VExpansionPanel
                v-for="i in 3"
                :key="i"
                elevation="0"
              >
                <VExpansionPanelTitle color="containerBg">
                  Accordion 0{{ i }}
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                  lobortis eget.
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>
        <!-- Disabled -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Disabled">
            <VExpansionPanels disabled>
              <VExpansionPanel
                v-for="i in 3"
                :key="i"
                elevation="0"
              >
                <VExpansionPanelTitle> Accordion 0{{ i }} </VExpansionPanelTitle>
                <VExpansionPanelText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>
        <!-- Default Expand -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Default Expand">
            <VExpansionPanels v-model="panel">
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 01
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 02
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 03
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>
        <!-- Multiple Expand -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Multiple Expand">
            <VExpansionPanels
              v-model="multiple"
              multiple
            >
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 01
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 02
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 03
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>

        <!-- Inset -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Inset">
            <VExpansionPanels variant="inset">
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 01
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 02
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 03
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>
        <!-- Popout -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Popout">
            <VExpansionPanels variant="popout">
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 01
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 02
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle color="containerBg">
                  Accordion 03
                </VExpansionPanelTitle>
                <VExpansionPanelText> Some content </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>
        <!-- Customized Icon -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Customized Icon">
            <VExpansionPanels v-model="panel2">
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle class="text-primary font-weight-semibold">
                  <SvgSprite
                    name="custom-smile-outline"
                    class="me-2"
                    style="width: 18px; height: 18px"
                  />
                  Accordion 01
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <h5 class="mb-2 mt-3 text-h5">
                    Lorem ipsum dolor sit amet,
                  </h5>
                  <p class="pt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                  <p class="pt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle class="text-error font-weight-semibold">
                  <SvgSprite
                    name="custom-user-outline"
                    class="me-2"
                    style="width: 18px; height: 18px"
                  />
                  Accordion 02
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle class="text-secondary font-weight-semibold">
                  <SvgSprite
                    name="custom-clock-outline"
                    class="me-2"
                    style="width: 18px; height: 18px"
                  />
                  Accordion 03
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel elevation="0">
                <VExpansionPanelTitle class="text-info font-weight-semibold">
                  <SvgSprite
                    name="custom-picture-outline"
                    class="me-2"
                    style="width: 18px; height: 18px"
                  />
                  Accordion 03
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
