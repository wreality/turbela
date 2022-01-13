<template lang="pug">
q-avatar(v-bind='{ ...$attrs, ...$props }')
  q-img(:src='avatarSrc', alt='User Avatar')
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

const stringToHashInt = (s: string): number => {
  var hash = 0,
    i,
    chr
  if (s.length === 0) return hash
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export default defineComponent({
  name: 'AvatarImage',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const avatarSrc = computed(() => {
      if (!props.user.email) {
        return ''
      }
      const number = Math.abs(stringToHashInt(props.user.email)) % 8

      return `avatar-${number}.jfif`
    })

    return {
      avatarSrc,
    }
  },
})
</script>

<style lang="css"></style>
