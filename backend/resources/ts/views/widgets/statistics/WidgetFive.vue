<script setup lang="ts">
import { shallowRef } from 'vue'

const fivecards = shallowRef([
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: 'custom-rise-outline',
    text: '35,000',
  },
  {
    name: 'Total Users',
    earn: '78,250',
    percent: '70.5%',
    color: 'success',
    icon: 'custom-rise-outline',
    text: '8,900',
  },
  {
    name: 'Total Order',
    earn: '18,800',
    percent: '27.4%',
    color: 'warning',
    icon: 'custom-fall-outline',
    text: '1,943',
  },
  {
    name: 'Total Sales',
    earn: '$35,078',
    percent: '27.4%',
    color: 'error',
    icon: 'custom-fall-outline',
    text: '$20,395',
  },
])
</script>

<template>
  <VRow class="my-0">
    <VCol
      v-for="(card5, i) in fivecards"
      :key="i"
      cols="12"
      sm="6"
      md="3"
      :value="card5"
    >
      <VCard
        elevation="0"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <VCardText>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1">
                  {{ card5.name }}
                </h6>
                <h4 class="text-h4 d-flex align-center flex-wrap ga-1 mb-0">
                  {{ card5.earn }}
                  <VChip
                    :color="card5.color"
                    rounded="md"
                    class="ml-2"
                    :border="`${card5.color} solid thin opacity-50`"
                    size="small"
                  >
                    <template #prepend>
                      <SvgSprite
                        :name="card5.icon || ''"
                        style="width: 16px; height: 16px; transform: rotate(45deg)"
                        :class="`mr-1 text-${card5.color}`"
                      />
                    </template>
                    {{ card5.percent }}
                  </VChip>
                </h4>
                <span class="text-lightText text-caption pt-5 d-block">You made an extra <span :class="`text-${card5.color}`">{{ card5.text }}</span> this year</span>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
