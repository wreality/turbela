<template>
  <q-btn
    size="50px"
    class="numPadButton"
    fab
    :icon="icon"
    @click="$emit('btnPress', value)"
    >{{ icon ? '' : value }}</q-btn
  >
</template>

<script setup lang="ts">
interface Props {
  value: string
  keyCode: any
  icon?: string
}

defineProps<Props>()

defineEmits<{
  (e: 'btnPress', value: string): void
}>()
</script>

<style>
.numPadButton {
  padding: 30px 50px 30px 50px;
}
</style>
