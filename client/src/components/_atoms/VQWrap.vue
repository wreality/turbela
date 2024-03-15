<template>
  <slot />
</template>

<script setup lang="ts">
interface Props {
  /**
   * TPrefix to provide to VQInput components. When supplied, the VQInput component will use
   * the validator $path property to determine the translation key.
   */
  tPrefix?: string
}
const props = defineProps<Props>()
const { provide } = usei18nPrefix()
if (props.tPrefix) {
  provide(props.tPrefix)
}
</script>
