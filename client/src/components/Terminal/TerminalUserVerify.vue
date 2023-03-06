<template>
  <q-card-section class="column items-center">
    <NumPadDots :value="value" :error="error" :pin-length="pinLength" />
    <NumPad v-model="value" @cancel="$emit('cancelVerify')" />
    {{ pincode }}
  </q-card-section>
</template>

<script setup lang="ts">
import NumPad from 'components/NumPad.vue'
import NumPadDots from 'components/_molecules/NumPadDots.vue'
import type { TerminalUser } from 'src/composables/terminal'
import { Ref, computed, ref, watch } from 'vue'
const pinLength = 4

interface Props {
  user?: TerminalUser
}

interface Emits {
  (e: 'confirmUser', user: TerminalUser): void
  (e: 'cancelVerify'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const value = ref('')
const error = ref(false)

let pincode: Ref<string> | null
if (process.env.DEV) {
  pincode = computed(() => props.user?.terminal_pincode ?? '')
  console.log(props.user?.terminal_pincode)
} else {
  pincode = null
}
watch(value, (newValue: string) => {
  console.log(newValue, pinLength)
  if (newValue.length == pinLength) {
    if (newValue !== props?.user?.terminal_pincode) {
      error.value = true
      setTimeout(() => {
        error.value = false
        value.value = ''
      }, 1000)
    } else {
      emit('confirmUser', props.user)
    }
  }
})
</script>
