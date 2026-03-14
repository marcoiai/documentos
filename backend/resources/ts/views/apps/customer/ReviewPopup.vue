<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dialogs: Object,
})

const emit = defineEmits(['update:dialogs', 'close'])

const text = ref(
  'If youre coming from a Series 3, the choice is more difficult. The Series 4 is undoubtedly the better device. And if you care about fall detection, the ECG app, or a larger screen then upgrading makes sense. But I think most people will remain satisfied with their Series 3s.',
)

const items = ref(['Pending', 'Published', 'Confirm'])
const ratting = ref(3.5)

const dialogVisible = ref(props.dialogs.dialog)

// Watch for changes in the prop and update the local state accordingly
watch(
  () => props.dialogs.dialog,
  newValue => {
    dialogVisible.value = newValue
  },
)

watch(dialogVisible, newValue => {
  emit('update:dialogs', { ...props.dialogs, dialog: newValue })
})
</script>

<template>
  <!-- to-do eslint error -->
  <VDialog
    v-model="dialogVisible"
    max-width="400"
  >
    <VCard>
      <VCardItem>
        <h3 class="text-h5 mb-3">
          Edit Review
        </h3>
      </VCardItem>
      <VDivider />
      <VCardText>
        <VLabel class="mb-2">
          Product name
        </VLabel>
        <VTextField
          single-line
          variant="outlined"
          density="comfortable"
          placeholder="Enter Product"
          model-value="Apple Watch Series 4"
        />
        <VLabel class="mb-2">
          Author
        </VLabel>
        <VTextField
          single-line
          variant="outlined"
          density="comfortable"
          placeholder="Enter Author"
          model-value="Joseph William"
        />
        <VLabel class="mb-2">
          Review
        </VLabel>
        <VTextarea
          v-model="text"
          single-line
          variant="outlined"
          density="comfortable"
          placeholder="Text of Review"
        />
        <div>Rating</div>
        <VRating
          v-model="ratting"
          background-color="orange lighten-3"
          color="warning"
          density="compact"
          half-increments
          hover
          size="16"
        />
        <br>
        <VLabel class="mb-2 mt-5">
          Status
        </VLabel>
        <VSelect
          single-line
          :items="items"
          label="Outlined variant"
          variant="outlined"
          model-value="Pending"
        />
      </VCardText>
      <VCardActions>
        <!-- to-do eslint error -->
        <VBtn
          color="primary"
          variant="flat"
          rounded="md"
          @click="$emit('close')"
        >
          Create
        </VBtn><VBtn
          variant="flat"
          rounded="md"
          @click="$emit('close')"
        >
          Cancel
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
