<script setup lang="ts">
import { useCustomizerStore } from '@layouts/stores/customizer'

const customizer = useCustomizerStore()
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard
        elevation="0"
        :color="customizer.actTheme === 'dark' ? 'surface' : 'darkText'"
        class="storageCard"
        rounded="lg"
      >
        <VCardItem>
          <div class="d-flex justify-space-between">
            <div class="storageContent">
              <h5 class="text-h5 mb-2">
                Dropbox Storage
              </h5>
              <VAvatar
                variant="tonal"
                rounded="md"
                color="surface"
              >
                <SvgSprite
                  name="custom-cloud-outline"
                  style="width: 20px; height: 20px"
                />
              </VAvatar>
              <span class="text-caption d-block pt-4 pb-2">1,342GB of 150GB Users</span>
              <div class="d-flex">
                <VProgressLinear
                  aria-label="progressbar"
                  style="left: unset; transform: unset"
                  color="error"
                  height="6"
                  model-value="100"
                  rounded
                />
                <VProgressLinear
                  aria-label="progressbar"
                  style="left: unset; transform: unset"
                  color="warning"
                  height="6"
                  model-value="100"
                  rounded
                />
                <VProgressLinear
                  aria-label="progressbar"
                  style="left: unset; transform: unset"
                  color="secondary"
                  height="6"
                  model-value="100"
                  rounded
                />
                <VProgressLinear
                  aria-label="progressbar"
                  style="left: unset; transform: unset"
                  color="info"
                  height="6"
                  model-value="100"
                  rounded
                />
              </div>
            </div>
            <h4 class="text-h4">
              150GB
            </h4>
          </div>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard
        elevation="0"
        color="primary"
        rounded="lg"
      >
        <VCardItem>
          <VList
            class="py-0 bg-primary"
            aria-label="balance"
            aria-busy="true"
          >
            <VListItem class="pa-0">
              <p class="text-body-1 mb-0">
                Available Balance
              </p>
              <h4 class="text-h4 mb-0">
                $1,234.90
              </h4>
              <template #append>
                <VAvatar
                  variant="tonal"
                  color="primary200"
                  size="large"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-bidirectional"
                    class="text-white"
                    style="width: 28px; height: 28px"
                  />
                </VAvatar>
              </template>
            </VListItem>
          </VList>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.storageCard {
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url(@images/analytics/img-dropbox-bg.svg);
    background-position: bottom right;
    background-size: 100%;
    background-repeat: no-repeat;
    bottom: 0;
    opacity: 0.5;
    border-radius: 12px;
  }
}
.storageContent {
  flex: 1;
}
</style>
