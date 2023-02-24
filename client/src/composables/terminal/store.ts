import { Ref, computed, ref, watch, watchEffect } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { LocalStorage } from 'quasar'
import { DateTime } from 'luxon'
import type { TerminalUser, TerminalSetup, ScannedCard } from './types'
import { assign } from 'lodash'

const token = ref<String | null>(null)
const terminalToken = ref<String | null>(null)
const users = ref<TerminalUser[]>([])
const terminalSetup = ref<TerminalSetup>()
const others = computed(() => {
  return users.value.filter((u) => u.token !== token.value)
})
const cardsScanned = ref<ScannedCard[]>([])

watchEffect(() => {
  if (cardsScanned.value.length > 10) {
    cardsScanned.value.splice(
      10 - cardsScanned.value.length,
      cardsScanned.value.length - 10
    )
  }
})
connectLocalStorage(terminalToken, 'terminal-token')
connectLocalStorage(terminalSetup, 'terminal-setup', {})

function connectLocalStorage(source: Ref, key: string, def: any = null) {
  source.value = LocalStorage.getItem(key) ?? def
  watch(source, (v) => LocalStorage.set(key, v))
}

export const useTerminalStore = createGlobalState(() => {
  return {
    token,
    terminalToken,
    users,
    terminalSetup,
    others,
    cardsScanned,
  }
})

export function useScannedCards() {
  function add(value: string, defaults: Partial<ScannedCard> = {}) {
    cardsScanned.value.unshift(
      Object.assign(
        {
          value: value.trim(),
          when: DateTime.now(),
          seen: false,
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
