<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-8">
        <canvas ref="canvasEl" style="max-width: 100%" />
      </div>
      <div class="col-4">
        <component
          :is="selectedComponent"
          v-if="selectedComponent"
          :object="selected"
        />

        <q-card flat>
          <q-form @submit="onSubmitClick">
            <q-card-section class="bg-secondary text-white q-py-sm">
              <div class="text-h6">Overlay Setup</div>
            </q-card-section>
            <q-card-section class="q-gutter-md">
              <VeeInput name="name" label="Name" />
              <VeeSelect
                name="type"
                label="Overlay type"
                :options="typeOptions"
                emit-value
              />
              <input v-model="specRef" type="hidden" />
              <background-replace @select="onBackgroundSelect" />
            </q-card-section>
            <q-card-actions>
              <q-btn flat label="Save" color="primary" type="submit" />
              <q-btn flat label="Cancel" />
            </q-card-actions>
          </q-form>
        </q-card>
        <q-card v-if="selected">
          <q-card-section class="bg-secondary text-white q-py-sm">
            <div class="text-h6">{{ selectedName }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Delete" icon="delete" @click="onDeleteClick" />
          </q-card-actions>
        </q-card>
        <q-btn label="Add ID Image" @click="onAddImageClick" />
        <q-btn label="Add Test" @click="onAddTextClick" />
        <q-btn label="Get JSON" @click="onJsonClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import { useQuasar } from 'quasar'
import VeeInput from 'src/components/atoms/VeeInput.vue'
import VeeSelect from 'src/components/atoms/VeeSelect.vue'
import BackgroundReplace from 'src/components/molecules/Overlay/BackgroundReplace.vue'
import { Overlay } from 'src/generated/graphql'
import 'src/helpers/fabricAsync'
import { useField } from 'vee-validate'
import {
  computed,
  defineAsyncComponent,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'

interface Props {
  overlay?: Overlay
}

defineProps<Props>()

interface Emits {
  (e: 'submit'): void
}
const emit = defineEmits<Emits>()

const typeOptions = [
  {
    label: 'User ID Card',
    value: 'IDCARD',
  },
  {
    label: 'Generic User Overlay',
    value: 'GENERIC_USER',
  },
]

const canvasEl = ref<null | HTMLCanvasElement>(null)
let canvas: null | Canvas

type ImageDimensions = {
  width: number
  height: number
}

const imageDimensions = ref<null | ImageDimensions>(null)

onMounted(() => {
  if (canvasEl.value) {
    canvas = new fabric.Canvas(canvasEl.value, { uniformScaling: true })
    if (specRef.value?.length ?? 0 > 0) {
      const spec = JSON.parse(specRef.value)
      imageDimensions.value = {
        width: spec.backgroundImage.width,
        height: spec.backgroundImage.height,
      }
      canvas.loadFromJSON(spec, () => {
        canvas?.renderAll()
        setCanvasSize()
      })
    }
    canvas.on('selection:created', onSelection)
    canvas.on('selection:updated', onSelection)
    canvas.on('selection:cleared', onSelection)
  }
})
const { value: specRef } = useField<string>('spec')

const selected = ref<null | fabric.Object>(null)
const selectedComponent = shallowRef<any>(null)
const selectedName = computed(() => {
  return selected.value ? selected.value.get('turbelaType') : ''
})
watch(selected, async (newValue) => {
  if (!newValue) {
    selectedComponent.value = null
    return
  }

  selectedComponent.value = defineAsyncComponent(
    () =>
      import(
        `src/components/forms/Overlay/${newValue.get(
          'turbelaType'
        )}Properties.vue`
      )
  )
})

function onSelection(e: fabric.IEvent) {
  const { selected: newSelection } = e

  if (typeof newSelection == 'undefined') {
    selected.value = null
    return
  }

  selected.value = newSelection[0]
}

//Responsive related stuff
const { screen } = useQuasar()
watch(() => screen.width, setCanvasSize)

function setCanvasSize() {
  if (!imageDimensions.value || !canvasEl.value || !canvas) {
    return
  }
  const parentWidth = canvasEl.value?.parentElement?.parentElement?.clientWidth
  if (!parentWidth) {
    return
  }

  const height =
    (imageDimensions.value.height / imageDimensions.value.width) * parentWidth

  canvas.setWidth(parentWidth)
  canvas.setHeight(height)

  const ratio = parentWidth / imageDimensions.value.width
  canvas.setZoom(ratio)
}

//User actions
async function onAddImageClick() {
  const image = await fabric.Image.asyncFromURL('/id_placeholder.png')
  image
    .set({
      lockUniScaling: false,
      centeredScaling: true,
      lockSkewingX: true,
      lockSkewingY: true,
      transparentCorners: false,
    })
    .setControlsVisibility({
      ml: false,
      mt: false,
      mr: false,
      mb: false,
    })
    .setCoords()
    .set('turbelaType', 'AvatarImage')

  canvas?.add(image)
}

async function onAddTextClick() {
  const iText = new fabric.IText('Lorem Ipsum')
    .set('turbelaType', 'Text')
    .set({ centeredScaling: true, originX: 'middle', originY: 'middle' })
  canvas?.add(iText)
}

function onJsonClick() {
  if (!canvas) {
    return
  }
  console.log(canvas?.toJSON(['values', 'turbelaType']))
}

async function onBackgroundSelect(image: fabric.Image) {
  if (!canvas || !image.width || !image.height) {
    return
  }

  imageDimensions.value = { width: image.width, height: image.height }
  console.log(imageDimensions.value)
  await canvas.setAsyncBackgroundImage(image)
  setCanvasSize()
}

function onDeleteClick() {
  if (!selected.value || !canvas) {
    return
  }
  selected.value = null
  const activeObjects = canvas.getActiveObjects()
  canvas.discardActiveObject()
  if (activeObjects.length) {
    canvas.remove.apply(canvas, activeObjects)
  }
}

function onSubmitClick() {
  specRef.value = JSON.stringify(canvas?.toJSON(['values', 'turbelaType']))
  emit('submit')
}
</script>

<script lang="ts"></script>
