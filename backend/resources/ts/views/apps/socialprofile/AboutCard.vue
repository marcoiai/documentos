<template>
  <VRow>
    <VCol cols="12">
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface"
        rounded="lg"
      >
        <div class="d-flex ga-6 align-center pa-4 border-bottom">
          <VBtn
            icon
            variant="flat"
            aria-label="users"
            size="large"
            rounded="md"
            class="text-primary"
            color="lightprimary"
          >
            <SvgSprite
              name="custom-multi-users"
              style="width: 18px; height: 18px"
            />
          </VBtn>
          <div>
            <h2 class="text-h3 text-primary mb-n1">
              239K
            </h2>
            <small>Friends</small>
          </div>
          <VBtn
            icon
            variant="flat"
            aria-label="arrow"
            rounded
            class="ms-auto"
          >
            <SvgSprite
              name="custom-chevron-outline"
              style="width: 16px; height: 16px"
            />
          </VBtn>
        </div>
        <div class="d-flex ga-6 pa-4 align-center">
          <VBtn
            icon
            variant="flat"
            aria-label="user add"
            size="large"
            rounded="md"
            class="text-secondary"
            color="lightsecondary"
          >
            <SvgSprite
              name="custom-user-add-outline"
              style="width: 18px; height: 18px"
            />
          </VBtn>
          <div>
            <h2 class="text-h3 text-secondary mb-n1">
              234K
            </h2>
            <small>Followers</small>
          </div>
          <VBtn
            icon
            variant="flat"
            aria-label="arrow"
            rounded="md"
            class="ms-auto"
          >
            <SvgSprite
              name="custom-chevron-outline"
              style="width: 16px; height: 16px"
            />
          </VBtn>
        </div>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard
        variant="outlined"
        elevation="0"
        class="bg-surface text-body-1"
        rounded="lg"
      >
        <VCardItem>
          <h4 class="text-h4 mb-0">
            About
          </h4>
        </VCardItem>
        <VDivider />
        <VCardText>
          <p class="mb-5 text-body-1">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <div class="d-flex ga-4 mb-5">
            <SvgSprite
              name="custom-dribble-outline"
              class="text-info"
              style="width: 18px; height: 18px"
            />
            <a
              href="https://codedthemes.com/"
              class="link text-truncate"
            >https://codedthemes.com/</a>
          </div>
          <div class="d-flex ga-4 mb-5">
            <SvgSprite
              name="custom-instagram-outline"
              class="text-error"
              style="width: 18px; height: 18px"
            />
            <a
              href="https://www.instagram.com/codedthemes"
              class="link text-truncate"
            >https://www.instagram.com/codedthemes</a>
          </div>
          <div class="d-flex ga-4 mb-5">
            <SvgSprite
              name="custom-facebook-outline"
              class="text-primary"
              style="width: 18px; height: 18px"
            />
            <a
              href=" https://www.facebook.com/codedthemes"
              class="link text-truncate"
            > https://www.facebook.com/codedthemes</a>
          </div>
          <div class="d-flex ga-4">
            <SvgSprite
              name="custom-link3"
              style="width: 18px; height: 18px"
            />
            <a
              href="https://in.linkedin.com/company/codedthemes"
              class="link text-truncate"
            >https://in.linkedin.com/company/codedthemes</a>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
