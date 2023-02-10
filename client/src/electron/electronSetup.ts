//@ts-ignore
import TerminalLoginDialog from 'src/components/dialogs/TerminalLoginDialog.vue'
import { DocumentNode } from 'graphql'
import { ApolloClients, useMutation, useQuery } from '@vue/apollo-composable'
import { LocalStorage, useQuasar, Dialog } from 'quasar'
import { useTerminalStore } from 'src/composables/terminalStore'
import { inject, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { User } from 'src/generated/graphql'
import { useMagicKeys, whenever } from '@vueuse/core'

export function electronSetup() {
  const { push } = useRouter()
  const store = useTerminalStore()

  //Attempt to load existing key.
  store.terminalToken.value = LocalStorage.getItem('terminal-token')

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

export function updateTerminalToken(token: string) {
  const store = useTerminalStore()

  store.terminalToken.value = token

  LocalStorage.set('terminal-token', token)
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
