<template>
  <div class="justify-center row q-mt-lg">
    <div class="col-md-4">
      <q-card flat>
        <q-card-section class="text-center">
          <q-icon :name="props.icon" size="8rem" color="grey-9"></q-icon>
          <div class="text-h6">{{ props.message }}</div>
        </q-card-section>
        <q-separator dark></q-separator>
        <q-card-actions class="q-pa-none">
          <q-btn
            v-if="props.search.length"
            flat
            class="full-width"
            icon="backspace"
            label="Clear Search"
            @click="$emit('clearSearch')"
          ></q-btn>
          <q-btn
            v-if="props.newLabel.length"
            class="full-width"
            color="primary"
            :label="props.newLabel"
            icon="add_circle"
            @click="$emit('addItem')"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'addItem'): void
  (e: 'clearSearch'): void
}

defineEmits<Emits>()

interface Props {
  search?: string
  message?: string
  icon?: string
  newLabel?: string
}
const props = withDefaults(defineProps<Props>(), {
  search: '',
  message: 'Search returned no results',
  icon: 'category',
  newLabel: '',
})
</script>

<style lang="scss" scoped>
body.body--dark {
  .q-card {
    background: $grey-10;
  }
}
</style>
