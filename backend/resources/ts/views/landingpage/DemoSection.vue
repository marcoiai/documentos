<script setup lang="ts">
import { useIspValue } from '@/utils/useIspValue'

// assets
import imageDemo2 from '@images/landing/feature-components.png'
import imageDemo3 from '@images/landing/feature-documentation.png'

const { ispValue } = useIspValue()
</script>

<template>
  <div class="spacer pt-0">
    <VContainer class="maxWidth py-0">
      <VRow class="justify-center">
        <VCol
          md="6"
          cols="12"
        >
          <div class="text-center">
            <h2 class="text-h2 mb-sm-4 mb-2">
              Complete Combo
            </h2>
            <p class="text-h6 mb-0">
              Able Pro caters to the needs of both developers and designers, whether they are beginners or experts.
            </p>
          </div>
        </VCol>
        <VCol
          md="12"
          cols="12"
          class="pa-sm-3 pa-0"
        />
        <!--
          <VCol
          md="4"
          sm="6"
          cols="12"
          data-aos="fade-up"
          data-aos-duration="800"
          >
          <VCard
          variant="outlined"
          class="bg-surface overflow-hidden"
          >
          <VCardItem>
          <h5 class="text-h5">
          Figma Design System
          </h5>
          <p class="mb-6 text-h6">
          Check the live preview of Able Pro Figma design file. Figma file included in all licenses.
          </p>
          <VImg
          cover
          height="250"
          class="rounded-md"
          :src="imageDemo1"
          />
          <VBtn
          color="secondary"
          size="large"
          class="mt-7"
          variant="tonal"
          rounded="md"
          target="_"
          href="https://www.figma.com/file/6XqmRhRmkr33w0EFD49acY/Able-Pro--v9.0-Figma-Preview?type=design&node-id=46-226114&mode=design&t=RPyhUJgBhofKcwRI-0"
          >
          <template #prepend>
          <SvgSprite
          name="custom-link2"
          style="width: 20px; height: 20px"
          />
          </template>
          Reference
          </VBtn>
          </VCardItem>
          </VCard>
          </VCol>
        -->
        <VCol
          md="5"
          sm="6"
          cols="12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <VCard
            variant="outlined"
            class="bg-surface overflow-hidden h-100"
          >
            <VCardItem>
              <h5 class="text-h5">
                Explore Components
              </h5>
              <p class="mb-6 text-h6">
                Access all Able Pro components in one place to simplify development.
              </p>
              <VImg
                cover
                height="300"
                class="rounded-md"
                :src="imageDemo2"
              />
              <VBtn
                color="secondary"
                size="large"
                class="mt-7"
                variant="tonal"
                rounded="md"
                target="_"
                :href="ispValue === true ? '/forms/components/buttons?isp=1' : '/forms/components/buttons'"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-link2"
                    style="width: 20px; height: 20px"
                  />
                </template>
                View All Components
              </VBtn>
            </VCardItem>
          </VCard>
        </VCol>
        <VCol
          md="5"
          sm="6"
          cols="12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <VCard
            variant="outlined"
            class="bg-surface overflow-hidden h-100"
          >
            <VCardItem class="pa-5 pb-7">
              <h5 class="text-h5">
                Documentation
              </h5>
              <p class="mb-6 text-h6">
                Find solutions and navigate through our helper guide with ease.
              </p>
              <VImg
                cover
                height="300"
                class="rounded-md"
                :src="imageDemo3"
              />
              <VBtn
                color="secondary"
                size="large"
                class="mt-7"
                variant="tonal"
                rounded="md"
                target="_"
                href="https://phoenixcoded.gitbook.io/able-pro"
              >
                <template #prepend>
                  <SvgSprite
                    name="custom-link2"
                    style="width: 20px; height: 20px"
                  />
                </template>
                Check Documentation
              </VBtn>
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
