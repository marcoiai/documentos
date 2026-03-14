<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText>
      <VList
        class="py-0"
        aria-label="profile"
        aria-busy="true"
      >
        <VListItem class="pa-0">
          <template #prepend>
            <VAvatar
              variant="tonal"
              color="error"
              rounded="md"
            >
              <SvgSprite
                name="custom-google-outline"
                style="width: 20px; height: 20px"
              />
            </VAvatar>
          </template>
          <p class="text-body-1 mb-0">
            Google LLC
          </p>
          <h6 class="text-subtitle-1 mb-0">
            Sr. UI designer
          </h6>
          <template #append>
            <VBtn
              color="secondary"
              aria-label="copy"
              variant="text"
              rounded="md"
              icon
              size="small"
            >
              <SvgSprite
                name="custom-copied-outline"
                style="width: 20px; height: 20px"
              />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCardText>
    <VDivider />
    <VCardItem>
      <h6 class="text-subtitle-1">
        Description
      </h6>
      <p class="text-body-1 mb-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley.
      </p>
      <ul
        class="d-flex align-center ga-2"
        style="list-style-type: none"
      >
        <li>
          <VChip
            color="inputBorder"
            variant="tonal"
            border="inputBorder solid thin opacity-100"
            rounded="lg"
          >
            <span class="text-darkText text-caption">Fulltime</span>
          </VChip>
        </li>
        <li>
          <VChip
            color="inputBorder"
            variant="tonal"
            border="inputBorder solid thin opacity-100"
            rounded="lg"
          >
            <span class="text-darkText text-caption">Remote</span>
          </VChip>
        </li>
        <li>
          <VChip
            color="inputBorder"
            variant="tonal"
            border="inputBorder solid thin opacity-100"
            rounded="lg"
          >
            <span class="text-darkText text-caption">Hourly</span>
          </VChip>
        </li>
      </ul>
      <div class="d-flex justify-space-between mt-2">
        <VList
          class="d-flex align-center py-0 flex-wrap"
          aria-label="list"
          aria-busy="true"
          density="compact"
        >
          <VListItem class="text-body-1 pa-0">
            <template #prepend>
              <SvgSprite
                name="custom-navigation-outline"
                class="me-1"
                style="width: 14px; height: 14px"
              />
            </template>
            NY, USA
          </VListItem>
          <VListItem class="text-body-1 py-0 pe-0">
            <template #prepend>
              <SvgSprite
                name="custom-clock-outline"
                class="me-1"
                style="width: 14px; height: 14px"
              />
            </template>
            2 Days ago
          </VListItem>
        </VList>
        <VBtn
          color="primary"
          variant="flat"
          rounded="md"
        >
          Apply
        </VBtn>
      </div>
    </VCardItem>
  </VCard>
</template>
