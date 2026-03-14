<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Nested -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    Dialogs can be nested: you can open one dialog from another.
  </p>
  <div class="text-center">
    <VBtn
      color="primary"
      variant="flat"
      class="ma-2"
      @click="dialog = true"
    >
      Open Dialog 1
    </VBtn>
    <VDialog v-model="dialog">
      <VCard>
        <VCardTitle> Dialog 1 </VCardTitle>
        <VCardText>
          <VBtn
            color="primary"
            variant="flat"
            class="ma-2"
            @click="dialog2 = true"
          >
            Open Dialog 2
          </VBtn>
        </VCardText>
        <VCardActions>
          <VBtn
            color="error"
            variant="text"
            @click="dialog = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="dialog2">
      <VCard>
        <VCardTitle> Dialog 2 </VCardTitle>
        <VCardText>
          <VBtn
            color="secondary"
            variant="flat"
            @click="dialog3 = !dialog3"
          >
            Open Dialog 3
          </VBtn>
        </VCardText>
        <VCardActions>
          <VBtn
            color="error"
            variant="text"
            @click="dialog2 = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="dialog3">
      <VCard>
        <VCardTitle>
          <span>Dialog 3</span>
        </VCardTitle>
        <VCardActions>
          <VBtn
            color="error"
            variant="text"
            @click="dialog3 = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
