<template lang="pug">
q-banner.bg-grey-3.text-black.col-11.q-mb-md.text-center(
  rounded,
  inline-actions,
  dense
)
  | {{ $t(`tips.${name}`) }}
  template(#avatar)
    q-icon(name='tips_and_updates', size='sm')
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TipBox',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
