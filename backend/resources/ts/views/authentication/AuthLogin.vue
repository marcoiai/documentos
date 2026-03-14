<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'

import { useRoute, useRouter } from 'vue-router'
import { useIspValue } from '@/utils/useIspValue'

// Import useRouter and useRoute from vue-router

const { ispValue } = useIspValue()

const show1 = ref(false)
const rememberMe = ref(false)

const router = useRouter() // Get router instance
const route = useRoute() // Get current route instance

const ability = useAbility()

const refVForm = ref<VForm>()

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
})

const credentials = ref({
  email: 'admin@test.com',
  password: 'admin',
})

// Define login function
async function login() {
  try {
    const res = await $api('/auth/login', {
      method: 'POST',
      body: {
        email: credentials.value.email,
        password: credentials.value.password,
      },
    })

    const { accessToken, userData, userAbilityRules } = res

    useCookie('userAbilityRules').value = userAbilityRules
    ability.update(userAbilityRules)

    useCookie('userData').value = userData
    useCookie('accessToken').value = accessToken

    // Redirect to `to` query if exists, otherwise redirect to index route
    await router.replace(route.query.to ? String(route.query.to) : ispValue.value === true ? '/dashboards/default?isp=1' : '/dashboards/default')
  }
  catch (error) {
  // Handle errors
    console.error(error)
    errors.value.apiError = 'Invalid email or password' // Set error message for invalid credentials
  }
}

function onSubmit() {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}
</script>

<template>
  <div class="d-flex justify-space-between align-center mt-4">
    <h3 class="text-h3 text-center mb-0">
      Login
    </h3>
    <RouterLink
      to="/authentication/auth1/register1"
      class="text-primary text-decoration-none"
    >
      Don't Have an account?
    </RouterLink>
  </div>
  <VForm
    ref="refVForm"
    class="mt-7 loginForm"
    @submit.prevent="onSubmit"
  >
    <div class="mb-6">
      <VLabel>Email Address</VLabel>
      <VTextField
        v-model="credentials.email"
        aria-label="email address"
        :rules="[requiredValidator, emailValidator]"
        :error-messages="errors.email"
        class="mt-2"
        density="comfortable"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      />
    </div>
    <div>
      <VLabel>Password</VLabel>
      <VTextField
        v-model="credentials.password"
        aria-label="password"
        :rules="[requiredValidator]"
        :error-messages="errors.password"
        required
        variant="outlined"
        density="comfortable"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2"
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

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <VCheckbox
        v-model="rememberMe"
        label="Keep me sign in"
        color="primary"
        class="ml-n2"
        hide-details
      />
      <div class="ms-auto">
        <RouterLink
          to="/authentication/auth1/forgotpwd1"
          class="text-darkText link-hover"
        >
          Forgot Password?
        </RouterLink>
      </div>
    </div>
    <VBtn
      color="primary"
      block
      class="mt-5"
      variant="flat"
      size="large"
      rounded="md"
      type="submit"
    >
      Login
    </VBtn>

    <div
      v-if="errors.apiError"
      class="mt-2"
    >
      <VAlert color="error">
        {{ errors.apiError }}
      </VAlert>
    </div>
  </VForm>
</template>
