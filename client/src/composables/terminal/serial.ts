import { LocatorTypes } from './../../gql/graphql';
import { useApolloClient } from '@vue/apollo-composable'
import { useIdle } from '@vueuse/core'
import { LocatorLookupDocument } from 'src/gql/graphql'
import { useScannedCardsDialog } from '.'
import { useScannedCards } from './store'
import type { SerialListenerCB } from './types'

const serialChannelListeners = {
  RFID: [] as SerialListenerCB[],
  BARCODE: [] as SerialListenerCB[],
}
export type SerialChannelName = `${LocatorTypes}`

export function useTerminalScanner(
  channel: SerialChannelName,
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
  }

  serialChannelListeners[channel].unshift(callback)

  return cancel
}

const { add } = useScannedCards()

export function useTerminalSerial() {
  const { show } = useScannedCardsDialog()
  const { idle } = useIdle(30 * 1000)
  const { resolveClient } = useApolloClient()
  const client = resolveClient('terminalClient')

  async function locatorLookup(type: SerialChannelName, token: string) {

    const result = await client.query({
      query: LocatorLookupDocument,
      variables: {
        type: type as LocatorTypes,
        token,
      },
      fetchPolicy: 'network-only',
    })
    return result.data.locator ?? null
  }

  return {
    handle: async function (
      _: any,
      __: string,
      channel: SerialChannelName,
      token: string,
      repeated = false
    ) {
      let seen = false
      let lookup = await locatorLookup(channel, token)
      if ((serialChannelListeners[channel]?.length ?? 0) > 0) {
        if (
          serialChannelListeners[channel].some(
            async (c) => await c(channel, token, lookup, repeated)
          )
        ) {
          seen = true
        }
      }
      client.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: 'locator',
      })
      client.cache.gc()
      lookup = await locatorLookup(channel, token)

      if (lookup && !repeated) {
        add(token, channel, { seen, lookup })
        if (idle.value) {
          show()
        }
      }
    },
  }
}
