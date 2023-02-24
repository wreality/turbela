<template>
  <q-card>
    <q-form @submit="onSubmit">
      <q-card-section>
        <VQWrap t-prefix="settings.terminal.setup">
          <VeeSelect name="cardReaderPort" :options="options" clearable />
          <VeeSelect name="barcodeReaderPort" :options="options" clearable />
        </VQWrap>
      </q-card-section>
      <q-card-actions>
        <q-btn type="submit" color="primary">Save</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import type { PortInfo } from '@serialport/bindings-cpp'
import VeeSelect from 'src/components/atoms/VeeSelect.vue'
import { computed, ref } from 'vue'
import { useTerminalStore } from 'src/composables/terminal'
import { useForm } from 'vee-validate'
import VQWrap from 'src/components/atoms/VQWrap.vue'

const { terminalSetup } = useTerminalStore()

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
</script>
