import { useInterval } from '@vueuse/core'
import { computed, nextTick, watch } from 'vue'

export function useSelfDismiss(timeInSeconds: number, complete: () => void) {
  const { counter, resume, reset, pause } = useInterval(550, {
    controls: true,
    immediate: false,
  })

  const value = computed(() =>
    Math.min((counter.value * 550) / (timeInSeconds * 1000), 1.1)
  )
  watch(value, async (newValue: number) => {
    if (newValue >= 1.1) {
      await nextTick()
      pause()
      complete()
    }
  })
  return {
    value,
    resume,
    reset,
    pause,
  }
}
