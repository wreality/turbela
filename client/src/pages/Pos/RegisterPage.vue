<template>
  <div
    class="page text-center q-pa-md flex flex-center"
    style="min-height: 100vh"
  >
    <q-tab-panels
      v-model="step"
      animated
      class="full-height"
      transition-next="scale"
      transition-prev="scale"
    >
      <q-tab-panel name="url" class="q-pa-none">
        <q-form @click="onUrlContinueClick">
          <VQWrap t-prefix="terminal.authenticate">
            <card-dialog v-bind="card" title="Turbela Server Location">
              <q-card-section>
                Enter the URL of your Turbela instance below.
                <VeeInput name="url" />
              </q-card-section>
              <template #actions>
                <q-btn flat label="Continue" type="submit" />
              </template>
            </card-dialog>
          </VQWrap>
        </q-form>
      </q-tab-panel>
      <q-tab-panel name="pending" class="q-pa-none full-height">
        <CardDialog v-bind="card" title="Register Terminal">
          <div class="flex flex-center full-height">
            <q-card-section>
              <p>
                Login to your administrator account and enter the code below to
                authorize this terminal to access the server.
              </p>
              <div
                style="font-size: 2.5em"
                class="bg-blue text-white q-py-md q-px-sm"
                size="large"
              >
                {{ slug }}
              </div>
            </q-card-section>
            <q-card-section>
              <p>Or scan the QR code below.</p>
              <vue-qrious :size="150" :value="link" />
            </q-card-section>
          </div>
          <template #actions>
            <q-card-actions>
              <q-btn label="Re-enter Site URL" flat @click="onClearUrlClick" />
            </q-card-actions>
          </template>
        </CardDialog>
      </q-tab-panel>
      <q-tab-panel name="done" class="q-pa-none text-positive">
        <CardDialog
          v-bind="card"
          title="Registered Successfully"
          color="positive"
        >
          <div class="flex-center column q-gutter-md full-height">
            <div>
              <q-icon name="check_circle" size="200px" />
            </div>
            <div><b>Success!</b> Relaunch the terminal to get started!</div>
          </div>
          <template #actions>
            <q-btn
              label="Relaunch Terminal"
              color="positive"
              flat
              @click="relaunch"
            />
          </template>
        </CardDialog>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { useApolloClient, useMutation } from '@vue/apollo-composable'
import { useTimeoutPoll } from '@vueuse/core'
import { generateSlug } from 'random-word-slugs'
import CardDialog from 'src/components/CardDialog.vue'
import VQWrap from 'src/components/atoms/VQWrap.vue'
import VeeInput from 'src/components/atoms/VeeInput.vue'
import { useTerminalStore } from 'src/composables/terminal'
import {
  ActivateTerminalDocument,
  GeneralSettingsDocument,
} from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import VueQrious from 'vue-qrious'
import { useRouter } from 'vue-router'
const { resolve } = useRouter()
const { terminalToken, terminalUrl } = useTerminalStore()

const slug = generateSlug()
const link = computed(() => {
  return (
    terminalUrl.value.replace(/\/$/, '') +
    resolve({ name: 'admin:terminals:register', params: { slug } }).fullPath
  )
})

const step = ref(terminalUrl.value.length ? 'pending' : 'url')
const { mutate: activate } = useMutation(ActivateTerminalDocument, {
  variables: {
    slug,
  },
})
const { pause } = useTimeoutPoll(
  async () => {
    if (!terminalUrl.value) {
      return
    }
    const result = await activate()

    const tkn = result?.data?.activateTerminal?.plainTextToken
    if (tkn) {
      terminalToken.value = tkn
      step.value = 'done'
      pause()
    }
  },
  5000,
  { immediate: true }
)

function relaunch() {
  window.turbela.relaunch()
}
const { handleSubmit, values, setFieldError } = useForm({
  validationSchema: {
    url: string().required().url().label('Url'),
  },
})
const { resolveClient } = useApolloClient()
const client = resolveClient()
const onUrlContinueClick = handleSubmit(async (values) => {
  terminalUrl.value = values.url.replace(/\/$/, '')

  try {
    const result = await client.query({ query: GeneralSettingsDocument })
    step.value = 'pending'
  } catch (err) {
    setFieldError('url', '' + err)
    terminalUrl.value = null
  }
})

function onClearUrlClick() {
  terminalUrl.value = null
  step.value = 'url'
}
const card = {
  style: 'height: 500px; width: 600px',
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { string } from 'yup'

gql`
  mutation ActivateTerminal($slug: String!) {
    activateTerminal(slug: $slug) {
      plainTextToken
    }
  }
`
</script>

<style lang="scss" scoped>
body.body--light {
  .page {
    background: $grey-3;
  }
}
</style>
