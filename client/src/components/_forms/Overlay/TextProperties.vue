<template>
  <q-card-section>
    <div class="column">
      <q-item>
        <q-item-section avatar top>
          <q-icon color="teal" name="palette" />
        </q-item-section>
        <q-item-section>
          <q-input v-model="color" outlined>
            <template #append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="color"
                    format-model="rgb"
                    style="width: 250px"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="teal" name="format_size" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="fontSize" :min="1" :max="100" color="secondary" />
        </q-item-section>
        <q-item-section class="col-2" side>
          <q-input v-model="fontSize" dense outlined />
        </q-item-section>
      </q-item>
      <q-item class="col">
        <q-item-section avatar>
          <q-icon color="teal" name="font_download" />
        </q-item-section>
        <q-item-section>
          <q-select v-model="fontFamily" :options="fontOptions" outlined />
        </q-item-section>
      </q-item>
      <q-item class="col">
        <q-item-section avatar>
          <q-icon color="teal" name="text_format" />
        </q-item-section>
        <q-item-section>
          <div class="row q-gutter-sm">
            <toggle-btn v-model="bold" icon="format_bold" />
            <toggle-btn v-model="italic" icon="format_italic" />
            <toggle-btn v-model="underline" icon="format_underline" />
          </div>
        </q-item-section>
      </q-item>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'

interface Props {
  object: fabric.Text
}

const props = defineProps<Props>()
const fontOptions = [
  'arial',
  'helvetica',
  'myriad pro',
  'delicious',
  'verdana',
  'georgia',
  'courier',
  'comic sans ms',
  'impact',
  'monaco',
  'optima',
  'hoefler text',
  'plaster',
  'engagement',
]

const emit = defineEmits<{
  (e: 'render'): void
}>()

const color = ref<string>(
  typeof props.object.fill === 'string'
    ? props.object.fill
    : 'rgb(255, 255, 255)'
)
usePropertyWatch(color, 'fill')

const fontSize = ref<number>(props.object.fontSize ?? 0)
usePropertyWatch(fontSize, 'fontSize')

const fontFamily = ref<string>(props.object.fontFamily ?? '')
usePropertyWatch(fontFamily, 'fontFamily')

const bold = ref<boolean>(props.object.fontWeight === 'bold')
usePropertyWatch(bold, 'fontWeight', (v) => (v ? 'bold' : 'normal'))

const italic = ref<boolean>(props.object.fontStyle === 'italic')
usePropertyWatch(italic, 'fontStyle', (v) => (v ? 'italic' : 'normal'))

const underline = ref<boolean>(props.object.underline ?? false)
usePropertyWatch(underline, 'underline')

function usePropertyWatch(
  ref: Ref,
  objectProperty: keyof fabric.Text,
  mutator: null | ((value: any) => any) = null
) {
  watch(ref, (newValue, oldValue) => {
    if (newValue == oldValue) {
      return
    }
    let value = newValue
    if (typeof mutator == 'function') {
      value = mutator(value)
    }
    props.object.set(objectProperty, value)
    emit('render')
  })
}
</script>
