<template>
  <div class="fit bg-grey-3 text-center q-pa-md flex flex-center">
    <div v-if="!token" class="column q-gutter-md">
      <q-card>
        <q-card-section>
          <p>Doesn't look like this POS application has been configured yet.</p>
          <p>
            Login to your Turbela administrator account enter the code below in
            the
            <a href="#" @click.prevent="link">POS Terminal -> Register page</a>.
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
          <vue-qrious :value="value" />
        </q-card-section>
      </q-card>
      <q-spinner v-if="loading" size="lg" />
    </div>
    <div v-else>
      <q-banner class="bg-positive">Terminal Activated: {{ token }}</q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateSlug } from 'random-word-slugs'
import { useMutation } from '@vue/apollo-composable'
import { ActivateTerminalDocument } from 'src/generated/graphql'
import { useTimeoutPoll } from '@vueuse/core'
import VueQrious from 'vue-qrious'
import { ref } from 'vue'
import { updateTerminalToken } from 'src/electron/electronSetup'
import { useRouter } from 'vue-router'

const slug = generateSlug()
const value = process.env.API + '/terminal/register/' + slug

const token = ref<String | null>(null)
const link = () => {
  window.turbela.openUrl(value)
}

const { mutate: activate, loading } = useMutation(ActivateTerminalDocument, {
  variables: {
    slug,
  },
})
const { push } = useRouter()
const { pause } = useTimeoutPoll(
  async () => {
    const result = await activate()

    const tkn = result?.data?.activateTerminal?.plainTextToken
    if (tkn) {
      updateTerminalToken(tkn)
      pause()
      push('/')
    }
  },
  5000,
  { immediate: true }
)

//Start the loop checking to see if the slug can be registered.
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  mutation ActivateTerminal($slug: String!) {
    activateTerminal(slug: $slug) {
      plainTextToken
    }
  }
`
</script>
