<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import ChatListing from '@/views/apps/chats/ChatListing.vue'
import ChatDetail from '@/views/apps/chats/ChatDetail.vue'
import ChatProfile from '@/views/apps/chats/ChatProfile.vue'

const { mdAndUp } = useDisplay()
const toggleSide = ref(false)
</script>

<template>
  <VRow class="mt-0">
    <VCol
      v-if="!toggleSide && mdAndUp"
      class="d-flex align-stretch chatSidebar pe-md-0"
    >
      <VCard
        variant="outlined"
        class="bg-surface br-0"
        rounded="lg"
      >
        <VCardText class="py-5 px-0">
          <h5 class="text-h5 px-5">
            Messages
            <VChip
              color="secondary"
              size="x-small"
              variant="flat"
            >
              9
            </VChip>
          </h5>
          <ChatListing />
          <ChatProfile />
        </VCardText>
      </VCard>
    </VCol>
    <VCol class="d-flex align-stretch ps-md-0">
      <VCard
        variant="outlined"
        class="bg-surface bl-0"
        rounded="lg"
      >
        <ChatDetail @s-toggle="toggleSide = !toggleSide" />
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.br-0 {
  @media (min-width: 960px) {
    border-right: none;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    [dir="rtl"] & {
      border-left: none;
      border-right: 1px solid rgb(var(--v-theme-borderLight));
      border-top-right-radius: 8px !important;
      border-bottom-right-radius: 8px !important;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
}
.bl-0 {
  @media (min-width: 960px) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    [dir="rtl"] & {
      border-top-left-radius: 8px !important;
      border-bottom-left-radius: 8px !important;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}
.custom-main {
  margin: 0;
}
.chatSidebar {
  max-width: 319px;
  .v-list-item__prepend {
    > .v-avatar {
      ~ .v-list-item__spacer {
        width: 0;
      }
    }
  }
}
</style>
