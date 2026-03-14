<script setup lang="ts">
import { ref, shallowRef } from 'vue'

definePage({
  meta: {
    layout: 'component',
    unauthenticatedOnly: true,
  },
})

// define consts
const captionEmail1 = ref('demo@company.com')
const captionEmail2 = ref('demo@company.com')
const captionEmail3 = ref('demo@company.com')
const validateEmail1 = ref('demo.sd')
const validateEmail2 = ref('demo.sd')
const multiline2 = ref('Default Value')
const selectSm = ref<string>('Small')
const fullText = ref('Default')
const someImp1 = ref('Default')
const someImp2 = ref('Default')
const someImp3 = ref('Default')

// confirm edit text
const model = shallowRef('Egg plant')

// rules for email textfield
const rules = ref({
  required: (value: string) => !!value || 'Required.',
  counter: (value: string) => value.length <= 20 || 'Max 20 characters',
  email: (value: string) => {
    const pattern
      = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-z]{2,}$/i

    return pattern.test(value) || 'Invalid e-mail.'
  },
})

//  data of select
const items = ref(['None', 'demo@company.com', 'Judiya@company.com', 'taju_diya@company.com'])

// component content
const page = ref({ title: 'Textfield' })
const subContent = ref({ content: 'Text fields let users enter and edit text.' })
const path = ref({ filepath: 'resources/ts/pages/forms/components/textfield' })
const link = ref({ filelink: 'https://vuetifyjs.com/en/components/text-fields/' })
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :sub-content="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <VRow>
    <VCol cols="12">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <!-- variant -->
          <UiParentCard title="Variant">
            <div>
              <VTextField
                label="Outlined"
                color="primary"
                variant="outlined"
              />

              <VTextField
                label="Filled"
                density="comfortable"
                color="primary"
                variant="filled"
                rounded="false"
              />

              <VTextField
                label="Underlined"
                color="primary"
                variant="underlined"
              />
            </div>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- general -->
          <UiParentCard title="General">
            <div>
              <VTextField
                color="primary"
                persistent-placeholder
                placeholder="Email Address"
                variant="outlined"
              />

              <VTextField
                color="primary"
                persistent-placeholder
                placeholder="Email Address"
                value="demo@company.com"
                variant="outlined"
              />

              <VTextField
                color="primary"
                persistent-placeholder
                placeholder="demo@company.com"
                variant="outlined"
                disabled
              />
            </div>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- with caption -->
          <UiParentCard title="With Caption">
            <VTextField
              v-model="captionEmail1"
              color="primary"
              aria-label="email address"
              label="Email Address"
              variant="outlined"
            >
              <template #prepend-inner>
                <SvgSprite
                  name="custom-mail-outline"
                  style="width: 20px; height: 20px"
                />
              </template>
            </VTextField>
            <VTextField
              v-model="captionEmail2"
              color="primary"
              aria-label="email address"
              label="Email Address"
              variant="outlined"
            />
            <VTextField
              v-model="captionEmail3"
              color="primary"
              aria-label="email address"
              label="Email Address"
              variant="outlined"
            >
              <template #append-inner>
                <SvgSprite
                  name="custom-mail-outline"
                  style="width: 20px; height: 20px"
                />
              </template>
            </VTextField>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- with validation -->
          <UiParentCard title="With Validation">
            <VTextField
              v-model="validateEmail1"
              color="error"
              class="mb-4"
              aria-label="email address"
              :rules="[rules.required, rules.email]"
              label="Email Address"
              variant="outlined"
              error
            >
              <template #prepend-inner>
                <SvgSprite
                  name="custom-mail-outline"
                  style="width: 20px; height: 20px"
                />
              </template>
            </VTextField>
            <VTextField
              v-model="validateEmail2"
              color="error"
              class="mb-4"
              aria-label="email address"
              error
              :rules="[rules.required, rules.email]"
              label="Email Address"
              variant="outlined"
            />
            <VTextField
              color="error"
              aria-label="email address"
              label="Email Address"
              variant="outlined"
            />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- With Icon & Adornments -->
          <UiParentCard title="With Icon & Adornments">
            <VTextField
              variant="outlined"
              color="primary"
              persistent-placeholder
              placeholder="Email address"
            >
              <template #prepend-inner>
                <SvgSprite
                  name="custom-mail-outline"
                  style="width: 20px; height: 20px"
                />
              </template>
            </VTextField>
            <VTextField
              variant="outlined"
              color="primary"
              persistent-placeholder
              placeholder="Email address"
            >
              <template #prepend-inner>
                <SvgSprite
                  name="custom-lock-outline"
                  style="width: 20px; height: 20px"
                />
              </template>
              <template #append-inner>
                <SvgSprite
                  name="custom-eye"
                  style="width: 20px; height: 20px"
                />
              </template>
            </VTextField>
            <VTextField
              persistent-placeholder
              placeholder="John Deo"
              color="primary"
              variant="outlined"
            >
              <template #prepend-inner>
                <span class="v-card-subtitle px-0">Mr</span>
                <VDivider
                  class="ml-3 my-3"
                  vertical
                />
              </template>
            </VTextField>
            <VTextField
              persistent-placeholder
              placeholder="Password"
              color="primary"
              variant="outlined"
            >
              <template #append-inner>
                <VDivider
                  class="mr-3 my-3"
                  vertical
                />
                <span class="v-card-subtitle px-0">.com</span>
              </template>
            </VTextField>
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- Multiline -->
          <UiParentCard title="Multiline">
            <VTextarea
              filled
              auto-grow
              label="Multiline Placeholder"
              rows="1"
              single-line
              row-height="20"
              color="primary"
              variant="outlined"
            />
            <VTextarea
              v-model="multiline2"
              filled
              auto-grow
              aria-label="multiline"
              label="Multiline Placeholder"
              variant="outlined"
              rows="4"
              single-line
              color="primary"
            />
            <VTextarea
              clearable
              clear-icon="$closeCircle"
              variant="outlined"
              placeholder="Multiline Clearable"
              rows="1"
              row-height="20"
              single-line
              value="This is clearable text."
              color="primary"
            />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- Select -->
          <UiParentCard title="Select">
            <VSelect
              :items="items"
              color="primary"
              role="link"
              single-line
              label="Email Address"
              variant="outlined"
              density="comfortable"
            />
            <VSelect
              v-model="selectSm"
              role="link"
              :items="items"
              color="primary"
              single-line
              label="Email Address"
              variant="outlined"
              density="compact"
              outlined
            />
          </UiParentCard>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- size -->
          <UiParentCard title="Size">
            <VTextField
              variant="outlined"
              color="primary"
              single-line
              label="Default"
            />
            <VTextField
              variant="outlined"
              color="primary"
              density="compact"
            />
          </UiParentCard>
        </VCol>
        <VCol cols="12">
          <!-- Layout -->
          <UiParentCard title="Layout">
            <VLabel class="mb-2">
              Label
            </VLabel>
            <VTextField
              v-model="fullText"
              label="Label"
              aria-label="label"
              single-line
              hint="Full Width!"
              persistent-hint
              variant="outlined"
              color="primary"
            />
            <VRow class="mt-5">
              <VCol
                cols="12"
                md="4"
              >
                <VLabel class="mb-2">
                  None
                </VLabel>
                <VTextField
                  v-model="someImp1"
                  label="None"
                  aria-label="none"
                  single-line
                  hint="Some important text"
                  persistent-hint
                  variant="outlined"
                  color="primary"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VLabel class="mb-2">
                  Dense
                </VLabel>
                <VTextField
                  v-model="someImp2"
                  label="Dense"
                  aria-label="dense"
                  single-line
                  hint="Some important text"
                  persistent-hint
                  variant="outlined"
                  color="primary"
                  density="compact"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VLabel class="mb-2">
                  Normal
                </VLabel>
                <VTextField
                  v-model="someImp3"
                  label="Normal"
                  aria-label="normal"
                  single-line
                  hint="Some important text"
                  persistent-hint
                  variant="outlined"
                  color="primary"
                />
              </VCol>
            </VRow>
          </UiParentCard>
        </VCol>
        <VCol cols="12">
          <VCard variant="outlined" elevation="0" class="bg-surface" rounded="lg">
            <VCardItem class="pa-5">
              <VCardTitle class="text-subtitle-1" style="line-height: 1.57">
                Confirm Edit
                <VChip variant="tonal" color="primary" class="ms-1" size="small">new</VChip>
              </VCardTitle>
            </VCardItem>
            <VDivider></VDivider>
            <VCardText>
              <VConfirmEdit v-model="model">
                <template v-slot:default="{ model: proxyModel, actions }">
                  <VCard class="mx-auto pa-0" variant="text">
                    <VLabel class="mb-2" for="update-value">Update field</VLabel>
                    <VTextField
                      id="update-value"
                      v-model="proxyModel.value"
                      variant="outlined"
                      single-line
                      messages="Modify my value"
                    ></VTextField>
                    <template v-slot:actions>
                      <VSpacer />

                      <component :is="actions"></component>
                    </template>
                  </VCard>
                </template>
              </VConfirmEdit>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
