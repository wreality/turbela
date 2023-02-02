<template>
  <div class="GeneralSettings column q-gutter-md q-pa-md">
    <q-form class="col" @submit="submit">
      <VQWrap t-prefix="settings.admin">
        <VeeInput name="maps_api_key" />

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
import VQWrap from 'src/components/atoms/VQWrap.vue'
import VeeInput from 'src/components/atoms/VeeInput.vue'
import { SettingsKey, useSettingsValidator } from 'src/composables/settings'

const { form, submit } = useSettingsValidator(SettingsKey.Admin)
const { isSubmitting, meta } = form
</script>
