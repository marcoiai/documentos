<script setup lang="ts">
import { ref } from 'vue'

const textcpass = ref('textcmpass')
const textnpass = ref(' 2345')
const textcmpass = ref('12345')
</script>

<template>
  <div>
    <VRow class="mt-1">
      <VCol
        cols="12"
        lg="6"
      >
        <VLabel class="mb-2">
          Current Password
        </VLabel>
        <VTextField
          v-model="textcpass"
          type="password"
          density="comfortable"
          single-line
          placeholder="Enter Current Password"
          variant="outlined"
          hide-details
        />
      </VCol>
    </VRow>
    <VRow class="mt-3">
      <VCol
        cols="12"
        lg="6"
      >
        <VLabel class="mb-2">
          New Password
        </VLabel>
        <VTextField
          v-model="textnpass"
          type="password"
          density="comfortable"
          single-line
          placeholder="Enter New Password"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        lg="6"
      >
        <VLabel class="mb-2">
          Confirm Password
        </VLabel>
        <VTextField
          v-model="textcmpass"
          type="password"
          density="comfortable"
          single-line
          placeholder="Enter Confirm Password"
          variant="outlined"
          hide-details
        />
      </VCol>
    </VRow>
    <VBtn
      color="primary"
      variant="outlined"
      rounded="md"
      size="large"
      class="text-subtitle-1 mt-4"
    >
      Change Password
    </VBtn>
  </div>
</template>
