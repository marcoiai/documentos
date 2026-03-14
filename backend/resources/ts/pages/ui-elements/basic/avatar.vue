<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Avatar' })
const subContent = ref({ content: 'Avatars are found throughout vuetify design with uses in everything from tables to dialog menus.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/basic/avatar' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/avatars/' })
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
        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <!-- Basic Avatar -->
            <VCol cols="12">
              <UiParentCard title="Basic">
                <div>
                  <VAvatar
                    variant="tonal"
                    color="primary"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Image Avatar -->
            <VCol cols="12">
              <UiParentCard title="Vector">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      src="@images/users/vector-1.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      src="@images/users/vector-2.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      src="@images/users/vector-3.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="40"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      src="@images/users/vector-4.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Variant Avatar -->
            <VCol cols="12">
              <UiParentCard title="Variants">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VAvatar
                    size="40"
                    color="lightprimary"
                    class="text-primary"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                    class="text-primary"
                    rounded="md"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="flat"
                    rounded="0"
                  >
                    <SvgSprite
                      name="custom-user-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="lightprimary"
                    class="text-primary"
                    variant="flat"
                  >
                    U
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                    class="text-primary"
                    rounded="md"
                  >
                    U
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="flat"
                    rounded="0"
                  >
                    U
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Icon Avatar -->
            <VCol cols="12">
              <UiParentCard title="Icon">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VAvatar
                    size="32"
                    color="primary"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 18px; height: 18px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="32"
                    variant="flat"
                    color="success"
                  >
                    <SvgSprite
                      name="custom-mail-fill"
                      style="width: 18px; height: 18px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="32"
                    variant="flat"
                    color="error"
                  >
                    <SvgSprite
                      name="custom-setting-fill"
                      style="width: 18px; height: 18px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="32"
                    color="primary"
                    variant="tonal"
                  >
                    <SvgSprite
                      name="custom-plus"
                      style="width: 18px; height: 18px"
                    />
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- With badge Avatar -->
            <VCol cols="12">
              <UiParentCard title="With Badge">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VBadge
                    color="error"
                    content="4"
                  >
                    <img
                      src="@images/users/avatar-6.png"
                      class="rounded-circle"
                      width="40"
                      alt="Julia"
                    >
                  </VBadge>
                  <VBadge
                    color="error"
                    dot
                    offset-x="3"
                  >
                    <VAvatar
                      color="secondary"
                      variant="flat"
                      rounded="circle"
                    >
                      <SvgSprite
                        name="custom-user-outline"
                        style="width: 18px; height: 18px"
                      />
                    </VAvatar>
                  </VBadge>
                  <VBadge
                    color="error"
                    dot
                    offset-x="3"
                  >
                    <img
                      src="@images/users/avatar-2.png"
                      class="rounded-circle"
                      width="40"
                      alt="Julia"
                    >
                  </VBadge>
                  <VBadge
                    color="error"
                    dot
                    offset-x="3"
                  >
                    <VAvatar
                      color="primary"
                      variant="outlined"
                      rounded="circle"
                    >
                      U
                    </VAvatar>
                  </VBadge>
                  <VBadge
                    color="error"
                    dot
                    offset-x="3"
                  >
                    <VAvatar
                      color="lightprimary"
                      rounded="circle"
                    >
                      <img
                        src="@images/users/vector-2.png"
                        class="rounded-circle"
                        width="40"
                        alt="Julia"
                      >
                    </VAvatar>
                  </VBadge>
                  <VBadge
                    color="success"
                    dot
                    offset-x="-3"
                    offset-y="-3"
                  >
                    <img
                      src="@images/users/avatar-1.png"
                      class="rounded-md"
                      width="40"
                      alt="Julia"
                    >
                  </VBadge>
                  <VBadge
                    color="transparent pa-0"
                    bordered
                    location="bottom end"
                    offset-x="3"
                    offset-y="3"
                  >
                    <img
                      src="@images/users/avatar-1.png"
                      class="rounded-circle"
                      width="40"
                      alt="Julia"
                    >
                    <template #badge>
                      <img
                        src="@images/users/avatar-1.png"
                        width="16"
                        class="rounded-circle"
                        alt="Julia"
                      >
                    </template>
                  </VBadge>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Image Avatar -->
            <VCol cols="12">
              <UiParentCard title="Image">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VAvatar
                    color="lightprimary"
                    variant="flat"
                    rounded="circle"
                  >
                    <img
                      src="@images/users/avatar-1.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    variant="flat"
                    rounded="circle"
                  >
                    <img
                      src="@images/users/avatar-2.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    variant="flat"
                    rounded="circle"
                  >
                    <img
                      src="@images/users/avatar-3.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    variant="flat"
                    rounded="circle"
                  >
                    <img
                      src="@images/users/avatar-4.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Fallbacks Avatar -->
            <VCol cols="12">
              <UiParentCard title="Colors">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VAvatar
                    color="primary"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-user-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    color="secondary"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-database-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    color="success"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-circle-check-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    color="warning"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-warning-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    color="info"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-info-circle-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    color="error"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-trash"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VRow>
            <!-- Letter Avatar -->
            <VCol cols="12">
              <UiParentCard title="Letter">
                <div class="d-flex align-center ga-2">
                  <VAvatar
                    size="32"
                    color="lightprimary"
                    class="text-primary"
                    variant="flat"
                  >
                    U
                  </VAvatar>
                  <VAvatar
                    size="32"
                    color="lighterror"
                    class="text-error"
                    variant="flat"
                  >
                    UI
                  </VAvatar>
                  <VAvatar
                    size="32"
                    color="error"
                    variant="flat"
                  >
                    A
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Outline Avatar -->
            <VCol cols="12">
              <UiParentCard title="Outlined">
                <div class="d-flex align-center ga-2 flex-wrap">
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                    class="text-primary"
                    rounded="md"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                    rounded="0"
                  >
                    <SvgSprite
                      name="custom-user-fill"
                      style="width: 20px; height: 20px"
                    />
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                  >
                    U
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                    rounded="md"
                  >
                    U
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="primary"
                    variant="outlined"
                    rounded="0"
                  >
                    U
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <VCol cols="12">
              <UiParentCard title="Avatar Group">
                <h6 class="text-subtitle-1 mb-4">
                  Default
                </h6>
                <div class="d-flex align-center justify-end flex-wrap flex-row-reverse mb-4">
                  <VAvatar
                    size="42"
                    variant="flat"
                    color="info"
                    class="ms-n2"
                  >
                    +3
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                    class="ms-n2"
                  >
                    <img
                      src="@images/users/avatar-7.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                    class="ms-n2"
                  >
                    <img
                      src="@images/users/avatar-6.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                  >
                    <img
                      src="@images/users/avatar-5.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                </div>
                <VDivider />
                <h6 class="text-subtitle-1 my-4">
                  On Hover
                </h6>
                <div class="d-flex align-center justify-end flex-wrap flex-row-reverse">
                  <VAvatar
                    size="42"
                    variant="flat"
                    color="primary"
                    class="ms-n2 cursor-pointer"
                  >
                    +6
                    <VTooltip
                      activator="parent"
                      location="top"
                      aria-label="tooltip"
                    >
                      <div class="d-flex align-center justify-center flex-wrap flex-row-reverse">
                        <VAvatar
                          size="40"
                          variant="outlined"
                          color="surface"
                          class="ms-n2"
                        >
                          <img
                            src="@images/users/avatar-9.png"
                            width="40"
                            alt="vector"
                          >
                        </VAvatar>
                        <VAvatar
                          size="40"
                          variant="outlined"
                          color="surface"
                          class="ms-n2"
                        >
                          <img
                            src="@images/users/avatar-8.png"
                            width="40"
                            alt="vector"
                          >
                        </VAvatar>
                        <VAvatar
                          size="40"
                          variant="outlined"
                          color="surface"
                          class="ms-n2"
                        >
                          <img
                            src="@images/users/avatar-7.png"
                            width="40"
                            alt="vector"
                          >
                        </VAvatar>
                        <VAvatar
                          size="40"
                          variant="outlined"
                          color="surface"
                          class="ms-n2"
                        >
                          <img
                            src="@images/users/avatar-6.png"
                            width="40"
                            alt="vector"
                          >
                        </VAvatar>
                        <VAvatar
                          size="40"
                          variant="outlined"
                          color="surface"
                        >
                          <img
                            src="@images/users/avatar-5.png"
                            width="40"
                            alt="vector"
                          >
                        </VAvatar>
                      </div>
                    </VTooltip>
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                    class="ms-n2"
                  >
                    <img
                      src="@images/users/avatar-4.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                    class="ms-n2"
                  >
                    <img
                      src="@images/users/avatar-3.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                    class="ms-n2"
                  >
                    <img
                      src="@images/users/avatar-2.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                  <VAvatar
                    size="42"
                    variant="outlined"
                    color="surface"
                  >
                    <img
                      src="@images/users/avatar-1.png"
                      width="42"
                      alt="vector"
                    >
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Size Avatar -->
            <VCol cols="12">
              <UiParentCard title="Size Avatar">
                <div class="d-flex align-center flex-wrap ga-2">
                  <VAvatar
                    size="25"
                    color="primary"
                    variant="tonal"
                  >
                    <img
                      src="@images/users/avatar-1.png"
                      width="25"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="secondary"
                    variant="tonal"
                  >
                    <img
                      src="@images/users/avatar-2.png"
                      width="40"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="50"
                    color="success"
                    variant="tonal"
                  >
                    <img
                      src="@images/users/avatar-3.png"
                      width="50"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="52"
                    color="info"
                    variant="tonal"
                  >
                    <img
                      src="@images/users/avatar-4.png"
                      width="52"
                      alt="Julia"
                    >
                  </VAvatar>
                  <VAvatar
                    size="64"
                    color="warning"
                    variant="tonal"
                  >
                    <img
                      src="@images/users/avatar-5.png"
                      width="64"
                      alt="Julia"
                    >
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
            <!-- Fallbacks Avatar -->
            <VCol cols="12">
              <UiParentCard title="Fallbacks">
                <div class="d-flex align-center ga-2">
                  <VAvatar
                    size="40"
                    color="error"
                    variant="flat"
                  >
                    B
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="error"
                    class="text-error"
                    variant="outlined"
                  >
                    R
                  </VAvatar>
                  <VAvatar
                    size="40"
                    color="error"
                    variant="tonal"
                  >
                    <SvgSprite
                      name="custom-user-bold"
                      style="width: 18px; height: 18px"
                    />
                  </VAvatar>
                </div>
              </UiParentCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
