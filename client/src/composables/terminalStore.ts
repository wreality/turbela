import { Ref, computed, ref, watch, watchEffect } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { LocalStorage } from 'quasar'
import { DateTime } from 'luxon'

const token = ref<String | null>(null)
const terminalToken = ref<String | null>(null)
const users = ref<Array<any>>([])
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
  function newCardScanned(value: string) {
    cardsScanned.value.unshift({
      value: value.trim(),
      when: DateTime.now(),
      seen: false,
    })
  }
  return {
    token,
    terminalToken,
    users,
    terminalSetup,
    others,
    cardsScanned,
    newCardScanned,
  }
})

export type TerminalSetup = {
  cardReaderPort?: string
}

export type ScannedCard = {
  value: string
  seen: boolean
  when: DateTime
}
