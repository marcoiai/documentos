<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Transitions -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    You can make the dialog appear from the top or the bottom.
  </p>
  <div class="text-center mt-6">
    <VDialog transition="dialog-bottom-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="flat"
          v-bind="props"
        >
          From the bottom
        </VBtn>
      </template>
      <template #default="{ isActive }">
        <VCard>
          <VToolbar
            color="primary"
            class="px-4"
          >
            Opening from the bottom
          </VToolbar>
          <VCardItem>
            <div class="text-h2 pa-12">
              Hello world!
            </div>
          </VCardItem>
          <VCardActions class="justify-end">
            <VBtn
              variant="flat"
              @click="isActive.value = false"
            >
              Close
            </VBtn>
          </VCardActions>
        </VCard>
      </template>
    </VDialog>

    <VDialog transition="dialog-top-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="flat"
          class="ms-2 mt-sm-0"
          v-bind="props"
        >
          From the top
        </VBtn>
      </template>
      <template #default="{ isActive }">
        <VCard>
          <VToolbar
            color="primary"
            class="px-4"
          >
            Opening from the top
          </VToolbar>
          <VCardItem>
            <div class="text-h2 pa-12">
              Hello world!
            </div>
          </VCardItem>
          <VCardActions class="justify-end">
            <VBtn
              variant="flat"
              @click="isActive.value = false"
            >
              Close
            </VBtn>
          </VCardActions>
        </VCard>
      </template>
    </VDialog>
  </div>
</template>
