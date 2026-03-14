<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    A simple example of a form in a dialog.
  </p>
  <div class="text-center mt-6">
    <VDialog
      v-model="dialog"
      persistent
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="flat"
          v-bind="props"
        >
          Open Dialog
        </VBtn>
      </template>
      <VCard
        style="height: 300px"
        class="overflow-auto"
      >
        <VCardTitle class="pa-5">
          <span class="text-h5">User Profile</span>
        </VCardTitle>
        <VDivider />
        <VCardText>
          <VContainer>
            <VRow>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VLabel class="mb-2">
                  Legal first name*
                </VLabel>
                <VTextField
                  single-line
                  variant="outlined"
                  placeholder="Enter first name*"
                  required
                  rounded="0"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VLabel class="mb-2">
                  Legal middle name
                </VLabel>
                <VTextField
                  single-line
                  variant="outlined"
                  placeholder="Enter middle name"
                  hint="example of helper text only on focus"
                  rounded="0"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VLabel class="mb-2">
                  Legal last name*
                </VLabel>
                <VTextField
                  placeholder="Enter last name*"
                  single-line
                  variant="outlined"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  rounded="0"
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Email*
                </VLabel>
                <VTextField
                  single-line
                  variant="outlined"
                  placeholder="Enter your email*"
                  required
                  rounded="0"
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Password*
                </VLabel>
                <VTextField
                  single-line
                  variant="outlined"
                  placeholder="Enter your Password*"
                  type="password"
                  required
                  rounded="0"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VLabel class="mb-2">
                  Age*
                </VLabel>
                <VSelect
                  single-line
                  role="link"
                  variant="outlined"
                  :items="['0-17', '18-29', '30-54', '54+']"
                  placeholder="Enter Age"
                  required
                  rounded="0"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VLabel class="mb-2">
                  Interests
                </VLabel>
                <VAutocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  single-line
                  variant="outlined"
                  multiple
                  rounded="0"
                />
              </VCol>
            </VRow>
          </VContainer>
          <small>*indicates required field</small>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            variant="text"
            @click="dialog = false"
          >
            Close
          </VBtn>
          <VBtn
            color="success"
            variant="text"
            @click="dialog = false"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
