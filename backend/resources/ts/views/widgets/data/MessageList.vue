<script setup lang="ts">
import { shallowRef } from 'vue'

const messages = shallowRef([
  {
    color: 'info',
    icon: 'custom-facebook-fill',
    time: '2 hrs ago',
    title: '+ 1652 Followers',
    subtext: 'You’re getting more and more followers, keep it up!',
  },
  {
    color: 'error',
    icon: 'custom-shopping-cart-fill',
    time: '4 hrs ago',
    title: '+ 5 New Products were added!',
    subtext: 'Congratulations!',
  },
  {
    color: 'success',
    icon: 'custom-right-circle-fill',
    time: '1 day ago',
    title: 'Database backup completed!',
    subtext: 'Download the',
    link: 'latest backup.',
  },
  {
    color: 'primary',
    icon: 'custom-user-fill',
    time: '2 day ago',
    title: '+2 Friend Requests',
    subtext: 'This is great, keep it up!',
  },
])
</script>

<template>
  <VTimeline
    side="end"
    line-color="borderLight"
    class="my-2 custom-timeline timeline-icon-circle justify-start px-5"
  >
    <VTimelineItem
      v-for="(message, i) in messages"
      :key="i"
      :dot-color="message.color"
      fill-dot
    >
      <template #icon>
        <SvgSprite
          :name="message.icon || ''"
          :class="`text-${message.color}`"
          style="width: 20px; height: 20px"
        />
      </template>
      <template #opposite>
        <span class="text-subtitle-2 text-medium-emphasis">{{ message.time }}</span>
      </template>
      <VCard elevation="0">
        <h6 class="text-subtitle-1 mb-0">
          {{ message.title }}
        </h6>
        <span class="text-caption text-lightText">
          {{ message.subtext }}
          <RouterLink
            v-if="message.link"
            to="/widgets/data"
            class="text-primary link-hover"
          >{{ message.link }}</RouterLink>
        </span>
      </VCard>
    </VTimelineItem>
  </VTimeline>
</template>
