import { useMutation, useQuery } from '@vue/apollo-composable'
import PosScannedCardsDialog from 'components/_dialogs/PosScannedCardsDialog.vue'
import { DocumentNode } from 'graphql'
import { Dialog, DialogChainObject } from 'quasar'

export function useScannedCardsDialog() {
  let dialog: DialogChainObject | null = null
  function show() {
    if (dialog) {
      return
    }
    dialog = Dialog.create({
      component: PosScannedCardsDialog,
    }).onDismiss(() => (dialog = null))
  }
  function hide() {
    if (!dialog) {
      return
    }

    dialog?.hide()
  }
  return { show, hide }
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

export * from './src/serial'
export * from './src/store'
export * from './src/types'
