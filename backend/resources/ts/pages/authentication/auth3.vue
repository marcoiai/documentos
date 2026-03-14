<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@layouts/components/LogoMain.vue'

// assets
import facebookImg from '@images/icons/facebook.svg'
import twitterImg from '@images/icons/twitter.svg'
import googleImg from '@images/icons/google.svg'
import TextSlider from '@/views/authentication/TextSlider.vue'

const tab = ref('0')

function changeTab(e: string) {
  tab.value = e
}

const otp = ref('')

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: false,
  },
})
</script>

<template>
  <VRow class="bg-surface position-relative ma-0 overflow-hidden">
    <VCol
      cols="12"
      lg="7"
      md="6"
    >
      <VRow class="pa-8 justify-center">
        <VCol cols="12">
          <Logo />
        </VCol>
        <VCol
          cols="12"
          sm="10"
          md="11"
          lg="6"
          style="height: calc(100vh - 168px)"
          class="d-flex align-center justify-center"
        >
          <VRow>
            <VCol cols="12">
              <VWindow v-model="tab">
                <VWindowItem value="tab-1">
                  <div>
                    <div class="text-center">
                      <h3 class="text-h3">
                        Welcome to the Able Pro
                      </h3>
                      <p class="text-h6">
                        Sign up or login with your work email.
                      </p>
                      <VList
                        aria-label="social list"
                        aria-busy="true"
                      >
                        <VListItem
                          color="secondary"
                          variant="tonal"
                          href="#"
                          rounded="md"
                          class="mb-2 d-flex align-center justify-center"
                          @click="changeTab('tab-2')"
                        >
                          <div class="me-2 d-inline-block">
                            <SvgSprite name="custom-mail-outline" />
                          </div>
                          Continue with work Email
                        </VListItem>
                        <VListItem
                          color="secondary"
                          variant="tonal"
                          href="#"
                          rounded="md"
                          class="mb-2"
                        >
                          <VImg
                            :src="facebookImg"
                            alt="social icon"
                            class="me-2 d-inline-flex"
                            style="vertical-align: text-top"
                            width="9"
                            height="16"
                          />
                          Sign in with facebook
                        </VListItem>
                        <VListItem
                          color="secondary"
                          variant="tonal"
                          href="#"
                          rounded="md"
                          class="mb-2"
                        >
                          <VImg
                            :src="twitterImg"
                            alt="social icon"
                            class="me-2 d-inline-flex"
                            style="vertical-align: middle"
                            width="16"
                            height="13"
                          />
                          Sign in with twitter
                        </VListItem>
                        <VListItem
                          color="secondary"
                          variant="tonal"
                          href="#"
                          rounded="md"
                          class="mb-2"
                        >
                          <VImg
                            :src="googleImg"
                            alt="social icon"
                            class="me-2 d-inline-flex"
                            style="vertical-align: text-top"
                            width="16"
                            height="16"
                          />
                          Sign in with google
                        </VListItem>
                      </VList>
                    </div>
                  </div>
                </VWindowItem>
                <VWindowItem value="tab-2">
                  <div class="text-center mb-6">
                    <h3 class="text-h3">
                      Welcome to the Able Pro
                    </h3>
                    <p class="text-h6">
                      Sign up or login with your work email.
                    </p>
                  </div>
                  <VLabel class="mb-2">
                    Enter your work email to continue
                  </VLabel>
                  <VTextField
                    hide-details
                    placeholder="Enter email address"
                    variant="outlined"
                    density="comfortable"
                  />
                  <VRow class="mt-3">
                    <VCol cols="6">
                      <VBtn
                        color="secondary"
                        variant="outlined"
                        rounded="md"
                        block
                        @click="changeTab('tab-1')"
                      >
                        Back
                      </VBtn>
                    </VCol>
                    <VCol cols="6">
                      <VBtn
                        color="primary"
                        variant="flat"
                        rounded="md"
                        block
                        @click="changeTab('tab-3')"
                      >
                        Continue
                      </VBtn>
                    </VCol>
                  </VRow>
                </VWindowItem>
                <VWindowItem value="tab-3">
                  <div class="text-center mb-6">
                    <h3 class="text-h3">
                      What’s your purpose for use Able
                    </h3>
                    <p class="text-h6">
                      Your setup experience will be streamlined accordingly
                    </p>
                  </div>
                  <div class="notification-dropdown">
                    <VList
                      class="d-flex v-row"
                      aria-label="list"
                      aria-busy="true"
                    >
                      <VCol cols="6">
                        <VListItem
                          class="text-center pa-10 text-lightText"
                          color="secondary"
                          rounded="md"
                          value="personal"
                        >
                          <SvgSprite
                            name="custom-user"
                            style="width: 48px; height: 48px"
                          />
                          <h5 class="text-h5 mt-2">
                            Personal
                          </h5>
                        </VListItem>
                      </VCol>
                      <VCol cols="6">
                        <VListItem
                          class="text-center pa-10 text-lightText"
                          color="secondary"
                          rounded="md"
                          value="business"
                        >
                          <SvgSprite
                            name="custom-home-circle"
                            style="width: 48px; height: 48px"
                          />
                          <h5 class="text-h5 mt-2">
                            Business
                          </h5>
                        </VListItem>
                      </VCol>
                    </VList>
                  </div>
                  <VRow class="mt-3">
                    <VCol cols="6">
                      <VBtn
                        color="secondary"
                        variant="outlined"
                        rounded="md"
                        block
                        @click="changeTab('tab-2')"
                      >
                        Back
                      </VBtn>
                    </VCol>
                    <VCol cols="6">
                      <VBtn
                        color="primary"
                        variant="flat"
                        rounded="md"
                        block
                        @click="changeTab('tab-4')"
                      >
                        Continue
                      </VBtn>
                    </VCol>
                  </VRow>
                </VWindowItem>
                <VWindowItem value="tab-4">
                  <div class="text-center mb-6">
                    <h3 class="text-h3">
                      Tell us About Yourself
                    </h3>
                    <p class="text-h6">
                      Tell us a bit about yourself
                    </p>
                  </div>
                  <VRow class="ml-0">
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        First name
                      </VLabel>
                      <VTextField
                        aria-label="name"
                        variant="outlined"
                        density="comfortable"
                        placeholder="First name"
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VLabel class="mb-2">
                        Last name
                      </VLabel>
                      <VTextField
                        aria-label="name"
                        variant="outlined"
                        density="comfortable"
                        placeholder="Last name"
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="12"
                    >
                      <VLabel class="mb-2">
                        Email id
                      </VLabel>
                      <VTextField
                        aria-label="mail id"
                        type="email"
                        variant="outlined"
                        density="comfortable"
                        placeholder="Email id"
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="12"
                    >
                      <VLabel class="mb-2">
                        Password
                      </VLabel>
                      <VTextField
                        aria-label="password"
                        type="password"
                        variant="outlined"
                        density="comfortable"
                        placeholder="Password"
                        hide-details
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      sm="12"
                    >
                      <VLabel class="mb-2">
                        Confirm Password
                      </VLabel>
                      <VTextField
                        aria-label="password"
                        type="password"
                        variant="outlined"
                        density="comfortable"
                        placeholder="Confirm Password"
                        hide-details
                      />
                    </VCol>
                  </VRow>
                  <VRow class="mt-3">
                    <VCol cols="6">
                      <VBtn
                        color="secondary"
                        variant="outlined"
                        rounded="md"
                        block
                        @click="changeTab('tab-3')"
                      >
                        Back
                      </VBtn>
                    </VCol>
                    <VCol cols="6">
                      <VBtn
                        color="primary"
                        variant="flat"
                        rounded="md"
                        block
                        @click="changeTab('tab-5')"
                      >
                        Continue
                      </VBtn>
                    </VCol>
                  </VRow>
                </VWindowItem>
                <VWindowItem value="tab-5">
                  <div class="text-center mb-6">
                    <h3 class="text-h3">
                      Please confirm your email id
                    </h3>
                    <p class="text-h6">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry of Lorem Ipsum.
                    </p>
                  </div>
                  <VOtpInput
                    v-model="otp"
                    type="number"
                    length="4"
                    class="mb-5"
                    rounded="md"
                    single-line
                    height="60"
                  />
                  <VRow class="mt-3">
                    <VCol cols="6">
                      <VBtn
                        color="secondary"
                        variant="outlined"
                        rounded="md"
                        block
                        @click="changeTab('tab-4')"
                      >
                        Back
                      </VBtn>
                    </VCol>
                    <VCol cols="6">
                      <VBtn
                        color="primary"
                        variant="flat"
                        rounded="md"
                        block
                        @click="changeTab('tab-6')"
                      >
                        Continue
                      </VBtn>
                    </VCol>
                  </VRow>
                </VWindowItem>
                <VWindowItem value="tab-6">
                  <VAlert
                    type="success"
                    variant="tonal"
                    class="mb-4 border-solid border-success border-thin border-opacity-25"
                    icon="false"
                    rounded="md"
                  >
                    <template #prepend>
                      <VIcon
                        class="text-16"
                        icon="$checkboxMarkedCircleOutline"
                      />
                    </template>
                    <div>All steps completed - you can now Login</div>
                  </VAlert>
                  <VBtn
                    variant="flat"
                    to="/authentication/auth1/login1"
                    color="primary"
                    block
                  >
                    Login
                  </VBtn>
                </VWindowItem>
              </VWindow>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          class="text-center"
        >
          <p class="text-h6 mb-0">
            By signing up, you confirm to have read Able pro
            <a
              href="/authentication/auth3"
              class="text-primary"
            >Privacy Policy</a>
            and agree to the
            <a
              href="/authentication/auth3"
              class="text-primary"
            >Terms of Service</a>
            .
          </p>
        </VCol>
      </VRow>
    </VCol>
    <VCol
      cols="12"
      lg="5"
      md="6"
      class="d-md-flex d-none align-center bg-darkprimary"
    >
      <VRow class="justify-center">
        <VCol
          cols="11"
          lg="8"
          md="10"
        >
          <TextSlider />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.notification-dropdown {
  .v-list-item--active {
    &.text-lightText {
      color: rgb(var(--v-theme-primary)) !important;
    }
  }
}
</style>
