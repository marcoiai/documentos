<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { sub } from 'date-fns'
import TaskCard from './TaskCard.vue'
import { useKanbanStore } from '@db/apps/kanban/index'

const store = useKanbanStore()

onMounted(() => {
  store.fetchkanbanItems()
})

const getTask = computed(() => store.kanbanItems)
const msg = ref('')
const showTaskform = ref<number | null>(null)
const Draggable = VueDraggableNext

const handleToggle = (id: number) => {
  showTaskform.value = id
}

const addTaskCard = (id: number, task: string) => {
  const newTask = {
    description: '',
    userStory: `${Math.floor(Math.random() * 9000) + 1000}`,
    dueDate: sub(new Date(), { days: 12 }),
    id: 1,
    priority: 'low',
    title: task,
  }

  store.addTask(id, newTask)
  msg.value = ''
  showTaskform.value = null
}
</script>

<template>
  <div class="overflow-auto">
    <VRow class="taskBoardBox ma-0">
      <VCol
        v-for="column in getTask"
        :key="column.title"
        cols="3"
      >
        <div class="bg-gray100 pa-4 rounded-lg task-card">
          <h5 class="text-h6 font-weight-medium mb-5">
            {{ column.title }}
          </h5>
          <Draggable
            :list="column.tasks"
            :animation="200"
            ghost-class="ghost-card"
            group="tasks"
          >
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <TaskCard
              v-for="task in column.tasks"
              :key="task.id"
              :task="task"
              class="mt-3 cursor-move"
            />
          </Draggable>
          <VCard
            v-if="showTaskform === column.id"
            class="pa-3 pt-1 mt-4 bg-surface"
            rounded="lg"
            variant="outlined"
            elevation="0"
          >
            <VTextField
              v-model="msg"
              variant="plain"
              hide-details
              density="compact"
              color="primary"
              persistent-placeholder
              placeholder="Add Task"
            />

            <div class="d-flex align-center justify-space-between mt-1 ga-2">
              <div class="d-flex align-center ga-1">
                <VBtn
                  icon
                  size="small"
                  variant="text"
                  color="primary"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-multi-users"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
                <VBtn
                  icon
                  size="small"
                  variant="text"
                  color="primary"
                  rounded="md"
                >
                  <SvgSprite
                    name="custom-calculator"
                    style="width: 20px; height: 20px"
                  />
                </VBtn>
              </div>
              <div>
                <VBtn
                  icon
                  size="small"
                  rounded="md"
                  variant="text"
                  color="error"
                  @click="showTaskform = showTaskform === column.id ? null : column.id"
                >
                  <SvgSprite
                    name="custom-close"
                    style="width: 18px; height: 18px; transform: rotate(45deg)"
                  />
                </VBtn>
                <VBtn
                  color="primary"
                  size="small"
                  rounded="md"
                  elevation="0"
                  @click="addTaskCard(column.id, msg)"
                >
                  Add
                </VBtn>
              </div>
            </div>
          </VCard>
          <VBtn
            v-else
            variant="tonal"
            rounded="md"
            class="mt-4"
            border="secondary dashed thin opacity-100"
            color="secondary"
            block
            @click="handleToggle(column.id)"
          >
            Add Task
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.task-card {
  border: 1px solid rgb(var(--v-theme-borderLight));
}
.taskBoardBox {
  width: 1200px;
  .secondary-dashed {
    .v-btn__underlay {
      background: transparent;
    }
  }
}
</style>
