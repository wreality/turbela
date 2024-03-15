<template>
  <q-file
    v-model="value"
    outlined
    bottom-slots
    :label="t('settings.overlay.editor.upload.label')"
    counter
    accept=".png,.jpg,.jpeg image/*"
    max-total-size="10240000"
    :error="errors.length !== 0"
  >
    <template #prepend>
      <q-icon name="cloud_upload" @click.stop.prevent />
    </template>
    <template #error>
      {{ errors.join(',') }}
    </template>
  </q-file>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'

const { t } = useI18n()

const { value, errors } = useField<File | null>('upload')
const image = ref<ImageBitmap | null>()
type ImageDimensions = {
  width: number
  height: number
}

const imageDimensions = ref<null | ImageDimensions>(null)

const emit = defineEmits<{
  (e: 'select', upload: fabric.Image): void
}>()

watch(value, async (newValue) => {
  if (!newValue) {
    imageDimensions.value = null
    image.value = null
    return
  }
  image.value = await createImageBitmap(newValue)
  onSaveClick()
})

function onSaveClick() {
  emit('select', new fabric.Image(image.value as any as HTMLImageElement))
}
</script>
