<template>
  <q-card>
    <q-card-section class="q-pa-sm column" :class="props.topClass">
      <q-card-section class="q-pa-none">
        <slot name="header"></slot>
      </q-card-section>
      <q-card-section v-if="slots.details" class="q-pa-none items-center">
        <slot name="details"></slot>
      </q-card-section>
    </q-card-section>
    <template v-if="slots.actions">
      <q-separator></q-separator>
      <q-card-actions class="q-py-xs">
        <slot name="actions"></slot>
      </q-card-actions>
    </template>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  /**
   * Class to be applied to the outermost q-card-section
   */
  topClass?: any
}

const props = withDefaults(defineProps<Props>(), {
  topClass: '',
})

const slots = useSlots()
</script>
