<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const valid = ref(false)
const logform = ref()
const password = ref('')
const conpassword = ref('')
const show1 = ref(false)

const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters',
])

const confirmpasswordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters',
])

const router = useRouter()

function validate() {
  logform.value.validate()
  if (logform.value)
    router.push('/starter')
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
    <div class="mb-6">
      <VLabel>Password</VLabel>
      <VTextField
        v-model="password"
        :rules="passwordRules"
        required
        placeholder="Enter password"
        variant="outlined"
        density="comfortable"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2 mb-4"
      >
        <template #append-inner>
          <VBtn
            color="secondary"
            aria-label="icon"
            icon
            rounded
            variant="text"
          >
            <SvgSprite
              v-if="show1 === false"
              name="custom-eye-invisible"
              style="width: 20px; height: 20px"
              @click="show1 = !show1"
            />
            <SvgSprite
              v-if="show1 === true"
              name="custom-eye"
              style="width: 20px; height: 20px"
              @click="show1 = !show1"
            />
          </VBtn>
        </template>
      </VTextField>
    </div>
    <div class="mb-6">
      <VLabel>Confirm Password</VLabel>
      <VTextField
        v-model="conpassword"
        :rules="confirmpasswordRules"
        placeholder="Enter confirm password"
        required
        variant="outlined"
        density="comfortable"
        color="primary"
        hide-details="auto"
        class="pwdInput mt-2"
      />
    </div>
    <VBtn
      color="primary"
      block
      class="mt-5"
      variant="flat"
      rounded="md"
      size="large"
      :disabled="valid"
      type="submit"
    >
      Reset Password
    </VBtn>
  </VForm>
</template>
