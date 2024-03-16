<template>
  <q-card>
    <q-form @submit="onSubmit">
      <q-card-section>
        <div class="column q-gutter-md">
          <div class="text-h6">Connected Hardware</div>
          <VQWrap t-prefix="settings.terminal.setup">
            <VeeSelect name="cardReaderPort" :options="options" clearable />
            <VeeSelect name="barcodeReaderPort" :options="options" clearable />
          </VQWrap>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn type="submit" color="primary">Save</q-btn>
      </q-card-actions>
    </q-form>
    <q-separator />
    <q-card-section>
      <div class="text-h6">Server Connection</div>
      <div class=""></div>
      <q-banner class="bg-green" rounded>
        <q-icon name="check" size="2.5em" />
        {{ terminalUrl }}
        {{ terminalName }}
        <q-btn color="negative" flat label="Disconnect" @click="disconnect" />
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { PortInfo } from '@serialport/bindings-cpp'
import { useDisconnectWarningDialog } from 'src/composables/terminal'

const { terminalSetup, terminalToken, terminalUrl, terminalName } =
  useTerminalStore()

const { handleSubmit } = useForm({
  initialValues: terminalSetup.value,
})

const onSubmit = handleSubmit((values) => {
  terminalSetup.value = values
})

const serialPorts = ref<PortInfo[] | false>([])

const options = computed(() =>
  serialPorts.value ? serialPorts.value?.map((v: PortInfo) => v.path) : []
)
async function getSerialPorts() {
  serialPorts.value = await window.turbela.getSerialOptions()
}
getSerialPorts()

const { show } = useDisconnectWarningDialog()
async function disconnect() {
  if (await show()) {
    terminalToken.value = null
    window.turbela.relaunch()
  }
}
</script>
