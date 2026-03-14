<script setup lang="ts">
import { ref } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// component content
const page = ref({ title: 'Timeline' })
const subContent = ref({ content: 'The timeline displays a list of events in chronological order.' })
const path = ref({ filepath: 'resources/ts/pages/ui-elements/advance/timeline' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/timelines' })

// timeline1 data

const time2 = ref([
  {
    color: 'primary',
    text: 'Eat',
  },
  {
    color: 'secondary',
    text: 'Code',
  },
  {
    color: 'error',
    text: 'Sleep',
  },
  {
    color: 'warning',
    text: 'Repeat',
  },
])

const time3 = ref([
  {
    color: 'primary',
    text: 'Eat',
    icon: 'custom-coffee-outline',
    time: '09:30 am',
    subtext: 'Because you need strength',
  },
  {
    color: 'success',
    text: 'Code',
    icon: 'custom-desktop-outline',
    time: '10:00 am',
    subtext: 'Because it\'s awesome!',
  },
  {
    color: 'warning',
    text: 'Gift',
    icon: 'custom-gift-outline',
    time: '11:30 am',
    subtext: 'Because you need.',
  },
  {
    color: 'error',
    text: 'Repeat',
    icon: 'custom-retweet-outline',
    time: '12:30 am',
    subtext: 'This is the life you love!',
  },
])
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol cols="12">
      <VRow>
        <!-- Basic -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Basic">
            <VTimeline
              side="end"
              align="start"
              line-color="borderLight"
              line-inset="1"
              class="dot-outline"
              truncate-line="both"
            >
              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <div class="text-subtitle-1 font-weight-regular">
                  Eat
                </div>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <div class="text-subtitle-1 font-weight-regular">
                  Code
                </div>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <div class="text-subtitle-1 font-weight-regular">
                  Sleep
                </div>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <div class="text-subtitle-1 font-weight-regular">
                  Repeat
                </div>
              </VTimelineItem>
            </VTimeline>
          </UiParentCard>
        </VCol>
        <!-- Alternating -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Alternating Positioned">
            <VTimeline
              align="start"
              line-color="borderLight"
              class="dot-outline alrenating-timeline"
              line-inset="1"
              truncate-line="start"
            >
              <VTimelineItem
                v-for="(time, i) in time2"
                :key="i"
                dot-color="primary"
                size="x-small"
              >
                <VCardTitle class="text-subtitle-1 pa-0 font-weight-regular">
                  {{ time.text }}
                </VCardTitle>
              </VTimelineItem>
            </VTimeline>
          </UiParentCard>
        </VCol>
        <!-- Dot Color -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Colors">
            <VTimeline
              align="start"
              line-color="borderLight"
              class="dot-outline alrenating-timeline"
              line-inset="1"
              truncate-line="both"
            >
              <VTimelineItem
                v-for="(time, i) in time2"
                :key="i"
                :dot-color="time.color"
                size="x-small"
              >
                <VCardTitle class="text-subtitle-1 pa-0 font-weight-regular">
                  {{ time.text }}
                </VCardTitle>
              </VTimelineItem>
            </VTimeline>
          </UiParentCard>
        </VCol>
        <!-- Opposite Content -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <UiParentCard title="Opposite Content">
            <VTimeline
              truncate-line="both"
              line-color="borderLight"
              line-inset="1"
              class="dot-outline alrenating-timeline"
            >
              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">09:30 am</span>
                </template>
                <span class="font-weight-medium">Eat</span>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">10:00 am</span>
                </template>
                <span class="font-weight-medium">Code</span>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">12:00 am </span>
                </template>
                <span class="font-weight-medium">Sleep</span>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">9:00 am</span>
                </template>
                <span class="font-weight-medium">Repeat</span>
              </VTimelineItem>
            </VTimeline>
          </UiParentCard>
        </VCol>
        <!-- Line inset -->
        <VCol
          cols="12"
          lg="8"
        >
          <UiParentCard title="Line inset">
            <VTimeline
              truncate-line="both"
              direction="horizontal"
              line-inset="12"
              line-color="borderLight"
              class="dot-outline"
            >
              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">09:30 am</span>
                </template>
                <span class="font-weight-medium">Eat</span>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">10:00 am</span>
                </template>
                <span class="font-weight-medium">Code</span>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">12:00 am </span>
                </template>
                <span class="font-weight-medium">Sleep</span>
              </VTimelineItem>

              <VTimelineItem
                dot-color="primary"
                size="x-small"
              >
                <template #opposite>
                  <span class="text-medium-emphasis font-weight-medium">9:00 am</span>
                </template>
                <span class="font-weight-medium">Repeat</span>
              </VTimelineItem>
            </VTimeline>
          </UiParentCard>
        </VCol>
        <!-- Customized -->
        <VCol cols="12">
          <UiParentCard title="Customized">
            <VRow class="justify-center">
              <VCol
                lg="6"
                md="8"
              >
                <div class="overflow-auto">
                  <VTimeline
                    align="start"
                    line-color="borderLight"
                    class="custom-timeline"
                    truncate-line="start"
                  >
                    <VTimelineItem
                      v-for="(time, i) in time3"
                      :key="i"
                      :dot-color="time.color"
                      size="large"
                      rounded="lg"
                      fill-dot
                    >
                      <template #icon>
                        <SvgSprite
                          :name="time.icon || ''"
                          :class="`text-${time.color}`"
                          style="width: 24px; height: 24px"
                        />
                      </template>
                      <template #opposite>
                        <span class="text-lightText text-caption pt-sm-4 pt-3 d-block">{{ time.time }}</span>
                      </template>
                      <VCard variant="text">
                        <div class="bg-containerBg rounded-md pa-4">
                          <div class="text-h6">
                            {{ time.text }}
                          </div>
                          <p class="text-lightText mb-0">
                            {{ time.subtext }}
                          </p>
                        </div>
                      </VCard>
                    </VTimelineItem>
                  </VTimeline>
                </div>
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
