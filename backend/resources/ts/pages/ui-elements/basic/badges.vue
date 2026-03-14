<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Badge' })
const subContent = ref({ content: 'Badge generates a small badge to the top-right of its child(ren).' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/badges' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/badges/' })
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
        <!-- Basic Badges -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Basic">
            <div class="d-flex align-center flex-row ga-6">
              <VBadge
                color="primary"
                content="4"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="secondary"
                content="4"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="success"
                content="4"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="warning"
                content="4"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="info"
                content="4"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="error"
                content="4"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Light Badges -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Light">
            <div class="d-flex align-center flex-row ga-6">
              <VBadge
                color="lightprimary"
                content="4"
                text-color="primary"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lightsecondary"
                content="4"
                text-color="secondary"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lightsuccess"
                content="4"
                text-color="success"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lightwarning"
                content="4"
                text-color="warning"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lightinfo"
                content="4"
                text-color="info"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lighterror"
                content="4"
                text-color="error"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Maximum Value Badges -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Maximum Value">
            <div class="d-flex align-center flex-row ga-6">
              <VBadge
                color="primary"
                content="99"
                offset-x="-2"
                offset-y="-3"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="secondary"
                content="99+"
                offset-x="2"
                offset-y="-3"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lightprimary"
                content="999+"
                text-color="primary"
                class="me-2"
                offset-x="2"
                offset-y="-3"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="lightsecondary"
                content="99"
                text-color="secondary"
                offset-x="2"
                offset-y="-3"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="error"
                content="99"
                offset-x="2"
                offset-y="-3"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Dot Badges -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Dot Badges">
            <div class="d-flex align-center flex-wrap ga-6">
              <VBadge
                color="primary"
                dot
                offset-x="-4"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="secondary"
                dot
                offset-x="-4"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="success"
                dot
                offset-x="-4"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="warning"
                dot
                offset-x="-4"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="info"
                dot
                offset-x="-4"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="error"
                dot
                offset-x="-4"
                offset-y="-5"
              >
                Typography
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Customized Badges -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Customized Badges">
            <div class="d-flex align-center ga-6">
              <VBadge
                color="error"
                size="large"
                content="2"
              >
                <SvgSprite name="custom-shopping-cart" />
              </VBadge>
              <VBadge
                color="primary"
                inline
                content="2"
              >
                <SvgSprite name="custom-shopping-cart" />
              </VBadge>
              <VBadge
                color="secondary"
                bordered
                content="2"
              >
                <SvgSprite name="custom-shopping-cart" />
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
        <!-- Alignment Badges -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Alignment">
            <div class="d-flex align-center flex-row ga-6">
              <VBadge
                color="primary"
                location="top end"
                content="9"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="primary"
                location="top end"
                dot
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="primary"
                location="bottom end"
                content="9"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="primary"
                location="top start"
                content="9"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
              <VBadge
                color="primary"
                location="bottom start"
                content="99"
                offset-x="-5"
                offset-y="-5"
              >
                <SvgSprite name="custom-mail-outline" />
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Overlap">
            <div class="d-flex align-center ga-2 flex-wrap">
              <VBadge
                color="primary"
                location="top end"
                dot
                offset-x="0"
                offset-y="0"
              >
                <VAvatar
                  color="primary"
                  variant="tonal"
                  rounded="circle"
                >
                  <SvgSprite name="custom-user-fill" />
                </VAvatar>
              </VBadge>
              <VBadge
                color="primary"
                location="top end"
                dot
                offset-x="-2"
                offset-y="-2"
              >
                <VAvatar
                  color="primary"
                  variant="flat"
                  rounded="md"
                >
                  <SvgSprite name="custom-user-outline" />
                </VAvatar>
              </VBadge>
              <VBadge
                color="primary"
                location="top end"
                dot
                offset-x="-3"
                offset-y="-3"
              >
                <VAvatar
                  color="primary"
                  variant="outlined"
                  rounded="0"
                >
                  <SvgSprite name="custom-user-fill" />
                </VAvatar>
              </VBadge>
              <VBadge
                color="primary"
                location="top end"
                dot
                offset-x="2"
                offset-y="2"
              >
                <VAvatar
                  color="primary"
                  variant="outlined"
                  rounded="circle"
                >
                  <SvgSprite name="custom-user-fill" />
                </VAvatar>
              </VBadge>
            </div>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
