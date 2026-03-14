<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const cpassword = ref('')
const npassword = ref('')
const conpassword = ref('')
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)

const items = shallowRef([
  {
    title: 'At least 8 characters',
  },
  {
    title: 'At least 1 lower letter (a-z)',
  },
  {
    title: 'At least 1 uppercase letter (A-Z)',
  },
  {
    title: 'At least 1 number (0-9)',
  },
  {
    title: 'At least 1 special characters',
  },
])
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Change Password
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VRow>
                  <VCol cols="12">
                    <VLabel class="mb-2">
                      Old Password
                    </VLabel>
                    <VTextField
                      v-model="cpassword"
                      color="primary"
                      single-line
                      placeholder="Enter Old Password"
                      variant="outlined"
                      density="comfortable"
                      :type="show1 ? 'text' : 'password'"
                      hide-details
                    >
                      <template #append-inner>
                        <SvgSprite
                          v-if="show1 === false"
                          name="custom-eye-invisible"
                          class="text-secondary"
                          style="width: 20px; height: 20px"
                          @click="show1 = !show1"
                        />
                        <SvgSprite
                          v-if="show1 === true"
                          name="custom-eye"
                          class="text-secondary"
                          style="width: 20px; height: 20px"
                          @click="show1 = !show1"
                        />
                      </template>
                    </VTextField>
                  </VCol>
                  <VCol cols="12">
                    <VLabel class="mb-2">
                      New Password
                    </VLabel>
                    <VTextField
                      v-model="npassword"
                      color="primary"
                      single-line
                      placeholder="Enter New Password"
                      variant="outlined"
                      density="comfortable"
                      :type="show2 ? 'text' : 'password'"
                      hide-details
                    >
                      <template #append-inner>
                        <SvgSprite
                          v-if="show2 === false"
                          name="custom-eye-invisible"
                          class="text-secondary"
                          style="width: 20px; height: 20px"
                          @click="show2 = !show2"
                        />
                        <SvgSprite
                          v-if="show2 === true"
                          name="custom-eye"
                          class="text-secondary"
                          style="width: 20px; height: 20px"
                          @click="show2 = !show2"
                        />
                      </template>
                    </VTextField>
                  </VCol>
                  <VCol cols="12">
                    <VLabel class="mb-2">
                      Confirm Password
                    </VLabel>
                    <VTextField
                      v-model="conpassword"
                      color="primary"
                      single-line
                      placeholder="Enter Confirm Password"
                      variant="outlined"
                      density="comfortable"
                      :type="show3 ? 'text' : 'password'"
                      hide-details
                    >
                      <template #append-inner>
                        <SvgSprite
                          v-if="show3 === false"
                          name="custom-eye-invisible"
                          class="text-secondary"
                          style="width: 20px; height: 20px"
                          @click="show3 = !show3"
                        />
                        <SvgSprite
                          v-if="show3 === true"
                          name="custom-eye"
                          class="text-secondary"
                          style="width: 20px; height: 20px"
                          @click="show3 = !show3"
                        />
                      </template>
                    </VTextField>
                  </VCol>
                </VRow>
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <h5 class="text-h5">
                  New Password must contain:
                </h5>
                <VList
                  aria-label="content"
                  aria-busy="true"
                >
                  <VListItem
                    v-for="(item, index) in items"
                    :key="index"
                    border
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-line"
                        class="me-2"
                        style="width: 24px; height: 24px"
                      />
                    </template>
                    <h6 class="text-h6 mb-0">
                      {{ item.title }}
                    </h6>
                  </VListItem>
                </VList>
              </VCol>
            </VRow>
            <div class="text-end mt-4">
              <VBtn
                color="secondary"
                variant="outlined"
                rounded="md"
                class="me-2"
              >
                Cancel
              </VBtn>
              <VBtn
                color="primary"
                rounded="md"
                variant="flat"
              >
                Save
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
