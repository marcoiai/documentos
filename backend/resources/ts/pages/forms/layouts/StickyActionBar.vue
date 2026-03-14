<script setup lang="ts">
import { ref } from 'vue'

// theme breadcrumb
const page = ref({ title: 'Sticky Bar' })

const breadcrumbs = ref([
  {
    title: 'Layouts',
    disabled: false,
    href: '#',
  },
  {
    title: 'Sticky Bar',
    disabled: true,
    href: '#',
  },
])

const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)
const checkbox5 = ref(false)
const checkbox6 = ref(false)
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface"
      >
        <VToolbar
          flat
          class="px-2 stickyHeader bg-containerBg"
          rounded="md"
          color="inherit"
          style="border-bottom-left-radius: 0 !important;border-bottom-right-radius: 0 !important;"
          density="comfortable"
        >
          <VToolbarTitle class="text-h5">
            Sticky Action Bar:
          </VToolbarTitle>
          <template #append>
            <VBtn
              variant="text"
              color="error"
              class="mr-3"
              size="small"
              rounded="md"
            >
              Cancel
            </VBtn>
            <VBtn
              variant="flat"
              color="primary"
              size="small"
              rounded="md"
            >
              Submit
            </VBtn>
          </template>
        </VToolbar>
        <VDivider />
        <VCardText>
          <div class="pb-0 pb-sm-6">
            <VRow class="pb-4 pb-sm-0">
              <VCol
                cols="3"
                lg="4"
              >
                <div class="d-flex align-center justify-end">
                  <VBtn
                    icon
                    color="secondary"
                    aria-label="profile"
                    rounded="md"
                    variant="flat"
                  >
                    <SvgSprite
                      name="custom-profile-outline"
                      style="width: 24px; height: 24px"
                    />
                  </VBtn>
                </div>
              </VCol>
              <VCol
                cols="9"
                lg="6"
                class="pl-0"
              >
                <h3 class="text-h3 mb-0 mt-n1">
                  Personal Information
                </h3>
                <span class="text-caption">Sticky Action Bar Lorem Ipsum is simply</span>
              </VCol>
            </VRow>
          </div>
          <VDivider />
          <VRow class="pt-0 pt-sm-7 mb-4 mb-md-0">
            <VCol
              sm="3"
              lg="4"
            />
            <VCol
              cols="12"
              lg="6"
              sm="9"
            >
              <h5 class="text-h5 mb-2">
                A. Personal Info:
              </h5>
            </VCol>
          </VRow>

          <VRow class="d-flex align-center">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                Name :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter your full name"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter full name"
                density="comfortable"
                color="primary"
              />
            </VCol>
          </VRow>
          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                Email :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter your Email"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter email"
                density="comfortable"
                type="email"
                color="primary"
              />
            </VCol>
          </VRow>
          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                Password :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter your Password"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter password"
                density="comfortable"
                type="password"
                color="primary"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-9" />
          <VRow class="pt-0 pt-sm-7 mb-4 mb-sm-0">
            <VCol
              sm="3"
              lg="4"
            />
            <VCol
              lg="8"
              cols="12"
              sm="9"
            >
              <h5 class="text-h5 mb-2">
                B. Educational Info:
              </h5>
            </VCol>
          </VRow>
          <VRow class="d-flex align-center">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                Degree Name :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter your Degree name"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter Degree name"
                density="comfortable"
                color="primary"
              />
            </VCol>
          </VRow>
          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                Passing Year :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter Passing Year"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter Passing Year"
                density="comfortable"
                color="primary"
              />
            </VCol>
          </VRow>
          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                College Name :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter College name"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter College name"
                density="comfortable"
                color="primary"
              />
            </VCol>
          </VRow>
          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
                Work Experience :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <VTextField
                hint="Please enter Work Experience"
                persistent-hint
                variant="outlined"
                persistent-placeholder
                placeholder="Enter Work Experience"
                density="comfortable"
                color="primary"
              />
            </VCol>
          </VRow>
          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end">
                Language :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <div class="d-flex ga-4">
                <VCheckbox
                  v-model="checkbox1"
                  density="compact"
                  hide-details
                  color="primary"
                  label="English"
                  class="flex-grow-0"
                />
                <VCheckbox
                  v-model="checkbox2"
                  density="compact"
                  hide-details
                  color="primary"
                  label="French"
                  class="flex-grow-0"
                />
                <VCheckbox
                  v-model="checkbox3"
                  density="compact"
                  hide-details
                  color="primary"
                  label="Dutch"
                  class="flex-grow-0"
                />
              </div>
            </VCol>
          </VRow>

          <VRow class="d-flex align-center mt-sm-2 mt-5">
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="py-0"
            >
              <VLabel class="d-flex justify-start justify-sm-end">
                Hobby :
              </VLabel>
            </VCol>
            <VCol
              cols="12"
              sm="9"
              lg="6"
            >
              <div class="d-flex ga-2 flex-wrap">
                <VCheckbox
                  v-model="checkbox4"
                  density="compact"
                  hide-details
                  color="primary"
                  label="Reading"
                  class="flex-grow-0"
                />
                <VCheckbox
                  v-model="checkbox5"
                  density="compact"
                  hide-details
                  color="primary"
                  label="Dancing"
                  class="flex-grow-0"
                />
                <VCheckbox
                  v-model="checkbox6"
                  density="compact"
                  hide-details
                  color="primary"
                  label="Swimming"
                  class="flex-grow-0"
                />
              </div>
            </VCol>
          </VRow>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VRow>
            <VCol
              cols="12"
              sm="3"
              lg="4"
              class="d-none d-sm-block"
            />
            <VCol
              cols="12"
              sm="9"
              lg="8"
              class="text-sm-start text-center"
            >
              <div class="d-flex ga-2">
                <VBtn
                  variant="text"
                  color="error"
                  rounded="md"
                >
                  Cancel
                </VBtn>
                <VBtn
                  variant="flat"
                  color="primary"
                  class="mr-2"
                  rounded="md"
                >
                  Submit
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.stickyHeader {
  position: sticky;
  top: 60px;
  z-index: 2;
}
</style>
