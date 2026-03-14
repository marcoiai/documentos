<script setup lang="ts">
import { ref } from 'vue'

// theme breadcrumb
const page = ref({ title: 'Create Invoice' })

const breadcrumbs = ref([
  {
    title: 'Customer',
    disabled: false,
    href: '#',
  },
  {
    title: 'Create Invoice',
    disabled: true,
    href: '#',
  },
])

const textinvoice = ref('')
const textcustomer = ref('')
const textcustomermail = ref('')
const textcustomerno = ref('')
const textcustomeradd = ref('')
const textdate = ref('23/09/2022')
const textterms = ref('I acknowledge terms and conditions.')

const status = ref(['Pending', 'Refund', 'Paid'])
const textstatus = ref<string>('Pending')

const invoices = ref([
  {
    name: 'Logo Design',
    quantity: 6,
    amount: 200,
  },
  {
    name: 'Landing Page',
    quantity: 7,
    amount: 100,
  },
  {
    name: 'Admin Template',
    quantity: 5,
    amount: 150,
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <UiParentCard title="Create Invoice">
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Invoice Number<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textinvoice"
              type="text"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="Invoice #"
            />
          </VCol>
        </VRow>
        <VDivider class="my-6" />
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Customer Name<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textcustomer"
              type="text"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="Alex Z."
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Customer Email<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textcustomermail"
              type="email"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="alex@company.com"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Customer Contact Numer<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textcustomerno"
              type="text"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="+00 0000 0000"
            />
          </VCol>
          <VCol cols="12">
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Customer Address<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textcustomeradd"
              type="text"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="Enter Address"
            />
          </VCol>
        </VRow>
        <VDivider class="my-6" />
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Invoice Date<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textdate"
              type="text"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="Enter Address"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Status<span class="ml-1">*</span>
            </VLabel>
            <VSelect
              v-model="textstatus"
              color="primary"
              :items="status"
              density="comfortable"
              role="link"
              variant="outlined"
              hide-details
            />
          </VCol>
        </VRow>
        <VDivider class="mt-6" />

        <VTable
          class="text-no-wrap bordered-table"
          hover
        >
          <thead class="bg-containerBg">
            <tr>
              <th class="text-start text-uppercase text-caption font-weight-bold">
                Description
              </th>
              <th class="text-start text-uppercase text-caption font-weight-bold">
                Quantity
              </th>
              <th class="text-start text-uppercase text-caption font-weight-bold">
                Amount
              </th>
              <th class="text-start text-uppercase text-caption font-weight-bold">
                Total
              </th>
              <th class="text-start" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in invoices"
              :key="invoice.name"
            >
              <td class="py-3">
                <h5 class="text-subtitle-1">
                  {{ invoice.name }}
                </h5>
                <p class="mt-1">
                  lorem ipsum dolor sit amat, connecter adieu siccing eliot
                </p>
              </td>
              <td class="py-3">
                {{ invoice.quantity }}
              </td>
              <td class="py-3">
                ${{ invoice.amount }}
              </td>
              <td class="py-3">
                ${{ invoice.amount * invoice.quantity }}
              </td>
              <td class="py-3">
                <VBtn
                  color="error"
                  variant="text"
                  aria-label="trash"
                  icon
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-trash"
                    style="width: 18px; height: 18px"
                  />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
        <VDivider class="my-6" />
        <VBtn
          color="primary"
          variant="text"
        >
          + Add Item
        </VBtn>
        <VDivider class="my-6" />
        <VSheet
          class="bg-containerBg pa-6"
          rounded="lg"
        >
          <VRow class="justify-end">
            <VCol
              cols="6"
              sm="3"
              md="2"
              class="text-end"
            >
              <h5 class="py-2 text-subtitle-1">
                Sub Total :
              </h5>
              <h5 class="py-2 text-subtitle-1 text-no-wrap">
                Taxes (10%) :
              </h5>
              <h5 class="py-2 text-subtitle-1 text-no-wrap">
                Discount (5%) :
              </h5>
              <h5 class="py-2 text-subtitle-1 text-primary mt-7">
                Total
              </h5>
            </VCol>
            <VCol
              cols="6"
              sm="3"
              md="2"
              class="text-end"
            >
              <h5 class="py-2 text-subtitle-1 text-disabled">
                $2,650.00
              </h5>
              <h5 class="py-2 text-subtitle-1 text-disabled">
                $265.00
              </h5>
              <h5 class="py-2 text-subtitle-1 text-disabled">
                $145.75
              </h5>
              <h5 class="py-2 text-subtitle-1 text-primary mt-7">
                $2,769.25
              </h5>
            </VCol>
          </VRow>
        </VSheet>
        <VDivider class="my-6" />
        <VRow>
          <VCol cols="12">
            <VLabel class="text-subtitle-1 text-lightText mb-2">
              Terms and Condition:<span class="ml-1">*</span>
            </VLabel>
            <VTextField
              v-model="textterms"
              type="text"
              color="primary"
              hide-details
              variant="outlined"
              density="comfortable"
              persistent-placeholder
              placeholder="Alex Z."
            />
          </VCol>
        </VRow>
        <VDivider class="my-6" />
        <div class="text-right">
          <VBtn
            color="primary"
            rounded="md"
            variant="flat"
          >
            Add Invoice
          </VBtn>
        </div>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
