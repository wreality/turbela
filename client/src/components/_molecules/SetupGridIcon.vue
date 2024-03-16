<template>
  <div class="col">
    <q-btn
      class="text-center setting-icon"
      :color="!to ? 'grey-5' : variant"
      :outline="!to"
      :icon="icon"
      :label="title"
      :to="to"
      stack
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router/auto'

interface Props {
  to?: RouteLocationRaw
  variant?: string
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  variant: 'secondary',
})

const icon = computed(() =>
  props.to ? getRouteIcon(props.to, 'question') : 'question'
)
</script>

<style lang="scss">
.setting-icon {
  width: 150px;
  height: 120px;
  .q-icon {
    font-size: 3rem;
  }
}
</style>
