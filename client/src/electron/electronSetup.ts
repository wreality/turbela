//@ts-ignore
import { ApolloClients, useMutation, useQuery } from '@vue/apollo-composable'
import { useMagicKeys, whenever } from '@vueuse/core'
import { DocumentNode } from 'graphql'
import { Dialog, useQuasar } from 'quasar'
import TerminalLoginDialog from 'src/components/dialogs/TerminalLoginDialog.vue'
import { useTerminalStore } from 'src/composables/terminalStore'
import { User } from 'src/generated/graphql'
import { inject, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function electronSetup() {
  const { push } = useRouter()
  const store = useTerminalStore()

  if (!store.terminalToken.value) {
    push('/pos/configure')
  }
  const apolloClients = inject<Record<string, any>>(ApolloClients)
  const client = apolloClients?.default
  watch(store.token, (newValue, oldValue) => {
    if (newValue === oldValue) {
      return
    }
    if (!newValue && client) {
      client.cache.reset()
      return
    }
    client.refetchQueries({ include: 'all' })
  })

  const { show } = useTerminalDialog()

  if (store.terminalToken.value) {
    onMounted(() => {
      show()
    })
  }

  const keys = useMagicKeys()

  whenever(keys.ctrl_L, () => {
    show()
  })

  window.turbela.serialCapture((_, __, card) => store.newCardScanned(card))

  const { notify } = useQuasar()
  window.turbela.emitNotify((_, type, message) => notify({ type, message }))

  if (store.terminalSetup.value?.cardReaderPort) {
    window.turbela.startSerial(store.terminalSetup.value.cardReaderPort)
  }

  window.onbeforeunload = () => {
    window.turbela.endSerial()
  }
}

export function useTerminalDialog() {
  const { token } = useTerminalStore()
  return {
    show: () => {
      token.value = null
      Dialog.create({
        component: TerminalLoginDialog,
      })
    },
  }
}

export function useTerminalMutation(
  document: DocumentNode,
  opts: Record<string, any> = {}
) {
  opts.clientId = 'terminalClient'

  return useMutation(document, opts)
}

export function useTerminalQuery(
  document: DocumentNode,
  opts: Record<string, any> = {}
) {
  opts.clientId = 'terminalClient'

  return useQuery(document, opts)
}

export type TerminalUser = User & { token: string }
