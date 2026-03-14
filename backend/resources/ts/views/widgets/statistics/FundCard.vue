<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { xlAndUp } = useDisplay()

const items = ref(['Today', 'Weekly', 'Monthly'])

const menulist = ref(['Active', 'Disable', 'Remove'])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText>
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          Add Fund
        </h5>
        <VMenu width="150">
          <template #activator="{ props }">
            <VBtn
              icon
              color="secondary"
              aria-label="menu"
              variant="text"
              rounded="md"
              v-bind="props"
            >
              <SvgSprite
                name="custom-more-outline"
                style="width: 20px; height: 20px; transform: rotate(90deg)"
              />
            </VBtn>
          </template>
          <VList
            elevation="24"
            class="pa-3"
            aria-busy="true"
            aria-label="user content"
            rounded="md"
          >
            <VListItem
              v-for="(item, index) in items"
              :key="index"
              density="compact"
              rounded="md"
              color="secondary"
              :value="index"
            >
              <VListItemTitle class="text-h6 text-lightText">
                {{ item }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </VCardText>
    <VCardItem class="pt-0 px-0">
      <div class="px-6">
        <div class="text-center">
        <p class="text-h6 mb-0">
          Amount
        </p>
        <h3 class="text-h3">
          $100
        </h3>
        <ul
          class="d-flex align-center justify-center ga-2 flex-wrap my-4"
          style="list-style-type: none"
        >
          <li>
            <VChip
              color="primary"
              value="tonal"
              rounded="md"
              size="small"
            >
              $100
            </VChip>
          </li>
          <li>
            <VChip
              color="secondary200"
              variant="outlined"
              rounded="md"
              size="small"
            >
              <span class="text-darkText">$150</span>
            </VChip>
          </li>
          <li>
            <VChip
              color="secondary200"
              variant="outlined"
              rounded="md"
              size="small"
            >
              <span class="text-darkText">$200</span>
            </VChip>
          </li>
          <li>
            <VChip
              color="secondary200"
              variant="outlined"
              rounded="md"
              size="small"
            >
              <span class="text-darkText">$250</span>
            </VChip>
          </li>
        </ul>
      </div>
      <VCard
        variant="outlined"
        rounded="lg"
      >
        <VList
          rounded="lg"
          aria-busy="true"
          aria-label="user content"
        >
          <VListItem>
            <template #prepend>
              <VAvatar
                :size="xlAndUp ? ' 52' : '40'"
                variant="outlined"
                color="surface"
              >
                <img
                  src="@images/users/avatar-6.png"
                  :width="xlAndUp ? ' 52' : '40'"
                  alt="vector"
                >
              </VAvatar>
            </template>
            <h6 class="text-subtitle-1 mb-0">
              Able pro
            </h6>
            <span class="text-caption">@ableprodevelop</span>
            <template #append>
              <VMenu width="150">
                <template #activator="{ props }">
                  <VBtn
                    icon
                    color="secondary"
                    aria-label="menu"
                    variant="text"
                    rounded="md"
                    size="small"
                    v-bind="props"
                  >
                    <SvgSprite
                      name="custom-chevron-up"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                </template>
                <VList
                  elevation="24"
                  class="pa-3"
                  rounded="md"
                  aria-label="menu"
                  aria-busy="true"
                >
                  <VListItem
                    v-for="(item, index) in menulist"
                    :key="index"
                    density="compact"
                    rounded="md"
                    color="secondary"
                    :value="index"
                  >
                    <VListItemTitle class="text-h6 text-lightText">
                      {{ item }}
                    </VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </template>
          </VListItem>
        </VList>
      </VCard>
      <VBtn
        color="primary"
        class="mt-4"
        rounded="md"
        block
        variant="flat"
      >
        Confirm
      </VBtn>
        </div>
    </VCardItem>
  </VCard>
</template>
