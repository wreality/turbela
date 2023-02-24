import TerminalLoginDialog from 'src/components/dialogs/TerminalLoginDialog.vue'
import { useTerminalStore } from './store'
import { Dialog } from 'quasar'
import { DocumentNode } from 'graphql'
import { useMutation, useQuery } from '@vue/apollo-composable'

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

export * from './types'
export * from './store'
export * from './serial'
