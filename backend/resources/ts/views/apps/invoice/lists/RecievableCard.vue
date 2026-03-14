<template>
  <VCard
    variant="flat"
    class="recievable-card"
    rounded="lg"
  >
    <VCardItem>
      <div class="d-flex align-end">
        <div class="d-flex">
          <VAvatar
            size="40"
            color="primary"
            rounded="md"
          >
            <SvgSprite
              name="custom-user-right-outline"
              style="width: 20px; height: 20px"
            />
          </VAvatar>
          <div class="text-white ms-2">
            <p class="text-h6 mb-0">
              Total Recievables
              <SvgSprite
                name="custom-info-circle-outline"
                style="width: 16px; height: 16px"
              />
            </p>
            <div class="d-flex">
              <p class="text-caption mb-0">
                Current
              </p>
              <p class="text-h6 ms-2 mb-0">
                109.1k
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex text-white ms-auto">
          <p class="text-caption mb-0">
            Overdue
          </p>
          <p class="text-h6 ms-2 mb-0">
            62k
          </p>
        </div>
      </div>
      <h4 class="text-h4 text-white mt-3 mb-0">
        $43,078
      </h4>
      <div class="d-flex align-center">
        <VProgressLinear
          aria-label="progressbar"
          color="warning"
          model-value="90"
          bg-opacity="0.9"
          bg-color="lightwarning"
          height="6"
          rounded
          style="left: unset; transform: unset"
        />
        <span class="text-caption text-white ms-2 d-block">90%</span>
      </div>
    </VCardItem>
  </VCard>
</template>

<style lang="scss">
.recievable-card {
  background: var(--v-gradient);
}
</style>
