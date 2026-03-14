<script setup lang="ts">
import { ref } from 'vue'

import { useDisplay } from 'vuetify'
import type { Technology } from '@types/tech-types'
import Logo from './LogoMain.vue'

import { useIspValue } from '@/utils/useIspValue'
import techData from '@/utils/techData'

// types

const { mdAndUp } = useDisplay()
const drawer = ref(false)

const isMenuOpen = ref(false)

const url = ref<string>() // Define url as a ref

const { ispValue } = useIspValue()

if (ispValue.value === true)
  url.value = 'https://1.envato.market/6e0Arm'
else
  url.value = 'https://1.envato.market/zNkqj6'

const getFinalUrl = (item: Technology) => {
  if (item.link !== '#!' && ispValue.value === true)
    return `${item.link}?isp=1`

  return item.link
}
</script>

<template>
  <VAppBar
    elevation="0"
    flat
    height="74"
    class="border-bottom position-fixed"
    border="0"
  >
    <VContainer class="fill-height maxWidth">
      <div class="d-flex align-center ga-2 w-100">
        <div class="d-flex ga-1 align-center">
          <Logo />
          <VChip
            rounded="lg"
            size="small"
            variant="outlined"
            color="secondary"
            class="px-1"
            style="height: 20px"
          >
            v1.2.1
          </VChip>
        </div>
        <!-- - /Search part -->
        <VSpacer />
        <!-- ---------------------------------------------- -->
        <!-- - right part -->
        <!-- ---------------------------------------------- -->
        <template v-if="mdAndUp">
          <VBtn
            variant="text"
            class="font-weight-medium"
            :to="ispValue === true ? '/dashboards/default?isp=1' : '/dashboards/default'"
            target="_blank"
          >
            Dashboard
          </VBtn>
          <VBtn
            variant="text"
            class="font-weight-medium"
            :to="ispValue === true ? '/forms/components/buttons?isp=1' : '/forms/components/buttons'"
          >
            Components
          </VBtn>
          <VBtn
            variant="text"
            class="font-weight-medium"
            href="https://phoenixcoded.gitbook.io/able-pro"
            target="_"
          >
            Documentation
          </VBtn>
          <VMenu
            v-model="isMenuOpen"
            :close-on-content-click="false"
          >
            <template #activator="{ props }">
              <VBtn
                variant="text"
                v-bind="props"
                class="font-weight-medium"
              >
                Live preview
                <SvgSprite
                  name="custom-chevron-down-2"
                  class="ml-1"
                  style="width: 15px; height: 15px; transition: 0.2s"
                  :style="{ transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }"
                />
              </VBtn>
            </template>
            <VSheet
              rounded="md"
              width="250"
            >
              <VList
                class="py-0"
                aria-busy="true"
                aria-label="technology"
              >
                <VListItem
                  v-for="(item, index) in techData"
                  :key="index"
                  class="py-sm-3 py-2 px-sm-4 px-3"
                  :href="getFinalUrl(item as Technology)"
                  :target="item.target"
                >
                  <template #prepend>
                    <VImg
                      :src="item.image"
                      alt="technology"
                      style="width: 30px; height: 30px; min-width:36px"
                      :style="item.name === 'Live Preview not available' ? 'filter: grayscale(1)' : ''"
                    />
                  </template>
                  {{ item.title }}
                  <VTooltip
                    activator="parent"
                    offset="-12"
                    aria-label="tooltip"
                    content-class="smallTooltip"
                    location="bottom"
                  >
                    <span class="text-caption">{{ item.name }}</span>
                  </VTooltip>
                </VListItem>
              </VList>
            </VSheet>
          </VMenu>
          <VBtn
            icon
            variant="tonal"
            target="_"
            aria-label="github link"
            href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
          >
            <SvgSprite
              name="custom-github-outline"
              style="width: 20px; height: 20px"
            />
          </VBtn>
          <VBtn
            variant="flat"
            class="font-weight-medium ml-4"
            height="42px"
            color="success"
            rounded="md"
            :href="url"
            target="_"
          >
            <template #prepend>
              <SvgSprite
                name="custom-link2"
                style="width: 20px; height: 20px"
              />
            </template>
            Purchase Now
          </VBtn>
        </template>
        <template v-else>
          <VBtn
            variant="outlined"
            color="warning"
            class="font-weight-medium"
            :to="ispValue === true ? '/forms/components/buttons?isp=1' : '/forms/components/buttons'"
            rounded="md"
          >
            All Components
          </VBtn>
          <VBtn
            icon
            rounded="sm"
            variant="text"
            size="small"
            @click.stop="drawer = !drawer"
          >
            <SvgSprite
              name="custom-menu-outline"
              style="width: 20px; height: 20px"
            />
          </VBtn>
        </template>
      </div>
    </VContainer>
  </VAppBar>

  <VNavigationDrawer
    v-if="!mdAndUp"
    v-model="drawer"
    temporary
    location="top"
    style="height: 310px"
    floating
    class="position-fixed"
  >
    <VList color="primary">
      <VListItem :to="ispValue === true ? '/dashboards/default?isp=1' : '/dashboards/default'">
        <template #prepend>
          <SvgSprite
            name="custom-line"
            class="text-lightText"
            style="width: 20px; height: 20px"
          />
        </template>

        <VListItemTitle class="ml-3 text-lightText text-h6">
          Dashboard
        </VListItemTitle>
      </VListItem>
      <VListItem :to="ispValue === true ? '/forms/components/buttons?isp=1' : '/forms/components/buttons'">
        <template #prepend>
          <SvgSprite
            name="custom-line"
            class="text-lightText"
            style="width: 20px; height: 20px"
          />
        </template>

        <VListItemTitle class="ml-3 text-lightText text-h6">
          All Components
        </VListItemTitle>
      </VListItem>
      <VListItem
        href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
        target="_"
      >
        <template #prepend>
          <SvgSprite
            name="custom-line"
            class="text-lightText"
            style="width: 20px; height: 20px"
          />
        </template>

        <VListItemTitle class="ml-3 text-lightText text-h6">
          Free version
        </VListItemTitle>
      </VListItem>
      <VListItem
        href="https://phoenixcoded.gitbook.io/able-pro"
        target="_"
      >
        <template #prepend>
          <SvgSprite
            name="custom-line"
            class="text-lightText"
            style="width: 20px; height: 20px"
          />
        </template>

        <VListItemTitle class="ml-3 text-lightText text-h6">
          Documentation
        </VListItemTitle>
      </VListItem>
      <VListItem>
        <VListItemTitle>
          <VMenu
            v-model="isMenuOpen"
            :close-on-content-click="false"
          >
            <template #activator="{ props }">
              <VBtn
                variant="text"
                v-bind="props"
                :ripple="false"
                block
                class="preview-btn"
                style="justify-content: flex-start; padding: 0;"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-line"
                    class="text-lightText"
                    style="width: 20px; height: 20px"
                  />
                </template>
                Live preview
                <SvgSprite
                  name="custom-chevron-down-2"
                  class="ml-1"
                  style="width: 15px; height: 15px; transition: 0.2s"
                  :style="{ transform: isMenuOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }"
                />
              </VBtn>
            </template>
            <VSheet
              rounded="md"
              width="250"
            >
              <PerfectScrollbar style="min-height: 320px; height: 320px">
                <VList
                  class="py-0"
                  aria-busy="true"
                  aria-label="technology"
                >
                  <VListItem
                    v-for="(item, index) in techData"
                    :key="index"
                    class="py-sm-3 py-2 px-sm-4 px-3"
                    :href="getFinalUrl(item as Technology)"
                    :target="item.target"
                  >
                    <template #prepend>
                      <VImg
                        :src="item.image"
                        alt="technology"
                        style="width: 30px; height: 30px; min-width:36px"
                        :style="item.name === 'Live Preview not available' ? 'filter: grayscale(1)' : ''"
                      />
                    </template>
                    {{ item.title }}
                    <VTooltip
                      v-if="item.label"
                      activator="parent"
                      offset="-12"
                      aria-label="tooltip"
                      content-class="smallTooltip"
                      location="bottom"
                    >
                      <span class="text-caption">{{ item.name }}</span>
                    </VTooltip>
                  </VListItem>
                </VList>
              </PerfectScrollbar>
            </VSheet>
          </VMenu>
        </VListItemTitle>
      </VListItem>
      <VListItem
        href="https://phoenixcoded.authordesk.app/"
        target="_"
      >
        <template #prepend>
          <SvgSprite
            name="custom-line"
            class="text-lightText"
            style="width: 20px; height: 20px"
          />
        </template>

        <VListItemTitle class="ml-3 text-lightText text-h6">
          Support
        </VListItemTitle>
      </VListItem>
      <VListItem
        :href="url"
        target="_"
      >
        <template #prepend>
          <SvgSprite
            name="custom-line"
            class="text-lightText"
            style="width: 20px; height: 20px"
          />
        </template>

        <VListItemTitle class="ml-3 text-lightText text-h6">
          Purchase Now
        </VListItemTitle>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style lang="scss">
.preview-btn {
  &:focus-visible {
    > .v-btn__overlay {
      opacity: 0;
    }
  }
  &.v-btn--active > .v-btn__overlay, &[aria-haspopup=menu][aria-expanded=true] > .v-btn__overlay {
    opacity: 0;
  }
  &:hover > .v-btn__overlay, &[aria-haspopup=menu][aria-expanded=true]:hover > .v-btn__overlay {
    opacity: 0;
  }
}
</style>
