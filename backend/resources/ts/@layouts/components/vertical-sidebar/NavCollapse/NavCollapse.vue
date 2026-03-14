<script setup>
import NavItem from '../NavItem/NavItem.vue'

const Vprops = defineProps({ item: Object, level: Number })
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- - Item Childern -->
  <!-- ---------------------------------------------- -->
  <VListGroup no-action>
    <!-- ---------------------------------------------- -->
    <!-- - Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template #activator="{ props }">
      <VListItem
        v-bind="props"
        :value="item.title"
        rounded
        color="primary"
      >
        <!-- - Icon  -->
        <template #prepend>
          <SvgSprite
            :name="item.icon || ''"
            :level="level"
          />
        </template>
        <!-- - Title  -->
        <VListItemTitle class="me-auto">
          {{ $t(item.title) }}
        </VListItemTitle>
        <!-- - If Caption -->
        <VListItemSubtitle
          v-if="item.subCaption"
          class="text-caption mt-0 hide-menu"
        >
          {{ item.subCaption }}
        </VListItemSubtitle>
      </VListItem>
    </template>
    <!-- ---------------------------------------------- -->
    <!-- - Sub Item -->
    <!-- ---------------------------------------------- -->
    <template
      v-for="(subitem, i) in item.children"
      :key="i"
    >
      <NavCollapse
        v-if="subitem.children"
        :item="subitem"
        :level="Vprops.level + 1"
      />
      <NavItem
        v-else
        :item="subitem"
        :level="Vprops.level + 1"
      />
    </template>
  </VListGroup>

  <!-- ---------------------------------------------- -->
  <!-- - End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
