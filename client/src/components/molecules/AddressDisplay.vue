<template>
  <q-card class="col" flat bordered>
    <q-card-section class="q-py-sm" :class="headerClass">
      {{ props.label }}
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section
        v-if="verificationAvailable"
        class="position-relative q-ml-md"
      >
        <q-icon
          v-if="addressComplete"
          name="check_circle"
          size="lg"
          color="positive"
          class="absolute-center"
        />
        <q-icon
          v-else
          name="error"
          size="lg"
          color="negative"
          class="absolute-center"
        />
      </q-card-section>
      <q-card-section v-if="showAddress && address">
        <div :class="{ 'text-bold': highlightStreet }">
          {{ address.line1 }}
        </div>
        <div v-if="address.line2" :class="{ 'text-bold': highlightStreet }">
          {{ address.line2 }}
        </div>
        <div>
          <span :class="{ 'text-bold': highlightCity }">
            {{ address.city }}</span
          >,
          <span :class="{ 'text-bold': highlightState }">
            {{ address.state }},
          </span>
          <span :class="{ 'text-bold': highlightPostal }">
            {{ address.postal_code }}
          </span>
          <!-- <ul>
            <li v-for="part in parts" :key="part.componentType">
              {{ part.componentType }}: {{ part.confirmationLevel }} ({{
                part.inferred
              }})
            </li>
        </ul> -->
        </div>
      </q-card-section>
      <q-card-section v-else>
        <q-banner dense class="bg-negative text-white">
          The address entered does not appear to be complete / valid.
        </q-banner>
      </q-card-section>
    </q-card-section>
    <q-card-actions v-if="verificationAvailable">
      <q-btn
        v-if="addressComplete"
        ref="useCorrectedRef"
        color="positive"
        @click="emit('use')"
        >Use Corrected Address</q-btn
      >
      <q-btn ref="reenterRef" @click="emit('back')">Re-enter address</q-btn>
    </q-card-actions>
    <q-card-actions v-else>
      <q-btn @click="emit('use')">Use Address as Entered</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import {
  Address,
  VerificationResult,
} from 'src/composables/addressVerification'
import { computed, ref, toRef, watch } from 'vue'

interface Props {
  address?: Address | null
  verification?: VerificationResult | null
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  verification: () => null,
  address: () => null,
})

const address = toRef(props, 'address')
const highlightStreet = computedParts(['route', 'street_number'])
const highlightCity = computedParts(['locality'])
const highlightState = computedParts(['administrative_area_level_1'])
const highlightPostal = computedParts(['postal_code_suffix', 'postal_code'])

const parts = computed(
  () => props.verification?.address.addressComponents ?? []
)
function computedParts(fields: Array<string>) {
  return computed(() =>
    parts.value.some((v) => fields.includes(v.componentType) && v.inferred)
  )
}
const verificationAvailable = computed(() => props.verification)
const addressComplete = computed(
  () => props.verification?.verdict?.addressComplete ?? false
)
const headerClass = computed(() => {
  if (props.verification === null) {
    return 'bg-grey-3 text-black'
  }
  return addressComplete.value
    ? 'bg-positive text-white'
    : 'bg-negative text-white'
})

const showAddress = computed(() => {
  return !verificationAvailable.value || addressComplete.value
})

const emit = defineEmits<{
  (e: 'use'): void
  (e: 'back'): void
}>()

const useCorrectedRef = ref()
const reenterRef = ref()
watch([useCorrectedRef, reenterRef], ([useRef, backRef]) => {
  console.log(useRef, backRef)
  if (useRef) {
    useRef.$el.focus()
    return
  }
  if (backRef) {
    backRef.$el.focus()
  }
})
</script>
