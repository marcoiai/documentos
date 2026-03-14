<script setup>
import { computed, onMounted, ref } from 'vue'
import { useChatStore } from '@db/apps/chat/index'

const store = useChatStore()

onMounted(() => {
  store.fetchChats()
})

const getChats = computed(() => {
  return store.getChats
})

const chatItem = getChats
const searchValue = ref('')

const filteredChats = computed(() => {
  return chatItem.value.filter(chat => {
    return chat.name.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})
</script>

<template>
  <div class="py-3 px-5 mt-2">
    <VTextField
      v-model="searchValue"
      variant="outlined"
      persistent-placeholder
      placeholder="Search Contact"
      hide-details
    >
      <template #prepend-inner>
        <SvgSprite
          name="custom-search"
          class="text-lightText"
          style="width: 20px; height: 20px"
        />
      </template>
    </VTextField>
  </div>
  <PerfectScrollbar
    class="mb-3"
    style="height: 430px"
  >
    <VList
      aria-label="chat list"
      aria-busy="true"
      border
      class="px-5"
    >
      <!-- - Single Item -->
      <VListItem
        v-for="chat in filteredChats"
        :key="chat.id"
        :value="chat.id"
        color="secondary"
        class="text-no-wrap chatItem"
        lines="two"
        rounded="md"
        :active="store.chatContent === chat.id - 1"
        @click="store.SelectChat(chat.id)"
      >
        <!-- - Avatar -->
        <template #prepend>
          <VAvatar>
            <img
              :src="chat.thumb"
              alt="pro"
              width="40"
            >
          </VAvatar>
          <SvgSprite
            class="badg-dot"
            :name="
              chat.status === 'away'
                ? 'custom-away-fill'
                : chat.status === 'do not disturb'
                  ? 'custom-disturb-fill'
                  : chat.status === 'active'
                    ? 'custom-check-circle-fill'
                    : 'containerBg'
            "
            :class="
              chat.status === 'away'
                ? 'text-warning'
                : chat.status === 'do not disturb'
                  ? 'text-secondary'
                  : chat.status === 'active'
                    ? 'text-success'
                    : 'text-containerBg'
            "
            style="width: 14px; height: 14px"
          />
        </template>
        <!-- - Name -->
        <VListItemTitle class="text-h5 pr-2 mb-1">
          {{ chat.name }}
        </VListItemTitle>
        <!-- - Subtitle -->
        <VListItemSubtitle
          class="text-caption mt-n1 text-lightText"
          style="opacity: 1"
        >
          {{ chat.excerpt }}
        </VListItemSubtitle>
        <!-- - Last seen - -->
        <template #append>
          <div class="d-flex flex-column text-right">
            <small class="text-lightText text-caption mb-1">{{ chat.lastMessage }}</small>
            <VBadge
              v-if="chat.unReadChatCount"
              dot
              color="primary"
              :content="chat.unReadChatCount"
              inline
            />
            <SvgSprite
              v-else
              name="custom-circle-check-outline"
              class="ml-auto text-lightText"
              style="width: 16px; height: 16px"
            />
          </div>
        </template>
      </VListItem>
    </VList>
  </PerfectScrollbar>
</template>

<style>
.chatItem {
  padding: 16px !important;
}
.badg-dot {
  position: relative;
  top: -14px;
  left: -11px;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 100%;
  [dir="rtl"] & {
    left: unset;
    right: -11px;
  }
}
</style>
