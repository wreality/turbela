<template>
  <div class="column q-gutter-lg items-center">
    <div v-for="(row, rIdx) in btnArrangement" :key="'row' + rIdx">
      <div class="row q-gutter-lg">
        <NumPadButton
          v-for="(btn, bIdx) in row"
          :key="`btn${rIdx}:${bIdx}`"
          v-bind="btn"
          @btn-press="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chunk } from 'lodash'
import NumPadButton from './atoms/NumPadButton.vue'
import { onKeyStroke } from '@vueuse/core'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'update:modelValue', value: string): void
}>()

function handleClick(value: string) {
  if (value.length === 1) {
    emit('update:modelValue', props.modelValue + value)
    return
  }
  if (value === 'back' && props.modelValue.length > 0) {
    emit('update:modelValue', props.modelValue.slice(0, -1))
    return
  }
  if (value === 'cancel') {
    emit('cancel')
    return
  }
}

onKeyStroke(true, (e) => {
  const btn = btns.find((b) => b.keyCode.includes(e.code))
  if (typeof btn === 'undefined') {
    return
  }
  handleClick(btn.value)
})

const btns = [
  { keyCode: ['Digit1', 'Numpad1'], value: '1' },
  { keyCode: ['Digit2', 'Numpad2'], value: '2' },
  { keyCode: ['Digit3', 'Numpad3'], value: '3' },
  { keyCode: ['Digit4', 'Numpad4'], value: '4' },
  { keyCode: ['Digit5', 'Numpad5'], value: '5' },
  { keyCode: ['Digit6', 'Numpad6'], value: '6' },
  { keyCode: ['Digit7', 'Numpad7'], value: '7' },
  { keyCode: ['Digit8', 'Numpad8'], value: '8' },
  { keyCode: ['Digit9', 'Numpad9'], value: '9' },
  { keyCode: ['Escape'], value: 'cancel', icon: 'undo' },
  { keyCode: ['Digit0', 'Numpad0'], value: '0' },
  { keyCode: ['Backspace'], value: 'back', icon: 'backspace' },
]

const btnArrangement = chunk(btns, 3)
</script>
