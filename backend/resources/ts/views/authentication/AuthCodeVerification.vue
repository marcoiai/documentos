<script setup lang="ts">
import { ref } from 'vue'

const valid = ref(false)
const logform = ref()
const otp = ref('')
</script>

<template>
  <p class="text-h6 my-6">
    We’ve send you code on jone.****@company.com
  </p>
  <VForm
    ref="logform"
    v-model="valid"
    lazy-validation
    class="mt-7 loginForm"
  >
    <VOtpInput
      v-model="otp"
      type="number"
      length="4"
      class="mb-5"
      rounded="md"
      single-line
      height="46"
    />
    <VBtn
      color="primary"
      block
      class="mt-2"
      variant="flat"
      rounded="md"
      size="large"
      type="submit"
    >
      Continue
    </VBtn>
  </VForm>
  <div class="d-sm-flex align-start justify-space-between mt-6">
    <div class="text-subtitle-1 font-weight-regular">
      Not received Code?
    </div>
    <VBtn
      variant="text"
      color="primary"
      to="/#"
      class="text-capitalize me-n2 mt-2 mt-sm-0"
    >
      Resend Code
    </VBtn>
  </div>
</template>

<style lang="scss">
.loginForm {
  .v-otp-input {
    padding: 0;
    .v-otp-input__content {
      max-width: 100%;
      padding: 0;
    }
    .v-otp-input__field {
      font-size: 13px;
    }
  }
}
</style>
