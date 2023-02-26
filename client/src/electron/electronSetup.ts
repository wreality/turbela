import { useApolloClient } from '@vue/apollo-composable'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useQuasar } from 'quasar'
import {
  useTerminalDialog,
  useTerminalSerial,
  useTerminalStore,
} from 'src/composables/terminal'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { HelloTerminalDocument } from './../generated/graphql'

export default async function () {
  const { push } = useRouter()
  const store = useTerminalStore()

  console.log(store.terminalToken.value)
  if (!store.terminalToken.value) {
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

  const { show } = useTerminalDialog()

  const keys = useMagicKeys()

  whenever(keys.ctrl_L, () => {
    show()
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
  async function verifyTerminal() {
    if (!store.terminalToken.value) {
      return
    }
    if (typeof route.name == 'string' && route.name?.match(/^pos/)) {
      return
    }
    let result: boolean
    try {
      const value = await terminalClient.query({
        query: HelloTerminalDocument,
      })
      result = !!value.data.helloTerminal
      store.terminalName.value = value.data.helloTerminal?.name ?? null
    } catch (err) {
      console.log(err)
      result = false
    }

    if (!result) {
      push({ name: 'pos:error' })
    }
    return result
  }
  onMounted(() => {
    verifyTerminal()
  })
}
