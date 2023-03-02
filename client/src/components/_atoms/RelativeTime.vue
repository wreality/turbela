<template>
  <span :key="renderKey">{{ relative }}</span>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed, onUnmounted, ref } from 'vue'

interface Props {
  dateTime: DateTime | string
}
const props = defineProps<Props>()

const renderKey = ref(Date.now())

const relative = computed(() => {
  renderKey.value
  if (typeof props.dateTime === 'string') {
    return DateTime.fromISO(props.dateTime).toRelative()
  }
  return props.dateTime.toRelative()
})

const nextUpdate = computed(() => {
  renderKey.value //View the renderkey value to add it as a dependency here.

  return (
    (relative.value?.includes('second') && 1000) ||
    (relative.value?.includes('minute') && 10 * 1000) ||
    (relative.value?.includes('hour') && 10 * 60 * 1000) ||
    1000 * 60 * 60 * 4
  )
})

const timeoutId = ref()

function setNewTimeout() {
  timeoutId.value = setTimeout(() => {
    renderKey.value = Date.now()
    setNewTimeout()
  }, nextUpdate.value)
}
setNewTimeout()
onUnmounted(() => {
  clearTimeout(timeoutId.value)
})
</script>
