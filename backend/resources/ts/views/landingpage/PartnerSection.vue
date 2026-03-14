<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// assets
import Partnet1 from '@images/landing/client-eagames.svg'
import Partnet2 from '@images/landing/client-vodafone.svg'
import Partnet3 from '@images/landing/client-crystal-1.svg'
import Partnet4 from '@images/landing/client-haswent-2.svg'
import Partnet5 from '@images/landing/client-haxter-3.svg'
import Partnet6 from '@images/landing/client-montecito-4.svg'
import Partnet7 from '@images/landing/client-slingshot.svg'
import Partnet8 from '@images/landing/client-totalstudio-5.svg'

const { lgAndUp } = useDisplay()

const partnerData = ref([Partnet1, Partnet2, Partnet3, Partnet4, Partnet5, Partnet6, Partnet7, Partnet8])
</script>

<template>
  <div class="spacer">
    <VContainer class="py-0">
      <VRow class="justify-center">
        <VCol cols="12">
          <div class="text-center">
            <h2 class="text-h2 mb-sm-4 mb-2">
              Trusted By
            </h2>
            <p class="text-h6 mb-0">
              From Startups to Fortune 500 companies using our Template for their product.
            </p>
          </div>
        </VCol>
        <VCol
          md="12"
          cols="12"
          class="pa-sm-3 pa-0"
        />
        <VCol cols="12">
          <VRow class="justify-center partner-box">
            <VCol
              v-for="(item, index) in partnerData"
              :key="index"
              md="3"
              sm="4"
              cols="6"
              :style="lgAndUp ? ' flex: 1 0 18%;max-width: 18%' : ''"
            >
              <VImg :src="item" />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style lang="scss">
.partner-box {
  .v-img {
    filter: grayscale(1);
    opacity: 0.4;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      opacity: 1;
      transition: 0.5s;
    }
  }
}
</style>
