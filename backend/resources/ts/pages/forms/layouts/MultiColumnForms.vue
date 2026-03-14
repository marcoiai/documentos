<script setup lang="ts">
import { ref } from 'vue'

// theme breadcrumb
const page = ref({ title: 'Multi Column' })

const breadcrumbs = ref([
  {
    title: 'Layouts',
    disabled: false,
    href: '#',
  },
  {
    title: 'Multi Column',
    disabled: true,
    href: '#',
  },
])

const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(true)
const checkbox5 = ref(false)
const checkbox6 = ref(true)
const checkbox7 = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------- -->
  <!-- Multi Column Forms -->
  <!-- ----------------------------------------------------- -->
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <!-- 2 Columns Form Layout -->
    <VCol cols="12">
      <UiParentCard title="2 Columns Form Layout">
        <VRow>
          <!-- column 1 -->
          <VCol
            cols="12"
            lg="6"
          >
            <VLabel class="mb-2">
              Name
            </VLabel>
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
          <!-- column 2 -->
          <VCol
            cols="12"
            lg="6"
          >
            <VLabel class="mb-2">
              Email
            </VLabel>
            <VTextField
              hint="Please enter your Email"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter email"
              density="comfortable"
              color="primary"
            />
          </VCol>
          <!-- column 3 -->
          <VCol
            cols="12"
            lg="6"
          >
            <VLabel class="mb-2">
              Password
            </VLabel>
            <VTextField
              hint="Please enter Password"
              persistent-hint
              variant="outlined"
              type="password"
              persistent-placeholder
              placeholder="Enter password"
              density="comfortable"
              color="primary"
            >
              <template #append-inner>
                <SvgSprite
                  name="custom-lock-2"
                  class="text-lightText"
                  style="width: 24px; height: 24px"
                />
              </template>
            </VTextField>
          </VCol>
          <!-- column 4 -->
          <VCol
            cols="12"
            lg="6"
          >
            <VLabel class="mb-2">
              Profile URL
            </VLabel>
            <VTextField
              hint="Please enter your Profile URL"
              persistent-hint
              variant="outlined"
              type="password"
              persistent-placeholder
              placeholder="Please enter your Profile URL"
              density="comfortable"
              color="primary"
            >
              <template #append-inner>
                <SvgSprite
                  name="custom-link3"
                  class="text-lightText"
                  style="width: 24px; height: 24px"
                />
              </template>
            </VTextField>
          </VCol>
          <!-- column 5 -->
          <VCol
            cols="12"
            lg="6"
          >
            <VLabel class="mb-2">
              Language
            </VLabel>
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
      </UiParentCard>
    </VCol>
    <!-- 2 Columns Horizontal Form Layout -->
    <VCol cols="12">
      <UiParentCard title="2 Columns Horizontal Form Layout">
        <VRow>
          <!-- column 1 -->
          <VCol
            cols="12"
            sm="6"
          >
            <!-- row 1 -->
            <VRow>
              <VCol
                cols="12"
                lg="4"
                md="3"
                class="pb-md-3 pb-0"
              >
                <VLabel class="mt-md-4">
                  Name
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                lg="8"
                md="9"
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
            <!-- row 2 -->
            <VRow class="mt-3">
              <VCol
                cols="12"
                lg="4"
                md="3"
                class="pb-md-3 pb-0"
              >
                <VLabel class="mt-md-4">
                  Password
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                lg="8"
                md="9"
              >
                <VTextField
                  hint="Please enter Password"
                  persistent-hint
                  variant="outlined"
                  type="password"
                  persistent-placeholder
                  placeholder="Enter password"
                  density="comfortable"
                  color="primary"
                >
                  <template #append-inner>
                    <SvgSprite
                      name="custom-lock-2"
                      class="text-lightText"
                      style="width: 24px; height: 24px"
                    />
                  </template>
                </VTextField>
              </VCol>
            </VRow>
            <!-- row 3 -->
            <VRow class="mt-3 align-center">
              <VCol
                cols="12"
                lg="4"
                md="3"
                class="pb-md-3 pb-0"
              >
                <VLabel>Language</VLabel>
              </VCol>
              <VCol
                cols="12"
                lg="8"
                md="9"
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
          </VCol>
          <!-- column 2 -->
          <VCol
            cols="12"
            sm="6"
          >
            <!-- row 1 -->
            <VRow>
              <VCol
                cols="12"
                lg="4"
                md="3"
                class="pb-md-3 pb-0"
              >
                <VLabel class="mt-md-4">
                  Email
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                lg="8"
                md="9"
              >
                <VTextField
                  hint="Please enter your Email"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter email"
                  density="comfortable"
                  color="primary"
                />
              </VCol>
            </VRow>
            <!-- row 2 -->
            <VRow class="mt-3">
              <VCol
                cols="12"
                lg="4"
                md="3"
                class="pb-md-3 pb-0"
              >
                <VLabel class="mt-md-4">
                  Profile URL
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                lg="8"
                md="9"
              >
                <VTextField
                  hint="Please enter your Profile URL"
                  persistent-hint
                  variant="outlined"
                  type="password"
                  persistent-placeholder
                  placeholder="Please enter your Profile URL"
                  density="comfortable"
                  color="primary"
                >
                  <template #append-inner>
                    <SvgSprite
                      name="custom-link3"
                      class="text-lightText"
                      style="width: 24px; height: 24px"
                    />
                  </template>
                </VTextField>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- 3 Columns Form Layout -->
    <VCol cols="12">
      <UiParentCard title="3 Columns Form Layout">
        <VRow>
          <!-- column 1 -->
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VLabel class="mb-2">
              Name
            </VLabel>

            <VTextField
              hint="Please enter your full name"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter full name"
              density="comfortable"
              color="primary"
            />
            <VLabel class="mb-2 mt-5">
              Contact
            </VLabel>

            <VTextField
              hint="Please enter your contact"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter contact number"
              density="comfortable"
              color="primary"
            />
            <VLabel class="mb-2 mt-5">
              Address
            </VLabel>

            <VTextField
              hint="Please enter your address"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter your address"
              density="comfortable"
              color="primary"
            />
          </VCol>
          <!-- column 2 -->
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VLabel class="mb-2">
              Email
            </VLabel>

            <VTextField
              hint="Please enter your Email"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter email"
              density="comfortable"
              color="primary"
            />

            <VLabel class="mb-2 mt-5">
              Profile URL
            </VLabel>

            <VTextField
              hint="Please enter your Profile URL"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter Profile URL"
              density="comfortable"
              color="primary"
            >
              <template #append-inner>
                <SvgSprite
                  name="custom-link3"
                  class="text-lightText"
                  style="width: 24px; height: 24px"
                />
              </template>
            </VTextField>

            <VLabel class="mb-2 mt-5">
              User Type
            </VLabel>
            <div class="d-flex ga-4">
              <VCheckbox
                v-model="checkbox4"
                density="compact"
                hide-details
                color="primary"
                label="Administrator"
                class="flex-grow-0"
              />
              <VCheckbox
                v-model="checkbox5"
                density="compact"
                hide-details
                color="primary"
                label="Author"
                class="flex-grow-0"
              />
            </div>
          </VCol>
          <!-- column 3 -->
          <VCol
            cols="12"
            md="4"
            sm="6"
          >
            <VLabel class="mb-2">
              Password
            </VLabel>

            <VTextField
              hint="Please enter Password"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter password"
              density="comfortable"
              color="primary"
            >
              <template #prepend-inner>
                <SvgSprite
                  name="custom-lock-2"
                  class="text-lightText"
                  style="width: 24px; height: 24px"
                />
              </template>
            </VTextField>
            <VLabel class="mb-2 mt-5">
              Pincode
            </VLabel>

            <VTextField
              hint="Please enter your postcode"
              persistent-hint
              variant="outlined"
              persistent-placeholder
              placeholder="Enter your postcode"
              density="comfortable"
              color="primary"
            />
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
    <!-- 3 Columns Form Layout -->
    <VCol cols="12">
      <UiParentCard title="3 Columns Form Layout">
        <!-- Row 1 -->
        <VRow class="pb-6">
          <!-- column 1 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Name
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
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
          </VCol>
          <!-- column 2 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Email
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VTextField
                  hint="Please enter your Email"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter email"
                  density="comfortable"
                  color="primary"
                />
              </VCol>
            </VRow>
          </VCol>
          <!-- column 3 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Password
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VTextField
                  hint="Please enter Password"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter password"
                  density="comfortable"
                  color="primary"
                >
                  <template #prepend-inner>
                    <SvgSprite
                      name="custom-lock-2"
                      class="text-lightText"
                      style="width: 24px; height: 24px"
                    />
                  </template>
                </VTextField>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VDivider />
        <!-- row 2 -->
        <VRow class="pt-6">
          <!-- column 1 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Contact
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VTextField
                  hint="Please enter your contact"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter contact number"
                  density="comfortable"
                  color="primary"
                />
              </VCol>
            </VRow>
          </VCol>
          <!-- column 2 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Profile URL
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VTextField
                  hint="Please enter your Profile URL"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter Profile URL"
                  density="comfortable"
                  color="primary"
                >
                  <template #append-inner>
                    <SvgSprite
                      name="custom-link3"
                      class="text-lightText"
                      style="width: 24px; height: 24px"
                    />
                  </template>
                </VTextField>
              </VCol>
            </VRow>
          </VCol>
          <!-- column 3 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center pb-6">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Pincode
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VTextField
                  hint="Please enter your postcode"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter your postcode"
                  density="comfortable"
                  color="primary"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VDivider />
        <!-- row 3 -->
        <VRow class="pt-6">
          <!-- column 1 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center pb-md-0 pb-6">
              <VCol
                cols="12"
                md="4"
                class="pb-0 pb-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  Address
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <VTextField
                  hint="Please enter your address"
                  persistent-hint
                  variant="outlined"
                  persistent-placeholder
                  placeholder="Enter your address"
                  density="comfortable"
                  color="primary"
                />
              </VCol>
            </VRow>
          </VCol>
          <!-- column 2 -->
          <VCol
            cols="12"
            lg="4"
            md="6"
          >
            <VRow class="d-flex align-center">
              <VCol
                cols="12"
                md="4"
                class="py-0 py-md-3"
              >
                <VLabel class="d-flex justify-start justify-md-end mb-0 mb-md-5">
                  User Type
                </VLabel>
              </VCol>
              <VCol
                cols="12"
                md="8"
              >
                <div>
                  <VCheckbox
                    v-model="checkbox6"
                    density="compact"
                    hide-details
                    color="primary"
                    label="Administrator"
                    class="flex-grow-0"
                  />
                  <VCheckbox
                    v-model="checkbox7"
                    density="compact"
                    hide-details
                    color="primary"
                    label="Author"
                    class="flex-grow-0"
                  />
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
