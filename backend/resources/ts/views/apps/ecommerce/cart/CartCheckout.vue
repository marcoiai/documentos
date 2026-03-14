<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEcomStore } from '@db/apps/ecommerce/index'
import StepFirst from '@/views/apps/ecommerce/cart/steps/StepFirst.vue'
import StepSecond from '@/views/apps/ecommerce/cart/steps/StepSecond.vue'
import Payment from '@/views/apps/ecommerce/cart/steps/PaymentCard.vue'
import CartEmpty from '@/views/apps/ecommerce/cart/CartEmpty.vue'
import OrderSummary from '@/views/apps/ecommerce/cart/steps/OrderSummary.vue'
import PromoCode from '@/views/apps/ecommerce/cart/steps/PromoCode.vue'
import OrderInformation from '@/views/apps/ecommerce/cart/steps/OrderInformation.vue'
import Thankyou from '@/views/apps/ecommerce/cart/steps/ThankYouDialog.vue'

const thankyou = ref(false)

const tab = ref('tab-1')
function changeTab(e: string) {
  tab.value = e
}

const store = useEcomStore()

const getCart = computed(() => {
  return store.cart
})
</script>

<template>
  <VRow>
    <VCol>
      <VCard
        class="bg-surface mb-4"
        variant="outlined"
        rounded="lg"
      >
        <VCardText class="pa-0">
          <VTabs
            v-model="tab"
            color="primary"
            class="custom-tab"
            hide-slider
          >
            <VTab
              value="tab-1"
              rounded="md"
              class="text-left py-4"
            >
              <VAvatar
                size="24"
                color="primary"
                variant="tonal"
                class="me-2"
              >
                1
              </VAvatar>
              Cart
            </VTab>

            <VTab
              value="tab-2"
              rounded="md"
              class="text-left py-4"
              :disabled="store.cart.length < 1"
            >
              <VAvatar
                size="24"
                color="primary"
                variant="tonal"
                class="me-2"
              >
                2
              </VAvatar>
              Shipping information
            </VTab>

            <VTab
              value="tab-3"
              rounded="md"
              class="text-left py-4"
              :disabled="store.cart.length < 1"
            >
              <VAvatar
                size="24"
                color="primary"
                variant="tonal"
                class="me-2"
              >
                3
              </VAvatar>
              Payment
            </VTab>
          </VTabs>
        </VCardText>
      </VCard>
      <VWindow v-model="tab" class="mx-n6 px-6">
        <VWindowItem value="tab-1">
          <VRow v-if="getCart.length > 0">
            <VCol
              md="8"
              cols="12"
            >
              <StepFirst />
            </VCol>
            <VCol
              md="4"
              cols="12"
            >
              <PromoCode />
              <OrderSummary />
              <VBtn
                v-if="store.cart.length >= 1"
                color="primary"
                class="mt-4"
                rounded="md"
                variant="flat"
                block
                @click="changeTab('tab-2')"
              >
                Process to checkout
              </VBtn>
            </VCol>
          </VRow>
          <div
            v-else
            class="d-flex justify-center w-100"
          >
            <CartEmpty />
          </div>
        </VWindowItem>
        <VWindowItem
          value="tab-2"
          class="pa-1"
        >
          <VRow>
            <VCol
              md="8"
              cols="12"
            >
              <StepSecond />
              <VRow class="mt-3">
                <VCol
                  cols="12"
                  class="text-right"
                >
                  <VBtn
                    color="secondary"
                    variant="text"
                    @click="changeTab('tab-1')"
                  >
                    <SvgSprite
                      name="custom-chevron-outline"
                      class="text-lightText mr-1"
                      style="width: 18px; height: 18px; transform: rotate(180deg)"
                    />
                    Back to cart
                  </VBtn>
                </VCol>
              </VRow>
            </VCol>
            <VCol
              md="4"
              cols="12"
            >
              <PromoCode />
              <OrderInformation />
              <VBtn
                class="mt-6"
                rounded="md"
                block
                variant="flat"
                color="primary"
                @click="changeTab('tab-3')"
              >
                Process to Checkout
              </VBtn>
            </VCol>
          </VRow>
        </VWindowItem>
        <VWindowItem
          value="tab-3"
          class="pa-1"
        >
          <VRow>
            <VCol
              lg="9"
              cols="12"
              md="8"
            >
              <Payment />
              <VRow class="mt-3">
                <VCol
                  cols="12"
                  class="text-right"
                >
                  <VBtn
                    color="secondary"
                    rounded="md"
                    variant="text"
                    @click="changeTab('tab-2')"
                  >
                    <SvgSprite
                      name="custom-chevron-outline"
                      class="text-lightText mr-1"
                      style="width: 18px; height: 18px; transform: rotate(180deg)"
                    />
                    Back to shipping information
                  </VBtn>
                </VCol>
              </VRow>
            </VCol>
            <VCol
              lg="3"
              cols="12"
              md="4"
            >
              <PromoCode />
              <OrderInformation />
              <VBtn
                block
                variant="flat"
                rounded="md"
                color="primary"
                class="mt-4"
                @click="thankyou = true"
              >
                Process to checkout
              </VBtn>
              <!-- Modal -->
              <VDialog
                v-model="thankyou"
                fullscreen
              >
                <Thankyou />
              </VDialog>
            </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.custom-tab.v-tabs {
  --v-tabs-height: unset;
  .v-tab--selected {
    .v-tab__slider {
      opacity: 0;
    }
  }
}
</style>
