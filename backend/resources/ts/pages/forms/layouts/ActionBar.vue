<script setup lang="ts">
import { ref } from 'vue'

// theme breadcrumb
const page = ref({ title: 'Action Bar' })

const breadcrumbs = ref([
  {
    title: 'Layouts',
    disabled: false,
    href: '#',
  },
  {
    title: 'Action Bar',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <!-- ----------------------------------------------------- -->
  <!-- Action Bar -->
  <!-- ----------------------------------------------------- -->
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <!-- Right align Action Bar -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeaderFooter title="Simple Action Bar">
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

        <template #footer>
          <div class="d-flex justify-end ga-2 w-100">
            <VBtn
              color="error"
              variant="text"
              rounded="md"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              variant="flat"
              rounded="md"
            >
              Submit
            </VBtn>
          </div>
        </template>
      </CardHeaderFooter>
    </VCol>
    <!-- Left Align Action Bar -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeaderFooter title="Left Align Action Bar">
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

        <template #footer>
          <div class="d-flex ga-2 w-100">
            <VBtn
              color="error"
              variant="text"
              rounded="md"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              variant="flat"
              rounded="md"
            >
              Submit
            </VBtn>
          </div>
        </template>
      </CardHeaderFooter>
    </VCol>
    <!-- Action Button with Link -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeaderFooter title="Action Button with Link">
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

        <template #footer>
          <div class="text-end w-100">
            <VBtn
              color="error"
              variant="text"
              class="me-3"
              rounded="md"
            >
              Cancel
            </VBtn>
            <span class="text-caption">or</span>
            <VBtn
              color="primary"
              variant="flat"
              class="ms-4"
              rounded="md"
            >
              Submit
            </VBtn>
          </div>
        </template>
      </CardHeaderFooter>
    </VCol>
    <!-- Horizontal Form -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeaderFooter title="Horizontal Form">
        <VRow>
          <VCol
            cols="12"
            sm="4"
            class="text-sm-right pb-sm-3 pb-0"
          >
            <VLabel class="mb-sm-2 mt-sm-3">
              Name
            </VLabel>
          </VCol>
          <VCol
            cols="12"
            sm="8"
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

        <template #footer>
          <div class="d-flex ga-2 justify-center w-100">
            <VBtn
              color="error"
              variant="text"
              rounded="md"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              variant="flat"
              rounded="md"
            >
              Submit
            </VBtn>
          </div>
        </template>
      </CardHeaderFooter>
    </VCol>
    <!-- With side action button -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeaderFooter title="With side action button">
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

        <template #footer>
          <div class="d-flex align-center justify-space-between w-100">
            <VBtn
              color="error"
              aria-label="delete"
              variant="text"
              icon
              rounded="md"
            >
              <SvgSprite
                name="custom-trash-fill"
                style="width: 20px; height: 20px"
              />
            </VBtn>
            <div class="d-flex ga-2">
              <VBtn
                color="error"
                variant="text"
                rounded="md"
              >
                Cancel
              </VBtn>
              <VBtn
                color="primary"
                variant="flat"
                rounded="md"
              >
                Submit
              </VBtn>
            </div>
          </div>
        </template>
      </CardHeaderFooter>
    </VCol>
    <!-- Top & BOttom Action Bars -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeaderFooter title="Top & Bottom Actions Bars">
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

        <template #footer>
          <VBtn
            color="error"
            variant="text"
            rounded="md"
          >
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            variant="flat"
            rounded="md"
          >
            Submit
          </VBtn>
        </template>
      </CardHeaderFooter>
    </VCol>
  </VRow>
</template>
