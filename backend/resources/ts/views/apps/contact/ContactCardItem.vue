<script setup lang="ts">
import { useContactStore } from '@db/apps/contact/index'

const propsContact = defineProps({
  getContacts: Object,
})

defineEmits(['openDrawer'])

const store = useContactStore()
</script>

<template>
  <VRow class="mb-0">
    <VCol
      v-for="contact in propsContact.getContacts"
      :key="contact.name"
      class="mt-3 pb-0"
      cols="12"
      :sm="typeof contact === 'string' ? '12' : '6'"
      :xl="typeof contact === 'string' ? '12' : '3'"
      :md="typeof contact === 'string' ? '12' : 'auto'"
    >
      <h3
        v-if="typeof contact === 'string'"
        class="text-primary text-h3 mt-5 mb-0"
      >
        {{ contact }}
      </h3>
      <VCard
        v-else
        variant="outlined"
        class="card-hover-border bg-containerBg"
        rounded="lg"
      >
        <VCardText>
          <div class="d-flex">
            <img
              :src="contact.avatar"
              class="rounded-md"
              :alt="contact.avatar"
              width="72"
            >
            <div class="ms-auto">
              <VMenu
                class="rounded-md"
                rounded="md"
                elevation="24"
              >
                <template #activator="{ props }">
                  <VBtn
                    icon
                    size="small"
                    aria-label="menu"
                    v-bind="props"
                    variant="text"
                    rounded="md"
                  >
                    <SvgSprite
                      name="custom-more-outline"
                      style="width: 18px; height: 18px"
                    />
                  </VBtn>
                </template>
                <VList
                  elevation="24"
                  rounded="md"
                  aria-label="menu"
                  aria-busy="true"
                >
                  <VListItem
                    value="Edit"
                    color="secondary"
                    @click="$emit('openDrawer'), store.SelectContact(contact.id)"
                  >
                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </div>
          </div>
          <div class="mb-4 mt-5">
            <h4 class="text-h5 mb-1">
              {{ contact.name }}
            </h4>
            <span class="text-subtitle-2 text-medium-emphasis font-weight-medium">{{ contact.role }}</span>
            <br><br>
            <span class="text-subtitle-2 text-medium-emphasis font-weight-medium">Email</span>
            <p class="text-subtitle-2 font-weight-medium">
              {{ contact.work_email }}
            </p>
            <VRow class="mt-3">
              <VCol cols="6">
                <span class="text-subtitle-2 text-medium-emphasis font-weight-medium">Phone</span>
                <p class="text-subtitle-2 font-weight-medium">
                  {{ contact.personal_phone }}
                </p>
              </VCol>
              <VCol cols="6">
                <span class="text-subtitle-2 text-medium-emphasis font-weight-medium">Location</span>
                <p class="text-subtitle-2 font-weight-medium">
                  {{ contact.location }}
                </p>
              </VCol>
            </VRow>
          </div>
          <div class="d-flex ga-4 mt-5">
            <VBtn
              variant="flat"
              color="primary"
              rounded="md"
              class="flex-fill"
            >
              <template #prepend>
                <SvgSprite
                  name="custom-message-outline"
                  style="width: 16px; height: 16px"
                />
              </template>
              Message
            </VBtn>
            <VBtn
              variant="outlined"
              color="secondary"
              rounded="md"
              class="flex-fill"
            >
              <template #prepend>
                <SvgSprite
                  name="custom-phone-outline"
                  style="width: 16px; height: 16px"
                />
              </template>
              Call
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
