<script setup lang="ts">
import type { Technology } from '@types/tech-types'
import { useIspValue } from '@/utils/useIspValue'
import techData from '@/utils/techData'

// types

const { ispValue } = useIspValue()

const getFinalUrl = (item: Technology) => {
  if (item.link !== '#!' && ispValue.value === true)
    return `${item.link}?isp=1`

  return item.link
}
</script>

<template>
  <div class="spacer">
    <VContainer class="maxWidth py-0">
      <VRow class="justify-center mb-0">
        <VCol
          md="5"
          cols="12"
        >
          <div class="text-center">
            <h2 class="text-h2 mb-sm-4 mb-2">
              Available Technologies
            </h2>
            <p class="text-h6 mb-0">
              Explore the Demos of Able Pro in multiple technologies.
            </p>
          </div>
        </VCol>
        <VCol
          md="12"
          cols="12"
          class="pa-sm-3 pa-0"
        />
        <VCol
          md="12"
          cols="12"
          class="pb-0"
        >
          <VRow class="colSpacing justify-center">
            <VCol
              v-for="tech in techData"
              :key="tech.link"
              lg="4"
              md="6"
              sm="12"
              cols="12"
            >
              <VCard
                variant="outlined"
                class="bg-surface"
              >
                <VCardItem>
                  <VBadge
                    v-if="tech.label"
                    color="lighterror"
                    text-color="error"
                    :content="tech.label"
                    offset-x="10"
                    offset-y="5"
                  >
                    <VImg
                      :src="tech.image"
                      alt="technology"
                      style="width: 70px"
                      cover
                    />
                  </VBadge>
                  <VImg
                    v-else
                    :src="tech.image"
                    alt="technology"
                    style="width: 70px"
                    cover
                  />
                  <h4 class="text-h4 mt-4 mb-4">
                    {{ tech.title }}
                  </h4>
                  <p class="text-h6 mb-4">
                    {{ tech.description }}
                  </p>
                  <VBtn
                    color="secondary"
                    size="large"
                    variant="tonal"
                    rounded="md"
                    :href="getFinalUrl(tech as Technology)"
                    :target="tech.target"
                  >
                    <template #prepend>
                      <SvgSprite
                        name="custom-link2"
                        style="width: 20px; height: 20px"
                      />
                    </template>
                    Preview
                  </VBtn>
                  <VBtn
                    v-if="tech.free"
                    icon
                    color="secondary"
                    aria-label="link"
                    variant="tonal"
                    class="ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
                  >
                    <SvgSprite
                      name="custom-github-outline"
                      style="width: 20px; height: 20px"
                    />
                  </VBtn>
                </VCardItem>
              </VCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style lang="scss">
.colSpacing {
  > div {
    padding-inline: 20px;
    @media (max-width: 599px) {
      padding-inline: 10px;
    }
  }
}
</style>
