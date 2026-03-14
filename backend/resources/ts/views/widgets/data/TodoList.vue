<script setup lang="ts">
import { shallowRef } from 'vue'

const todos = shallowRef([
  {
    item: 'Check your Email',
    done: true,
  },
  {
    item: 'Make YouTube Video',
    done: true,
  },
  {
    item: 'Create Banner',
    done: true,
  },
  {
    item: 'Upload Project',
    done: false,
  },
  {
    item: 'Update Task',
    done: false,
  },
  {
    item: 'Task Issue',
    done: false,
  },
  {
    item: 'Deploy Project',
    done: false,
  },
])
</script>

<template>
  <div class="pa-5">
    <div
      v-for="(todo, i) in todos"
      :key="i"
      class="pb-0 todo-list"
      :value="todo.item"
    >
      <VCheckbox
        :model-value="todo.done"
        color="primary"
        density="compact"
        hide-details
      >
        <template #label>
          <div class="ms-2 text-darkText">
            {{ todo.item }}
          </div>
        </template>
      </VCheckbox>
    </div>
  </div>
</template>
