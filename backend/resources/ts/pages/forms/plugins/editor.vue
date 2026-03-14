<script setup>
import { ref } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Hightlight from '@tiptap/extension-highlight'
import EditorMenubar from '@/views/forms/plugins/editor/EditorMenubar.vue'

const page = ref({ title: 'Editor' })

const breadcrumbs = ref([
  {
    title: 'Plugins',
    disabled: false,
    href: '#',
  },
  {
    title: 'Editor',
    disabled: true,
    href: '#',
  },
])

const editor = useEditor({
  extensions: [StarterKit, TaskList, TaskItem, Hightlight],
  content: `
  <h2>Hi there,</h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there
        are all kind of basic text styles you’d probably expect from a text
        editor. But wait until you see the lists:
      </p>
      <ul>
        <li>That’s a bullet list with one …</li>
        <li>… or two list items.</li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more.
        Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg
        though. Give it a try and click a little bit around. Don’t forget to
        check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
      `,
})
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol>
      <UiParentCard title="Editor">
        <div v-if="editor">
          <EditorMenubar :editor="editor" />
        </div>
        <EditorContent :editor="editor" />
      </UiParentCard>
    </VCol>
  </VRow>
</template>
