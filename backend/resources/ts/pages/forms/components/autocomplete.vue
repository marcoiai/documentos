<script setup lang="ts">
import { ref } from 'vue'

// combo data
const items = ref([
  'The Dark Knight',
  'Control with Control',
  'Combo with Solo',
  'The Dark',
  'Fight Club',
  'demo@company.com',
  'Pulp Fiction',
])

const items2 = ref([
  'The Dark Knight',
  'Control with Control',
  'Combo with Solo',
  'The Dark',
  'Fight Club',
  'demo@company.com',
  'Pulp Fiction',
])

const items3 = ref(['The Dark Knight', 'Control with Control', 'City of god', 'The Dark', 'Fight Club', 'Aliens', 'Pulp Fiction'])
const items4 = ref(['The Dark Knight', 'Control with Control', 'City of god', 'The Dark', 'Fight Club', 'Aliens', 'Pulp Fiction'])

const srcs = {
  1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
  2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
  3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
  5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
}

const people = ref([
  { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
  { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
  { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
  { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
  { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
  { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
  { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
  { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
])

const value = ref(['The Dark Knight'])
const value2 = ref(['The Dark'])
const value4 = ref(['Pulp Fiction'])
const capValue = ref(['demo@company.com'])
const multiValue = ref(['The Dark Knight', 'Fight Club'])
const friends = ref(['Sandra Adams', 'Britta Holt'])
const isUpdating = ref(false)

// component content
const page = ref({ title: 'Autocomplete' })
const subContent = ref({ content: 'The autocomplete is a normal text input enhanced by a panel of suggested options.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/autocomplete' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/autocompletes/' })

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol cols="12">
      <VRow>
        <!-- Combo Box -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Basic">
            <VRow>
              <VCol
                lg="6"
                cols="12"
              >
                <VAutocomplete
                  v-model="value"
                  aria-label="autocomplete"
                  :items="items"
                  color="primary"
                  variant="outlined"
                  hide-details
                  rounded="sm"
                  single-line
                  density="default"
                />
              </VCol>
              <VCol
                lg="6"
                cols="12"
              >
                <VAutocomplete
                  v-model="capValue"
                  aria-label="autocomplete"
                  :items="items"
                  color="primary"
                  label="Email Address"
                  variant="outlined"
                  single-line
                  hide-details
                />
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
        <!-- With Caption -->
        <!-- Combo with Multiple Options -->
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="Multiple Tags">
            <VAutocomplete
              v-model="multiValue"
              aria-label="autocomplete"
              :items="items2"
              variant="outlined"
              color="primary"
              label="Outlined"
              single-line
              multiple
              hide-details
              closable-chips
              role="combobox"
            >
              <template #chip>
                <VChip
                  label
                  variant="tonal"
                  color="primary"
                  rounded="lg"
                  size="large"
                  class="my-1 py-4 d-flex text-subtitle-1 font-weight-regular"
                  border="primary solid thin opacity-50"
                />
              </template>
            </VAutocomplete>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With image">
            <VAutocomplete
              v-model="friends"
              aria-label="autocomplete"
              :disabled="isUpdating"
              :items="people"
              chips
              variant="outlined"
              closable-chips
              item-title="name"
              item-value="name"
              hide-details
              label="Select"
              single-line
              multiple
            >
              <template #chip="{ props, item }">
                <VChip
                  v-bind="props"
                  class="py-4"
                  :prepend-avatar="item.raw.avatar"
                  :text="item.raw.name"
                />
              </template>

              <template #item="{ props, item }">
                <VListItem
                  v-bind="props"
                  :prepend-avatar="item?.raw?.avatar"
                  :title="item?.raw?.name"
                  :subtitle="item?.raw?.group"
                />
              </template>
            </VAutocomplete>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <UiParentCard title="With close">
            <VAutocomplete
              clearable
              aria-label="autocomplete"
              clear-icon="$close"
              variant="outlined"
              label="Autocomplete"
              single-line
              color="primary"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              hide-details
            />
          </UiParentCard>
        </VCol>
        <VCol>
          <UiParentCard title="Density">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <VAutocomplete
                  v-model="value2"
                  aria-label="autocomplete"
                  :items="items3"
                  color="primary"
                  variant="outlined"
                  single-line
                  hide-details
                  density="default"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VAutocomplete
                  v-model="value4"
                  aria-label="autocomplete"
                  :items="items4"
                  color="primary"
                  variant="outlined"
                  single-line
                  hide-details
                  density="compact"
                />
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
