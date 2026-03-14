<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Persistent -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    Persistent dialogs are not dismissed when touching outside or pressing the <strong>esc</strong> key.
  </p>
  <div class="text-center mt-6">
    <VDialog
      v-model="dialog"
      persistent
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="flat"
          v-bind="props"
        >
          Open Dialog
        </VBtn>
      </template>
      <VCard>
        <VCardTitle class="text-h5">
          Use Google's location service?
        </VCardTitle>
        <VCardText>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are
          running.
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="green darken-1"
            variant="text"
            @click="dialog = false"
          >
            Disagree
          </VBtn>
          <VBtn
            color="green darken-1"
            variant="text"
            @click="dialog = false"
          >
            Agree
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
