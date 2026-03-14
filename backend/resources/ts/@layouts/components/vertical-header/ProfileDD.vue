<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ability = useAbility()

// Get type from backend
const userData = useCookie<any>('userData')

const logout = async () => {
  // Remove "accessToken" from cookie
  useCookie('accessToken').value = null

  // Remove "userData" from cookie
  userData.value = null

  // Remove "userAbilities" from cookie
  useCookie('userAbilityRules').value = null

  // Reset ability to initial ability
  ability.update([])

  // Redirect to login
  await router.push('/authentication/auth1/login1')
}

const tab = ref(null)

const profiledata1 = ref([
  {
    title: 'Edit profile',
    icon: 'custom-edit',
  },
  {
    title: 'View Profile',
    icon: 'custom-user-1',
  },
  {
    title: 'Social Profile',
    icon: 'custom-users',
  },
  {
    title: 'Billing',
    icon: 'custom-wallet',
  },
])

const profiledata2 = ref([
  {
    title: 'Support',
    icon: 'custom-support',
  },
  {
    title: 'Account settings',
    icon: 'custom-user-1',
  },
  {
    title: 'Privacy center',
    icon: 'custom-lock',
  },
  {
    title: 'Feedback',
    icon: 'custom-comment',
  },
  {
    title: 'History',
    icon: 'custom-history',
  },
])
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div>
    <div class="d-flex align-center pa-5">
      <VAvatar
        v-if="userData && userData.avatar"
        size="40"
        class="me-2"
      >
        <img
          :src="userData.avatar"
          width="40"
          alt="profile"
        >
      </VAvatar>
      <VAvatar
        v-else
        variant="tonal"
        color="primary"
        class="me-2"
      >
        <SvgSprite
          name="custom-user-fill"
          style="width: 20px; height: 20px"
        />
      </VAvatar>
      <div>
        <h6 class="text-subtitle-1 mb-0">
          {{ userData.fullName || userData.username }}
        </h6>
        <p class="text-caption text-lightText mb-0">
          {{ userData.role }}
        </p>
      </div>
      <div class="ms-auto">
        <VBtn
          variant="text"
          aria-label="logout"
          color="error"
          rounded="sm"
          icon
          size="large"
          @click="logout"
        >
          <SvgSprite name="custom-logout-1" />
        </VBtn>
      </div>
    </div>
    <VTabs
      v-model="tab"
      color="primary"
      grow
    >
      <VTab value="111">
        <div class="v-icon--start">
          <SvgSprite
            name="custom-user-outline"
            style="width: 18px; height: 18px"
          />
        </div>
        Profile
      </VTab>
      <VTab value="222">
        <div class="v-icon--start">
          <SvgSprite
            name="custom-setting-outline-1"
            style="width: 18px; height: 18px"
          />
        </div>
        Setting
      </VTab>
    </VTabs>
    <VDivider />
    <PerfectScrollbar style="height: calc(100vh - 300px); max-height: 240px">
      <VWindow v-model="tab">
        <VWindowItem value="111">
          <VList
            class="px-2"
            aria-label="profile list"
            aria-busy="true"
          >
            <VListItem
              v-for="(item, index) in profiledata1"
              :key="index"
              color="primary"
              base-color="secondary"
              rounded="md"
              :value="item.title"
            >
              <template #prepend>
                <div class="me-4">
                  <SvgSprite
                    :name="item.icon || ''"
                    style="width: 18px; height: 18px"
                  />
                </div>
              </template>

              <VListItemTitle class="text-h6">
                {{ item.title }}
              </VListItemTitle>
            </VListItem>
            <VListItem
              color="primary"
              base-color="secondary"
              rounded="md"
              @click="logout"
            >
              <template #prepend>
                <div class="me-4">
                  <SvgSprite
                    name="custom-logout-1"
                    style="width: 18px; height: 18px"
                  />
                </div>
              </template>

              <VListItemTitle class="text-h6">
                Logout
              </VListItemTitle>
            </VListItem>
          </VList>
        </VWindowItem>
        <VWindowItem value="222">
          <VList
            class="px-2"
            aria-label="profile list"
            aria-busy="true"
          >
            <VListItem
              v-for="(item, index) in profiledata2"
              :key="index"
              color="primary"
              base-color="secondary"
              rounded="md"
              :value="item.title"
            >
              <template #prepend>
                <div class="me-4">
                  <SvgSprite
                    :name="item.icon || ''"
                    style="width: 18px; height: 18px"
                  />
                </div>
              </template>

              <VListItemTitle class="text-h6">
                {{ item.title }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VWindowItem>
      </VWindow>
    </PerfectScrollbar>
  </div>
</template>
