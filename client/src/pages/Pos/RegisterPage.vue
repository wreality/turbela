<template>
  <div
    class="page text-center q-pa-md flex flex-center"
    style="min-height: 100vh"
  >
    <div class="column q-gutter-md">
      <q-card flat style="height: 500px; width: 600px" class="flex flex-center">
        <q-tab-panels v-model="step" animated>
          <q-tab-panel name="pending">
            <q-card-section class="bg-primary text-white q-py-sm"
              >Unregistered Terminal</q-card-section
            >
            <q-card-section>
              <p>
                Doesn't look like this terminal has been registered with Turbela
                yet.
              </p>
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
              <vue-qrious :value="qrValue" />
            </q-card-section>
          </q-tab-panel>
          <q-tab-panel name="done" class="text-positive q-gutter-sm">
            <q-icon name="check_circle" size="200px" />
            <q-banner class="bg-positive text-white" rounded>
              <b>Success!</b> Relaunch the terminal to get started!
            </q-banner>
            <q-btn
              label="Relaunch Terminal"
              color="positive"
              @click="relaunch"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { useTimeoutPoll } from '@vueuse/core'
import { generateSlug } from 'random-word-slugs'
import { useTerminalStore } from 'src/composables/terminal'
import { ActivateTerminalDocument } from 'src/generated/graphql'
import VueQrious from 'vue-qrious'
import { useRouter } from 'vue-router'

const { resolve } = useRouter()

const slug = generateSlug()
const link = resolve({ name: 'admin:terminals:register', params: { slug } })

const url = new URL(process.env.API as string)
url.protocol = 'https'

const qrValue = `${url.protocol}://${url.host}${link.fullPath}`

const { terminalToken } = useTerminalStore()

const step = ref('pending')
const { mutate: activate } = useMutation(ActivateTerminalDocument, {
  variables: {
    slug,
  },
})
const { pause } = useTimeoutPoll(
  async () => {
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
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { ref } from 'vue'

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
