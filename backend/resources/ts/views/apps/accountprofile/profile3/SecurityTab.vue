<template>
  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="px-5 py-6">
            <h5 class="text-subtitle-1 mb-0">
              Change Password
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Current password
                </VLabel>
                <VTextField
                  type="text"
                  single-line
                  placeholder="Enter Current password"
                  density="comfortable"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VLabel class="mb-2">
                  New Password
                </VLabel>
                <VTextField
                  type="email"
                  single-line
                  placeholder="Enter New Password"
                  density="comfortable"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VLabel class="mb-2">
                  Re-enter New Password
                </VLabel>
                <VTextField
                  type="text"
                  single-line
                  placeholder="Enter Confirm Password"
                  density="comfortable"
                  color="primary"
                  variant="outlined"
                  hide-details
                />
              </VCol>
            </VRow>
            <VBtn
              color="primary"
              rounded="md"
              variant="flat"
              class="mt-5"
            >
              Change Password
            </VBtn>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-6">
            <h5 class="text-subtitle-1 mb-0">
              Delete Account
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <p class="text-lightText">
              To deactivate your account, first delete its resources. If you are the only owner of any teams, either assign another owner or
              deactivate the team.
            </p>

            <VBtn
              color="error"
              rounded="md"
              variant="outlined"
              class="mt-4"
            >
              Deactivate Account
            </VBtn>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
