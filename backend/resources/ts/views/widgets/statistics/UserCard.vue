<script setup lang="ts">
import { ref } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardItem>
      <VList
        rounded="lg"
        class="py-0"
        aria-busy="true"
        aria-label="user content"
      >
        <VListItem class="px-0">
          <template #prepend>
            <VAvatar
              variant="tonal"
              color="primary"
              rounded="md"
            >
              <SvgSprite
                name="custom-user-fill"
                style="width: 20px; height: 20px"
              />
            </VAvatar>
          </template>
          <h6 class="text-subtitle-1 mb-0">
            Able pro
          </h6>
          <span class="text-caption">@ableprodevelop</span>
          <template #append>
            <VMenu width="150">
              <template #activator="{ props }">
                <VBtn
                  icon
                  color="secondary"
                  aria-label="menu"
                  variant="text"
                  rounded="md"
                  size="small"
                  v-bind="props"
                >
                  <SvgSprite
                    name="custom-more-outline"
                    style="width: 20px; height: 20px; transform: rotate(90deg)"
                  />
                </VBtn>
              </template>
              <VList
                elevation="24"
                class="pa-3"
                rounded="md"
                aria-label="menu"
                aria-busy="true"
              >
                <VListItem
                  v-for="(item, index) in menulist"
                  :key="index"
                  density="compact"
                  rounded="md"
                  color="secondary"
                  :value="index"
                >
                  <VListItemTitle class="text-h6 text-lightText">
                    {{ item }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
        </VListItem>
        <VListItem class="px-0 pb-0 pt-4">
          <div class="d-flex justify-space-between">
            <div class="d-flex align-center justify-center flex-wrap flex-row-reverse">
              <VAvatar
                size="35"
                variant="tonal"
                color="primary"
                class="ml-n2 cursor-pointer"
              >
                +2
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
                      class="ml-n2"
                    >
                      <img
                        src="@images/users/avatar-5.png"
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
                        src="@images/users/avatar-4.png"
                        width="40"
                        alt="vector"
                      >
                    </VAvatar>
                  </div>
                </VTooltip>
              </VAvatar>
              <VAvatar
                size="35"
                variant="outlined"
                color="surface"
                class="ml-n2"
              >
                <img
                  src="@images/users/avatar-3.png"
                  width="35"
                  alt="vector"
                >
              </VAvatar>
              <VAvatar
                size="35"
                variant="outlined"
                color="surface"
                class="ml-n2"
              >
                <img
                  src="@images/users/avatar-2.png"
                  width="35"
                  alt="vector"
                >
              </VAvatar>
              <VAvatar
                size="35"
                variant="outlined"
                color="surface"
              >
                <img
                  src="@images/users/avatar-1.png"
                  width="35"
                  alt="vector"
                >
              </VAvatar>
            </div>
            <VBtn
              icon
              color="primary"
              aria-label="add"
              variant="flat"
              size="small"
            >
              <SvgSprite
                name="custom-plus"
                style="width: 20px; height: 20px"
              />
            </VBtn>
          </div>
        </VListItem>
      </VList>
    </VCardItem>
  </VCard>
</template>
