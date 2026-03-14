<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const page = ref({ title: 'Price 1' })

const breadcrumbs = ref([
  {
    title: 'Pages',
    disabled: false,
    href: '#',
  },
  {
    title: 'Price 1',
    disabled: true,
    href: '#',
  },
])

const plans = shallowRef([
  {
    active: false,
    title: 'Basic',
    description: '03 Services',
    price: {
      monthly: 69,
      yearly: 729,
    },
    permission: [0, 1, 2],
  },
  {
    active: true,
    title: 'Standard',
    description: '05 Services',
    price: {
      monthly: 129,
      yearly: 1449,
    },
    permission: [0, 1, 2, 3, 4],
  },
  {
    active: false,
    title: 'Premium',
    description: '08 Services',
    price: {
      monthly: 599,
      yearly: 7089,
    },
    permission: [0, 1, 2, 3, 4, 5, 6, 7],
  },
])

const planList = ref([
  'One End Product', // 0
  'No attribution required', // 1
  'TypeScript', // 2
  'Figma Design Resources', // 3
  'Create Multiple Products', // 4
  'Create a SaaS Project', // 5
  'Resale Product', // 6
  'Separate sale of our UI Elements?', // 7
])

const switch1 = ref(true)
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow class="align-center">
    <VCol cols="12">
      <VRow>
        <VCol
          cols="12"
          md="8"
          sm="12"
        >
          <h5 class="text-h5 mb-0">
            Quality is never an accident. It is always the result of intelligent effort
          </h5>
          <p class="mb-0 text-h6 text-lightText">
            It makes no difference what the price is, it all makes senses to us.
          </p>
        </VCol>
        <VCol
          cols="12"
          md="4"
          sm="12"
        >
          <div class="d-flex align-center price-switch justify-md-end">
            <h6 class="text-subtitle-1 text-lightText mb-0 me-2">
              Billed Yearly
            </h6>
            <VSwitch
              v-model="switch1"
              color="primary"
              aria-label="switch"
              hide-details
            />
            <h6 class="text-subtitle-1 text-lightText mb-0 ms-2">
              Billed Monthly
            </h6>
          </div>
        </VCol>
      </VRow>
    </VCol>
    <VCol
      v-for="(plan, index) in plans"
      :key="index"
      cols="12"
      md="4"
      sm="6"
    >
      <VCard elevation="0">
        <VCard
          variant="outlined"
          class="text-center"
        >
          <VCardText :class="plan.active ? 'pt-6' : 'pt-12'">
            <div
              class="pa-6 rounded-md"
              :class="plan.active ? 'bg-lightprimary' : 'bg-transparent'"
            >
              <VChip
                v-if="plan.active"
                variant="flat"
                size="small"
                class="mb-6"
                color="success"
                rounded="md"
              >
                Popular
              </VChip>
              <h1 class="mb-0 text-h4">
                {{ plan.title }}
              </h1>
              <p class="pb-5 text-h6 mb-0">
                {{ plan.description }}
              </p>
              <h2
                v-if="switch1 === true"
                class="text-h2 font-weight-bold mb-0"
                style="font-size: 40px !important"
              >
                <span>$</span>{{ plan.price.monthly }}
              </h2>
              <h2
                v-if="switch1 === false"
                class="text-h2 font-weight-bold mb-0"
                style="font-size: 40px !important"
              >
                <span>$</span>{{ plan.price.yearly }}
              </h2>
              <span class="text-h6 text-lightText">Lifetime</span>
              <VBtn
                :variant="plan.active ? 'flat' : 'outlined'"
                :color="plan.active ? 'primary' : 'secondary'"
                class="mt-6 mb-3"
                rounded="md"
                block
              >
                Order Now
              </VBtn>
            </div>
            <VList
              class="PricingList"
              :class="plan.active ? 'mt-5' : ''"
              aria-label="price list"
              aria-busy="true"
            >
              <VListItem
                v-for="(list, index1) in planList"
                :key="index1"
                class="pl-0"
                :disabled="!plan.permission.includes(index1)"
                density="compact"
                :class="!plan.permission.includes(index1) ? 'text-disabled' : ''"
              >
                {{ list }}
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.price-switch {
  .v-input {
    flex: unset;
  }
}
.text-disabled {
  text-decoration: line-through;
}
</style>
