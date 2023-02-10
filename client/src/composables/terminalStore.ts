import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useTerminalStore = createGlobalState(() => {
  const token = ref<String | null>(null)
  const terminalToken = ref<String | null>(null)
  const users = ref<Array<any>>([])
  const others = computed(() => {
    return users.value.filter((u) => u.token !== token.value)
  })
  return { token, terminalToken, users, others }
})
