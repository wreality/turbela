import { useApolloClient } from '@vue/apollo-composable'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { useTerminalDialog, useTerminalSerial } from 'src/composables/terminal'
import { useTerminalStore } from 'src/composables/terminal'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default function () {
  const { push } = useRouter()
  const store = useTerminalStore()

  if (!store.terminalToken.value) {
    push('/pos/configure')
  }
  const { resolveClient } = useApolloClient()
  const client = resolveClient()

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
}
