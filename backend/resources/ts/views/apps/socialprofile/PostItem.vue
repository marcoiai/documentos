<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import uniqueId from 'lodash/uniqueId'
import Comments from './CommentBox.vue'
import { usePostsStore } from '@db/apps/users/posts'
import type { Comment, Reply } from '@db/apps/users/types'

const propsItem = defineProps({
  post: Object || Array,
})

const store = usePostsStore()
const showCommentBox = ref(!(propsItem.post?.comments && propsItem.post?.comments.length > 0))
const searchValue = ref('')
const items = shallowRef([{ title: 'Edit' }, { title: 'Delete' }])

const shareitems = shallowRef([
  { title: 'Share Now', icon: 'custom-hierarchy-outline' },
  { title: 'Share to Friends', icon: 'custom-multi-users' },
  { title: 'Send in Messanger', icon: 'custom-message-outline' },
  { title: 'Copy Link', icon: 'custom-copy' },
])

const toggleCommentbox = () => {
  return (showCommentBox.value = !showCommentBox.value)
}

const handlePostLikes = async (postId: string) => {
  await store.likePost(postId)
}

const onSubmit = async (id: string, comment: Comment | string) => {
  const commentId = uniqueId('#COMMENT_')

  const newComment: Reply = {
    id: commentId,
    profile: {
      id: uniqueId('#COMMENT_'),
      avatar: propsItem.post?.profile.avatar,
      name: propsItem.post?.profile.name,
      time: 'now',
    },
    data: {
      comment: typeof comment === 'string' ? comment : comment?.data?.comment ?? '', // Add a null check for comment.data
      likes: {
        like: false,
        value: 0,
      },
      replies: [],
    },
  }

  store.addComment(id, newComment)
  searchValue.value = ''
}
</script>

<template>
  <VCard
    variant="outlined"
    elevation="0"
    class="bg-surface pa-5"
    rounded="lg"
  >
    <div class="d-flex ga-4 align-center">
      <img
        :src="post?.profile.avatar"
        width="40"
        class="rounded-md"
        alt="avatar"
      >
      <div class="d-block d-sm-flex align-center ga-4">
        <h5 class="text-h5 mb-0">
          {{ post?.profile.name }}
        </h5>
        <span class="text-subtitle-2 opacity-50 d-flex align-center">
          <VBadge
            dot
            color="secondary"
            size="small"
            inline
          />
          {{ post?.profile.time }}
        </span>
      </div>
      <VMenu rounded="md">
        <template #activator="{ props }">
          <VBtn
            icon
            size="small"
            aria-label="menu"
            rounded="md"
            variant="text"
            color="secondary"
            class="ms-auto"
            v-bind="props"
          >
            <SvgSprite
              name="custom-more-outline"
              style="width: 18px; height: 18px; transform: rotate(90deg)"
            />
          </VBtn>
        </template>

        <VList
          elevation="24"
          aria-label="menu"
          aria-busy="true"
          density="compact"
          rounded="md"
          class="py-0"
        >
          <VListItem
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <VListItemTitle class="text-h6">
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>
    <div class="py-4 text-body-1">
      {{ post?.data.content }}
    </div>
    <!-- - If Images -->
    <VRow v-if="post?.data.images">
      <VCol
        v-for="photo in post?.data.images"
        :key="photo.img"
        :md="photo.featured ? '12' : '6'"
      >
        <VImg
          :src="photo.img"
          alt="photo"
          class="h-100"
        />
      </VCol>
    </VRow>
    <!-- If Video -->
    <div
      v-if="post?.data.video"
      class="rounded-md overflow-hidden my-5"
    >
      <iframe
        :src="`https://www.youtube.com/embed/${post?.data.video}`"
        class="rounded-md"
        title="video"
        frameborder="0"
        width="100%"
        height="400"
      />
    </div>
    <!-- - Like and comment count -->
    <div class="my-4 mt-5 d-flex ga-4">
      <VBtn
        :color="post?.data && post?.data.likes && post?.data.likes.like ? 'primary' : 'inherit'"
        variant="text"
        rounded="md"
        size="small"
        @click="handlePostLikes(`${post?.id}`)"
      >
        <template #prepend>
          <SvgSprite
            name="custom-like-outline"
            style="width: 16px; height: 16px"
          />
        </template>
        {{ post?.data && post?.data.likes && post?.data.likes.value }} <span class="d-none d-sm-inline-block ml-1">Like</span>
      </VBtn>
      <VBtn
        color="secondary"
        rounded="md"
        variant="text"
        size="small"
        @click="toggleCommentbox"
      >
        <template #prepend>
          <SvgSprite
            name="custom-message-outline"
            style="width: 16px; height: 16px"
          />
        </template>
        {{ post?.data.comments ? post?.data.comments.length : 0 }}
        <span class="d-none d-sm-inline-block ml-1">Comment</span>
      </VBtn>
      <VMenu rounded="md">
        <template #activator="{ props }">
          <VBtn
            icon
            class="ms-auto"
            aria-label="menu"
            rounded="md"
            variant="text"
            size="small"
            v-bind="props"
          >
            <SvgSprite
              name="custom-hierarchy-outline"
              style="width: 16px; height: 16px"
            />
          </VBtn>
        </template>

        <VList
          elevation="24"
          density="compact"
          aria-label="menu"
          aria-busy="true"
          class="py-0"
          rounded="md"
        >
          <VListItem
            v-for="(item, index) in shareitems"
            :key="index"
            :value="index"
          >
            <template #prepend>
              <SvgSprite
                :name="item.icon || ''"
                style="width: 18px; height: 18px"
              />
            </template>
            <VListItemTitle class="ms-3 text-h6">
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>
    <!-- - Comment Form -->
    <div
      v-if="showCommentBox"
      class="d-block d-sm-flex ga-4 align-center mb-5"
    >
      <img
        :src="post?.profile.avatar"
        width="40"
        class="flex-shrink-0 d-none d-sm-block rounded-md"
        alt="avatar"
      >
      <VTextField
        v-model="searchValue"
        variant="outlined"
        single-line
        color="primary"
        density="comfortable"
        placeholder="Write Comment"
        hide-details
      />
      <VBtn
        color="secondary"
        variant="flat"
        rounded="md"
        :disabled="searchValue === ''"
        class="mt-3 mt-sm-0"
        size="large"
        @click="onSubmit(post?.id, searchValue)"
      >
        Comment
      </VBtn>
    </div>
    <!-- If Comment -->
    <div v-if="post?.data.comments">
      <div
        v-for="comments in post?.data.comments"
        :key="comments.id"
      >
        <Comments
          :comments="comments"
          :post-id="post?.id"
        />
      </div>
    </div>
  </VCard>
</template>
