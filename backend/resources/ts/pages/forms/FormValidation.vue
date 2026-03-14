<script setup>
import { computed, ref } from 'vue'
import { Form } from 'vee-validate'
import VeeValidation from '@/views/forms/validation/VeeValidation.vue'

const page = ref({ title: 'Form Validation' })

const breadcrumbs = ref([
  {
    title: 'Forms',
    disabled: false,
    href: '#',
  },
  {
    title: 'Form Validation',
    disabled: true,
    href: '#',
  },
])

const email = ref('')
const firstname = ref('')
const lastname = ref('')

const rules = ref({
  required: value => !!value || 'Required.',
  counter: value => value.length <= 20 || 'Max 20 characters',
  email: value => {
    const pattern = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-z]{2,}$/i

    return pattern.test(value) || 'Invalid e-mail.'
  },
  firstname: value => value.length > 2 || 'More than two letters required',
  lastname: value => value.length > 2 || 'More than two letters required',
})

const password = ref('')

const pwdrules = ref({
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => 'The email and password you entered don\'t match',
})

// Checkbox radio button
const drinks = ref([
  { id: 1, name: 'None' },
  { id: 2, name: 'Tea' },
  { id: 3, name: 'Coffee' },
])

const selectedValues = ref([])
const selectedRadioValues = ref([])
const myform = ref(null)
const myRadioform = ref(null)

const validateCheckbox = computed(() => {
  return [selectedValues.value.length > 0 || 'Choose at-list one Drink']
})

const validateRadio = computed(() => {
  return [selectedRadioValues.value.length > 0 || 'Choose at-list one Drink']
})

function submit() {
  myform.value.validate()
}
function submitRadio() {
  myRadioform.value.validate()
}
function isLast(index) {
  return drinks.value.length - 1 === index
}
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="On Type">
        <Form>
          <VLabel class="mb-1">
            First name
          </VLabel>
          <VTextField
            v-model="firstname"
            :rules="[rules.required, rules.firstname]"
            placeholder="Enter first name"
            single-line
            density="comfortable"
            variant="outlined"
            :color="firstname.length > 2 ? 'success' : 'primary'"
            class="mb-3"
          />
          <VLabel class="mb-1">
            Last name
          </VLabel>
          <VTextField
            v-model="lastname"
            single-line
            :rules="[rules.required, rules.lastname]"
            placeholder="Enter last Name"
            :color="lastname.length > 2 ? 'success' : 'primary'"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />
          <VLabel class="mb-1">
            Email Address
          </VLabel>
          <VTextField
            v-model="email"
            single-line
            :rules="[rules.required, rules.email]"
            placeholder="Enter E-mail address"
            type="email"
            density="comfortable"
            variant="outlined"
            class="mb-3"
          />
          <VLabel class="mb-1">
            Password
          </VLabel>
          <VTextField
            v-model="password"
            color="primary"
            placeholder="Enter your password"
            :rules="[pwdrules.required, pwdrules.min]"
            variant="outlined"
            density="comfortable"
            hint="At least 8 characters"
            type="password"
          /><br>
          <VBtn
            color="primary"
            rounded="md"
            variant="flat"
            type="submit"
          >
            Submit
          </VBtn>
        </Form>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Vee Validation">
        <VeeValidation />
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Checkbox">
        <h5 class="mb-3">
          Choose a Drink
        </h5>

        <div class="d-inline-flex flex-column ga-4 items-center">
          <div>
            <VForm ref="myform">
              <div
                v-for="(drink, index) in drinks"
                :key="drink.id"
              >
                <VCheckbox
                  v-model="selectedValues"
                  :value="drink.id"
                  :label="drink.name"
                  color="primary"
                  :hide-details="!isLast(index)"
                  :rules="validateCheckbox"
                />
              </div>
              <VBtn
                color="primary"
                rounded="md"
                variant="flat"
                class="mt-4"
                @click="submit"
              >
                Submit
              </VBtn>
            </VForm>
          </div>
        </div>
      </UiParentCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <UiParentCard title="Radio button">
        <h5 class="mb-3">
          Choose a Drink
        </h5>

        <div>
          <VForm ref="myRadioform">
            <div class="d-flex ga-4">
              <VRadioGroup
                v-for="drink in drinks"
                :key="drink.id"
                v-model="selectedRadioValues"
                :rules="validateRadio"
                hide-details
              >
                <VRadio
                  :value="drink.id"
                  :label="drink.name"
                  color="primary"
                />
              </VRadioGroup>
            </div>
            <p
              v-if="selectedRadioValues.length < 1"
              class="text-error mb-4"
            >
              You have to choose one Drink
            </p>
            <VBtn
              variant="flat"
              rounded="md"
              class="mt-3"
              color="primary"
              @click="submitRadio"
            >
              Submit
            </VBtn>
          </VForm>
        </div>
      </UiParentCard>
    </VCol>
  </VRow>
</template>
