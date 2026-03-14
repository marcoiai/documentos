<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
// third-party
import { format } from 'date-fns'
import MailDetail from './MailDetail.vue'
import { useMailStore } from '@db/apps/mail/index'

import emptyMail from '@images/img-empty-mail.png'

defineEmits(['sToggle'])

const store = useMailStore()

onMounted(() => {
  store.fetchMails()
  store.filterMails(store.activeFilter)
})

interface MailItem {
  id: number
  isChecked: boolean
  isRead: boolean
  starred: boolean
  important: boolean
  profile: {
    avatar: string
    name: string
  }
  subject: string
  promotions: string
  forums: string
  attachments: string
  time: number

  // Add other properties as needed
}

const getMails = computed<MailItem[]>(() => {
  return store.mails
})

const searchValue = ref('')
const compact = ref(false)
const sorting = shallowRef([{ title: 'Name' }, { title: 'Date' }, { title: 'Rating' }, { title: 'Unread' }])

const emailDetails = ref(false)
const selectedMail = ref<MailItem | null>(null)

const handleFilter = async (string: string) => {
  store.SelectFilter(string)
  await store.filterMails(string)
}

const handleImportantChange = async (id: string) => {
  await store.setImportant(id)
  handleFilter(store.activeFilter)
}

const handleStarredChange = async (id: string) => {
  if (id) {
    await store.setStarred(id)
    handleFilter(store.activeFilter)
  }
}

const countSelectedMail = computed(() => {
  return getMails.value.filter(index => index.isChecked).length
})

const handleUserChange = async (data: MailItem | null) => {
  if (data) {
    await store.setRead(data.id.toString()) // Ensure id is converted to string if necessary
    handleFilter(store.activeFilter)
    emailDetails.value = true
    selectedMail.value = data
  }
}

const filteredMails = computed(() => {
  return getMails.value.filter(mail => {
    return mail.profile.name.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})
</script>

<template>
  <div v-if="!emailDetails">
    <!-- - Topbar Row -->
    <div class="pa-3 d-flex align-center">
      <VBtn
        icon
        size="small"
        aria-label="menu"
        class="d-lg-block d-none"
        rounded="md"
        variant="text"
        @click="$emit('sToggle')"
      >
        <SvgSprite
          name="custom-menu-outline"
          style="width: 18px; height: 18px"
        />
      </VBtn>
      <VBtn
        icon
        size="small"
        aria-label="fullscreen"
        rounded="md"
        flat
        @click="compact = !compact"
      >
        <SvgSprite
          name="custom-full-screen-outline"
          style="width: 16px; height: 16px"
        />
      </VBtn>
      <VBtn
        id="menu-activator"
        icon
        size="small"
        aria-label="menu"
        rounded="md"
        flat
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
          density="compact"
          elevation="24"
          aria-label="list"
          aria-busy="true"
          rounded="md"
        >
          <VListItem
            v-for="(item, index) in sorting"
            :key="index"
            :value="index"
          >
            <VListItemTitle class="text-body-1">
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <div class="ms-auto">
        <VTextField
          v-model="searchValue"
          variant="outlined"
          persistent-placeholder
          placeholder="Search Mail"
          hide-details
          density="comfortable"
          class="max-width-230"
        >
          <template #prepend-inner>
            <SvgSprite
              name="custom-search"
              class="text-lightText"
              style="width: 16px; height: 16px"
            />
          </template>
        </VTextField>
      </div>
    </div>
    <!-- - End Topbar Row -->
    <VDivider />
    <!-- - If Mail selected -->
    <div
      v-if="countSelectedMail > 0"
      class="px-4 pt-3"
    >
      <h3 class="text-h4 text-secondary">
        {{ countSelectedMail }} Mail Selected
      </h3>
    </div>
    <!-- - Mail Listing Table -->
    <VTable v-if="filteredMails.length > 0" class="mt-3 mailTable bordered-table">
      <tbody>
        <tr
          v-for="mail in filteredMails"
          :key="mail.id"
          :class="`cursor-pointer ${mail.isChecked ? 'bg-lightprimary' : ''} ${
            mail.isRead ? 'text-medium-emphasis' : 'font-weight-medium'
          }`"
        >
          <td :class="`checkboxWidth d-table ${compact ? 'py-1' : 'py-2'}`">
            <VCheckbox
              v-model="mail.isChecked"
              aria-label="checkbox"
              hide-details
              color="primary"
            />
          </td>
          <td :class="`checkboxWidth ${compact ? 'py-1' : 'py-2'}`">
            <VBtn
              icon
              size="small"
              aria-label="starred"
              rounded="md"
              flat
              @click="handleStarredChange(`${mail.id}`)"
            >
              <SvgSprite
                v-if="mail.starred"
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
          </td>
          <td
            width="30"
            :class="`${compact ? 'py-1' : 'py-2'}`"
          >
            <VBtn
              icon
              size="small"
              aria-label="tag"
              rounded="md"
              flat
              @click="handleImportantChange(`${mail.id}`)"
            >
              <SvgSprite
                v-if="mail.important"
                name="custom-tag-fill"
                class="text-primary"
                style="width: 16px; height: 16px"
              />
              <SvgSprite
                v-else
                name="custom-tag-outline"
                class="text-lightText"
                style="width: 16px; height: 16px"
              />
            </VBtn>
          </td>
          <td
            :class="`${compact ? 'py-1' : 'py-2'}`"
            @click="handleUserChange(mail)"
          >
            <img
              :src="mail.profile.avatar"
              class="rounded-md"
              :alt="mail.profile.avatar"
              width="36"
            >
          </td>
          <td
            :class="`text-no-wrap text-subtitle-1 ${compact ? 'py-1' : 'py-2'}`"
            @click="handleUserChange(mail)"
          >
            {{ mail.profile.name }}
          </td>
          <td
            :class="`${compact ? 'py-1' : 'py-2'}`"
            @click="handleUserChange(mail)"
          >
            <div class="d-flex align-center ga-2">
              <div class="text-no-wrap text-truncate text-h6">
                {{ mail.subject }}
              </div>
              <VChip
                v-if="mail.promotions"
                size="small"
                color="primary"
              >
                Promotions
              </VChip>
              <VChip
                v-if="mail.forums"
                size="small"
                color="warning"
              >
                Forums
              </VChip>
              <VBtn
                v-if="mail.attachments.length > 0"
                icon
                aria-label="attach"
                size="small"
                rounded="md"
                flat
              >
                <SvgSprite
                  name="custom-paper-clip-2"
                  style="width: 16px; height: 16px"
                />
              </VBtn>
            </div>
          </td>
          <td :class="`text-no-wrap text-caption text-right ${compact ? 'py-1' : 'py-2'}`">
            {{ format(new Date(mail.time), 'd MMM yy HH:mm a') }}
          </td>
        </tr>
      </tbody>
    </VTable>
    <!-- -If no mail -->
    <div v-else class="text-center pa-3 d-flex justify-center align-center" style="min-height: 500px">
      <div>
        <img :src="emptyMail" alt="empty mail" />
      <h2>There is No Mail</h2>
      <p class="text-lightText">When You have message that will Display here</p>
      </div>
    </div>
  </div>
  <!-- - If Email Detail -->
  <div
    v-if="emailDetails && selectedMail"
    class="pa-5"
  >
    <MailDetail
      :selected-mail="selectedMail"
      @toggle-detail="emailDetails = false"
    />
  </div>
</template>

<style lang="scss">
.checkboxWidth {
  width: 50px;
  .v-input--density-default {
    --v-input-control-height: unset;
    margin-top: 6px;
  }
  &.py-2 {
    .v-input--density-default {
      --v-input-control-height: 46px;
    }
  }
}
.v-table.mailTable > .v-table__wrapper > table > tbody > tr > td {
  padding: 0 8px;
}
.max-width-230 {
  width: 230px;
}
</style>
