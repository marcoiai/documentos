<script setup lang="ts">
import { ref } from 'vue'

// tabs import
import UserProfileTab from '@/views/apps/accountprofile/profile2/UserProfileTab.vue'
import BillingTab from '@/views/apps/accountprofile/profile2/BillingTab.vue'
import PaymentTab from '@/views/apps/accountprofile/profile2/PaymentTab.vue'
import ChangePasswordTab from '@/views/apps/accountprofile/profile2/ChangePasswordTab.vue'

// theme breadcrumb
const page = ref({ title: 'Profile 02' })

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
    title: 'Profile 02',
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
          <VCardItem>
            <VCardTitle class="text-h6">
              Account Settings
            </VCardTitle>
          </VCardItem>
          <VDivider />
          <div class="my-3">
            <VRow class="d-flex flex-row">
              <VCol
                cols="12"
                md="4"
                sm="5"
                class="border-sm-right pe-sm-0 py-sm-0"
              >
                <VCardText>
                  <VTabs
                    v-model="tab"
                    direction="vertical"
                    color="primary"
                  >
                    <VTab
                      value="tab-profile"
                      rounded="md"
                      class="text-start overflow-hidden"
                      height="70"
                    >
                      <SvgSprite
                        name="custom-user-outline"
                        class="v-icon--start"
                        style="width: 16px; height: 16px"
                      />
                      <div>
                        <div>User Profile</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Profile Settings</span>
                      </div>
                    </VTab>
                    <VTab
                      value="tab-billing"
                      rounded="md"
                      class="text-start overflow-hidden"
                      height="70"
                    >
                      <SvgSprite
                        name="custom-document-text-outline"
                        class="v-icon--start"
                        style="width: 16px; height: 16px"
                      />
                      <div>
                        <div>Billing</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Billing Information</span>
                      </div>
                    </VTab>
                    <VTab
                      value="tab-payment"
                      rounded="md"
                      class="text-start overflow-hidden"
                      height="70"
                    >
                      <SvgSprite
                        name="custom-wallet-outline"
                        class="v-icon--start"
                        style="width: 16px; height: 16px"
                      />
                      <div>
                        <div>Payment</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Add & Update Card</span>
                      </div>
                    </VTab>
                    <VTab
                      value="tab-change-password"
                      rounded="md"
                      class="mb-3 text-start overflow-hidden"
                      height="70"
                    >
                      <SvgSprite
                        name="custom-key-outline"
                        class="v-icon--start"
                        style="width: 16px; height: 16px"
                      />
                      <div>
                        <div>Change Password</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Update Profile Security</span>
                      </div>
                    </VTab>
                  </VTabs>
                </VCardText>
                <VDivider class="px-4 d-sm-none" />
              </VCol>

              <VCol
                cols="12"
                md="8"
                sm="7"
                class="ps-sm-0 py-sm-0"
              >
                <VCardText>
                  <VWindow v-model="tab">
                    <VWindowItem value="tab-profile">
                      <UserProfileTab />
                    </VWindowItem>
                    <VWindowItem value="tab-billing">
                      <BillingTab />
                    </VWindowItem>
                    <VWindowItem value="tab-payment">
                      <PaymentTab />
                    </VWindowItem>
                    <VWindowItem value="tab-change-password">
                      <ChangePasswordTab />
                    </VWindowItem>
                  </VWindow>
                </VCardText>
              </VCol>
            </VRow>
          </div>

          <VDivider />
          <div class="pa-6 text-end">
            <VBtn
              color="primary"
              rounded="md"
              variant="flat"
            >
              Continue
            </VBtn>
          </div>
        </VCard>
      </VCard>
    </VCol>
  </VRow>
</template>
