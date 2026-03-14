<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  icon: String,
  title: String,
  action: Function,
  isActive: Function,
})

const spritePath = ref<string | null>(null)

onMounted(async () => {
  try {
  // Load the SVG sprite dynamically with an absolute path
    spritePath.value = '/assets/svg/remixicon.symbol.svg'
  }
  catch (error) {
    console.error('Error loading SVG sprite:', error)
  }
})
</script>

<template>
  <div>
    <div
      class="menu-item"
      :class="{ 'is-active': isActive ? isActive() : null }"
      :title="props.title"
      @click="action"
    >
      <svg class="remix">
        <use :xlink:href="`${spritePath}#ri-${props.icon}`" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: inherit;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: #fff;
    background-color: rgb(var(--v-theme-primary));
  }
}
</style>
