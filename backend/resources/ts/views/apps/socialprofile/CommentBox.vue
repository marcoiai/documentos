<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import uniqueId from 'lodash/uniqueId'
import { usePostsStore } from '@db/apps/users/posts'
import type { Reply } from '@db/apps/users/types'

const propsComment = defineProps({
  comments: Object || Array,
  postId: String,
})

const store = usePostsStore()
const replyValue = ref('')
const items = shallowRef([{ title: 'Edit' }, { title: 'Delete' }])

const onSubmit = async (id: string, commentid: string, reply: Reply | string) => {
  const replyId = uniqueId('#REPLY_')

  const newReply = {
    id: replyId,
    profile: {
      id: uniqueId('#REPLY_'),
      avatar: propsComment.comments?.profile.avatar,
      name: propsComment.comments?.profile.name,
      time: 'now',
    },
    data: {
      comment: typeof reply === 'string' ? reply : reply?.data?.comment ?? '',
      likes: {
        like: false,
        value: 0,
      },
      replies: [],
    },
  }

  store.addReply(id, commentid, newReply)
  replyValue.value = ''
}

const showReplyBox = ref(false)

const toggleReplybox = () => {
  return (showReplyBox.value = !showReplyBox.value)
}
</script>

<template>
  <VCard
    variant="flat"
    elevation="0"
    rounded="lg"
    class="bg-containerBg mb-3 pa-5"
  >
    <div class="d-flex ga-4 align-center">
      <img
        :src="comments?.profile.avatar"
        width="30"
        alt="avatar"
        class="rounded-md"
      >
      <div class="d-block d-sm-flex align-center ga-4">
        <h5 class="text-subtitle-1 mb-0">
          {{ comments?.profile.name }}
        </h5>
        <span class="text-subtitle-2 opacity-50">
          <VBadge
            dot
            color="secondary"
            size="small"
            inline
          />
          {{ comments?.profile.time }}
        </span>
      </div>
      <VMenu rounded="md">
        <template #activator="{ props }">
          <VBtn
            icon
            size="small"
            aria-label="menu"
            variant="text"
            color="secondary"
            class="ms-auto"
            rounded="md"
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
          density="compact"
          class="py-0"
          rounded="md"
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
    <div class="py-3 text-body-1">
      {{ comments?.data.comment }}
    </div>
    <!-- - Like and comment count -->
    <div class="my-1 d-flex ga-4">
      <VBtn
        color="primary"
        variant="text"
        size="small"
        rounded="md"
      >
        <template #prepend>
          <SvgSprite
            name="custom-like-outline"
            style="width: 16px; height: 16px"
          />
        </template>
        {{ comments?.data && comments?.data.likes && comments?.data.likes.value }} Like
      </VBtn>
      <VBtn
        color="secondary"
        rounded="md"
        variant="text"
        size="small"
        @click="toggleReplybox"
      >
        <template #prepend>
          <SvgSprite
            name="custom-undo-outline"
            style="width: 16px; height: 16px"
          />
        </template>
        Reply
      </VBtn>
    </div>
  </VCard>

  <div
    v-if="comments?.data.replies"
    class="ml-10"
  >
    <div
      v-for="reply in comments?.data.replies"
      :key="reply.name"
    >
      <VCard
        variant="flat"
        elevation="0"
        rounded="lg"
        class="bg-containerBg mb-3 pa-5"
      >
        <div class="d-flex ga-4 align-center">
          <img
            :src="reply.profile.avatar"
            width="30"
            class="rounded-md"
            alt="avatar"
          >
          <div class="d-block d-sm-flex align-center ga-4">
            <h5 class="text-subtitle-1 mb-0">
              {{ reply.profile.name }}
            </h5>
            <span class="text-subtitle-2 opacity-50">
              <VBadge
                dot
                color="secondary"
                size="small"
                inline
              />
              {{ reply.profile.time }}
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
                class="ml-auto"
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
              density="compact"
              class="py-0"
              rounded="md"
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
        <div class="py-3 text-body-1">
          {{ reply.data.comment }}
        </div>
        <!-- - Like and comment count -->
        <div class="my-1 d-flex ga-4">
          <VBtn
            color="primary"
            variant="text"
            size="small"
          >
            <template #prepend>
              <SvgSprite
                name="custom-like-outline"
                style="width: 16px; height: 16px"
              />
            </template>
            {{ reply.data && reply.data.likes && reply.data.likes.value }} Like
          </VBtn>
          <VBtn
            color="secondary"
            variant="text"
            size="small"
            @click="toggleReplybox"
          >
            <template #prepend>
              <SvgSprite
                name="custom-undo-outline"
                style="width: 16px; height: 16px"
              />
            </template>
            Reply
          </VBtn>
        </div>
      </VCard>
    </div>
  </div>
  <div
    v-if="showReplyBox"
    class="d-block d-sm-flex ga-4 align-center mb-5 ml-10"
  >
    <img
      :src="comments?.profile.avatar"
      width="40"
      class="flex-shrink-0 d-none d-sm-block rounded-md"
      alt="avatar"
    >
    <VTextField
      v-model="replyValue"
      variant="outlined"
      single-line
      color="primary"
      placeholder="Write Reply"
      hide-details
    />
    <VBtn
      color="secondary"
      class="mt-3 mt-sm-0"
      variant="flat"
      size="large"
      @click="postId && comments && comments.id && onSubmit(postId, comments.id, replyValue)"
    >
      Reply
    </VBtn>
  </div>
</template>
