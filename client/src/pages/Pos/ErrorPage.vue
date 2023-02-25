<template>
  <div
    class="bg-red-8 text-center q-pa-md flex flex-center"
    style="min-height: 100vh"
  >
    <q-card>
      <q-card-section>
        This terminal isn't able to access the server. Check that the network is
        reachable and reload the application.
      </q-card-section>
      <q-card-section>
        It's also possible that this terminals credentials have been revoked.
        You can deauthorize this app and re-pair with the server if you'd like.
      </q-card-section>
      <q-card-actions>
        <q-btn flat color="negative" @click="onClearClick">
          Clear Credentials (Requires Administrator to Reconnect)
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useTerminalStore } from 'src/composables/terminal'
import { useRouter } from 'vue-router'

const { terminalToken } = useTerminalStore()
const { push } = useRouter()
function onClearClick() {
  terminalToken.value = null
  push({ name: 'pos:register' })
}
</script>
