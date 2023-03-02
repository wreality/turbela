<template>
  <q-card-section>
    Currently there are no special settings for avatar images.
  </q-card-section>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
interface Props {
  object: fabric.Image
}
defineProps<Props>()
</script>
