<template>
  <div class="column">
    <div class="row items-center bg-black">
      <video
        ref="video"
        autoplay
        playsinline
        style="height: 420px; margin: 0 auto"
        @canplay="handleVideoAvailable"
      ></video>
      <q-inner-loading :showing="!videoAvailable" />
    </div>
    <q-banner v-if="!selectedDevice">Select a capture device.</q-banner>
    <div class="row">
      <div class="col">
        <q-btn icon="settings" dense @click="handleSettings" />
      </div>
      <div class="col-12">
        <div class="row justify-center">
          <q-btn
            class="q-mx-auto"
            size="xl"
            round
            icon="camera"
            @click="handleCapture"
          />
        </div>
      </div>
    </div>
    <canvas ref="canvas" style="display: none" />
  </div>
</template>

<script setup lang="ts">
import { LocalStorage, useQuasar } from 'quasar'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

interface Props {
  width?: number
  preferredCamera?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  preferredCamera: 'default',
  modelValue: '',
})
const emit = defineEmits<{
  (e: 'captured', data: string): void
  (e: 'update:modelValue', data: string): void
}>()

const video = ref<null | HTMLVideoElement>(null)
const canvas = ref<null | HTMLCanvasElement>(null)
const selectedDevice = ref<null | MediaDeviceInfo>(null)
const currentStream = ref<null | MediaStream>(null)
const devices = ref<MediaDeviceInfo[]>([])
const options = computed(() => {
  return devices.value
    .filter((d) => d.kind === 'videoinput')
    .map(({ deviceId, label }) => ({ value: deviceId, label }))
})
const videoAvailable = ref(false)
const preferredCamera = LocalStorage.getItem(`camera.${props.preferredCamera}`)

onMounted(async () => {
  // @ts-ignore
  const permissionsObj = await navigator.permissions.query({ name: 'camera' })
  if (permissionsObj.state === 'prompt') {
    await navigator.mediaDevices.getUserMedia({ video: true })
  }
  if (video.value && canvas.value) {
    devices.value = await navigator.mediaDevices.enumerateDevices()
    if (preferredCamera) {
      const savedDevice = devices.value.find(
        (v) => v.deviceId === preferredCamera
      )
      if (savedDevice) {
        selectedDevice.value = savedDevice
      }
    }
  }
})
function stopStream() {
  if (currentStream.value !== null) {
    currentStream.value.getTracks().forEach((track) => {
      track.stop()
    })
    currentStream.value = null
  }
}
onBeforeUnmount(() => {
  stopStream()
})
const size = reactive({
  width: props.width,
  height: 0,
})
watch(selectedDevice, async (newValue) => {
  stopStream()
  videoAvailable.value = false
  if (newValue === null) {
    return
  }
  LocalStorage.set(`camera.${props.preferredCamera}`, newValue.deviceId)
  const constraints = {
    audio: false,
    video: {
      deviceId: { exact: newValue.deviceId },
      width: { ideal: 4096 / 2 },
      height: { ideal: 2160 / 2 },
    },
  }

  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  if (stream) {
    currentStream.value = stream
  }
})

watch(currentStream, (newValue) => {
  if (video.value && newValue) {
    video.value.srcObject = newValue
  }
})

function handleVideoAvailable() {
  videoAvailable.value = true
  if (!video.value || !canvas.value) {
    return
  }
  size.height = (video.value.videoHeight / video.value.videoWidth) * size.width

  canvas.value.setAttribute('width', String(size.width))
  canvas.value.setAttribute('height', String(size.height))
}

function handleCapture() {
  if (!canvas.value || !video.value) {
    return
  }
  const context = canvas.value.getContext('2d')
  if (size.width && size.height) {
    canvas.value.width = size.width
    canvas.value.height = size.height
    context?.drawImage(video.value, 0, 0, size.width, size.height)

    const data = canvas.value.toDataURL('image/png')
    emit('update:modelValue', data)
    emit('captured', data)
  }
}
const { dialog } = useQuasar()
function handleSettings() {
  dialog({
    title: 'Camera Settings',
    message: 'Select video capture device',
    options: {
      type: 'radio',
      model: selectedDevice.value?.deviceId ?? '',
      // inline: true
      items: options.value,
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    selectedDevice.value =
      devices.value.find((v) => v.deviceId === data) ?? null
  })
}
</script>
