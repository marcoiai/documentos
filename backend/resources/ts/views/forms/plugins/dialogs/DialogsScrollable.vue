<script setup lang="ts">
import { ref } from 'vue'

const dialogm1 = ref('')
const dialog = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Scrollable -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    Example of a dialog with scrollable content.
  </p>
  <div class="text-center mt-6">
    <VDialog
      v-model="dialog"
      scrollable
      width="320"
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
        <VCardTitle>Select Country</VCardTitle>
        <VDivider />
        <VCardText
          style="height: 300px"
          class="overflow-auto"
        >
          <VRadioGroup
            v-model="dialogm1"
            column
          >
            <VRadio
              label="Bahamas, The"
              value="bahamas"
            />
            <VRadio
              label="Bahrain"
              value="bahrain"
            />
            <VRadio
              label="Bangladesh"
              value="bangladesh"
            />
            <VRadio
              label="Barbados"
              value="barbados"
            />
            <VRadio
              label="Belarus"
              value="belarus"
            />
            <VRadio
              label="Belgium"
              value="belgium"
            />
            <VRadio
              label="Belize"
              value="belize"
            />
            <VRadio
              label="Benin"
              value="benin"
            />
            <VRadio
              label="Bhutan"
              value="bhutan"
            />
            <VRadio
              label="Bolivia"
              value="bolivia"
            />
            <VRadio
              label="Bosnia and Herzegovina"
              value="bosnia"
            />
            <VRadio
              label="Botswana"
              value="botswana"
            />
            <VRadio
              label="Brazil"
              value="brazil"
            />
            <VRadio
              label="Brunei"
              value="brunei"
            />
            <VRadio
              label="Bulgaria"
              value="bulgaria"
            />
            <VRadio
              label="Burkina Faso"
              value="burkina"
            />
            <VRadio
              label="Burma"
              value="burma"
            />
            <VRadio
              label="Burundi"
              value="burundi"
            />
          </VRadioGroup>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VBtn
            color="error"
            variant="text"
            @click="dialog = false"
          >
            Close
          </VBtn>
          <VBtn
            color="success"
            variant="text"
            @click="dialog = false"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
