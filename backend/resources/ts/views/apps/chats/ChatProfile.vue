<script setup>
import { ref, shallowRef } from 'vue'
import user1 from '@images/users/avatar-1.png'

const status = ref('active')

const items = shallowRef([
  {
    title: 'active',
    icon: 'custom-check-circle-fill',
    color: 'success',
  },
  {
    title: 'away',
    icon: 'custom-away-fill',
    color: 'warning',
  },
  {
    title: 'do not disturb',
    icon: 'custom-disturb-fill',
    color: 'secondary',
  },
])
</script>

<template>
  <!-- - Bottombar Row -->
  <VList
    rounded="md"
    density="comfortable"
    color="secondary"
    aria-label="profile list"
    aria-busy="true"
    elevation="0"
    class="py-0 px-5"
  >
    <VListItem
      color="secondary"
      value="logout"
      rounded="md"
    >
      <template #prepend>
        <SvgSprite
          name="custom-logout-1"
          class="me-2 text-lightText"
          style="width: 24px; height: 24px"
        />
      </template>
      <VListItemTitle class="text-h6 text-lightText">
        LogOut
      </VListItemTitle>
    </VListItem>
    <VListItem
      color="secondary"
      value="setting"
      rounded="md"
    >
      <template #prepend>
        <SvgSprite
          name="custom-setup"
          class="me-2 text-lightText"
          style="width: 24px; height: 24px"
        />
      </template>
      <VListItemTitle class="text-h6 text-lightText">
        Settings
      </VListItemTitle>
    </VListItem>
  </VList>
  <div class="d-flex align-center pa-5 px-10 pb-0">
    <!-- - User Avatar -->
    <VAvatar class="me-2">
      <img
        :src="user1"
        alt="pro"
        width="40"
      >
    </VAvatar>
    <SvgSprite
      class="badg-dotDetail"
      :name="
        status === 'away'
          ? 'custom-away-fill'
          : status === 'do not disturb'
            ? 'custom-disturb-fill'
            : status === 'active'
              ? 'custom-check-circle-fill'
              : 'containerBg'
      "
      :class="
        status === 'away'
          ? 'text-warning'
          : status === 'do not disturb'
            ? 'text-secondary'
            : status === 'active'
              ? 'text-success'
              : 'text-containerBg'
      "
      style="width: 14px; height: 14px"
    />
    <!-- - Name & Last seen -->
    <div>
      <h5 class="text-h5 mb-0">
        John Doe
      </h5>
    </div>
    <div class="ms-auto">
      <VMenu
        location="top"
        rounded="md"
      >
        <template #activator="{ props }">
          <VBtn
            icon
            v-bind="props"
            aria-label="dropdown"
            variant="text"
            size="x-small"
            rounded="md"
          >
            <SvgSprite
              name="custom-chevron-outline"
              class="text-lightText"
              style="width: 16px; height: 16px"
            />
          </VBtn>
        </template>
        <VList
          width="150"
          rounded="md"
          density="compact"
          elevation="24"
          class="py-0"
        >
          <VListItem
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <template #prepend>
              <SvgSprite
                :name="item.icon || ''"
                :class="`me-1 text-${item.color}`"
                style="width: 16px; height: 16px"
              />
            </template>
            <VListItemTitle
              class="text-h6"
              @click="status = item.title"
            >
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>
  </div>
</template>
