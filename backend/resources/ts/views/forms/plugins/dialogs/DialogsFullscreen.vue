<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Fullscreen -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption">
    Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.
  </p>
  <div class="text-center mt-6">
    <VDialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="flat"
          dark
          v-bind="props"
        >
          Open Dialog
        </VBtn>
      </template>
      <VCard rounded="0">
        <VToolbar
          dark
          color="primary"
          style="flex: unset"
        >
          <VBtn
            icon
            color="inherit"
            aria-label="close"
            size="small"
            @click="dialog = false"
          >
            <SvgSprite
              name="custom-close"
              style="width: 20px; height: 20px; transform: rotate(45deg)"
            />
          </VBtn>
          <VToolbarTitle class="text-h6">
            Set Backup Account
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              dark
              variant="text"
              @click="dialog = false"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VCardItem>
          <VList
            lines="two"
            subheader
            aria-label="list"
            aria-busy="true"
            border
          >
            <VListItem>
              <template #prepend>
                <VAvatar
                  size="40"
                  variant="outlined"
                  color="surface"
                >
                  <img
                    src="@images/users/avatar-1.png"
                    width="40"
                    alt="vector"
                  >
                </VAvatar>
              </template>
              <h6 class="text-h6 mb-0">
                Phone ringtone
              </h6>
              <span class="text-caption text-lightText">Default</span>
            </VListItem>
            <VListItem>
              <template #prepend>
                <VAvatar
                  size="40"
                  variant="outlined"
                  color="surface"
                >
                  <img
                    src="@images/users/avatar-2.png"
                    width="40"
                    alt="vector"
                  >
                </VAvatar>
              </template>
              <h6 class="text-h6 mb-0">
                Default notification ringtone
              </h6>
              <span class="text-caption text-lightText">Tethys</span>
            </VListItem>
          </VList>
        </VCardItem>
      </VCard>
    </VDialog>
  </div>
</template>
