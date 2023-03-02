<template>
  <q-form @submit="onSave">
    <q-input
      ref="target"
      v-model="data"
      bg-color="white"
      outlined
      dense
      :label="props.units"
    >
      <template #append>
        <q-btn
          size="sm"
          type="submit"
          icon="check"
          color="green"
          @click="onSave"
        ></q-btn>
      </template>
    </q-input>
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useVModel, useFocus } from '@vueuse/core'

interface Props {
  modelValue: string | number
  units: string
}

const props = withDefaults(defineProps<Props>(), {
  units: 'Units',
})

interface Emits {
  (e: 'save'): void
  (e: 'update:modelValue', value: string): void
}

const emit = defineEmits<Emits>()

const target = ref<HTMLInputElement>()

useFocus({ target, initialValue: true })

const data = useVModel(props)

onMounted(() => {
  target.value?.select()
})

function onSave() {
  emit('save')
}
</script>
