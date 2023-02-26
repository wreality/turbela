<template>
  <div class="row q-gutter-lg q-py-xl" :class="{ shake: props.error }">
    <q-icon
      v-for="index in props.pinLength"
      :key="'pin' + index"
      name="circle"
      size="80px"
      :class="props.value.length >= index ? 'active' : 'inactive'"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string
  error?: boolean
  pinLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
  pinLength: 4,
})
</script>

<style lang="scss" scoped>
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

body.body--dark {
  .q-icon.inactive {
    color: $grey-8;
  }
  .q-icon.active {
    color: white;
  }
}
body.body--light {
  .q-icon.inactive {
    color: $grey-3;
  }
}
</style>
