<script setup lang="ts">
import { ref } from 'vue'
import user1 from '@images/users/avatar-1.png'

const textName = ref('John Doe')
const textEmail = ref('name@example.com')
const textCompany = ref('Materially Inc.')
const textCountry = ref('USA')
const textPhone = ref('4578-420-410 ')
const textBirthday = ref('31/01/2001')
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-6">
            <h5 class="text-subtitle-1 mb-0">
              Profile Picture
            </h5>
          </div>
          <VDivider />
          <VCardText class="text-center">
            <img
              :src="user1"
              width="100"
              class="rounded-md"
              alt="profile"
            >
            <p class="text-subtitle-2 text-disabled font-weight-medium my-4">
              Upload/Change Your Profile Image
            </p>
            <VBtn
              color="primary"
              rounded="md"
              variant="flat"
              size="small"
            >
              Upload Avatar
            </VBtn>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="8"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="px-5 py-6">
            <h5 class="text-subtitle-1 mb-0">
              Edit Account Details
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Name
                </VLabel>
                <VTextField
                  v-model="textName"
                  type="text"
                  placeholder="Enter Name"
                  single-line
                  density="comfortable"
                  hint="Helper Text"
                  color="primary"
                  variant="outlined"
                  persistent-hint
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Email Address
                </VLabel>
                <VTextField
                  v-model="textEmail"
                  type="email"
                  single-line
                  density="comfortable"
                  placeholder="Enter your email"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Company
                </VLabel>
                <VTextField
                  v-model="textCompany"
                  type="text"
                  single-line
                  density="comfortable"
                  placeholder="Enter company name"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Country
                </VLabel>
                <VTextField
                  v-model="textCountry"
                  type="text"
                  single-line
                  density="comfortable"
                  placeholder="Enter Country"
                  color="primary"
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
                  v-model="textPhone"
                  type="text"
                  single-line
                  density="comfortable"
                  placeholder="Enter phone number"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VLabel class="mb-2">
                  Birthday
                </VLabel>
                <VTextField
                  v-model="textBirthday"
                  type="text"
                  single-line
                  density="comfortable"
                  placeholder="Enter birthday date"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
            </VRow>
            <VBtn
              color="primary"
              rounded="md"
              variant="flat"
              class="mt-5"
            >
              Change Details
            </VBtn>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
