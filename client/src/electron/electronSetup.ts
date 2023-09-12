import { useApolloClient } from '@vue/apollo-composable'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { useTerminalSerial, useTerminalStore } from 'src/composables/terminal'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { HelloTerminalDocument } from 'src/gql/graphql'

export default async function () {
  const { push } = useRouter()
  const store = useTerminalStore()

  if (!store.terminalToken.value || !store.terminalUrl.value) {
    push({ name: 'pos:register' })
  }

  const { resolveClient } = useApolloClient()
  const client = resolveClient()

  watch(store.token, (newValue) => {

    if (!newValue && client) {
      client.cache.reset()
      return
    }
    client.refetchQueries({ include: 'all' })

  })

  const keys = useMagicKeys()

  whenever(keys.ctrl_L, () => {
    store.token.value = null
  })

  const { handle } = useTerminalSerial()
  window.turbela.serialCapture(handle)

  const { notify } = useQuasar()
  const { t } = useI18n()
  window.turbela.emitNotify((_, type, message) =>
    notify({ type, message: t(message) })
  )

  if (store.terminalSetup.value?.cardReaderPort) {
    window.turbela.startSerial(store.terminalSetup.value.cardReaderPort, 'RFID')
  }

  if (store.terminalSetup.value?.barcodeReaderPort) {
    window.turbela.startSerial(
      store.terminalSetup.value.barcodeReaderPort,
      'BARCODE'
    )
  }

  window.onbeforeunload = () => {
    window.turbela.endSerial()
  }

  const terminalClient = resolveClient('terminalClient')
  const route = useRoute()
  async function verifyTerminal(): Promise<boolean | null> {
    if (typeof route.name == 'string' && route.name?.match(/^pos/)) {
      return null
    }
    if (!store.terminalToken.value) {
      return false
    }
    try {
      const value = await terminalClient.query({
        query: HelloTerminalDocument,
      })
      const result = !!value.data.helloTerminal
      if (!result) {
        return false
      }
      store.terminalName.value = value.data.helloTerminal?.name ?? null
    } catch (err) {
      return false
    }
    return true
  }

  onMounted(async () => {
    console.debug('terminalVerification: mounted, verifying');
    if ((await verifyTerminal()) === false) {
      console.debug('terminalVerification: failed, pushing to pos:error');
      console.log(push)
      push({ name: 'pos:error'})
    }
  })
}
