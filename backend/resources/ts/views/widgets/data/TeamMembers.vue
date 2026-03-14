<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import Avatar1 from '@images/users/avatar-1.png'
import Avatar2 from '@images/users/avatar-2.png'
import Avatar3 from '@images/users/avatar-3.png'
import Avatar4 from '@images/users/avatar-4.png'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const teams = shallowRef([
  {
    avatar: Avatar1,
    name: 'David Jones',
    time: '5 min ago',
    role: 'Project Leader',
  },
  {
    avatar: Avatar2,
    name: 'David Jones',
    time: '1 hour ago',
    role: 'HR Manager',
  },
  {
    avatar: Avatar3,
    name: 'David Jones',
    time: 'Yesterday',
    role: 'Developer',
  },
  {
    avatar: Avatar4,
    name: 'David Jones',
    time: '02-05-2022',
    role: 'UI/UX Designer',
  },
])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="pb-1">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          Team Members
        </h5>
        <VMenu width="150">
          <template #activator="{ props }">
            <VBtn
              icon
              color="secondary"
              aria-label="menu"
              variant="text"
              rounded="md"
              size="small"
              v-bind="props"
            >
              <SvgSprite
                name="custom-more-outline"
                style="width: 20px; height: 20px; transform: rotate(90deg)"
              />
            </VBtn>
          </template>
          <VList
            elevation="24"
            class="pa-3"
            rounded="md"
            aria-label="menu"
            aria-busy="true"
          >
            <VListItem
              v-for="(item, index) in menulist"
              :key="index"
              density="compact"
              rounded="md"
              color="secondary"
              :value="index"
            >
              <VListItemTitle class="text-h6 text-lightText">
                {{ item }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </VCardText>
    <VCardItem class="pa-0">
      <VList
        lines="two"
        class="py-0"
        rounded="lg"
        aria-label="member list"
        aria-busy="true"
        border
      >
        <VListItem
          v-for="(team, i) in teams"
          :key="i"
          rounded="0"
          class="no-spacer px-6"
        >
          <template #prepend>
            <VAvatar
              size="52"
              class="me-3 py-2"
              rounded="md"
            >
              <img
                :src="team.avatar"
                width="52"
                alt="Julia"
              >
            </VAvatar>
          </template>
          <div class="d-inline-flex align-center justify-space-between w-100">
            <div>
              <h6 class="text-subtitle-1 mb-0">
                {{ team.name }}
              </h6>
              <p class="text-body-1 mb-0">
                {{ team.role }}
              </p>
            </div>
            <span class="text-body-1 text-lightText">{{ team.time }}</span>
          </div>
        </VListItem>
      </VList>
    </VCardItem>
  </VCard>
</template>
