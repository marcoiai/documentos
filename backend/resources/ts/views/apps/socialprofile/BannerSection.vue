<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import profileBg from '@images/profile/img-profile-bg.png'
import UserImage from '@images/profile/img-user.png'

const tab = ref(null)

const items = shallowRef([
  { tab: 'Profile', icon: 'custom-note-outline', href: '/apps/users/social/posts' },
  { tab: 'Followers', icon: 'custom-multi-users', href: '/apps/users/social/followers' },
  { tab: 'Friends', icon: 'custom-status-outline', href: '/apps/users/social/friends' },
  { tab: 'Gallery', icon: 'custom-picture-outline', href: '/apps/users/social/gallery' },
  { tab: 'Friend Request', icon: 'custom-user-add-outline', href: '/apps/users/social/friendrequest' },
])
</script>

<template>
  <VCard
    elevation="0"
    variant="outlined"
    class="bg-surface overflow-hidden"
    rounded="lg"
  >
    <div class="pb-0">
      <img
        :src="profileBg"
        alt="profile"
        class="w-100"
      >
      <VRow class="mt-4">
        <VCol
          lg="3"
          md="3"
          cols="12"
          class="text-center text-md-end"
        >
          <div class="userImage">
            <img
              :src="UserImage"
              alt="profile"
              class="rounded-md"
            >
          </div>
        </VCol>
        <VCol
          lg="9"
          md="9"
          cols="12"
        >
          <VRow class="me-0">
            <VCol
              md="5"
              cols="12"
              class="text-center text-md-start"
            >
              <h5 class="text-h5">
                John Doe
              </h5>
              <small class="opacity-50">Android Developer</small>
            </VCol>
            <VCol
              md="7"
              cols="12"
            >
              <div class="text-center text-md-end">
                <VBtn
                  color="secondary"
                  rounded="md"
                  variant="outlined"
                  class="me-2"
                >
                  Message
                </VBtn>
                <VBtn
                  color="primary"
                  rounded="md"
                  variant="flat"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-plus"
                      style="width: 18px; height: 18px"
                    />
                  </template>
                  Send Request
                </VBtn>
              </div>
            </VCol>
            <VCol md="12">
              <VTabs
                v-model="tab"
                color="primary"
                dark
                class="profiletab"
              >
                <VTab
                  v-for="item in items"
                  :key="item.tab"
                  :to="item.href"
                >
                  <SvgSprite
                    :name="item.icon || ''"
                    class="me-2"
                    style="width: 18px; height: 18px"
                  />
                  {{ item.tab }}
                </VTab>
              </VTabs>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </div>
  </VCard>
</template>

<style lang="scss">
.userImage {
  margin: -70px 0px 0px auto;
  [dir="rtl"] & {
    margin: -70px auto 0px 0px;
  }
}
.profiletab .v-slide-group__content {
  justify-content: end;
  .v-btn--variant-text .v-btn__overlay {
    background: transparent;
  }
}

@media (max-width: 600px) {
  .userImage img {
    width: 72px;
    height: 72px;
  }
}
</style>
