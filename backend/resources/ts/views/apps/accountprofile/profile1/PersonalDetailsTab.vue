<script setup lang="ts">
import { ref } from 'vue'

const experience = ref(['Start up', '6 months', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '10+ years'])
const tel = ref(['+91', '1-671', '+36', '(255)', '+39', '1-876', '+7', '(254)', '(373)', '1-664', '+95', '(264)'])

const textFname = ref('Anshan')
const textLname = ref('Handgun')
const textcountry = ref('New york')
const textcode = ref('956754')
const textExperience = ref<string>('Start up')
const texttel = ref<string>('1-876')

const textBio = ref(
  'Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.',
)

const textContact = ref('+1 (865) 423-9581')
const textEmail = ref('stebin.ben@gmail.com')
const textURL = ref('https://anshan.dh.url')
const textAddress = ref('Street 110-B Kalians Bag, Dewan, M.P. New York')
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Personal Information
            </h5>
          </div>

          <VDivider />
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                class="text-center"
              >
                <VAvatar
                  size="72"
                  variant="flat"
                  color="lightprimary"
                >
                  <img
                    src="@images/users/vector-1.png"
                    width="72"
                    alt="profile"
                  >
                  <input
                    type="file"
                    aria-label="preview"
                    class="preview-upload"
                  >
                </VAvatar>
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <VLabel class="mb-2">
                  First name
                </VLabel>
                <VTextField
                  v-model="textFname"
                  color="primary"
                  single-line
                  variant="outlined"
                  density="comfortable"
                  aria-label="firstname"
                  type="text"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <VLabel class="mb-2">
                  Last name
                </VLabel>
                <VTextField
                  v-model="textLname"
                  color="primary"
                  single-line
                  label="Last Name"
                  density="comfortable"
                  aria-label="lastname"
                  variant="outlined"
                  type="text"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <VLabel class="mb-2">
                  Country
                </VLabel>
                <VTextField
                  v-model="textcountry"
                  color="primary"
                  aria-label="country"
                  single-line
                  label="country Name"
                  density="comfortable"
                  variant="outlined"
                  type="text"
                  hide-details
                />
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <VLabel class="mb-2">
                  Zip code
                </VLabel>
                <VTextField
                  v-model="textcode"
                  color="primary"
                  single-line
                  label="Zip code"
                  aria-label="zip"
                  density="comfortable"
                  variant="outlined"
                  type="text"
                  hide-details
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Bio
                </VLabel>
                <VTextarea
                  v-model="textBio"
                  color="primary"
                  single-line
                  label="Bio"
                  aria-label="bio"
                  variant="outlined"
                  hide-details
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Experiance
                </VLabel>
                <VSelect
                  v-model="textExperience"
                  color="primary"
                  single-line
                  role="link"
                  :items="experience"
                  label="Experience"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        variant="flat"
        class="mb-6"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Social Network
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VList
              class="py-0"
              density="compact"
              aria-label="social list"
              aria-busy="true"
            >
              <VListItem class="pa-0">
                <VBtn
                  color="error"
                  rounded="md"
                  variant="text"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-google-outline"
                      style="width: 16px; height: 16px"
                    />
                  </template>
                  Google
                </VBtn>
                <template #append>
                  <VBtn
                    color="error"
                    rounded="md"
                    variant="text"
                  >
                    Connect
                  </VBtn>
                </template>
              </VListItem>
              <VListItem class="pa-0">
                <VBtn
                  color="facebook"
                  rounded="md"
                  variant="text"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-facebook-fill"
                      style="width: 16px; height: 16px"
                    />
                  </template>
                  Facebook
                </VBtn>
                <template #append>
                  <h6 class="text-subtitle-1 text-facebook mb-0">
                    Anshan Handgun
                  </h6>
                </template>
              </VListItem>
              <VListItem class="pa-0">
                <VBtn
                  color="linkedin"
                  rounded="md"
                  variant="text"
                >
                  <template #prepend>
                    <SvgSprite
                      name="custom-apple-fill"
                      style="width: 16px; height: 16px"
                    />
                  </template>
                  Apple
                </VBtn>
                <template #append>
                  <VBtn
                    color="error"
                    rounded="md"
                    variant="text"
                  >
                    Connect
                  </VBtn>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCard>
      <VCard
        variant="flat"
        rounded="lg"
      >
        <VCard
          variant="outlined"
          rounded="lg"
        >
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">
              Contact Information
            </h5>
          </div>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                lg="6"
              >
                <VLabel class="mb-2">
                  Phone Number
                </VLabel>
                <div class="d-flex ga-4">
                  <VSelect
                    v-model="texttel"
                    color="primary"
                    style="width: 30px"
                    single-line
                    role="link"
                    :items="tel"
                    density="comfortable"
                    label="Experience"
                    variant="outlined"
                    hide-details
                  />
                  <VTextField
                    v-model="textContact"
                    color="primary"
                    single-line
                    aria-label="contact"
                    label="Contact Phone"
                    density="comfortable"
                    variant="outlined"
                    type="text"
                    hide-details
                  />
                </div>
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <VLabel class="mb-2">
                  Email Address
                </VLabel>
                <VTextField
                  v-model="textEmail"
                  color="primary"
                  single-line
                  label="Email"
                  aria-label="email"
                  density="comfortable"
                  variant="outlined"
                  type="email"
                  hide-details
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Portfolio URL
                </VLabel>
                <VTextField
                  v-model="textURL"
                  color="primary"
                  single-line
                  aria-label="url"
                  density="comfortable"
                  label="Portfolio URL"
                  variant="outlined"
                  type="text"
                  hide-details
                />
              </VCol>
              <VCol cols="12">
                <VLabel class="mb-2">
                  Address
                </VLabel>
                <VTextField
                  v-model="textAddress"
                  color="primary"
                  single-line
                  aria-label="address"
                  label="Address"
                  density="comfortable"
                  variant="outlined"
                  rows="3"
                  type="text"
                  hide-details
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      class="text-end"
    >
      <VBtn
        color="secondary"
        rounded="md"
        variant="outlined"
        class="me-4"
      >
        Cancel
      </VBtn>
      <VBtn
        color="primary"
        rounded="md"
        variant="flat"
      >
        Update profile
      </VBtn>
    </VCol>
  </VRow>
</template>
