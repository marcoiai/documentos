<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import ColorsOptions from './colorsOption'
import { useEcomStore } from '@db/apps/ecommerce/index'

const range = shallowRef([0, 300])

const store = useEcomStore()

const selectedGender = ref('')

store.SelectGender(selectedGender)

const selectedCategory = ref('all')

store.SelectCategory(selectedCategory)

const selectRating = ref(0)
const setColor = ref(1)

function selectColor(e: number) {
  setColor.value = e
}
</script>

<template>
  <VList
    lines="one"
    aria-label="gender list"
    aria-busy="true"
  >
    <VListItemTitle class="text-h5">
      Gender
    </VListItemTitle>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedGender"
        label="Male"
        color="primary"
        value="male"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedGender"
        label="Female"
        color="secondary"
        value="female"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0">
      <VCheckbox
        v-model="selectedGender"
        label="Kids"
        color="error"
        value="kids"
        hide-details
      />
    </VListItem>
  </VList>
  <VList
    lines="one"
    class="mb-3"
    aria-label="categories list"
    aria-busy="true"
  >
    <VListItemTitle class="text-h5">
      Categories
    </VListItemTitle>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedCategory"
        label="All"
        color="primary"
        value="all"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedCategory"
        label="Electronics"
        color="primary"
        value="electronics"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedCategory"
        label="Fashion"
        color="primary"
        value="fashion"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedCategory"
        label="Books"
        color="primary"
        value="books"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedCategory"
        label="Toys"
        color="primary"
        value="toys"
        hide-details
      />
    </VListItem>
    <VListItem class="pa-0 mb-n2">
      <VCheckbox
        v-model="selectedCategory"
        label="Kitchen"
        color="primary"
        value="kitchen"
        hide-details
      />
    </VListItem>
  </VList>
  <div class="mb-3">
    <h5 class="text-h5 mb-0">
      Colors
    </h5>
    <div class="d-flex ga-2 flex-wrap v-col-11 px-0">
      <template
        v-for="(catcolor, i) in ColorsOptions"
        :key="i"
      >
        <VAvatar
          class="cursor-pointer"
          :class="setColor === i ? 'avatar-border' : ''"
          :color="catcolor.value"
          variant="flat"
          size="small"
          @click="selectColor(i)"
        />
      </template>
    </div>
  </div>
  <div class="mb-3">
    <h5 class="text-h5">
      Price
    </h5>
    <VRow>
      <VCol cols="6">
        <VLabel class="mb-2 text-lightText">
          Min
        </VLabel>
        <VTextField
          v-model="range[0]"
          aria-label="min"
          hide-details
          single-line
          type="number"
          variant="outlined"
        />
      </VCol>
      <VCol cols="6">
        <VLabel class="mb-2 text-lightText">
          Max
        </VLabel>
        <VTextField
          v-model="range[1]"
          aria-label="max"
          hide-details
          single-line
          type="number"
          variant="outlined"
        />
      </VCol>
    </VRow>
    <div aria-label="Select a value within the range of 0 to 1000">
      <VRangeSlider
        v-model="range"
        color="primary"
        thumb-size="16"
        track-color="secondary200"
        track-size="4"
        tick-size="4"
        :max="1000"
        :min="0"
        :step="1"
        hide-details
        class="mt-2"
      />
    </div>
  </div>
  <div>
    <h5 class="text-h5 mb-0">
      Rating
    </h5>
    <div class="d-flex align-center">
      <VRating
        v-model="selectRating"
        hover
        half-increments
        class="ma-2"
        density="compact"
        color="inputBorder"
        active-color="warning"
      />
      <pre class="mb-0 text-h6">({{ selectRating }})</pre>
    </div>
  </div>
  <VBtn
    color="primary"
    rounded="md"
    variant="text"
    block
    class="mt-5"
  >
    Reset all filters
  </VBtn>
</template>

<style lang="scss">
.avatar-border {
  border: 3px solid rgba(var(--v-theme-darkText), 0.2);
}
.custom-accordion {
  padding: 18px 2px;

  min-height: 30px !important;
  .v-expansion-panel-title__overlay {
    background-color: transparent;
  }
}
.acco-body {
  .v-expansion-panel-text__wrapper {
    padding: 5px 0;
  }
}
.custom-radio-box {
  .v-selection-control-group {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .v-selection-control {
    flex: 50%;
  }
}
</style>
