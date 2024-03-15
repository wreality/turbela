<template>
  <q-banner class="col-11 q-mb-md text-center" rounded inline-actions dense>
    {{ $t(`tips.${name}`) }}
    <template #avatar>
      <q-icon name="tips_and_updates" size="sm"></q-icon>
    </template>
  </q-banner>
</template>
<script lang="ts">
//TODO: convert to script setup
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

<style lang="scss" scoped>
body.body--dark {
  .q-banner {
    background: $yellow-10;
  }
}
body.body--light {
  .q-banner {
    background: $yellow-3;
  }
}
</style>
