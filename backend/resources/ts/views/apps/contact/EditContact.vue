<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useContactStore } from '@db/apps/contact/index'
import type { UserProfile } from '@db/apps/contact/types'

defineEmits(['closeDrawer'])

const store = useContactStore()

onMounted(() => {
  store.fetchContacts()
})

const contact = computed(() => {
  return store.contact[store.selectedContact]
})

const birthday = ref('November 30, 1997')
const uploader = ref()
const selectedFile = ref('')
function onButtonClick() {
  uploader.value.click()
}
function onFileChanged(e: Event) {
  const inputElement = e.target as HTMLInputElement
  const file = inputElement.files?.[0]

  selectedFile.value = file ? file.name : ''
}

const modifyUser = async (u: UserProfile) => {
  await store.editContacts(u)
}
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
        <VBtn
          color="primary"
          rounded="md"
          size="small"
          variant="outlined"
          @click="onButtonClick"
        >
          Change Avatar
        </VBtn>
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        >
      </div>
    </div>

    <form class="my-5">
      <div class="py-3">
        <VLabel class="mb-2">
          Name
        </VLabel>
        <VTextField
          v-model="contact.name"
          variant="outlined"
          density="comfortable"
          placeholder="Enter name"
          hide-details
          single-line
          color="primary"
        >
          <template #prepend-inner>
            <SvgSprite
              name="custom-user-outline"
              class="text-lightText"
              style="width: 18px; height: 18px"
            />
          </template>
        </VTextField>
      </div>
      <div class="py-3">
        <VLabel class="mb-2">
          Company
        </VLabel>
        <VTextField
          v-model="contact.company"
          variant="outlined"
          placeholder="Enter your Company"
          hide-details
          density="comfortable"
          single-line
          color="primary"
        >
          <template #prepend-inner>
            <SvgSprite
              name="custom-building-outline"
              class="text-lightText"
              style="width: 18px; height: 18px"
            />
          </template>
        </VTextField>
      </div>
      <div class="py-3">
        <VLabel class="mb-2">
          Job title
        </VLabel>
        <VTextField
          v-model="contact.role"
          variant="outlined"
          density="comfortable"
          placeholder="Enter Job Title"
          hide-details
          single-line
          color="primary"
        >
          <template #prepend-inner>
            <SvgSprite
              name="custom-wallet-outline"
              class="text-lightText"
              style="width: 18px; height: 18px"
            />
          </template>
        </VTextField>
      </div>
      <div class="py-3">
        <VLabel class="mb-2">
          Email
        </VLabel>
        <VTextField
          v-model="contact.work_email"
          variant="outlined"
          placeholder="Enter your mail"
          density="comfortable"
          hide-details
          single-line
          color="primary"
        >
          <template #prepend-inner>
            <SvgSprite
              name="custom-mail-outline"
              class="text-lightText"
              style="width: 18px; height: 18px"
            />
          </template>
        </VTextField>
      </div>
      <div class="py-3">
        <VLabel class="mb-2">
          Phone
        </VLabel>
        <VTextField
          v-model="contact.work_phone"
          variant="outlined"
          placeholder="Enter Phone number"
          density="comfortable"
          hide-details
          single-line
          color="primary"
        >
          <template #prepend-inner>
            <SvgSprite
              name="custom-phone-outline"
              class="text-lightText"
              style="width: 18px; height: 18px"
            />
          </template>
        </VTextField>
      </div>
      <div class="py-3">
        <VLabel class="mb-2">
          Birthday
        </VLabel>
        <VTextField
          v-model="birthday"
          variant="outlined"
          density="comfortable"
          placeholder="Enter Birthday"
          hide-details
          single-line
          color="primary"
        >
          <template #append-inner>
            <SvgSprite
              name="custom-calendar-outline"
              class="text-lightText"
              style="width: 18px; height: 18px"
            />
          </template>
        </VTextField>
      </div>
      <div class="py-3">
        <VLabel class="mb-2">
          Bio
        </VLabel>
        <VTextarea
          v-model="contact.birthdayText"
          placeholder="Enter message"
          variant="outlined"
          single-line
        />
      </div>
      <div class="py-3 pt-0 d-flex ga-2">
        <VBtn
          variant="flat"
          rounded="md"
          color="primary"
          @click="$emit('closeDrawer'), modifyUser(contact)"
        >
          Save
        </VBtn>
        <VBtn
          variant="outlined"
          rounded="md"
          color="secondary"
          @click="$emit('closeDrawer')"
        >
          Cancel
        </VBtn>
      </div>
    </form>
  </div>
</template>
