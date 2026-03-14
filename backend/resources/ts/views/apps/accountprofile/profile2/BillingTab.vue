<script setup lang="ts">
import { ref } from 'vue'

const textblock = ref('16657')
const textaname = ref(' Dardan Ranch')
const textstreet1 = ref('Nathaniel Ports')
const textstreet2 = ref('nr. Oran Walks')
const textpostcode = ref('395005')

const city = ref(['Los Angeles', 'Chicago', 'Phoenix', 'San Antonoi'])
const country = ref(['India', 'France', 'USA', 'UAE'])

const textcity = ref<string>('Los Angeles')
const textcountry = ref<string>('Los Angeles')

const checkbox = ref(true)
</script>

<template>
  <div>
    <VRow class="mt-1">
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Block No#
        </VLabel>
        <VTextField
          v-model="textblock"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Block No#"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Apartment Name
        </VLabel>
        <VTextField
          v-model="textaname"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Apartment Name"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Street Line 1
        </VLabel>
        <VTextField
          v-model="textstreet1"
          type="email"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Street Line 1"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Street Line 2
        </VLabel>
        <VTextField
          v-model="textstreet2"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Street Line 2"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VLabel class="mb-2">
          Post code
        </VLabel>
        <VTextField
          v-model="textpostcode"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Postcode"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VLabel class="mb-2">
          City
        </VLabel>
        <VSelect
          v-model="textcity"
          color="primary"
          :items="city"
          role="link"
          single-line
          density="comfortable"
          placeholder="Select city"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VLabel class="mb-2">
          Country
        </VLabel>
        <VSelect
          v-model="textcountry"
          color="primary"
          :items="country"
          role="link"
          single-line
          density="comfortable"
          placeholder="Select Country"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          color="primary"
          density="compact"
          label="Same as billing address"
        />
      </VCol>
    </VRow>
  </div>
</template>
