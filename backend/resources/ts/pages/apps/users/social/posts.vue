<script setup lang="ts">
import { ref } from 'vue'
import Banner from '@/views/apps/socialprofile/BannerSection.vue'
import PostListing from '@/views/apps/socialprofile/PostListing.vue'
import About from '@/views/apps/socialprofile/AboutCard.vue'
import WritePost from '@/views/apps/socialprofile/WritePost.vue'

const page = ref({ title: 'Social Profile' })

const breadcrumbs = ref([
  {
    title: 'Users',
    disabled: false,
    href: '/',
  },
  {
    title: 'Social Profile',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <Banner />
    </VCol>
  </VRow>
  <VRow class="mt-4">
    <VCol
      lg="8"
      md="8"
      sm="12"
      cols="12"
    >
      <WritePost />
      <PostListing />
    </VCol>
    <VCol
      lg="4"
      md="4"
      sm="12"
      cols="12"
    >
      <About />
    </VCol>
  </VRow>
</template>
