<script setup lang="ts">
import { shallowRef } from 'vue'
import { format } from 'date-fns'

// third-party
const props = defineProps({
  selectedMail: Object || Array,
})

defineEmits(['toggleDetail'])

const sorting = shallowRef([{ title: 'Name' }, { title: 'Date' }, { title: 'Rating' }, { title: 'Unread' }])
</script>

<template>
  <div class="topbarMail d-flex ga-4 align-center w-100">
    <VBtn
      icon
      rounded="md"
      flat
      size="small"
      @click="$emit('toggleDetail')"
    >
      <SvgSprite
        name="custom-chevron-outline"
        style="width: 16px; height: 16px; transform: rotate(180deg)"
      />
    </VBtn>
    <div class="d-flex align-center ga-4 w-100">
      <img
        :src="props.selectedMail?.profile.avatar"
        class="rounded-md"
        :alt="props.selectedMail?.profile.avatar"
        width="40"
      >
      <div>
        <h4 class="text-md-h4 text-h5 mb-n1">
          {{ props.selectedMail?.profile.name }}
        </h4>
        <small>From: {{ props.selectedMail?.profile.email }}</small>
      </div>
      <div class="ms-auto text-subtitle-2 text-medium-emphasis">
        {{ format(new Date(selectedMail?.time!), 'd MMM') }}
      </div>
    </div>
  </div>
  <div class="d-flex align-center ga-2 mt-3">
    <h3 class="text-lg-h3 text-h5 py-4 me-auto">
      {{ selectedMail?.subject }}
    </h3>
    <VBtn
      icon
      size="small"
      flat
      rounded="md"
    >
      <SvgSprite
        v-if="selectedMail?.starred"
        name="custom-star-outline"
        class="text-warning"
        style="width: 16px; height: 16px"
      />
      <SvgSprite
        v-else
        name="custom-star-outline"
        style="width: 16px; height: 16px"
      />
    </VBtn>
    <VBtn
      icon
      size="small"
      flat
      rounded="md"
    >
      <SvgSprite
        v-if="selectedMail?.important"
        name="custom-tag-fill"
        class="text-secondary"
        style="width: 16px; height: 16px"
      />
      <SvgSprite
        v-else
        name="custom-tag-outline"
        style="width: 16px; height: 16px"
      />
    </VBtn>
    <VBtn
      id="menu-activator"
      icon
      size="small"
      aria-label="menu"
      flat
      rounded="md"
    >
      <SvgSprite
        name="custom-more-outline"
        style="width: 16px; height: 16px"
      />
    </VBtn>
    <VMenu
      activator="#menu-activator"
      width="100"
      rounded="md"
    >
      <VList
        elevation="24"
        density="compact"
        aria-label="list"
        aria-busy="true"
        class="py-0"
        rounded="md"
      >
        <VListItem
          v-for="(item, index) in sorting"
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
  <div class="py-4 text-subtitle-1 font-weight-light">
    Dear {{ selectedMail?.profile.name }},<br><br>
    <p>{{ selectedMail?.message }}</p>
    <br>
    <p>Kindly Regards,</p>
    <p>{{ selectedMail?.sender.name }}</p>
  </div>
  <div class="py-3">
    <h5 class="text-h5">
      <SvgSprite
        name="custom-paper-clip-2"
        style="width: 16px; height: 16px; vertical-align: -3px"
      />
      {{ selectedMail?.attachments.length }} Attachement
    </h5>
    <VRow class="mt-4">
      <VCol
        v-for="attach in selectedMail?.attachments"
        :key="attach.title"
        cols="6"
        sm="3"
      >
        <VCard
          class="overflow-hidden"
          variant="outlined"
        >
          <VImg
            :src="attach.image"
            height="100px"
            cover
          />
          <div class="pa-3">
            <div class="d-flex align-center">
              <h5 class="me-auto text-truncate">
                {{ attach.title }}
              </h5>
              <VBtn
                icon
                size="small"
                flat
                rounded="md"
              >
                <SvgSprite
                  name="custom-download-outline"
                  style="width: 16px; height: 16px"
                />
              </VBtn>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <div class="py-3 d-flex ga-4">
    <VBtn
      color="primary"
      variant="outlined"
      rounded="md"
    >
      <SvgSprite
        name="custom-edit-outline"
        class="me-1"
        style="width: 16px; height: 16px"
      /> Reply
    </VBtn>
    <VBtn
      color="primary"
      variant="outlined"
      rounded="md"
    >
      <SvgSprite
        name="custom-forward-outline"
        class="me-1"
        style="width: 16px; height: 16px"
      /> Forward
    </VBtn>
  </div>
</template>
