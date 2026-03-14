<script setup lang="ts">
import { useContactStore } from '@db/apps/contact/index'

const props = defineProps({
  getContacts: Object,
})

defineEmits(['openDrawer'])

const store = useContactStore()
</script>

<template>
  <div
    v-for="contact in props.getContacts"
    :key="contact.name"
  >
    <h3
      v-if="typeof contact === 'string'"
      class="text-primary text-h3 mt-5 mb-2"
    >
      {{ contact }}
    </h3>
    <div
      v-else
      class="d-flex align-center ga-4 py-4 bb"
    >
      <img
        :src="contact.avatar"
        :alt="contact.avatar"
        width="48"
        class="rounded-md"
      >
      <div
        class="cursor-pointer w-50"
        @click="$emit('openDrawer'), store.SelectContact(contact.id)"
      >
        <h5 class="text-lg-h4 text-h5 mb-1">
          {{ contact.name }}
        </h5>
        <VListItemSubtitle class="text-subtitle-2 font-weight-medium">
          {{ contact.role }}
        </VListItemSubtitle>
      </div>

      <div class="d-flex align-center ga-2 ms-auto">
        <VBtn
          color="primary"
          variant="outlined"
          aria-label="message"
          size="small"
          icon
          rounded="md"
        >
          <SvgSprite
            name="custom-message-outline"
            style="width: 16px; height: 16px"
          />
          <VTooltip
            activator="parent"
            aria-label="tooltip"
            location="top"
          >
            Message
          </VTooltip>
        </VBtn>

        <VBtn
          color="secondary"
          variant="outlined"
          aria-label="phone"
          size="small"
          icon
          rounded="md"
        >
          <SvgSprite
            name="custom-phone-outline"
            style="width: 16px; height: 16px"
          />
          <VTooltip
            activator="parent"
            aria-label="tooltip"
            location="top"
          >
            Call
          </VTooltip>
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bb {
  border-bottom: 1px solid rgb(var(--v-theme-borderLight));
}
</style>
