<template>
  <div class="spacer bg-gray100">
    <VContainer class="py-0">
      <VRow class="align-center">
        <VCol
          cols="12"
          md="8"
          lg="9"
        >
          <h2 class="text-h2">
            Be the first to know
          </h2>
          <p class="text-body-1 mb-0">
            Simply submit your email, we share you the top news related to Able Pro feature updates, roadmap, and news.
          </p>
        </VCol>
        <VCol
          cols="12"
          sm="6"
          lg="3"
          md="4"
        >
          <div class="d-flex">
            <VTextField
              variant="outlined"
              color="primary"
              density="comfortable"
              placeholder="Enter your email"
              hide-details
            />
            <VBtn
              color="primary"
              variant="flat"
              size="large"
              rounded="md"
              class="ml-3"
            >
              Submit
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </div>
  <VDivider />
</template>
