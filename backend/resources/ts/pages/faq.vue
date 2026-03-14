<script setup lang="ts">
import { ref } from 'vue'

import Appbar from '@/views/landingpage/AppBarMenu.vue'
import FooterSection from '@/views/landingpage/FooterSection.vue'
import NewsLetter from '@/views/landingpage/NewsLetter2.vue'

const panel = ref(['foo'])

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})
</script>

<template>
  <VLayout class="flex-column">
    <Appbar />
    <VRow class="justify-center">
      <VCol
        cols="12"
        class="py-0"
      >
        <VMain class="mx-0 pt-16 pb-0 position-relative overflow-hidden">
          <div class="bg-blur">
            <div class="round-1" />
            <div class="round-2" />
          </div>
          <VContainer class="maxWidth">
            <VRow class="justify-center py-10">
              <VCol
                cols="12"
                lg="5"
                md="6"
                sm="8"
              >
                <div class="text-center position-relative pt-3">
                  <h2 class="text-h2 mb-2">
                    Question ? Look here.
                  </h2>
                  <p class="text-h6 text-lightText mb-0">
                    Please refer the Frequently ask question for your quick help
                  </p>
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </VMain>
      </VCol>
      <VCol
        cols="12"
        md="8"
        lg="7"
        class="pt-0"
      >
        <div class="py-md-16 py-8 px-4">
          <VCard
            elevation="0"
            class="py-0"
          >
            <VExpansionPanels
              v-model="panel"
              multiple
            >
              <VExpansionPanel
                elevation="0"
                title="When do I need Extended License?"
                text="If your End Product which is sold - Then only your required Extended License. i.e. If you take subscription charges (monthly, yearly, etc...) from your end users in this case you required Extended License."
                value="foo"
              />
              <VExpansionPanel
                elevation="0"
                title="What Support Includes?"
                text="6 Months of Support Includes with 1 year of free updates. We are happy to solve your bugs, issue."
                value="support"
              />
              <VExpansionPanel
                elevation="0"
                title="Is Mantis Support TypeScript?"
                text="Yes, Mantis Support the TypeScript and it is only available in Plus and Extended License."
                value="typescript"
              />
              <VExpansionPanel
                elevation="0"
                title="Is there any RoadMap for Mantis?"
                text="Mantis is our flagship React Dashboard Template and we always add the new features for the long run. You can check the Roadmap in Documentation."
                value="raodmap"
              />
            </VExpansionPanels>
          </VCard>
        </div>
      </VCol>
    </VRow>
    <NewsLetter />
    <FooterSection />
  </VLayout>
</template>

<style lang="scss">
.bg-blur {
    position: absolute;
    filter: blur(140px);
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    overflow: hidden;
    &::before {
        content: " ";
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background-color: #f7dcb3;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 1;
    }
    .round-1 {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: #e76767;
        position: absolute;
        bottom: 0;
        left: -50px;
        opacity: 1;
    }
    .round-2 {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: #c0e5d9;
        margin-left: 160px;
        position: absolute;
        bottom: 180px;
        opacity: 1;
    }
}
</style>
