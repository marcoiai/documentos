<script setup lang="ts">
import { shallowRef } from 'vue'

const footerLink = shallowRef([
  {
    title: 'Home',
    link: '/landing',
  },
  {
    title: 'Documentation',
    link: 'https://phoenixcoded.gitbook.io/able-pro',
  },
  {
    title: 'Support',
    link: 'https://phoenixcoded.authordesk.app/',
  },
])
</script>

<template>
  <VFooter class="px-0 footer">
    <VRow
      justify="center"
      no-gutters
    >
      <VCol cols="6">
        <p class="text-caption mb-0">
          © Able Pro crafted with ♥ by Team 
          <a href="https://themeforest.net/user/phoenixcoded" class="text-darkText" target="_blank" rel="noopener noreferrer">Phoenixcoded</a>
        </p>
      </VCol>
      <VCol
        class="text-end"
        cols="6"
      >
        <a
          v-for="(item, i) in footerLink"
          :key="i"
          class="mx-2 text-caption text-darkText"
          target="_blank"
          rel="noopener noreferrer"
          :href="item.link"
        >
          {{ item.title }}
        </a>
      </VCol>
    </VRow>
  </VFooter>
</template>
