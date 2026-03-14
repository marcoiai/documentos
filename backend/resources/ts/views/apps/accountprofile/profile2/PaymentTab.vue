<script setup lang="ts">
import { ref } from 'vue'

const textcardname = ref('Selena Litten')
const textcardnumber = ref('4012 8888 8888 1881')
const textdate = ref('10/22')
const textcode = ref('123')
const textmail = ref('demo@company.paypal.com')

const paymentChoose = ref('visa')
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VRadioGroup
          v-model="paymentChoose"
          inline
        >
          <VRadio
            color="primary"
            label="Visa Credit/Debit Card"
            value="visa"
          />
          <VRadio
            color="primary"
            label="Paypal"
            value="paypal"
          />
        </VRadioGroup>
      </VCol>
    </VRow>
    <VRow v-if="paymentChoose === 'visa'">
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Card name
        </VLabel>
        <VTextField
          v-model="textcardname"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Name on Card"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Card number
        </VLabel>
        <VTextField
          v-model="textcardnumber"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Card Number"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          Expiry Date
        </VLabel>
        <VTextField
          v-model="textdate"
          type="text"
          color="primary"
          single-line
          density="comfortable"
          placeholder="Enter Expiry Date"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VLabel class="mb-2">
          CCV Code
        </VLabel>
        <VTextField
          v-model="textcode"
          type="text"
          color="primary"
          density="comfortable"
          single-line
          placeholder="Enter Code"
          variant="outlined"
          hide-details
        />
      </VCol>
      <VCol cols="12">
        <div class="d-flex align-center ga-4">
          <SvgSprite
            name="custom-lock-outline"
            class="text-primary"
            style="width: 40px; height: 40px"
          />
          <div class="mt-1">
            <h5 class="text-subtitle-1 mb-0">
              Secure Checkout
            </h5>
            <span class="text-subtitle-2 text-disabled font-weight-medium">Secure by Google.</span>
          </div>
        </div>
        <VBtn
          color="primary"
          variant="outlined"
          size="large"
          rounded="md"
          class="mt-6 text-subtitle-1"
        >
          <template #prepend>
            <SvgSprite
              name="custom-credit-outline"
              class="text-primary"
              style="width: 16px; height: 16px"
            />
          </template>
          Add New Card
        </VBtn>
      </VCol>
    </VRow>
    <div v-else>
      <VRow>
        <VCol cols="12">
          <VLabel class="mb-2">
            PayPal mail
          </VLabel>
          <VTextField
            v-model="textmail"
            variant="outlined"
            single-line
            density="comfortable"
            color="primary"
            placeholder="Enter Mail"
            hide-details
          />
        </VCol>
      </VRow>
    </div>
  </div>
</template>
