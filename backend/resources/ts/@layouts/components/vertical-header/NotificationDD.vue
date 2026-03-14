<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <VMenu
    :close-on-content-click="false"
    offset="6, 0"
  >
    <template #activator="{ props }">
      <VBtn
        icon
        class="text-secondary ml-sm-2 ml-1"
        color="secondary"
        rounded="sm"
        v-bind="props"
      >
        <VBadge
          color="success"
          content="2"
          offset-x="-2"
          offset-y="-2"
        >
          <SvgSprite name="custom-notification" />
        </VBadge>
      </VBtn>
    </template>
    <VSheet
      rounded="md"
      width="420"
      class="notification-dropdown py-6"
    >
      <div class="d-flex align-center justify-space-between pb-4 px-6">
        <h5 class="text-h5 mb-0">
          Notifications
        </h5>
        <a
          href="#"
          class="text-primary link-hover text-h6"
        > Mark all read </a>
      </div>
      <PerfectScrollbar style="height: calc(100vh - 300px); max-height: 430px">
        <VList
          class="py-0 px-6"
          lines="two"
          aria-label="notification list"
          aria-busy="true"
        >
          <VListItem
            value="1"
            color="secondary"
            class="no-spacer py-5 mb-3 px-3"
            rounded="md"
          >
            <template #prepend>
              <VAvatar
                size="40"
                variant="flat"
                color="primary"
                class="me-3 py-2"
              >
                <SvgSprite name="custom-gift-fill" />
              </VAvatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-h6 text-lightText mb-0">
                It's <span style="font-weight: 600">Cristina danny's</span> birthday today.
              </h6>
              <span
                class="text-caption text-lightText ml-3"
                style="min-width: 48px"
              >3:00 AM</span>
            </div>

            <p class="text-caption text-lightText my-0">
              2 min ago
            </p>
          </VListItem>
          <VListItem
            value="2"
            color="secondary"
            class="no-spacer mb-3 px-3 py-5"
            rounded="md"
          >
            <template #prepend>
              <VAvatar
                size="40"
                variant="outlined"
                color="primary"
                class="me-3 py-2"
              >
                <SvgSprite name="custom-message-fill" />
              </VAvatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-h6 text-lightText mb-0">
                <span style="font-weight: 600">Aida Burg</span> commented your post.
              </h6>
              <span
                class="text-caption text-lightText ml-3"
                style="min-width: 48px"
              >6:00 PM</span>
            </div>

            <p class="text-caption text-lightText my-0">
              5 August
            </p>
          </VListItem>
          <VListItem
            value="3"
            color="secondary"
            class="no-spacer mb-3 px-3 py-5"
            rounded="md"
          >
            <template #prepend>
              <VAvatar
                size="36"
                variant="tonal"
                color="primary"
                class="me-3 py-2"
              >
                <SvgSprite name="custom-setting-fill" />
              </VAvatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-h6 text-lightText mb-0">
                Your Profile is Complete <span style="font-weight: 600">60%</span>
              </h6>
              <span
                class="text-caption text-lightText ml-3"
                style="min-width: 48px"
              >2:45 PM</span>
            </div>

            <p class="text-caption text-lightText my-0">
              7 hours ago
            </p>
          </VListItem>
          <VListItem
            value="4"
            color="secondary"
            class="no-spacer mb-3 px-3 py-5"
            rounded="md"
          >
            <template #prepend>
              <VAvatar
                size="36"
                variant="outlined"
                color="primary"
                class="me-3 py-2 bg-lightprimary"
              >
                C
              </VAvatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-h6 text-lightText mb-0">
                <span style="font-weight: 600">Cristina Danny</span> invited to join <span style="font-weight: 600">Metting.</span>
              </h6>
              <span
                class="text-caption text-lightText ml-3"
                style="min-width: 48px"
              >9:10 PM</span>
            </div>

            <p class="text-caption text-lightText my-0">
              Daily scrum meeting time
            </p>
          </VListItem>
        </VList>
      </PerfectScrollbar>
      <div class="pt-2 text-center">
        <a
          href="#"
          class="text-primary text-h6 link-hover"
        >View All</a>
      </div>
    </VSheet>
  </VMenu>
</template>

<style lang="scss">
.v-tooltip {
  > .v-overlay__content.custom-tooltip {
    padding: 2px 6px;
  }
}
</style>
