<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText>
      <VLabel class="text-caption mb-2">
        Have a Promo Code?
      </VLabel>
      <div class="d-flex ga-4">
        <VTextField
          single-line
          density="comfortable"
          hide-details
          variant="outlined"
          color="primary"
          placeholder="Enter promo code"
        />
        <VBtn
          color="primary"
          rounded="md"
          variant="flat"
          style="height: 50px"
        >
          Apply
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>
