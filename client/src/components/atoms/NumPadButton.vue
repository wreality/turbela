<template>
  <q-btn
    size="40px"
    class="numPadButton"
    flat
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

<style lang="scss">
.numPadButton {
  padding: 30px 50px 30px 50px;
  background-color: $grey-1;
  border-radius: 50%;
}
</style>
