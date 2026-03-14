<script setup lang="ts">
import { ref } from 'vue'

// theme breadcrumb
const page = ref({ title: 'Layouts' })

const breadcrumbs = ref([
  {
    title: 'Forms',
    disabled: false,
    href: '#',
  },
  {
    title: 'Layouts',
    disabled: true,
    href: '#',
  },
])

const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(true)
const checkbox5 = ref(false)
const checkbox6 = ref(false)
const checkbox7 = ref(true)
const checkbox8 = ref(false)
const checkbox9 = ref(false)
const checkbox10 = ref(true)
const checkbox11 = ref(false)
const checkbox12 = ref(false)
</script>

// ===============================|| Ui Layouts ||=============================== //
<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol
      cols="12"
      lg="6"
    >
      <UiParentCard title="Simple Form Layout">
        <VLabel class="mb-1">
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
        <VLabel class="mb-1 mt-5">
          Email
        </VLabel>
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
        <VLabel class="mb-1 mt-5">
          Password
        </VLabel>
        <VTextField
          persistent-hint
          variant="outlined"
          hide-details
          type="password"
          persistent-placeholder
          placeholder="Enter password"
          density="comfortable"
          color="primary"
        />
        <VLabel class="mb-1 mt-5">
          Language
        </VLabel>
        <div>
          <VCheckbox
            v-model="checkbox1"
            density="compact"
            hide-details
            color="primary"
            label="English"
          />
          <VCheckbox
            v-model="checkbox2"
            density="compact"
            hide-details
            color="primary"
            label="French"
          />
          <VCheckbox
            v-model="checkbox3"
            density="compact"
            hide-details
            color="primary"
            label="Dutch"
          />
        </div>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      lg="6"
    >
      <UiParentCard title="Horizontal Form Layout">
        <h5 class="mb-8 text-h5">
          A. Personal Info:
        </h5>
        <VRow class="align-center">
          <VCol
            cols="12"
            lg="4"
            sm="3"
            class="py-sm-0 pt-0 pb-0"
          >
            <VLabel class="mb-0 mb-sm-5">
              Name
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            lg="8"
            sm="9"
            class="py-sm-3 pt-1"
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
        <VRow class="align-center mt-2">
          <VCol
            cols="12"
            lg="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="mb-0 mb-sm-5">
              Email
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            lg="8"
            sm="9"
            class="py-sm-3 pt-1"
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
        <h5 class="mt-7 mb-8 text-h5">
          B. Educational Info:
        </h5>
        <VRow class="align-center">
          <VCol
            cols="12"
            lg="4"
            sm="3"
            class="py-sm-0 pt-0 pb-0"
          >
            <VLabel class="mb-0 mb-sm-5">
              Degree Name
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            lg="8"
            sm="9"
            class="py-sm-3 pt-1"
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
        <VRow class="align-center mt-2">
          <VCol
            cols="12"
            lg="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="mb-0 mb-sm-5">
              Passing Year
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            lg="8"
            sm="9"
            class="py-sm-3 pt-1"
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

        <VRow class="mt-2">
          <VCol
            cols="12"
            lg="4"
            sm="3"
            class="py-sm-5 pt-5 pb-0"
          >
            <VLabel>Language</VLabel>
          </VCol>
          <VCol
            cols="12"
            lg="8"
            sm="9"
            class="py-sm-3 pt-1"
          >
            <div class="d-flex ga-4">
              <VCheckbox
                v-model="checkbox4"
                density="compact"
                hide-details
                color="primary"
                label="English"
                class="flex-grow-0"
              />
              <VCheckbox
                v-model="checkbox5"
                density="compact"
                hide-details
                color="primary"
                label="French"
                class="flex-grow-0"
              />
              <VCheckbox
                v-model="checkbox6"
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
    <VCol
      cols="12"
      lg="6"
    >
      <UiParentCard title="Control Divider">
        <VLabel class="mb-1">
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
        <VDivider class="my-4" />
        <VLabel class="mb-1">
          Email
        </VLabel>
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
        <VDivider class="my-4" />
        <VLabel class="mb-1">
          Password
        </VLabel>
        <VTextField
          persistent-hint
          variant="outlined"
          hide-details
          type="password"
          persistent-placeholder
          placeholder="Enter password"
          density="comfortable"
          color="primary"
        />
        <VDivider class="my-4" />
        <VLabel class="mb-2">
          Language
        </VLabel>
        <div>
          <VCheckbox
            v-model="checkbox7"
            density="compact"
            hide-details
            color="primary"
            label="English"
          />
          <VCheckbox
            v-model="checkbox8"
            density="compact"
            hide-details
            color="primary"
            label="French"
          />
          <div class="d-flex">
            <VCheckbox
              v-model="checkbox9"
              density="compact"
              hide-details
              color="primary"
              label="Dutch"
            />
          </div>
        </div>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      lg="6"
    >
      <UiParentCard title="Input Label Alignment">
        <h5 class="mb-6 text-h5">
          A. Personal Info:
        </h5>
        <VRow class="d-flex align-center">
          <VCol
            cols="12"
            md="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
              Name
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="7"
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
        <VRow class="d-flex align-center mt-2">
          <VCol
            cols="12"
            md="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
              Email
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="7"
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
        <VDivider class="mt-6" />
        <h4 class="mt-6 mb-6 text-h5">
          B. Educational Info:
        </h4>
        <VRow class="d-flex align-center">
          <VCol
            cols="12"
            md="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
              Degree Name
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="7"
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
        <VRow class="d-flex align-center mt-2">
          <VCol
            cols="12"
            md="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="d-flex justify-start justify-sm-end mb-0 mb-sm-5">
              Passing Year
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="7"
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

        <VRow class="d-flex align-center">
          <VCol
            cols="12"
            md="4"
            sm="3"
            class="py-sm-0 pt-5 pb-0"
          >
            <VLabel class="d-flex justify-start justify-sm-end">
              Language
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            md="8"
            sm="9"
          >
            <div class="d-flex ga-4">
              <VCheckbox
                v-model="checkbox10"
                density="compact"
                hide-details
                color="primary"
                label="English"
                class="flex-grow-0"
              />
              <VCheckbox
                v-model="checkbox11"
                density="compact"
                hide-details
                color="primary"
                label="French"
                class="flex-grow-0"
              />
              <VCheckbox
                v-model="checkbox12"
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
  </VRow>
</template>
