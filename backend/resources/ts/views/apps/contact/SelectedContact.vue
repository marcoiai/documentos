<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useContactStore } from '@db/apps/contact/index'

defineEmits(['editContact'])

const store = useContactStore()

onMounted(() => {
  store.fetchContacts()
})

const contact = computed(() => {
  return store.contact[store.selectedContact]
})
</script>

<template>
  <div
    v-if="contact"
    class="pa-6"
  >
    <div class="d-flex align-center">
      <img
        :src="contact.avatar"
        :alt="contact.avatar"
        width="48"
        class="me-2 rounded-md"
      >
      <div>
        <h5 class="text-h4 mb-0">
          {{ contact.name }}
        </h5>
        <VListItemSubtitle class="text-subtitle-2 font-weight-medium">
          {{ contact.role }}
        </VListItemSubtitle>
      </div>
    </div>
    <VRow class="my-3">
      <VCol cols="6">
        <VBtn
          variant="outlined"
          rounded="md"
          color="primary"
          block
          @click="$emit('editContact')"
        >
          <template #prepend>
            <SvgSprite
              name="custom-message-outline"
              style="width: 16px; height: 16px"
            />
          </template>
          Edit
        </VBtn>
      </VCol>
      <VCol cols="6">
        <VBtn
          variant="outlined"
          rounded="md"
          color="error"
          block
        >
          <template #prepend>
            <SvgSprite
              name="custom-danger-outline"
              style="width: 16px; height: 16px"
            />
          </template>
          Block
        </VBtn>
      </VCol>
    </VRow>
    <table class="text-body-1">
      <tbody>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-building-outline"
              style="width: 20px; height: 20px; vertical-align: -2px"
            />
          </td>
          <td>{{ contact.company }}</td>
        </tr>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-wallet-outline"
              style="width: 20px; height: 20px; vertical-align: -2px"
            />
          </td>
          <td>{{ contact.role }}</td>
        </tr>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-mail-outline"
              style="width: 20px; height: 20px; vertical-align: -3px"
            />
          </td>
          <td>{{ contact.work_email }}</td>
        </tr>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-phone-outline"
              style="width: 20px; height: 20px; vertical-align: -2px"
            />
          </td>
          <td>{{ contact.work_phone }}</td>
        </tr>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-navigation-outline"
              style="width: 20px; height: 20px; vertical-align: -2px"
            />
          </td>
          <td>{{ contact.location }}</td>
        </tr>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-birthday-outline"
              style="width: 20px; height: 20px; vertical-align: -2px"
            />
          </td>
          <td>November 30, 1997</td>
        </tr>
        <tr>
          <td class="pa-2 ps-0">
            <SvgSprite
              name="custom-warning-outline"
              style="width: 20px; height: 20px; vertical-align: -5px"
            />
          </td>
          <td>{{ contact.birthdayText }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
