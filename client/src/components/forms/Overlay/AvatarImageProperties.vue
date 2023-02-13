<template>
  <div>{{ position }}</div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue'
interface Props {
  object: fabric.Image
}

const props = defineProps<Props>()
const position = ref({ x: 0, y: 0 })
onMounted(() => {
  props.object.on('moved', (e) => {
    console.log(e)
    position.value = { x: props.object.left ?? 0, y: props.object.top ?? 0 }
  })
})

function testFn() {
  console.log(props.object)
}
</script>
