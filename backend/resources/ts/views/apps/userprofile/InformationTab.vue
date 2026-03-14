<script setup lang="ts">
import { ref } from 'vue'

import Flag1 from '@images/flags/1.jpg'
import Flag2 from '@images/flags/2.jpg'
import Flag3 from '@images/flags/3.jpg'
import Flag4 from '@images/flags/4.jpg'
import Flag5 from '@images/flags/5.jpg'

const items = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

const items1 = ref([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
])

const items2 = ref([
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
])

const items3 = ref(['+91', '1-671', '+36', '(255)', '+39', '1-876', '+7', '(254)', '(373)', '1-664', '+95', '(264)'])

const country = ref([
  { name: 'Anguilla', avatar: Flag1 },
  { name: 'Brazil', avatar: Flag2 },
  { name: 'Germany', avatar: Flag3 },
  { name: 'United Kingdom', avatar: Flag4 },
  { name: 'United States', avatar: Flag5 },
])

const countryflag = ref(['United States'])
const isUpdating = ref(false)

const multiValue = ref([
  'Adobe XD',
  'Angular',
  'Corel Draw',
  'Figma',
  'HTML',
  'Illustrator',
  'JavaScript',
  'Logo Design',
  'Material UI',
  'NodeJs',
  'npm',
  'Photoshop',
  'React',
  'Reduxjs & tooltit',
  'SASS',
])

const items4 = ref([
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'JavaScript',
  'jQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJs',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User interface designing',
  'WordPress',
])
</script>

<template>
  <VCard
    class="bg-surface"
    variant="outlined"
    rounded="lg"
  >
    <VCardText>
      <h5 class="text-subtitle-1 mb-0">
        Personal Information
      </h5>
    </VCardText>
    <VDivider />
    <VCardItem>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            First name
          </VLabel>
          <VTextField
            density="comfortable"
            single-line
            aria-label="firstname"
            variant="outlined"
            hide-details
            model-value="Stebin"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            Last name
          </VLabel>
          <VTextField
            density="comfortable"
            single-line
            aria-label="lastname"
            variant="outlined"
            hide-details
            model-value="Ben"
          />
        </VCol>
        <VCol
          cols="12"
          xl="6"
          md="12"
        >
          <VLabel class="mb-2">
            Email Address
          </VLabel>
          <VTextField
            single-line
            density="comfortable"
            aria-label="email address"
            variant="outlined"
            hide-details
            type="email"
            model-value="stebin.ben@gmail.com"
          />
        </VCol>
        <VCol
          cols="12"
          xl="6"
          md="12"
        >
          <VLabel class="mb-2">
            Date of Birth (+18)
          </VLabel>
          <VRow>
            <VCol
              cols="6"
              sm="4"
            >
              <VAutocomplete
                aria-label="autocomplete"
                model-value="March"
                :items="items"
                color="primary"
                variant="outlined"
                hide-details
                single-line
                density="comfortable"
              />
            </VCol>
            <VCol
              cols="6"
              sm="4"
            >
              <VAutocomplete
                aria-label="autocomplete"
                model-value="10"
                :items="items1"
                color="primary"
                variant="outlined"
                hide-details
                single-line
                density="comfortable"
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VAutocomplete
                aria-label="autocomplete"
                model-value="1993"
                :items="items2"
                color="primary"
                variant="outlined"
                hide-details
                single-line
                density="comfortable"
              />
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          xl="6"
        >
          <VLabel class="mb-2">
            Phone Number
          </VLabel>
          <VRow>
            <VCol
              cols="5"
              lg="3"
              md="5"
              sm="4"
            >
              <VAutocomplete
                aria-label="autocomplete"
                model-value="+91"
                :items="items3"
                color="primary"
                variant="outlined"
                hide-details
                single-line
                density="comfortable"
              />
            </VCol>
            <VCol
              cols="7"
              lg="9"
              md="7"
              sm="8"
            >
              <VTextField
                single-line
                aria-label="phone number"
                variant="outlined"
                type="number"
                hide-details
                density="comfortable"
                model-value="9652364852"
              />
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            Designation
          </VLabel>
          <VTextField
            single-line
            density="comfortable"
            aria-label="designation"
            variant="outlined"
            hide-details
            model-value="Full Stack Developer"
          />
        </VCol>
      </VRow>
    </VCardItem>
    <VCardItem class="pa-0">
      <h5 class="text-h5 mb-0 pa-5 pb-4">
        Address
      </h5>
      <VDivider />
      <VRow class="pa-5">
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            Address 01
          </VLabel>
          <VTextarea
            variant="outlined"
            density="comfortable"
            rows="3"
            hide-details
            aria-label="address"
            model-value="3801 Chalk Butte Rd, Cut Bank, MT 59427, United States"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            Address 02
          </VLabel>
          <VTextarea
            variant="outlined"
            density="comfortable"
            aria-label="address"
            rows="3"
            hide-details
            model-value="301 Chalk Butte Rd, Cut Bank, NY 96572, New York"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            Country
          </VLabel>
          <VAutocomplete
            v-model="countryflag"
            :disabled="isUpdating"
            :items="country"
            density="comfortable"
            variant="outlined"
            item-title="name"
            item-value="name"
            hide-details
            label="Select"
            single-line
            color="primary"
            clearable
            aria-label="autocomplete"
            clear-icon="$close"
          >
            <template #item="{ props, item }">
              <VListItem
                v-bind="props"
                :title="item?.raw?.name"
              >
                <template #prepend>
                  <VAvatar
                    size="18"
                    rounded="sm"
                  >
                    <img
                      :src="item?.raw?.avatar"
                      width="18"
                      alt="flag"
                    >
                  </VAvatar>
                </template>
              </VListItem>
            </template>
          </VAutocomplete>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VLabel class="mb-2">
            State
          </VLabel>
          <VTextField
            density="comfortable"
            single-line
            aria-label="state"
            variant="outlined"
            hide-details
            model-value="California"
          />
        </VCol>
      </VRow>
    </VCardItem>
    <VCardItem class="pa-0">
      <h5 class="text-h5 mb-0 pa-5 pb-4">
        Skills
      </h5>
      <VDivider />
      <VRow class="pa-5">
        <VCol cols="12">
          <VAutocomplete
            v-model="multiValue"
            aria-label="autocomplete"
            density="comfortable"
            :items="items4"
            variant="outlined"
            class="skill-field"
            color="primary"
            label="Outlined"
            single-line
            multiple
            hide-details
            closable-chips
            role="combobox"
          >
            <template #chip>
              <VChip
                label
                variant="tonal"
                color="lightText"
                size="large"
                rounded="lg"
                style="--v-chip-height: 38px"
                class="my-1 text-subtitle-1 text-dark font-weight-regular"
                border="lightText solid thin opacity-50"
              >
                <template #close>
                  <SvgSprite
                    name="custom-close"
                    style="width: 20px; height: 20px; transform: rotate(45deg)"
                  />
                </template>
              </VChip>
            </template>
          </VAutocomplete>
        </VCol>
      </VRow>
    </VCardItem>
    <VCardItem class="pa-0">
      <h5 class="text-h5 mb-0 pa-5 pb-4">
        Note
      </h5>
      <VDivider />
      <VRow class="pa-5">
        <VCol cols="12">
          <VTextarea
            aria-label="note"
            variant="outlined"
            density="comfortable"
            hide-details
            single-line
            model-value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          />
        </VCol>
        <VCol
          cols="12"
          class="text-end"
        >
          <VBtn
            variant="outlined"
            color="secondary"
            rounded="md"
          >
            Cancel
          </VBtn>
          <VBtn
            variant="flat"
            color="primary"
            rounded="md"
            class="ms-2"
          >
            Save
          </VBtn>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style lang="scss">
.skill-field {
  .v-autocomplete__selection {
    height: 2.2rem;
  }
}
</style>
