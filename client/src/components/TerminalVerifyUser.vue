<template>
  <q-card-section class="column items-center">
    <NumPadDots :value="value" :error="error" :pin-length="pinLength" />
    <NumPad v-model="value" @cancel="$emit('cancelVerify')" />
    {{ user?.terminal_pincode }}
  </q-card-section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NumPad from './NumPad.vue'
import NumPadDots from './molecules/NumPadDots.vue'
import type { TerminalUser } from 'src/composables/terminal'
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
if (process.env.DEV) {
  console.log(props.user?.terminal_pincode)
}
watch(value, (newValue: string) => {
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
