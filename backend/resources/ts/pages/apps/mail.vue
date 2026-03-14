<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import MailSidebar from '@/views/apps/mail/MailSidebar.vue'
import MailListing from '@/views/apps/mail/MailListing.vue'

const page = ref({ title: 'Mail Page' })
const { lgAndUp } = useDisplay()

const breadcrumbs = ref([
  {
    title: 'Applications',
    disabled: false,
    href: '#',
  },
  {
    title: 'Mail',
    disabled: true,
    href: '#',
  },
])

const toggleSide = ref(false)
const sDrawer = ref(false)
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />

  <VRow>
    <VCol
      v-if="!toggleSide && lgAndUp"
      class="d-flex align-stretch mailSidebar pe-md-0"
    >
      <VCard
        variant="outlined"
        class="bg-surface br-0"
        rounded="lg"
      >
        <PerfectScrollbar style="height: calc(100vh - 60px)">
          <VCardText class="pa-5">
            <MailSidebar />
          </VCardText>
        </PerfectScrollbar>
      </VCard>
    </VCol>
    <VCol class="d-flex align-stretch overflow-auto ps-md-0">
      <VCard
        variant="outlined"
        class="bg-surface overflow-hidden bl-0"
        rounded="lg"
      >
        <!-- - Toggle Button For mobile -->
        <VBtn
          icon
          aria-label="menu"
          variant="text"
          rounded="md"
          class="d-lg-none d-md-flex d-sm-flex"
          @click="sDrawer = !sDrawer"
        >
          <SvgSprite
            name="custom-menu-outline"
            style="width: 18px; height: 18px"
          />
        </VBtn>

        <div>
          <MailListing @s-toggle="toggleSide = !toggleSide" />
        </div>
      </VCard>
    </VCol>
  </VRow>

  <VNavigationDrawer
    v-if="!lgAndUp"
    v-model="sDrawer"
    temporary
    width="300"
    top
  >
    <PerfectScrollbar style="height: calc(100vh - 100px)">
      <VCardText class="pa-5">
        <MailSidebar />
      </VCardText>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style lang="scss">
.br-0 {
  @media (min-width: 960px) {
    border-right: none;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    [dir="rtl"] & {
      border-left: none;
      border-right: 1px solid rgb(var(--v-theme-borderLight));
      border-top-right-radius: 8px !important;
      border-bottom-right-radius: 8px !important;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
}
.bl-0 {
  @media (min-width: 960px) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    [dir="rtl"] & {
      border-top-left-radius: 8px !important;
      border-bottom-left-radius: 8px !important;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}

.custom-main {
  margin: 0;
}
.mailSidebar {
  max-width: 350px;
}
</style>
