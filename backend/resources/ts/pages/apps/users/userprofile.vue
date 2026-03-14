<script setup lang="ts">
import { ref } from 'vue'

import ProfileBanner from '@/views/apps/userprofile/ProfileBanner.vue'
import UserBackRight from '@/views/apps/userprofile/UserBackRight.vue'
import UserBackLeft from '@/views/apps/userprofile/UserBackLeft.vue'
import UserDetails from '@/views/apps/userprofile/UserDetails.vue'
import InformationTab from '@/views/apps/userprofile/InformationTab.vue'
import PaymentTab from '@/views/apps/userprofile/PaymentTab.vue'
import ChangePasswordTab from '@/views/apps/userprofile/ChangePasswordTab.vue'
import SettingTab from '@/views/apps/userprofile/SettingTab.vue'

const tab = ref('one')
function changeTab(e: string) {
  tab.value = e
}
</script>

<template>
  <VRow class="mt-0">
    <VCol cols="12">
      <VCard
        class="profile-banner overflow-hidden"
        variant="flat"
        color="lightprimary"
        rounded="lg"
      >
        <VCardItem class="pb-4 pt-2 px-6">
          <div class="d-flex justify-space-between align-center flex-wrap ga-4">
            <ProfileBanner />
            <VBtn
              variant="flat"
              color="primary"
              rounded="md"
              class="editBtn"
              @click="changeTab('one')"
            >
              Edit your profile
            </VBtn>
          </div>
        </VCardItem>
        <UserBackLeft />
        <UserBackRight />
      </VCard>
    </VCol>
    <VCol
      cols="12"
      xl="3"
      md="4"
    >
      <VCard
        variant="outlined"
        class="bg-surface"
        rounded="lg"
      >
        <VCardItem>
          <div class="text-end">
            <VMenu
              class="rounded-md"
              elevation="24"
              rounded="md"
            >
              <template #activator="{ props }">
                <VBtn
                  icon
                  color="secondary"
                  aria-label="menu"
                  size="small"
                  v-bind="props"
                  variant="tonal"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-more-outline"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </template>
              <VList
                elevation="24"
                aria-label="menu"
                aria-busy="true"
                density="compact"
                rounded="md"
              >
                <VListItem
                  value="Edit"
                  color="secondary"
                  @click="changeTab('one')"
                >
                  <VListItemTitle class="text-h6">
                    Edit
                  </VListItemTitle>
                </VListItem>
                <VListItem
                  value="Delete"
                  color="secondary"
                  disabled
                >
                  <VListItemTitle class="text-h6">
                    Delete
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </div>
          <UserDetails />
          <VTabs
            v-model="tab"
            color="primary"
            variant="flat"
            hide-slider
            density="compact"
            direction="vertical"
          >
            <VTab
              value="one"
              selected-class="bg-lightprimary"
              rounded="md"
              hide-slider
            >
              <SvgSprite
                name="custom-user-outline"
                class="v-icon--start"
                style="width: 18px; height: 18px"
              /> Personal information
            </VTab>
            <VTab
              value="two"
              selected-class="bg-lightprimary"
              rounded="md"
              hide-slider
            >
              <SvgSprite
                name="custom-payment-outline"
                class="v-icon--start"
                style="width: 18px; height: 18px"
              /> Payment
            </VTab>
            <VTab
              value="three"
              selected-class="bg-lightprimary"
              rounded="md"
              hide-slider
            >
              <SvgSprite
                name="custom-lock-2"
                class="v-icon--start"
                style="width: 18px; height: 18px"
              /> Change password
            </VTab>
            <VTab
              value="four"
              selected-class="bg-lightprimary"
              rounded="md"
              hide-slider
            >
              <SvgSprite
                name="custom-setup-outline"
                class="v-icon--start"
                style="width: 18px; height: 18px"
              /> Settings
            </VTab>
          </VTabs>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      xl="9"
      md="8"
    >
      <VWindow v-model="tab">
        <VWindowItem value="one">
          <InformationTab />
        </VWindowItem>

        <VWindowItem value="two">
          <PaymentTab />
        </VWindowItem>

        <VWindowItem value="three">
          <ChangePasswordTab />
        </VWindowItem>

        <VWindowItem value="four">
          <SettingTab />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

<style>
.editBtn {
  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>
