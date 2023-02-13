<template>
  <div>
    <q-stepper v-model="step" flat header-nav color="primary" animated>
      <q-step
        name="capture"
        title="Capture"
        icon="camera"
        :done="!!data.length"
        :caption="data.length ? '(Click to re-capture)' : undefined"
      >
        <CameraCapture v-model="data" />
      </q-step>
      <q-step
        name="crop"
        icon="crop"
        title="Crop"
        :done="!!croppedData.length"
        :disable="!data.length"
        :caption="
          data.length && croppedData.length ? '(Click to recrop)' : undefined
        "
      >
        <div class="column q-gutter-sm">
          <Cropper
            v-if="data.length"
            ref="cropper"
            :src="data"
            auto-zoom
            :stencil-props="{
              class: 'stencil-overlay',
              aspectRatio: 588 / 760,
            }"
          />
          <div>
            <div class="row justify-center">
              <q-btn round icon="crop" size="xl" @click="handleCropClick" />
            </div>
          </div>
          <canvas
            ref="resizeCanvas"
            style="display: none"
            width="588"
            height="760"
          />
        </div>
      </q-step>
      <q-step
        name="save"
        title="Save"
        icon="upload"
        :disable="!croppedData.length"
      >
        <q-img style="width: 30%" :src="croppedData" />
        <q-btn @click="handleUpload">Upload</q-btn>
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import CameraCapture from 'src/components/molecules/CameraCapture.vue'
import { ref, watch } from 'vue'
import { UploadAvatarDocument, User } from 'src/generated/graphql'

interface Props {
  user: User
}

const props = defineProps<Props>()
const step = ref('capture')
const data = ref('')
const croppedData = ref('')
const cropper = ref<null | typeof Cropper>(null)
watch(data, (newValue) => {
  if (newValue.length) {
    step.value = 'crop'
  } else {
    step.value = 'capture'
  }
})

watch(step, (newValue) => {
  switch (newValue) {
    case 'capture':
      data.value = ''
    case 'crop':
      croppedData.value = ''
      break
  }
})

const resizeCanvas = ref<HTMLCanvasElement | null>(null)
function handleCropClick() {
  if (!cropper.value || !resizeCanvas.value) {
    return
  }

  const { canvas } = cropper.value.getResult()
  const context = resizeCanvas.value?.getContext('2d')
  context?.drawImage(canvas, 0, 0, 588, 760)
  croppedData.value = resizeCanvas.value.toDataURL()
  step.value = 'save'
}
const { mutate: upload } = useMutation(UploadAvatarDocument, {
  context: { hasUpload: true },
})

async function handleUpload() {
  const blob = await fetch(croppedData.value).then((i) => i.blob())
  const avatar = new File([blob], 'avatar.png', {
    type: 'image/png',
  })

  upload({ id: props.user.id, avatar })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
gql`
  mutation UploadAvatar($id: ID!, $avatar: Upload) {
    updateUser(input: { id: $id, avatar: $avatar }) {
      id
      avatar {
        url
      }
    }
  }
`
</script>

<style lang="scss">
.stencil-overlay {
  &:after {
    content: '';
    background-image: url('/photo-stencil.png');
    background-size: contain;
    opacity: 0.35 !important;
    position: absolute;
    pointer-events: none;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
