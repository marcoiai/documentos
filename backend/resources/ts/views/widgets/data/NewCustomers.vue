<script setup lang="ts">
import { shallowRef } from 'vue'

// assets
import Avatar1 from '@images/users/avatar-1.png'
import Avatar2 from '@images/users/avatar-2.png'
import Avatar3 from '@images/users/avatar-3.png'
import Avatar4 from '@images/users/avatar-4.png'
import Avatar5 from '@images/users/avatar-5.png'

const customers = shallowRef([
  {
    avatar: Avatar1,
    name: 'Alex Thompson',
    time: '5 mins ago',
    msg: 'Cheers!',
    status: 'online',
  },
  {
    avatar: Avatar2,
    name: 'John Doue',
    time: 'Today',
    msg: 'stay hungry stay foolish!',
    status: 'online',
  },
  {
    avatar: Avatar3,
    name: 'Alex Thompson',
    time: '30 min ago',
    msg: 'Cheers!',
    status: '',
  },
  {
    avatar: Avatar4,
    name: 'John Doue',
    time: '10 min ago',
    msg: 'stay hungry stay foolish!',
    status: '',
  },
  {
    avatar: Avatar5,
    name: 'Shirley Hoe',
    time: '30 min ago',
    msg: 'Cheers!',
    status: '',
  },
  {
    avatar: Avatar1,
    name: 'Alex Thompson',
    time: '5 mins ago',
    msg: 'Cheers!',
    status: 'online',
  },
  {
    avatar: Avatar2,
    name: 'John Doue',
    time: 'Today',
    msg: 'stay hungry stay foolish!',
    status: 'online',
  },
  {
    avatar: Avatar3,
    name: 'Alex Thompson',
    time: '10 min ago',
    msg: 'Cheers!',
    status: '',
  },
  {
    avatar: Avatar4,
    name: 'John Doue',
    time: '10 min ago',
    msg: 'stay hungry stay foolish!',
    status: '',
  },
  {
    avatar: Avatar5,
    name: 'Shirley Hoe',
    time: '30 min ago',
    msg: 'Cheers!',
    status: '',
  },
])
</script>

<template>
  <PerfectScrollbar :style="{ height: '430px' }" :options="{ suppressScrollX: true }">
    <VList
      class="py-3 px-2"
      lines="two"
      aria-label="customers"
      aria-busy="true"
    >
      <VListItem
        v-for="(customer, i) in customers"
        :key="i"
        rounded="sm"
        color="secondary"
        class="py-3"
      >
        <template #prepend>
          <VAvatar
            size="40"
            class="py-2"
          >
            <img
              :src="customer.avatar"
              width="40"
              alt="Julia"
            >
          </VAvatar>
        </template>
        <div class="d-inline-flex align-center justify-space-between w-100">
          <div>
            <h6 class="text-subtitle-1 mb-0">
              {{ customer.name }}
            </h6>
            <p class="text-body-1 text-lightText mb-0">
              {{ customer.msg }}
            </p>
          </div>
          <VAvatar
            v-if="customer.status === 'online'"
            size="10"
            color="success"
            variant="flat"
          />
          <span
            v-else
            class="text-sm-body-1 text-caption text-lightText"
          >
            <SvgSprite
              name="custom-clock-outline"
              style="width: 14px; height: 14px; vertical-align: -2px"
            />
            {{ customer.time }}
          </span>
        </div>
      </VListItem>
    </VList>
  </PerfectScrollbar>
</template>
