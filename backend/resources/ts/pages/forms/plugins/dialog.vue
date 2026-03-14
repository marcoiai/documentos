<script setup>
import { ref } from 'vue'

import DialogsActivator from '@/views/forms/plugins/dialogs/DialogsActivator.vue'
import DialogsModel from '@/views/forms/plugins/dialogs/DialogsModel.vue'
import DialogsFullscreen from '@/views/forms/plugins/dialogs/DialogsFullscreen.vue'
import DialogsTransitions from '@/views/forms/plugins/dialogs/DialogsTransitions.vue'
import DialogsPersistent from '@/views/forms/plugins/dialogs/DialogsPersistent.vue'
import DialogsScrollable from '@/views/forms/plugins/dialogs/DialogsScrollable.vue'
import DialogsForm from '@/views/forms/plugins/dialogs/DialogsForm.vue'
import DialogsNested from '@/views/forms/plugins/dialogs/DialogsNested.vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Dialog' })

const subContent = ref({
  content: 'Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.',
})

const path = ref({ filepath: 'resources/ts/pages/forms/plugins/dialog' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/dialogs/' })
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <VRow>
        <VCol
          cols="12"
          sm="12"
          md="6"
        >
          <UiParentCard title="Activator">
            <DialogsActivator />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
        >
          <UiParentCard title="V-model">
            <DialogsModel />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex align-items-stretch"
        >
          <UiParentCard title="Fullscreen">
            <DialogsFullscreen />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex align-items-stretch"
        >
          <UiParentCard title="Transitions">
            <DialogsTransitions />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex align-items-stretch"
        >
          <UiParentCard title="Persistent">
            <DialogsPersistent />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex align-items-stretch"
        >
          <UiParentCard title="Scrollable">
            <DialogsScrollable />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex align-items-stretch"
        >
          <UiParentCard title="Form">
            <DialogsForm />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex align-items-stretch"
        >
          <UiParentCard title="Nested Dialog">
            <DialogsNested />
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
