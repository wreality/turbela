<template>
  <div class="bg-grey-8 q-pa-md flex flex-center" style="min-height: 100vh">
    <q-card style="max-width: 600px">
      <q-card-section class="bg-red text-white text-h6 text-bold q-py-sm">
        Error Connecting to Server
      </q-card-section>
      <q-card-section>
        This terminal isn't able to contact the server. Check the following:
        <q-list dense class="q-pa-md">
          <q-item>
            <q-item-section avatar><q-icon name="lan" /></q-item-section>
            <q-item-section>
              The network is up and connected (can you visit google.com?)
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar><q-icon name="computer" /></q-item-section>
            <q-item-section>
              The member portal is up. (Can you visit [name of website])
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar><q-icon name="key" /></q-item-section>
            <q-item-section>
              The terminal's access to the server is still valid.
            </q-item-section>
          </q-item>
        </q-list>
        <p>
          Once you've checked these items, close and re-open this application to
          attempt to contact the server again. If the terminal needs to be
          reauthenticated, click below to clear credentials to reset the
          terminal access token.
        </p>
      </q-card-section>
      <q-card-section> </q-card-section>
      <q-card-actions>
        <q-btn flat color="negative" @click="onClearClick">
          Clear Credentials
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { useTerminalStore } from 'src/composables/terminal'

const { terminalToken } = useTerminalStore()

const { dialog } = useQuasar()
function onClearClick() {
  dialog({
    title: 'Confirm Clear Credentials',
    message:
      "Are you sure you want to clear this terminal's credentials.  <b>You will need an administrator account to reconnect this terminal.</b>",
    html: true,
    cancel: true,
  }).onOk(() => {
    terminalToken.value = null
    window.turbela.relaunch()
  })
}
</script>
