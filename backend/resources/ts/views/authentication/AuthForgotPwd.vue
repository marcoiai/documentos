<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const valid = ref(false)
const logform = ref()
const email = ref('')

// Email validation rules
const emailRules = ref([
  (v: string) => !!v.trim() || 'E-mail is required',
  (v: string) => {
    const trimmedEmail = v.trim()
    
    return !/\s/.test(trimmedEmail) || 'E-mail must not contain spaces'
  },
  (v: string) => /.[^\n\r@\u2028\u2029]*@.+\..+/.test(v.trim()) || 'E-mail must be valid',
])

const router = useRouter()

function validate() {
  if (logform.value && logform.value.validate()) {
    router.push('/starter')
  }
}
</script>

<template>
  <VForm
    ref="logform"
    v-model="valid"
    lazy-validation
    action="/starter"
    class="mt-7 loginForm"
    @submit.prevent="validate"
  >
    <VLabel>Email address</VLabel>
    <VTextField
      v-model="email"
      :rules="emailRules"
      placeholder="Enter email address"
      class="mt-2 mb-6"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
      @input="(email = email.trim())"
    />

    <h6 class="text-caption">
      Do not forgot to check SPAM box.
    </h6>
    <VBtn
      color="primary"
      block
      class="mt-2"
      variant="flat"
      size="large"
      rounded="md"
      :disabled="!valid"
      type="submit"
    >
      Send Password Reset Email
    </VBtn>
  </VForm>
</template>
