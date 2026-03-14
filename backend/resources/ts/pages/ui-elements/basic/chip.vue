<script setup lang="ts">
import { ref } from 'vue'

// assets
import avtarImg from '@images/users/avatar-1.png'
import avtarImg1 from '@images/users/avatar-6.png'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Chips' })
const subContent = ref({ content: 'Chips are compact elements that represent an input, attribute, or action.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/chip' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/chips/' })

// buttons color data
const chipColor = ref(['primary', 'secondary', 'success', 'warning', 'info', 'error'])
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
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip rounded="lg">
                Default
              </VChip>

              <VChip
                color="primary"
                variant="flat"
                rounded="lg"
              >
                Color
              </VChip>

              <VChip
                color="primary"
                variant="flat"
                disabled
                rounded="lg"
              >
                Disabled
              </VChip>

              <VChip
                color="primary"
                variant="flat"
                closable
                rounded="lg"
              >
                Deletable
              </VChip>

              <VChip
                link
                color="primary"
                variant="flat"
                rounded="lg"
              >
                <VAvatar
                  start
                  rounded="lg"
                  size="23"
                >
                  <VImg
                    :src="avtarImg"
                    alt="user"
                  />
                </VAvatar>
                Avatar
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Outlined Color -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Lighter">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip rounded="lg">
                Default
              </VChip>

              <VChip
                color="primary"
                rounded="lg"
              >
                Color
              </VChip>

              <VChip
                color="primary"
                disabled
                rounded="lg"
              >
                Disabled
              </VChip>

              <VChip
                color="primary"
                closable
                rounded="lg"
              >
                Deletable
              </VChip>

              <VChip
                link
                color="primary"
                rounded="lg"
              >
                <VAvatar
                  start
                  rounded="lg"
                  size="23"
                >
                  <VImg
                    :src="avtarImg1"
                    alt="user"
                  />
                </VAvatar>
                Avatar
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Outlined -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Outlined">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip
                rounded="lg"
                variant="outlined"
              >
                Default
              </VChip>

              <VChip
                color="primary"
                variant="outlined"
                rounded="lg"
              >
                Color
              </VChip>

              <VChip
                color="primary"
                variant="outlined"
                disabled
                rounded="lg"
              >
                Disabled
              </VChip>

              <VChip
                color="primary"
                variant="outlined"
                closable
                rounded="lg"
              >
                Deletable
              </VChip>

              <VChip
                link
                color="primary"
                variant="outlined"
                rounded="lg"
              >
                <VAvatar
                  start
                  rounded="lg"
                  size="23"
                >
                  <VImg
                    :src="avtarImg1"
                    alt="user"
                  />
                </VAvatar>
                Avatar
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Combined Color -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Combined">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip
                rounded="lg"
                border="secondary solid thin opacity-50"
              >
                Default
              </VChip>

              <VChip
                color="primary"
                border="primary solid thin opacity-50"
                rounded="lg"
              >
                Color
              </VChip>

              <VChip
                color="primary"
                border="primary solid thin opacity-50"
                disabled
                rounded="lg"
              >
                Disabled
              </VChip>

              <VChip
                color="primary"
                border="primary solid thin opacity-50"
                closable
                rounded="lg"
              >
                Deletable
              </VChip>

              <VChip
                link
                border="primary solid thin opacity-50"
                color="primary"
                rounded="lg"
              >
                <VAvatar
                  start
                  rounded="lg"
                  size="23"
                >
                  <VImg
                    :src="avtarImg1"
                    alt="user"
                  />
                </VAvatar>
                Avatar
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Closable -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Deletable Icon">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip
                color="error"
                variant="flat"
                closable
                rounded="lg"
              >
                Default
              </VChip>
              <VChip
                color="error"
                variant="flat"
                rounded="lg"
              >
                Custom Icon
                <template #close>
                  <svg class="pc-icon ml-1">
                    <use xlink:href="/assets/svg/sprite.svg#custom-minus-square-outline" />
                  </svg>
                </template>
              </VChip>
              <VChip
                color="error"
                rounded="lg"
                variant="outlined"
              >
                Custom Icon
                <template #close>
                  <svg class="pc-icon ml-1">
                    <use xlink:href="/assets/svg/sprite.svg#custom-trash-fill" />
                  </svg>
                </template>
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Label -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Avatar & Icon">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4 text-lightText">
              <VChip rounded="lg">
                <template #prepend>
                  <svg
                    class="pc-icon me-1"
                    style="width: 15px; height: 15px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-circle-play-outline" />
                  </svg>
                </template>
                Play
              </VChip>
              <VChip
                link
                border="primary solid thin opacity-50"
                color="primary"
                rounded="lg"
              >
                <VAvatar
                  start
                  rounded="lg"
                  size="23"
                >
                  <VImg
                    :src="avtarImg1"
                    alt="user"
                  />
                </VAvatar>
                Avatar
              </VChip>
              <VChip
                rounded="lg"
                color="warning"
                variant="outlined"
              >
                <template #prepend>
                  <svg
                    class="pc-icon me-1"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-smile-fill" />
                  </svg>
                </template>
                Smile
              </VChip>
              <VChip
                rounded="lg"
                color="error"
                variant="flat"
              >
                <template #prepend>
                  <svg
                    class="pc-icon me-1"
                    style="width: 18px; height: 18px"
                  >
                    <use xlink:href="/assets/svg/sprite.svg#custom-heart-fill" />
                  </svg>
                </template>
                Like
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Sizes -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Sizes">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip
                color="primary"
                size="x-small"
                variant="flat"
                rounded="lg"
              >
                x-small chip
              </VChip>

              <VChip
                color="primary"
                size="small"
                variant="flat"
                rounded="lg"
              >
                small chip
              </VChip>

              <VChip
                color="primary"
                variant="flat"
                rounded="lg"
              >
                Default
              </VChip>

              <VChip
                color="primary"
                size="large"
                variant="flat"
                rounded="lg"
              >
                large chip
              </VChip>

              <VChip
                color="primary"
                size="x-large"
                variant="flat"
                rounded="lg"
              >
                x-large chip
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Closable chip -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Lighter color">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip
                color="primary"
                rounded="lg"
                closable
              >
                Angular
              </VChip>
              <VChip
                color="secondary"
                rounded="lg"
                closable
              >
                jQuery
              </VChip>
              <VChip
                color="warning"
                rounded="lg"
                closable
              >
                Polymer
              </VChip>
              <VChip
                color="success"
                rounded="lg"
                closable
              >
                React
              </VChip>
              <VChip
                color="error"
                rounded="lg"
                closable
              >
                Vue.js
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
        <VCol cols="12">
          <UiParentCard title="Color">
            <div class="d-flex flex-column flex-sm-row flex-wrap align-center ga-4">
              <VChip
                v-for="chip in chipColor"
                :key="chip"
                :color="chip"
                rounded="lg"
                variant="flat"
              >
                {{ chip }}
              </VChip>
            </div>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
