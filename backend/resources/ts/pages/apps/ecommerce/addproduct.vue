<script setup lang="ts">
import { ref } from 'vue'

const page = ref({ title: 'Add New product' })

const breadcrumbs = ref([
  {
    title: 'Ecommerce',
    disabled: false,
    href: '#',
  },
  {
    title: 'Add New product',
    disabled: true,
    href: '#',
  },
])

const items = ref(['100', '200', '300', '400'])
const items1 = ref(['1', '2', '3'])
const items2 = ref(['In stock', 'Out of stock'])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol>
      <VCard
        variant="outlined"
        class="bg-surface"
        rounded="lg"
      >
        <VCardText>
          <VRow>
            <VCol
              md="6"
              cols="12"
            >
              <VCard
                variant="outlined"
                rounded="lg"
              >
                <VCardText>
                  <div>
                    <VLabel class="mb-2">
                      Product Name
                    </VLabel>
                    <VTextField
                      single-line
                      density="comfortable"
                      variant="outlined"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <VLabel class="mb-2">
                      Product Description
                    </VLabel>
                    <VTextarea
                      single-line
                      density="comfortable"
                      variant="outlined"
                      rows="3"
                      placeholder="Enter product description"
                    />
                  </div>
                  <div>
                    <VLabel class="mb-2">
                      Category
                    </VLabel>
                    <VTextField
                      single-line
                      density="comfortable"
                      variant="outlined"
                      rows="3"
                      placeholder="Enter your category"
                    />
                  </div>
                  <div>
                    <VLabel class="mb-2">
                      Price
                    </VLabel>
                    <VAutocomplete
                      model-value="200"
                      :items="items"
                      aria-label="autocomplete"
                      color="primary"
                      variant="outlined"
                      hide-details
                      density="comfortable"
                    >
                      <template #prepend-inner>
                        $
                      </template>
                    </VAutocomplete>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            <VCol
              md="6"
              cols="12"
            >
              <VCard
                variant="outlined"
                rounded="lg"
              >
                <VCardText>
                  <div class="mb-5">
                    <VLabel class="mb-2">
                      Qty
                    </VLabel>
                    <VAutocomplete
                      model-value="1"
                      aria-label="autocomplete"
                      :items="items1"
                      color="primary"
                      variant="outlined"
                      hide-details
                      density="comfortable"
                    />
                  </div>
                  <div class="mb-5">
                    <VLabel class="mb-2">
                      Status
                    </VLabel>
                    <VAutocomplete
                      aria-label="autocomplete"
                      model-value="In stock"
                      :items="items2"
                      color="primary"
                      variant="outlined"
                      hide-details
                      density="comfortable"
                    />
                  </div>
                  <p class="text-h6 text-lightText mb-2">
                    <span class="text-error">* </span>Recommended resolution is 640*640 with file size
                  </p>
                  <VBtn
                    variant="outlined"
                    color="secondary"
                    rounded="md"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-upload-outline-1"
                        style="width: 18px; height: 18px"
                      />
                    </template>
                    Click to upload
                  </VBtn>
                  <div class="d-flex justify-end ga-4 mt-16 pt-8">
                    <VBtn
                      variant="outlined"
                      color="secondary"
                      rounded="md"
                      to="/apps/ecommerce/productlist"
                    >
                      Cancel
                    </VBtn>
                    <VBtn
                      variant="flat"
                      color="primary"
                      rounded="md"
                    >
                      Add new product
                    </VBtn>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
