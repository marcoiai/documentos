<script setup lang="ts">
import { ref } from 'vue'
import { useContactStore } from '@db/apps/contact/index'
import User1 from '@images/users/avatar-1.png'

defineEmits(['closeDrawer'])

const store = useContactStore()

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

const contact = ref({
  name: '',
  company: '',
  role: '',
  work_email: '',
  personal_email: '',
  work_phone: '',
  personal_phone: '',
  location: 'USA',
  avatar: User1,
  status: 'I am online',
  lastMessage: '2h ago',
  birthdayText: '',
})

const handleOnAdd = () => {
  store.addContacts(contact.value)
  contact.value = {
    name: '',
    company: '',
    role: '',
    work_email: '',
    personal_email: '',
    work_phone: '',
    personal_phone: '',
    location: 'USA',
    avatar: User1,
    status: 'I am online',
    lastMessage: '2h ago',
    birthdayText: '',
  }
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
          size="small"
          rounded="md"
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
        <VTextField
          v-model="contact.name"
          variant="outlined"
          density="comfortable"
          single-line
          label="Name"
          hide-details
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
        <VTextField
          v-model="contact.company"
          variant="outlined"
          density="comfortable"
          single-line
          label="Company"
          hide-details
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
        <VTextField
          v-model="contact.role"
          variant="outlined"
          density="comfortable"
          label="Job Title"
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
        <VTextField
          v-model="contact.work_email"
          variant="outlined"
          density="comfortable"
          label="Mail"
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
        <VTextField
          v-model="contact.work_phone"
          variant="outlined"
          density="comfortable"
          label="Phone"
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
        <VTextField
          v-model="birthday"
          variant="outlined"
          density="comfortable"
          aria-label="birthday"
          label="Birthday"
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
        <VTextarea
          v-model="contact.birthdayText"
          label="Bio"
          density="comfortable"
          single-line
          variant="outlined"
        />
      </div>
      <div class="py-3 pt-0 d-flex ga-2">
        <VBtn
          variant="flat"
          rounded="md"
          :disabled="contact.name === ''"
          color="primary"
          @click="$emit('closeDrawer'), handleOnAdd()"
        >
          Add Contact
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
