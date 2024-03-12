<template>
  <div class="GeneralSettings column q-gutter-md q-pa-md">
    <q-form class="col" @submit="submit">
      <VQWrap t-prefix="settings.general">
        <VeeInput name="site_name" />

        <div class="row q-mt-md">
          <q-btn
            class="col-md-3"
            :loading="isSubmitting"
            type="submit"
            label="Save Settings"
            :color="meta.dirty ? 'primary' : undefined"
          ></q-btn>
        </div>
      </VQWrap>
    </q-form>
  </div>
</template>

<script setup lang="ts">
definePage({
  name: 'settings:general',
  meta: {
    crumb: { label: 'General', icon: 'tune' },
  },
})
import { SettingsKey, useSettingsValidator } from 'src/composables/settings'

const { form, submit } = useSettingsValidator(SettingsKey.General)
const { isSubmitting, meta } = form
</script>
