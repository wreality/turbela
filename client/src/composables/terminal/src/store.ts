import { DateTime } from 'luxon'
import { SessionStorage } from 'quasar'
import { SerialChannelName } from './serial'
import type { ScannedCard, ScannedCards, TerminalUser } from './types'
import { TerminalSetup } from './types'

const { get } = useRuntimeConfig()

const storageDriver = SessionStorage

const token = ref<string | null>(null)
//const token = connectLocalStorage<string | null>('terminal-user', null)
const terminalName = ref<string | null>(null)
//const users = ref<TerminalUser[]>([])
const users = connectLocalStorage<TerminalUser[]>('terminal-users', [])
const others = computed(() => {
  return users.value.filter((u) => u.token !== token.value)
})

//const cardsScanned = ref<ScannedCards>([])

const terminalToken = connectLocalStorage<string | null>('terminal-token', null)
const terminalSetup = connectLocalStorage<TerminalSetup>('terminal-setup', {})
const terminalUrl = connectLocalStorage<string | null>(
  'terminal-url',
  get('API')
)

const cardsScanned = connectLocalStorage<ScannedCards>('terminal-scans', [])

watchEffect(() => {
  if (cardsScanned.value.length > 10) {
    cardsScanned.value.splice(
      10 - cardsScanned.value.length,
      cardsScanned.value.length - 10
    )
  }
})

function connectLocalStorage<TRef>(key: string, def: any = null) {
  const valueRef = ref<TRef>(storageDriver.getItem(key) ?? def)
  watchEffect(() => {
    if (valueRef.value === null) {
      storageDriver.remove(key)
    } else {
      storageDriver.set(key, valueRef.value)
    }
  })
  return valueRef
}

export const useTerminalStore = createGlobalState(() => {
  return {
    token,
    terminalToken,
    terminalName,
    terminalUrl,
    users,
    terminalSetup,
    others,
    cardsScanned,
  }
})

export function useScannedCards() {
  function add(
    value: string,
    channel: SerialChannelName,
    defaults: Partial<ScannedCard> = {}
  ) {
    cardsScanned.value.unshift(
      Object.assign(
        {
          value: value.trim(),
          when: DateTime.now(),
          seen: false,
          channel,
        },
        defaults
      )
    )
  }
  function remove(index: number) {
    return cardsScanned.value.splice(index, 1)
  }
  function update(index: number, assignment: Partial<ScannedCard>) {
    return (cardsScanned.value[index] = Object.assign(
      cardsScanned.value[index],
      assignment
    ))
  }

  function apply(assignment: Partial<ScannedCard>) {
    return cardsScanned.value.forEach((c) => Object.assign(c, assignment))
  }

  return {
    add,
    remove,
    update,
    apply,
    cards: useTerminalStore().cardsScanned,
  }
}
