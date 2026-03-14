<script setup lang="ts">
import { shallowRef } from 'vue'

const items = shallowRef([
  {
    title: 'Order Confirmation',
    icon: 'custom-file-outline-2',
    content: 'You will be notified when customer order any product',
    value: true,
  },
  {
    title: 'Setup Email Notification',
    icon: 'custom-mail-outline',
    content: 'Turn on email notification to get updates through email',
    value: false,
  },
  {
    title: 'Update System Notification',
    icon: 'custom-mail-outline',
    content: 'You will be notified when customer order any product',
    value: true,
  },
  {
    title: 'Language Change',
    icon: 'custom-translation-outlie',
    content: 'You will be notified when customer order any product',
    value: true,
  },
])
</script>

<template>
  <VCard
    class="bg-surface"
    variant="outlined"
    rounded="lg"
  >
    <VCardText>
      <h5 class="text-subtitle-1 mb-0">
        Settings
      </h5>
    </VCardText>
    <VDivider />
    <VCardItem>
      <VList
        lines="two"
        border
        aria-label="setting list"
        aria-busy="true"
      >
        <VListItem
          v-for="(item, index) in items"
          :key="index"
          class="py-6"
        >
          <template #prepend>
            <SvgSprite
              :name="item.icon || ''"
              class="me-4 text-primary"
              style="width: 24px; height: 24px"
            />
          </template>
          <VListItemTitle class="text-h5">
            {{ item.title }}
          </VListItemTitle>
          <VListItemSubtitle
            class="text-body-2 text-lightText"
            style="opacity: 1"
          >
            {{ item.content }}
          </VListItemSubtitle>
          <template #append>
            <VSwitch
              color="primary"
              density="compact"
              aria-label="switch"
              class="ms-3"
              :model-value="item.value"
              inset
              hide-details
            />
          </template>
        </VListItem>
      </VList>
      <div class="text-end mt-3">
        <VBtn
          variant="outlined"
          color="secondary"
          rounded="md"
        >
          Cancel
        </VBtn>
        <VBtn
          variant="flat"
          color="primary"
          rounded="md"
          class="ms-3"
        >
          Save
        </VBtn>
      </div>
    </VCardItem>
  </VCard>
</template>
