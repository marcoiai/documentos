<script setup lang="ts">
import { shallowRef } from 'vue'

import Post1 from '@images/background/post1.jpg'
import Post3 from '@images/background/post3.jpg'

const posts = shallowRef([
  {
    avatar: Post1,
    name: 'Up unpacked friendly',
    time: '14 minutes ago',
  },
  {
    video: '668nUCeBHyY',
    name: 'Up unpacked friendly',
    time: '14 minutes ago',
  },
  {
    avatar: Post3,
    name: 'Up unpacked friendly',
    time: '14 minutes ago',
  },
])
</script>

<template>
  <VList
    class="py-3"
    lines="two"
    aria-label="post list"
    aria-busy="true"
  >
    <VListItem
      v-for="(post, i) in posts"
      :key="i"
      class="py-3 ps-6"
    >
      <template #prepend>
        <div class="me-4">
          <VImg
            v-if="post.avatar"
            :src="post.avatar"
            width="90"
            height="80"
            class="rounded-md"
            cover
            :alt="post.avatar"
          />
          <!-- If Video -->
          <div
            v-if="post.video"
            class="rounded-md overflow-hidden mb-n1"
          >
            <iframe
              :src="`https://www.youtube.com/embed/${post?.video}`"
              aria-label="video"
              frameborder="0"
              width="90"
              height="76"
              class="rounded-md"
            />
          </div>
        </div>
      </template>
      <h6 class="text-subtitle-1 mb-1">
        {{ post.name }}
      </h6>
      <p class="text-caption text-lightText mb-0">
        Video | {{ post.time }}
      </p>
    </VListItem>
  </VList>
</template>
