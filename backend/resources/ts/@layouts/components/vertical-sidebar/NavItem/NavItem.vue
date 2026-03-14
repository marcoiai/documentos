<script setup>
const props = defineProps({ item: Object, level: Number })
</script>

<template>
  <!-- - Single Item -->
  <VListItem
    :to="item.type === 'external' ? '' : item.to"
    :href="item.type === 'external' ? item.to : ''"
    rounded
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <!-- - If icon -->
    <template #prepend>
      <SvgSprite
        :name="props.item.icon || ''"
        :level="props.level"
      />
    </template>
    <VListItemTitle>{{ $t(item.title) }}</VListItemTitle>
    <!-- - If Caption -->
    <VListItemSubtitle
      v-if="item.subCaption"
      class="text-caption mt-0 hide-menu"
    >
      {{ $t(item.subCaption) }}
    </VListItemSubtitle>
    <!-- - If any chip or label -->
    <template
      v-if="item.chip"
      #append
    >
      <VChip
        :color="item.chipColor"
        :border="item.chipVariant === 'tonal' ? `${item.chipColor} solid thin opacity-50` : ''"
        class="sidebarchip hide-menu"
        size="small"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </VChip>
    </template>
  </VListItem>
</template>
