<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const taskData = shallowRef([
  {
    title: 'Follow up client for feedback',
    content: 'Sending report',
    icon: 'custom-send-outline-1',
    color: 'error',
    color1: 'success',
    name: 'Incoming requests',
  },
  {
    title: 'Follow up client for feedback',
    content: 'Sending report',
    icon: 'custom-folder-outline',
    color: 'success',
    color1: 'secondary',
    name: 'You have 2 pending requests..',
  },
  {
    title: 'Follow up client for feedback',
    content: 'Received report',
    icon: 'custom-send-outline-1',
    color: 'error',
    color1: 'secondary',
    name: 'You have 3 pending tasks',
  },
])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          My Task
        </h5>
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
      </div>
    </VCardText>
    <VCardItem class="pa-0">
      <VList
        border
        rounded="lg"
        class="pt-0"
        aria-label="task list"
        aria-busy="true"
      >
        <VListItem
          v-for="(item, i) in taskData"
          :key="i"
          class="py-3 px-6"
        >
          <h6 class="text-subtitle-1 mb-0">
            {{ item.title }}
          </h6>
          <div class="d-flex align-center mb-1">
            <SvgSprite
              :name="item.icon || ''"
              style="width: 12px; height: 12px"
            />
            <p class="text-body-1 mb-0 ms-1">
              {{ item.content }}
            </p>
          </div>
          <VChip
            :color="item.color"
            size="small"
            variant="flat"
          >
            00:15
          </VChip>
          <template #append>
            <VBtn
              icon
              rounded="md"
              aria-label="check"
              :color="item.color1"
              size="small"
              variant="text"
            >
              <SvgSprite
                name="custom-circle-check-outline"
                style="width: 20px; height: 20px"
              />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCardItem>
  </VCard>
</template>
