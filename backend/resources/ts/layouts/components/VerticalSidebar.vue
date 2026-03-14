<script setup lang="ts">
import { shallowRef } from 'vue'
import { useCustomizerStore } from '@layouts/stores/customizer'
import sidebarItems from '@layouts/components/vertical-sidebar/sidebarItem'

import NavGroup from '@layouts/components/vertical-sidebar/NavGroup/NavGroup.vue'
import NavItem from '@layouts/components/vertical-sidebar/NavItem/NavItem.vue'
import NavCollapse from '@layouts/components/vertical-sidebar/NavCollapse/NavCollapse.vue'
import ExtraBox from '@layouts/components/vertical-sidebar/extrabox/ExtraBox.vue'
import Logo from '@layouts/components/LogoMain.vue'

const customizer = useCustomizerStore()
const sidebarMenu = shallowRef(sidebarItems)
</script>

<template>
  <VNavigationDrawer
    v-model="customizer.sidebarDrawer"
    left
    elevation="0"
    rail-width="90"
    mobile-breakpoint="lg"
    app
    width="279"
    class="leftSidebar"
    :rail="customizer.miniSidebar"
    expand-on-hover
  >
    <!-- - Logo part -->

    <div class="pa-5">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!-- - Navigation -->
    <!-- ---------------------------------------------- -->
    <PerfectScrollbar class="scrollnavbar" :options="{ suppressScrollX: true }">
      <VList
        aria-busy="true"
        class="px-2"
        aria-label="menu list"
      >
        <!-- - Menu Loop -->
        <template
          v-for="(item, i) in sidebarMenu"
          :key="i"
        >
          <!-- - Item Sub Header -->
          <NavGroup
            v-if="item.header"
            :key="item.title"
            :item="item"
          />
          <!-- - Item Divider -->
          <VDivider
            v-else-if="item.divider"
            class="my-3"
          />
          <!-- - If Has Child -->
          <NavCollapse
            v-else-if="item.children"
            class="leftPadding"
            :item="item"
            :level="0"
          />
          <!-- - Single Item -->
          <NavItem
            v-else
            :item="item"
          />
          <!-- - End Single Item -->
        </template>
      </VList>
      <div class="pa-4">
        <ExtraBox />
      </div>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
