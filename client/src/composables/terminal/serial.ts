import { useApolloClient } from '@vue/apollo-composable'
import type { SerialChannels, SerialListenerCB } from './types'
import { LocatorLookupDocument } from 'src/generated/graphql'
import { useScannedCards } from './store'

const serialChannelListeners: Record<SerialChannels, SerialListenerCB[]> = {
  RFID: [],
  BARCODE: [],
}
export function useTerminalScanner(
  channel: 'RFID' | 'BARCODE',
  callback: SerialListenerCB
) {
  function cancel() {
    const index = serialChannelListeners[channel].findIndex(
      (c: SerialListenerCB) => c === callback
    )
    if (index === -1) {
      return
    }
    serialChannelListeners[channel].splice(index, 1)
    console.log('cancelled', serialChannelListeners)
  }

  serialChannelListeners[channel].push(callback)

  return cancel
}

const { add } = useScannedCards()

export function useTerminalSerial() {
  const { resolveClient } = useApolloClient()
  const client = resolveClient()

  async function locatorLookup(type: 'RFID' | 'BARCODE', token: string) {
    const result = await client.query({
      query: LocatorLookupDocument,
      variables: {
        type,
        token,
      },
    })
    return result.data.locator ?? null
  }

  return {
    handle: async function (
      _: any,
      __: string,
      channel: SerialChannels,
      token: string
    ) {
      let seen = false
      const lookup = await locatorLookup(channel, token)
      if ((serialChannelListeners[channel]?.length ?? 0) > 0) {
        if (
          serialChannelListeners[channel].some(
            async (c) => await c(channel, token, lookup)
          )
        ) {
          seen: true
        }
      }
      if (lookup) {
        add(token, { seen, lookup })
      }
    },
  }
}
