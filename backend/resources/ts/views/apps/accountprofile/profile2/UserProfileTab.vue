<script setup lang="ts">
import { ref } from 'vue'

const textlname = ref('Schorl')
const textfname = ref('Delaney')
const textemail = ref('demo@company.com')
const textphone = ref('000-00-00000')
const textcompany = ref('company.ltd')
const textsite = ref('www.company.com')
</script>

<template>
  <div>
    <div class="d-flex flex-row">
      <img
        src="@images/users/avatar-1.png"
        class="rounded-md"
        width="80"
        alt="user-img"
      >
      <div class="ms-4 d-flex align-center text-subtitle-2 text-medium-emphasis font-weight-medium">
        <SvgSprite
          name="custom-info-circle-outline"
          class="me-2"
          style="width: 16px; height: 16px"
        /> Image size Limit should be 125kb Max.
      </div>
    </div>
    <VRow class="mt-6">
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          First name
        </VLabel>
        <VTextField
          v-model="textfname"
          type="text"
          single-line
          color="primary"
          density="comfortable"
          placeholder="Enter First Name"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Last name
        </VLabel>
        <VTextField
          v-model="textlname"
          type="text"
          single-line
          color="primary"
          density="comfortable"
          placeholder="Enter Last Name"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Email Address
        </VLabel>
        <VTextField
          v-model="textemail"
          type="email"
          single-line
          color="primary"
          density="comfortable"
          placeholder="Enter Email Address"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Phone Number
        </VLabel>
        <VTextField
          v-model="textphone"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Phone Number"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Company name
        </VLabel>
        <VTextField
          v-model="textcompany"
          type="text"
          color="primary"
          density="comfortable"
          single-line
          placeholder="Enter Company Name"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Site Information
        </VLabel>
        <VTextField
          v-model="textsite"
          type="url"
          color="primary"
          density="comfortable"
          placeholder="Enter Site Information"
          variant="outlined"
          hide-details
        />
      </VCol>
    </VRow>
  </div>
</template>
