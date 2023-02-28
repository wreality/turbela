import { createGlobalState } from '@vueuse/core'
import { DateTime } from 'luxon'
import { LocalStorage } from 'quasar'
import { computed, ref, watchEffect } from 'vue'
import { SerialChannelName } from './serial'
import type { ScannedCard, ScannedCards, TerminalUser } from './types'
import { TerminalSetup } from './types'

const token = ref<string | null>(null)
const terminalName = ref<string | null>(null)
//const users = ref<TerminalUser[]>([])
const users = connectLocalStorage<TerminalUser[]>('terminal-users', [])
const others = computed(() => {
  return users.value.filter((u) => u.token !== token.value)
})

//const cardsScanned = ref<ScannedCards>([])

const terminalToken = connectLocalStorage<string | null>('terminal-token', null)
const terminalSetup = connectLocalStorage<TerminalSetup>('terminal-setup', {})
const terminalUrl = connectLocalStorage<string>(
  'terminal-url',
  process.env.API ?? ''
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
function connectLocalStorage<TRef extends any>(key: string, def: any = null) {
  const valueRef = ref<TRef>(LocalStorage.getItem(key) ?? def)
  console.log(key, valueRef.value)
  watchEffect(() => {
    console.log(key, valueRef.value)
    if (valueRef.value === null) {
      LocalStorage.remove(key)
    } else {
      console.log(key, valueRef.value)
      LocalStorage.set(key, valueRef.value)
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
