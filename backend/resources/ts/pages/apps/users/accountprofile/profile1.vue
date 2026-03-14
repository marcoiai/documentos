<script setup lang="ts">
import { ref } from 'vue'

// tabs import
import ProfileTab from '@/views/apps/accountprofile/profile1/ProfileTab.vue'
import PersonalDetailsTab from '@/views/apps/accountprofile/profile1/PersonalDetailsTab.vue'
import MyAccountTab from '@/views/apps/accountprofile/profile1/MyAccountTab.vue'
import ChangePassword from '@/views/apps/accountprofile/profile1/ChangePassword.vue'
import SettingsTab from '@/views/apps/accountprofile/profile1/SettingsTab.vue'

// theme breadcrumb
const page = ref({ title: 'Profile 01' })

const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '#',
  },
  {
    title: 'Account',
    disabled: false,
    href: '#',
  },
  {
    title: 'Profile 01',
    disabled: true,
    href: '#',
  },
])

// tabs data
const tab = ref('tab-profile')
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <VCardText class="px-0 pb-0">
            <VTabs
              v-model="tab"
              color="primary"
              class="mx-6"
            >
              <VTab value="tab-profile">
                <SvgSprite
                  name="custom-user-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                />Profile
              </VTab>
              <VTab value="tab-personal">
                <SvgSprite
                  name="custom-document-text-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                />Personal
              </VTab>
              <VTab value="tab-account">
                <SvgSprite
                  name="custom-file-text-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                />My Account
              </VTab>
              <VTab value="tab-password">
                <SvgSprite
                  name="custom-lock-2"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                />Change Password
              </VTab>
              <VTab value="tab-setting">
                <SvgSprite
                  name="custom-setup-outline"
                  class="v-icon--start"
                  style="width: 18px; height: 18px"
                />Settings
              </VTab>
            </VTabs>
            <VDivider class="mx-6" />
            <div class="pt-6">
              <VTabsWindow v-model="tab" class="px-6 pb-6">
                <VTabsWindowItem value="tab-profile">
                  <ProfileTab />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-personal">
                  <PersonalDetailsTab />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-account">
                  <MyAccountTab />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-password">
                  <ChangePassword />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-setting">
                  <SettingsTab />
                </VTabsWindowItem>
              </VTabsWindow>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
