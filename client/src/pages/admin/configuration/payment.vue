<template>
  <div class="column q-gutter-md q-pa-md">
    <q-form class="col" @submit="submit">
      <VQWrap class="column q-gutter-md" t-prefix="settings.payment">
        <q-banner class="bg-warning" dense>
          Note: If stripe keys are set via environment variables (recommended),
          they will override these values.
        </q-banner>
        <VeeInput name="stripe_sk" />
        <VeeInput name="stripe_pk" />

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
const { form, submit } = useSettingsValidator(SettingsKey.Payment)
const { isSubmitting, meta } = form
</script>
