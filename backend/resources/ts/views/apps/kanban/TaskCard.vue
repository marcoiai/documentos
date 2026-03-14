<script setup lang="ts">
import { shallowRef } from 'vue'

const props = defineProps({
  task: Object,
})

const items = shallowRef([
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface cursor-move"
    rounded="lg"
  >
    <VCardText class="pa-4">
      <div class="d-flex align-start ga-2">
        <div class="d-block text-truncate">
          <h5 class="text-subtitle-1 text-truncate mb-0">
            {{ props.task?.title }}
          </h5>
          <a class="text-primary text-caption d-flex align-center cursor-pointer">
            <SvgSprite
              name="custom-user-story-outline"
              class="me-1"
              style="width: 16px; height: 16px"
            /> User Story #{{
              props.task?.userStory
            }}
          </a>
        </div>
        <VBtn
          icon
          size="x-small"
          aria-label="menu"
          variant="text"
          rounded="md"
          class="ms-auto"
        >
          <SvgSprite
            name="custom-more-outline"
            class="text-lightText"
            style="width: 16px; height: 16px; transform: rotate(90deg)"
          />
          <VMenu
            activator="parent"
            class="rounded-md"
            location="start"
          >
            <VList
              density="compact"
              elevation="24"
              class="py-0"
            >
              <VListItem
                v-for="(item, index) in items"
                :key="index"
                :value="index"
              >
                <VListItemTitle class="text-h6">
                  {{ item.title }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      </div>
      <img
        v-if="task?.image"
        :src="props.task?.image"
        class="w-100 mt-3 rounded-lg"
        alt="Avatar"
      >
    </VCardText>
  </VCard>
</template>

<style>
.cursor-move {
  cursor: move;
}
</style>
