<script setup lang="ts">
import { ref } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Hightlight from '@tiptap/extension-highlight'
import EditorMenubar from '@/views/forms/plugins/editor/EditorMenubar.vue'

defineEmits(['closeDialog'])

const ccBcc = ref(false)

const editor = useEditor({
  extensions: [StarterKit, TaskList, TaskItem, Hightlight],
  content: '',
})
</script>

<template>
  <VCard elevation="0">
    <VCardItem class="pb-2">
      <div class="d-flex align-center">
        <h4 class="mb-0">
          New Message
        </h4>
        <VBtn
          icon
          size="small"
          color="primary"
          aria-label="close"
          rounded="md"
          variant="text"
          class="ms-auto"
          elevation="0"
          @click="$emit('closeDialog')"
        >
          <SvgSprite
            name="custom-close"
            style="width: 16px; height: 16px; transform: rotate(45deg)"
          />
        </VBtn>
      </div>
    </VCardItem>
    <VDivider />
    <VCardText class="pb-4">
      <VRow>
        <VCol
          sm="12"
          cols="12"
        >
          <p
            class="text-secondary text-right cursor-pointer"
            @click="ccBcc = !ccBcc"
          >
            CC & BCC
          </p>
        </VCol>
        <VCol
          sm="12"
          cols="12"
        >
          <VTextField
            single-line
            density="comfortable"
            required
            variant="outlined"
            color="primary"
            hide-details
          >
            <template #prepend-inner>
              <span class="text-secondary">To</span>
            </template>
          </VTextField>
        </VCol>
        <VCol
          sm="12"
          cols="12"
        >
          <VTextField
            single-line
            density="comfortable"
            required
            variant="outlined"
            color="primary"
            hide-details
          >
            <template #prepend-inner>
              <span class="text-secondary">Subject</span>
            </template>
          </VTextField>
        </VCol>
        <VCol
          v-if="ccBcc"
          sm="12"
          cols="12"
        >
          <div>
            <VTextField
              label="CC"
              density="comfortable"
              required
              variant="outlined"
              color="primary"
              hide-details
              class="mb-5"
            />
            <VTextField
              label="BCC"
              density="comfortable"
              required
              variant="outlined"
              color="primary"
              hide-details
            />
          </div>
        </VCol>
        <VCol
          sm="12"
          cols="12"
        >
          <div v-if="editor">
            <EditorMenubar :editor="editor" />
          </div>
          <EditorContent :editor="editor" />
        </VCol>
        <VCol
          sm="12"
          cols="12"
        >
          <div class="d-flex">
            <VBtn
              icon
              elevation="0"
              aria-label="upload"
              rounded="md"
            >
              <SvgSprite
                name="custom-upload-outline"
                style="width: 16px; height: 16px"
              />
            </VBtn>
            <VBtn
              icon
              elevation="0"
              aria-label="attach"
              rounded="md"
            >
              <SvgSprite
                name="custom-paper-clip-2"
                style="width: 16px; height: 16px"
              />
            </VBtn>
            <VBtn
              elevation="0"
              rounded="md"
              color="primary"
              class="ms-auto"
            >
              Reply
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
