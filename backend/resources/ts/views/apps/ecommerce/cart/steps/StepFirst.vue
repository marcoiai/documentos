<script setup lang="ts">
import { computed } from 'vue'

import { useEcomStore } from '@db/apps/ecommerce/index'

const store = useEcomStore()
const cart = computed(() => store.cart)
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard
          variant="outlined"
          class="bg-surface overflow-hidden"
          rounded="lg"
        >
          <VCardItem class="pa-0">
            <div>
              <h5 class="text-h5 ma-4">
                Cart
                <VChip
                  color="secondary"
                  class="ms-1"
                  size="small"
                >
                  {{ cart.length }}
                </VChip>
              </h5>
              <VDivider />
              <VTable
                density="compact"
                hover
                class="bordered-table"
              >
                <tbody>
                  <tr
                    v-for="item in cart"
                    :key="item.name"
                  >
                    <td>
                      <div class="d-flex align-center my-3 ga-2">
                        <img
                          alt="product"
                          class="rounded-md custom-img-box"
                          :src="item.image"
                        >
                        <div class="ma-2">
                          <h6 class="text-subtitle-1 mb-0">
                            {{ item.name }}
                          </h6>
                          <small class="text-h6 text-lightText">Yellow</small>
                        </div>
                      </div>
                    </td>
                    <td class="text-h5">
                      ${{ item.salePrice * item.qty }}
                    </td>
                    <td>
                      <VBtnToggle
                        variant="outlined"
                        divided
                        color="primary"
                      >
                        <VBtn
                          size="small"
                          color="primary"
                          aria-label="remove"
                          style="min-width: unset"
                          variant="text"
                          :disabled="item.qty < 2"
                          @click="store.decrementQty(item.id)"
                        >
                          <SvgSprite
                            name="custom-line"
                            :class="item.qty < 2 ? '' : 'text-primary'"
                            style="width: 18px; height: 18px"
                          />
                        </VBtn>

                        <VBtn
                          size="small"
                          variant="outlined"
                          color="secondary"
                        >
                          {{ item.qty }}
                        </VBtn>

                        <VBtn
                          size="small"
                          aria-label="add"
                          color="primary"
                          style="min-width: unset"
                          variant="text"
                          @click="store.incrementQty(item, cart)"
                        >
                          <SvgSprite
                            name="custom-plus"
                            class="text-primary"
                            style="width: 18px; height: 18px"
                          />
                        </VBtn>
                      </VBtnToggle>
                    </td>
                    <td class="text-end">
                      <VBtn
                        small
                        icon
                        flat
                        aria-label="delete"
                        color="error"
                        variant="text"
                        rounded="md"
                      >
                        <SvgSprite
                          name="custom-trash-fill"
                          style="width: 18px; height: 18px"
                          @click="store.deleteCart(item.id)"
                        />
                      </VBtn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </div>
          </VCardItem>
        </VCard>
        <div class="text-end mt-3">
          <VBtn
            variant="text"
            rounded="md"
            to="/apps/ecommerce/products"
          >
            <SvgSprite
              name="custom-chevron-outline"
              class="text-lightText mr-1"
              style="width: 18px; height: 18px; transform: rotate(180deg)"
            />
            Back to shopping
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style>
.custom-img-box {
  width: 50px;
  height: 50px;
  background: rgb(var(--v-theme-containerBg));
  border: 1px solid rgb(var(--v-theme-borderLight));
}
</style>
