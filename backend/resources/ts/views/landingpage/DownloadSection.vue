<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useIspValue } from '@/utils/useIspValue'

const { smAndUp } = useDisplay()

const { ispValue } = useIspValue()
</script>

<template>
  <div class="spacer">
    <VContainer class="maxWidth">
      <VRow class="align-center">
        <VCol
          md="6"
          cols="12"
        >
          <h2 class="text-h2 text-uppercase">
            <span class="text-primary">Try </span>Before Buy
          </h2>
          <p class="text-body-1 mb-0">
            Download the Free MIT Able Pro Dashboard Template before make your purchase decision.
          </p>
        </VCol>
        <VCol
          md="6"
          cols="12"
          class="pl-md-12 text-md-right"
        >
          <VBtn
            color="secondary"
            variant="outlined"
            :size="smAndUp ? 'large' : 'default'"
            rounded="md"
            target="_"
            :href="ispValue === true ? 'https://phplaravel-207002-4524103.cloudwaysapps.com/build/dashboards/default?isp=1' : 'https://phplaravel-207002-4524103.cloudwaysapps.com/build/dashboards/default'"
          >
            Check Out Pro Version
          </VBtn>
          <VBtn
            color="primary"
            variant="flat"
            :size="smAndUp ? 'large' : 'default'"
            class="ml-3"
            rounded="md"
            target="_"
            href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
          >
            <template #prepend>
              <SvgSprite
                name="custom-link2"
                style="width: 20px; height: 20px"
              />
            </template>
            Free Version
          </VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
