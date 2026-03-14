<script setup>
import { computed, ref, reactive } from 'vue'
import moment from 'moment'
import { vMaska } from 'maska/vue'

const page = ref({ title: 'Mask' })

const breadcrumbs = ref([
  {
    title: 'Plugins',
    disabled: false,
    href: '#',
  },
  {
    title: 'Mask',
    disabled: true,
    href: '#',
  },
])

const phoneValue = ref('')
const unmaskedPhoneValue = ref('')

const telValue = ref('')
const unmaskedTelValue = ref('')

const usValue = ref('')
const unmaskedUsValue = ref('')

const contactValue = ref('')
const unmaskedContactValue = ref('')

const hexoptions = reactive({
  mask: '!#HHHHHH',
  tokens: {
    H: {
      pattern: /[0-9a-f]/i,
      uppercase: true,
    },
  },
})

const hexValue = ref('')

const timeValue = ref('')
const unmaskedTimeValue = ref('')

const timeValue1 = ref('')
const unmaskedTimeValue1 = ref('')

const ipValue = ref('')
const unmaskedIpValue = ref('')

const ipv4Value = ref('')
const unmaskedIp4Value = ref('')

const ipv6Value = ref('')
const unmaskedIp6Value = ref('')

const maskedValue = ref('')
const inputValue = ref('')
const maskPattern = computed(() => ({ mask: maskedValue.value }))

defineExpose({
  unmaskedPhoneValue,
  unmaskedTelValue,
  unmaskedUsValue,
  unmaskedContactValue,
  unmaskedTimeValue,
  unmaskedTimeValue1,
  unmaskedIpValue,
  unmaskedIp4Value,
  unmaskedIp6Value,
  hexoptions,
  maskPattern,
})

// datepicker
const selectedDate = ref(null)
const selectedDate1 = ref(null)

const computedDateFormattedMomentjs = computed(() => {
  return selectedDate.value ? moment(selectedDate.value).format('D/MM/YYYY') : ''
})

const computedDateFormattedMomentjs1 = computed(() => {
  return selectedDate1.value ? moment(selectedDate1.value).format('D-MM-YYYY') : ''
})
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />
  <VRow>
    <!-- Date mask -->
    <VCol cols="12" md="6">
      <UiParentCard title="Date">
        <div>
          <VRow>
            <VCol cols="12">
              <VLabel class="mb-2">Insert Date 1</VLabel>
              <VMenu>
                <template v-slot:activator="{ props }">
                  <VTextField
                    v-bind="props"
                    v-model="computedDateFormattedMomentjs"
                    single-line
                    hide-details
                    variant="outlined"
                    placeholder="MM/DD/YYYY"
                    density="comfortable"
                    readonly
                    color="primary"
                  >
                    <template v-slot:append-inner>
                      <SvgSprite name="custom-calendar" class="text-lightText" style="width: 20px; height: 20px" />
                    </template>
                  </VTextField>
                </template>
                <VDatePicker v-model="selectedDate" hide-header color="primary"></VDatePicker>
              </VMenu>
            </VCol>
            <VCol cols="12">
              <VLabel class="mb-2">Insert Date 2</VLabel>
              <VMenu>
                <template v-slot:activator="{ props }">
                  <VTextField
                    v-bind="props"
                    v-model="computedDateFormattedMomentjs1"
                    single-line
                    variant="outlined"
                    hide-details
                    placeholder="DD-MM-YYYY"
                    readonly
                    color="primary"
                  >
                    <template v-slot:append-inner>
                      <SvgSprite name="custom-calendar" class="text-lightText" style="width: 20px; height: 20px" />
                    </template>
                  </VTextField>
                </template>
                <VDatePicker v-model="selectedDate1" hide-header color="primary"></VDatePicker>
              </VMenu>
            </VCol>
          </VRow>
        </div>
      </UiParentCard>
    </VCol>
    <!-- Time mask -->
    <VCol cols="12" md="6">
      <UiParentCard title="Time">
        <div class="mb-5">
          <VLabel class="mb-2">Enter Time 1</VLabel>
          <VTextField
            v-model="timeValue"
            v-maska:unmaskedTimeValue.unmasked="'##:##:##'"
            single-line
            hide-details
            color="primary"
            placeholder="Enter Time"
            variant="outlined"
            density="comfortable"
          />
        </div>
        <div>
          <VLabel class="mb-2">Enter Time 2</VLabel>
          <VTextField
            v-model="timeValue1"
            v-maska:unmaskedTimeValue1.unmasked="'##/##/#### ##:##:## @@'"
            single-line
            hide-details
            color="primary"
            placeholder="Enter Date & Time"
            variant="outlined"
            density="comfortable"
          />
        </div>
      </UiParentCard>
    </VCol>
    <VCol cols="12" md="6">
      <UiParentCard title="Phone no.">
        <div class="mb-5">
          <VLabel class="mb-2">Phone Number</VLabel>
          <VTextField
            v-model="phoneValue"
            v-maska:unmaskedPhoneValue.unmasked="'+1 (###) ###-##-##'"
            single-line
            hide-details
            color="primary"
            placeholder="Phone with Code"
            variant="outlined"
            density="comfortable"
          />
        </div>
        <div class="mb-5">
          <VLabel class="mb-2">Contact Number</VLabel>
          <VTextField
            v-model="contactValue"
            v-maska:unmaskedContactValue.unmasked="'+91 #### ###-###'"
            single-line
            hide-details
            color="primary"
            placeholder="Contact Number"
            variant="outlined"
            density="comfortable"
          />
        </div>
        <div class="mb-5">
          <VLabel class="mb-2">Telephone with Area Code</VLabel>
          <VTextField
            v-model="telValue"
            v-maska:unmaskedTelValue.unmasked="'(##) ####-#####'"
            single-line
            hide-details
            color="primary"
            placeholder="Tel. with Code  Area"
            variant="outlined"
            density="comfortable"
          />
        </div>
        <div class="mb-5">
          <VLabel class="mb-2">US Telephone</VLabel>
          <VTextField
            v-model="usValue"
            v-maska:unmaskedUsValue.unmasked="'(###) ###-#####'"
            single-line
            hide-details
            color="primary"
            placeholder="US Telephone"
            variant="outlined"
            density="comfortable"
          />
        </div>
        <div>
          <VLabel class="mb-2">Color code</VLabel>
          <VTextField
            v-model="hexValue"
            v-maska="hexoptions"
            single-line
            hide-details
            color="primary"
            placeholder="Hex color: #121113"
            variant="outlined"
            density="comfortable"
          />
        </div>
      </UiParentCard>
    </VCol>
    <VCol cols="12" md="6">
      <VRow>
        <VCol cols="12">
          <UiParentCard title="Network">
            <div class="mb-5">
              <VLabel class="mb-2">Enter IP Address</VLabel>
              <VTextField
                v-model="ipValue"
                v-maska:unmaskedIpValue.unmasked="'###.###.###.###'"
                single-line
                hide-details
                color="primary"
                placeholder="Ip Address"
                variant="outlined"
                density="comfortable"
              />
            </div>
            <div class="mb-5">
              <VLabel class="mb-2">Enter IPV4</VLabel>
              <VTextField
                v-model="ipv4Value"
                v-maska:unmaskedIp4Value.unmasked="'####.####.####.####'"
                single-line
                hide-details
                color="primary"
                placeholder="Ipv4 Address"
                variant="outlined"
                density="comfortable"
              />
            </div>
            <div>
              <VLabel class="mb-2">Enter IPV6</VLabel>
              <VTextField
                v-model="ipv6Value"
                v-maska:unmaskedIp6Value.unmasked="'####.####.####.####.####.####'"
                single-line
                hide-details
                color="primary"
                placeholder="Ipv6 Address"
                variant="outlined"
                density="comfortable"
              />
            </div>
          </UiParentCard>
        </VCol>
        <VCol cols="12">
          <UiParentCard title="Custom">
            <div class="mb-5">
              <VLabel class="mb-2">Make Mask to apply bottom input</VLabel>
              <VTextField
                v-model="maskedValue"
                hide-details
                color="primary"
                single-line
                density="comfortable"
                variant="outlined"
                placeholder="Make Mask to apply bottom input"
              ></VTextField>
            </div>
            <VLabel class="mb-2">Masked Input</VLabel>
            <VTextField
              v-model="inputValue"
              v-maska="maskPattern"
              single-line
              density="comfortable"
              hide-details
              color="primary"
              placeholder="Masked Input"
              variant="outlined"
            ></VTextField>
          </UiParentCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
