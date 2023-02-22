<template>
  <q-btn flat @click="show">
    <div class="avatars">
      <q-avatar size="30px">
        <q-icon name="switch_account" />
      </q-avatar>
      <AvatarImage
        v-for="(user, idx) in others"
        :key="`avatar${idx}`"
        :user="user"
        bordered
        size="30px"
        class="inactive-avatar avatar"
      />
    </div>

    <AvatarImage
      v-if="currentUser"
      class="q-mx-sm"
      size="40px"
      :user="currentUser"
    />
    {{ currentUser?.name }}
  </q-btn>
</template>

<script lang="ts" setup>
import AvatarImage from 'src/components/AvatarImage.vue'
import { useTerminalStore } from 'src/composables/terminalStore'
import { useCurrentUser } from 'src/composables/user'
import { useTerminalDialog } from 'src/electron/electronSetup'

const { show } = useTerminalDialog()
const { others } = useTerminalStore()
const { currentUser } = useCurrentUser()
</script>

<style lang="sass" scoped>
.overlapping
  position: absolute

.inactive-avatar
  filter: grayscale(60%)
  opacity: 70%
</style>
