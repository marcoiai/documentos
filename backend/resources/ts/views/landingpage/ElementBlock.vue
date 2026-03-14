<script setup lang="ts">
import { ref } from 'vue'

// assets
import app1 from '@images/landing/chat.png'
import app2 from '@images/landing/e-commerce.png'
import app3 from '@images/landing/invoice.png'
import app4 from '@images/landing/social.png'

const tab = ref(0)
</script>

<template>
  <div class="spacer bg-primary pb-0 elementSection overflow-hidden">
    <VContainer
      fluid
      class="py-0"
    >
      <VRow class="justify-center mb-0">
        <VCol
          md="6"
          cols="12"
        >
          <div class="text-center">
            <h2 class="text-h2 mb-sm-4 mb-2">
              Working Conceptual Apps
            </h2>
            <p class="text-h6 mb-0">
              Each App is carefully crafted to achieve the best feature rich working concept for your project.
            </p>
          </div>
        </VCol>
        <VCol
          md="12"
          cols="12"
          class="pa-sm-3 pa-0"
        />
      </VRow>
      <VRow class="justify-end mt-0">
        <VCol
          lg="4"
          md="5"
        >
          <VTabs
            v-model="tab"
            class="app-tab pb-md-11"
            color="white"
            hide-slider
            direction="vertical"
          >
            <VTab
              value="one"
              rounded="md"
            >
              <div class="text-left py-5 px-2">
                <h4 class="text-h4">
                  Chat
                </h4>
                <p class="text-body-1 mb-0">
                  Power your web apps with the conceptual chat app of Able Pro Dashboard Template.
                </p>
              </div>
            </VTab>
            <VTab
              value="two"
              rounded="md"
            >
              <div class="text-left py-5 px-2">
                <h4 class="text-h4">
                  E-commerce
                </h4>
                <p class="text-body-1 mb-0">
                  Collection, filter, product detail, add new product, and checkout pages makes your e-commerce app complete.
                </p>
              </div>
            </VTab>
            <VTab
              value="three"
              rounded="md"
            >
              <div class="text-left py-5 px-2">
                <h4 class="text-h4">
                  Invoice
                </h4>
                <p class="text-body-1 mb-0">
                  Create, manage, and customize invoices with detailed views for invoice lists, invoice details, and payment status
                  tracking.
                </p>
              </div>
            </VTab>
            <VTab
              value="four"
              rounded="md"
            >
              <div class="text-left py-5 px-2">
                <h4 class="text-h4">
                  User Management
                </h4>
                <p class="text-body-1 mb-0">
                  Detailed pages for user management like profile settings, role, account settings, social profile and more to explore.
                </p>
              </div>
            </VTab>
          </VTabs>
        </VCol>
        <VCol
          lg="6"
          md="7"
          sm="12"
          cols="12"
          class="pb-0"
        >
          <VTabsWindow
            v-model="tab"
            class="app-content"
          >
            <VTabsWindowItem value="one" transition="v-fade-transition" reverse-transition="v-fade-transition">
              <VImg
                :src="app1"
                alt="chat app"
              />
            </VTabsWindowItem>

            <VTabsWindowItem value="two" transition="v-fade-transition" reverse-transition="v-fade-transition">
              <VImg
                :src="app2"
                alt="ecommerce"
              />
            </VTabsWindowItem>

            <VTabsWindowItem value="three" transition="v-fade-transition" reverse-transition="v-fade-transition">
              <VImg
                :src="app3"
                alt="mail"
              />
            </VTabsWindowItem>

            <VTabsWindowItem value="four" transition="v-fade-transition" reverse-transition="v-fade-transition">
              <VImg
                :src="app4"
                alt="social profile"
              />
            </VTabsWindowItem>
          </VTabsWindow>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style lang="scss">
.app-tab {
  .v-slide-group__content {
    .v-btn {
      height: unset;
      .v-btn__content {
        white-space: unset;
      }
    }
  }
  .v-tab-item--selected {
    &.v-tab--selected {
      background-color: rgba(var(--v-theme-surface), 0.1);
      box-shadow: var(--v-card-shadow);
    }
  }
}
.app-content {
  margin-bottom: -100px;
  @media (max-width: 959px) {
    margin-bottom: 0;
    padding-bottom: 40px;
  }
  @media (max-width: 599px) {
    padding-bottom: 36px;
  }
}
</style>
