<template>
  <VCard
    variant="outlined"
    class="bg-surface pa-5"
    elevation="0"
    rounded="lg"
  >
    <VTextarea
      variant="outlined"
      single-line
      color="primary"
      density="comfortable"
      name="input-7-4"
      placeholder="Whats on your mind, Larry ?"
      rows="4"
    />
    <div class="d-flex">
      <VBtn
        color="secondary"
        variant="text"
        rounded="md"
      >
        <template #prepend>
          <SvgSprite
            name="custom-paper-clip-2"
            style="width: 16px; height: 16px"
          />
        </template>
        Gallery
      </VBtn>
      <VBtn
        color="secondary"
        variant="flat"
        rounded="md"
        class="ms-auto"
      >
        <template #prepend>
          <SvgSprite
            name="custom-copy"
            style="width: 16px; height: 16px"
          />
        </template>
        Post
      </VBtn>
    </div>
  </VCard>
</template>
