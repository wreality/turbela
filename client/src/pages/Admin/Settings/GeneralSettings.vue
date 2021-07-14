<template lang="pug">
.GeneralSettings.column.q-gutter-md.q-pa-md
  q-form.col(@submit='handleSubmit')
    q-input(
      v-model='v.site_name.$model',
      label='Site Title',
      :error='v.site_name.$error',
      hint='Site title is displayed on the header of the page.',
      bottom-slots
    )
      template(#error)
        error-field-renderer(:errors='v.site_name.$errors')
    .row.q-mt-md
      q-btn.col-md-3(
        :loading='saving',
        type='submit',
        label='Save Settings',
        color='primary'
      )
      q-banner.col-md-9.bg-negative(v-if='error', dense) {{ error }}
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useSettingsValidator } from 'use/settings'
import ErrorFieldRenderer from 'components/molecules/ErrorFieldRenderer.vue'

export default defineComponent({
  name: 'GeneralSettings',
  components: { ErrorFieldRenderer },
  setup() {
    const { v, saveSettings, saving } = useSettingsValidator()
    const error = ref('')

    function handleSubmit() {
      try {
        saveSettings()
      } catch (e) {
        error.value = e.message
      }
    }

    return { v, handleSubmit, error, saving }
  },
})
</script>
