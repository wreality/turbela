<template>
  <div class="row q-gutter-lg q-py-xl" :class="{ shake: error }">
    <q-icon
      v-for="index in pinLength"
      :key="'pin' + index"
      name="circle"
      size="80px"
      :color="value.length >= index ? 'black' : 'grey-3'"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string
  error?: boolean
  pinLength?: number
}

withDefaults(defineProps<Props>(), {
  error: false,
  pinLength: 4,
})
</script>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  transform: translate3d(0, 0, 0);
}
.shake .q-icon {
  color: red !important;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(20px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-40px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(40px, 0, 0);
  }
}
</style>
