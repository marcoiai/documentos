<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Model -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    You can also trigger a dialog by simply updating the v-model, without using either <b>activator</b> slot or prop. In this case, the
    dialog will not appear to be activated by any specific element, and will simply appear in the middle of the screen.
  </p>
  <div class="text-center mt-6">
    <VBtn
      color="primary"
      variant="flat"
      @click="dialog = true"
    >
      Open Dialog
    </VBtn>

    <VDialog v-model="dialog">
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
  </div>
</template>
