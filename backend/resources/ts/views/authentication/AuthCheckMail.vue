<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const valid = ref(false)
const logform = ref()

const router = useRouter()

function validate() {
  logform.value.validate()
  if (logform.value)
    router.push('/authentication/auth1/login1')
}
</script>

<template>
  <h3 class="text-h3">
    Hi, Check Your Mail
  </h3>
  <p class="text-lightText text-h6">
    We have sent a password recover instructions to your email.
  </p>
  <VForm
    ref="logform"
    v-model="valid"
    lazy-validation
    action="/authentication/auth1/login1"
    class="mt-7 loginForm"
    @submit.prevent="validate"
  >
    <VBtn
      color="primary"
      block
      class="mt-2"
      variant="flat"
      rounded="md"
      size="large"
      :disabled="valid"
      type="submit"
    >
      Sign in
    </VBtn>
  </VForm>
</template>
