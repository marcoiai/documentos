<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import _ from 'lodash'
import ContactCardItem from './ContactCardItem.vue'
import SelectedContact from './SelectedContact.vue'
import EditContact from './EditContact.vue'
import AddContact from './AddContact.vue'
import { useContactStore } from '@db/apps/contact/index'

const page = ref({ title: 'Card' })

const breadcrumbs = shallowRef([
  {
    title: 'Contact',
    disabled: false,
    href: '#',
  },
  {
    title: 'Card',
    disabled: true,
    href: '#',
  },
])

const store = useContactStore()

onMounted(() => {
  store.fetchContacts()
})

const allContacts = computed(() => {
  return store.contact
})

const searchValue = ref('')
const { flow, orderBy, groupBy, flatMap, get, filter } = _

const groupItems = flow([
  (array: string) => orderBy(array, 'name'),
  (array: string) => groupBy(array, (o: string) => get(o, 'name[0]', '').toUpperCase()),
  (groups: string) => flatMap(groups, (v: string, k: string) => [k, ...v]),
  (array: string) => filter(array, (o: string) => get(o, 'name', '').toLowerCase().includes(searchValue.value.toLowerCase())),
])

const filteredContact = computed(() => {
  return groupItems(allContacts.value)
})

const drawer = ref(false)
const contactDrawer = ref(false)

const editContact = ref(false)
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol cols="12">
      <UiParentCard title="Contact List">
        <div class="d-flex align-center ga-4">
          <VTextField
            v-model="searchValue"
            variant="outlined"
            density="comfortable"
            persistent-placeholder
            placeholder="Search Contact"
            hide-details
          >
            <template #prepend-inner>
              <SvgSprite
                name="custom-search"
                class="text-lightText"
                style="width: 16px; height: 16px"
              />
            </template>
          </VTextField>
          <VBtn
            class="ml-auto"
            elevation="0"
            variant="flat"
            color="primary"
            size="large"
            @click.stop="contactDrawer = !contactDrawer"
          >
            <SvgSprite
              name="custom-plus"
              style="width: 18px; height: 18px"
            />
            Add
          </VBtn>
        </div>
        <div>
          <ContactCardItem
            :get-contacts="filteredContact"
            @open-drawer="drawer = true"
          />
        </div>
      </UiParentCard>
    </VCol>
  </VRow>
  <VNavigationDrawer
    v-model="drawer"
    temporary
    location="end"
    width="300"
  >
    <SelectedContact
      v-if="!editContact"
      @edit-contact="editContact = true"
    />
    <EditContact
      v-else
      @close-drawer="(drawer = false), (editContact = false)"
    />
  </VNavigationDrawer>
  <VNavigationDrawer
    v-model="contactDrawer"
    temporary
    location="end"
    width="300"
  >
    <AddContact @close-drawer="contactDrawer = false" />
  </VNavigationDrawer>
</template>
