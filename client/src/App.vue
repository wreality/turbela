<template>
  <router-view />
</template>
<script lang="ts" setup>
import { electronSetup } from './electron/electronSetup'

if (process.env.MODE == 'electron') {
  electronSetup()
}
</script>
