<script setup lang="ts">
import { ref } from 'vue'
import Appbar from '@/views/landingpage/AppBarMenu.vue'
import BannerInnerpage from '@/views/landingpage/BannerInnerpage.vue'
import FooterSection from '@/views/landingpage/FooterSection.vue'
import NewsLetter from '@/views/landingpage/NewsLetter2.vue'

const checked = ref(true)

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
        class="pb-0"
      >
        <BannerInnerpage subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </VCol>
      <VCol
        cols="12"
        sm="8"
        md="6"
        lg="5"
        class="pt-0"
      >
        <div class="pa-6 py-md-16 py-12 v-col-lg-10 offset-lg-1">
          <VRow>
            <VCol
              cols="12"
              lg="6"
              sm="6"
            >
              <VLabel class="mb-2 text-subtitle-1 text-lightText">
                First Name
              </VLabel>
              <VTextField
                density="comfortable"
                variant="outlined"
                color="primary"
                placeholder="First Name"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              lg="6"
              sm="6"
            >
              <VLabel class="mb-2 text-subtitle-1 text-lightText">
                Last Name
              </VLabel>
              <VTextField
                density="comfortable"
                variant="outlined"
                color="primary"
                placeholder="Last Name"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VLabel class="mb-2 text-subtitle-1 text-lightText">
                Email Address
              </VLabel>
              <VTextField
                density="comfortable"
                variant="outlined"
                color="primary"
                placeholder="Email Address"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VLabel class="mb-2 text-subtitle-1 text-lightText">
                Phone Number
              </VLabel>
              <VTextField
                density="comfortable"
                variant="outlined"
                color="primary"
                placeholder="Phone number"
                type="number"
                hide-details
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
            >
              <VSelect
                label="Company Size"
                role="link"
                density="comfortable"
                hide-details
                single-line
                variant="outlined"
                color="primary"
                :items="['1-5', '5-10', '10+']"
              />
            </VCol>
            <VCol
              cols="12"
              lg="8"
              md="8"
            >
              <VCheckboxBtn
                v-model="checked"
                color="primary"
                class="checkboxLabel"
                hide-details
              >
                <template #label>
                  <p class="mb-0 text-h6">
                    I agree to all the
                    <RouterLink
                      to="/contactus"
                      class="mx-1 text-primary text-decoration-none"
                    >
                      Terms & Condition
                    </RouterLink>
                  </p>
                </template>
              </VCheckboxBtn>
            </VCol>
            <VCol cols="12">
              <VBtn
                variant="flat"
                rounded="md"
                block
                color="primary"
              >
                Submit
              </VBtn>
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
    <NewsLetter />
    <FooterSection />
  </VLayout>
</template>

<style lang="scss">
.contact-content {
  width: 50%;
  margin-inline: auto;
  @media (max-width: 1530px) {
    width: 60%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
}
.checkboxLabel {
  .v-label {
    opacity: 1;
  }
}

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
