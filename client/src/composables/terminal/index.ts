import { useMutation, useQuery } from '@vue/apollo-composable'
import { DocumentNode } from 'graphql'
import { Dialog } from 'quasar'
import TerminalLoginDialog from 'src/components/dialogs/TerminalLoginDialog.vue'
import { useTerminalStore } from './store'

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

export function useDisconnectWarningDialog() {
  return {
    show: async () => {
      return new Promise((resolve) => {
        Dialog.create({
          title: 'Confirm Clear Credentials',
          message:
            "Are you sure you want to clear this terminal's credentials.  <b>You will need an administrator account to reconnect this terminal.</b>",
          html: true,
          cancel: true,
        })
          .onOk(() => resolve(true))
          .onCancel(() => resolve(false))
          .onDismiss(() => resolve(false))
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

export * from './serial'
export * from './store'
export * from './types'
