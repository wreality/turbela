<template>
  <div class="fit bg-grey-3 text-center q-pa-md flex flex-center">
    <div class="column q-gutter-md">
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
          <vue-qrious :value="qrValue" />
        </q-card-section>
      </q-card>
      <q-spinner v-if="loading" size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateSlug } from 'random-word-slugs'
import { useMutation } from '@vue/apollo-composable'
import { ActivateTerminalDocument } from 'src/generated/graphql'
import { useTimeoutPoll } from '@vueuse/core'
import VueQrious from 'vue-qrious'
import { useRouter } from 'vue-router'
import { useTerminalStore } from 'src/composables/terminalStore'
const slug = generateSlug()
const qrValue = process.env.API + '/terminal/register/' + slug
const { terminalToken } = useTerminalStore()
const link = () => {
  window.turbela.openUrl(qrValue)
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
      terminalToken.value = tkn
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
