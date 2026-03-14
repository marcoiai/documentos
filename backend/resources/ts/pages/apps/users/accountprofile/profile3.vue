<script setup lang="ts">
import { ref } from 'vue'

// tabs import
import ProfileTab from '@/views/apps/accountprofile/profile3/ProfileTab.vue'
import BillingTab from '@/views/apps/accountprofile/profile3/BillingTab.vue'
import SecurityTab from '@/views/apps/accountprofile/profile3/SecurityTab.vue'
import NotificationsTab from '@/views/apps/accountprofile/profile3/NotificationsTab.vue'

// theme breadcrumb
const page = ref({ title: 'Profile 03' })

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
    title: 'Profile 03',
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
              <VTab
                variant="text"
                value="tab-profile"
              >
                Profile
              </VTab>
              <VTab
                variant="text"
                value="tab-billing"
              >
                Billing
              </VTab>
              <VTab
                variant="text"
                value="tab-security"
              >
                Security
              </VTab>
              <VTab
                variant="text"
                value="tab-notifications"
              >
                Notifications
              </VTab>
            </VTabs>
            <VDivider class="mx-6" />
            <div class="pt-6">
              <VTabsWindow v-model="tab" class="px-6 pb-6">
                <VTabsWindowItem value="tab-profile">
                  <ProfileTab />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-billing">
                  <BillingTab />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-security">
                  <SecurityTab />
                </VTabsWindowItem>

                <VTabsWindowItem value="tab-notifications">
                  <NotificationsTab />
                </VTabsWindowItem>
              </VTabsWindow>
            </div>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
