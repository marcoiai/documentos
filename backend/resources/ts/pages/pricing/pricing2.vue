<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const page = ref({ title: 'Price 2' })

const breadcrumbs = ref([
  {
    title: 'Pages',
    disabled: false,
    href: '#',
  },
  {
    title: 'Price 2',
    disabled: true,
    href: '#',
  },
])

const plans = shallowRef([
  {
    active: false,
    value: 'price1',
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
    value: 'price2',
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
    value: 'price3',
    title: 'Premium',
    description: '08 Services',
    price: {
      monthly: 599,
      yearly: 7089,
    },
    permission: [0, 1, 2, 3, 4, 5, 6, 7],
  },
])

const pricingdata = ref([
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

const pricing = ref('price1')
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
      cols="12"
      xl="8"
      lg="7"
      md="6"
    >
      <VCard
        variant="outlined"
        class="bg-surface"
      >
        <VCardText>
          <VList
            v-if="pricing === 'price3'"
            class="PricingList"
            aria-label="price list"
            aria-busy="true"
          >
            <VListItem
              v-for="(plan, index) in pricingdata"
              :key="index"
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              {{ plan }}
            </VListItem>
          </VList>
          <VList
            v-if="pricing === 'price2'"
            class="PricingList"
            aria-label="price list"
            aria-busy="true"
          >
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              One End Product
            </VListItem>
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              No attribution required
            </VListItem>
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              TypeScript
            </VListItem>
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Figma Design Resources
            </VListItem>
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Create Multiple Products
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Create a SaaS Project
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Resale Product
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Separate sale of our UI Elements?
            </VListItem>
          </VList>
          <VList
            v-if="pricing === 'price1'"
            class="PricingList"
            aria-label="price list"
            aria-busy="true"
          >
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              One End Product
            </VListItem>
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              No attribution required
            </VListItem>
            <VListItem
              class="ps-0"
              density="compact"
              border
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              TypeScript
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Figma Design Resources
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Create Multiple Products
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Create a SaaS Project
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Resale Product
            </VListItem>
            <VListItem
              class="ps-0 text-disabled"
              density="compact"
              border
              disabled
            >
              <SvgSprite
                name="custom-square-check-outline"
                class="text-success me-2"
                style="width: 16px; height: 16px"
              />
              Separate sale of our UI Elements?
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      xl="4"
      lg="5"
      md="6"
    >
      <VCard
        variant="outlined"
        class="bg-surface"
      >
        <VCardText>
          <VRadioGroup
            v-model="pricing"
            hide-details
          >
            <VRow>
              <VCol
                v-for="(plan, index) in plans"
                :key="index"
                cols="12"
                sm="12"
              >
                <div class="py-5 px-4 border payment-method price-radio-btns rounded-md">
                  <VRadio
                    :value="plan.value"
                    color="primary"
                    class="label-op-1"
                  >
                    <template #label>
                      <div class="d-flex align-center w-100">
                        <div class="flex-1-1">
                          <div class="d-flex justify-space-between flex-wrap">
                            <h5 class="text-h5 mb-0">
                              {{ plan.title }}
                              <VChip
                                v-if="plan.active"
                                variant="flat"
                                size="small"
                                class="ms-3"
                                color="success"
                                rounded="lg"
                              >
                                Popular
                              </VChip>
                            </h5>
                            <div>
                              <h4
                                v-if="switch1 === true"
                                class="text-h4 font-weight-bold mb-0"
                              >
                                <span>$</span>{{ plan.price.monthly }}<span class="text-h6 text-lightText"> /Lifetime</span>
                              </h4>
                              <h4
                                v-if="switch1 === false"
                                class="text-h4 font-weight-bold mb-0"
                              >
                                <span>$</span>{{ plan.price.yearly }}<span class="text-h6 text-lightText"> /Lifetime</span>
                              </h4>
                            </div>
                          </div>
                          <span class="d-block text-h6 text-lightText">{{ plan.description }}</span>
                        </div>
                      </div>
                    </template>
                  </VRadio>
                </div>
              </VCol>
            </VRow>
          </VRadioGroup>
        </VCardText>
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
