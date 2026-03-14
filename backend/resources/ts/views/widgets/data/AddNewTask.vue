<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const menulist = ref(['Today', 'Weekly', 'Monthly'])

const tasks = shallowRef([
  {
    color: 'warning',
    name: 'Introduction for client',
    task: '2',
  },
  {
    color: 'primary',
    name: 'Creating wireframes',
    task: '8',
  },
])
</script>

<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardText class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">
          Add new task
        </h5>
        <VMenu width="150">
          <template #activator="{ props }">
            <VBtn
              icon
              color="secondary"
              aria-label="menu"
              variant="text"
              rounded="md"
              size="small"
              v-bind="props"
            >
              <SvgSprite
                name="custom-more-outline"
                style="width: 20px; height: 20px; transform: rotate(90deg)"
              />
            </VBtn>
          </template>
          <VList
            elevation="24"
            class="pa-3"
            rounded="md"
            aria-label="menu"
            aria-busy="true"
          >
            <VListItem
              v-for="(item, index) in menulist"
              :key="index"
              density="compact"
              rounded="md"
              color="secondary"
              :value="index"
            >
              <VListItemTitle class="text-h6 text-lightText">
                {{ item }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
    </VCardText>
    <VCardItem class="pt-0">
      <VList
        class="pb-0 pt-1"
        aria-label="task"
        aria-busy="true"
      >
        <VListItem class="pa-0">
          <template #prepend>
            <VAvatar
              variant="tonal"
              color="success"
              rounded="md"
            >
              <SvgSprite
                name="custom-list-outline"
                style="width: 20px; height: 20px"
              />
            </VAvatar>
          </template>
          <h5 class="text-h5 mb-0">
            New Task <VChip
              color="secondary"
              class="ms-1"
              size="small"
              variant="tonal"
            >
              20
            </VChip>
          </h5>
        </VListItem>
      </VList>
      <div class="d-flex justify-space-between py-2">
        <p class="text-body-1 mb-0">
          Tasks done
        </p>
        <p class="text-body-1 mb-0">
          42%
        </p>
      </div>
      <VProgressLinear
        aria-label="progressbar"
        rounded
        color="primary"
        model-value="50"
        height="6"
      />
      <VList
        class="py-5"
        aria-label="task list"
        aria-busy="true"
      >
        <VListItem
          v-for="(item, i) in tasks"
          :key="i"
          class="no-spacer"
          :value="item"
          rounded="md"
        >
          <template #prepend>
            <VAvatar
              size="8"
              :color="item.color"
              variant="flat"
              class="me-3"
            />
          </template>
          <h6 class="text-h6 mb-0">
            {{ item.name }}
          </h6>
          <template #append>
            <VChip
              size="small"
              rounded="md"
            >
              <template #prepend>
                <SvgSprite
                  name="custom-link1"
                  class="me-1"
                  style="width: 12px; height: 12px"
                />
              </template>
              {{ item.task }}
            </VChip>
          </template>
        </VListItem>
      </VList>
      <VBtn
        color="primary"
        rounded="md"
        block
      >
        <template #prepend>
          <SvgSprite
            name="custom-plus"
            style="width: 18px; height: 18px"
          />
        </template>
        Add task
      </VBtn>
    </VCardItem>
  </VCard>
</template>
