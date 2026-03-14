<script setup lang="ts">
import { computed, onMounted } from 'vue'
import PostItem from './PostItem.vue'
import { usePostsStore } from '@db/apps/users/posts'

const store = usePostsStore()

onMounted(() => {
  store.fetchPosts()
})

interface PostItems {
  id: number

  // Add other properties as needed
}

const getPosts = computed<PostItems[]>(() => {
  return store.posts
})
</script>

<template>
  <VRow class="mt-4">
    <VCol
      v-for="post in getPosts"
      :key="post.id"
      cols="12"
    >
      <PostItem :post="post" />
    </VCol>
  </VRow>
</template>
