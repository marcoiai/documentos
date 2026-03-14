<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Activator -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    In addition using the <b>activator</b> slot, we can instead use the <b>activator</b> prop to activate a dialog. By placing the dialog
    component inside the button, and setting the <b>activator</b> prop value to <b>“parent”</b> we can designate the parent (button) as the
    activator.
  </p>
  <div class="text-center mt-4 mt-sm-0">
    <VBtn
      color="primary"
      variant="flat"
    >
      Open Dialog

      <VDialog
        v-model="dialog"
        activator="parent"
      >
        <VCard>
          <VCardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </VCardText>
          <VCardActions>
            <VBtn
              color="primary"
              block
              @click="dialog = false"
            >
              Close Dialog
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VBtn>
  </div>
</template>
