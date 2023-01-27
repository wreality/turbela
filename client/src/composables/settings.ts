import { useQuery, useMutation } from '@vue/apollo-composable'
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {
  GeneralSettingsDocument,
  SaveGeneralSettingsDocument,
} from 'src/generated/graphql'
import type { GeneralSettings } from 'src/generated/graphql'
/**
 * State
 *   generalSettings<ref>: General application settings loaded from cachedClient
 *   query<ApolloQuery>: Query used to fetch general settings
 *
 */
export function useSettings() {
  const query = useQuery(
    GeneralSettingsDocument,
    {},
    { clientId: 'cachedClient', fetchPolicy: 'cache-and-network' }
  )
  const generalSettings = computed(() => {
    return query.result.value?.generalSettings ?? {}
  })

  return { generalSettings, query }
}

/**
 * State
 *   v<ref>: Vuelidate validator
 *   saving<ref>: current saving state of the mutation
 *
 * Methods:
 *   saveSettings: Save the settings.
 *
 */
export function useSettingsValidator() {
  const {
    query: { onResult },
  } = useSettings()

  const form = reactive({
    site_name: '',
  })

  onResult((queryResult) => {
    Object.assign(form, queryResult.data.generalSettings)
  })

  const rules = {
    site_name: {
      required,
    },
  }
  const { mutate, loading: saving } = useMutation(SaveGeneralSettingsDocument, {
    clientId: 'cachedClient',
    update: (cache, { data: { saveGeneralSettings } }: any) => {
      cache.writeQuery({
        query: GeneralSettingsDocument,
        data: { generalSettings: { ...saveGeneralSettings } },
      })
    },
  })

  /**
   * Save settings stored in state.  This
   *
   * @returns void
   * @throws Error if unable to save.
   */
  const saveSettings = () => {
    if (v.value.$invalid) {
      throw Error('VALIDATION_ERROR')
    }
    try {
      mutate(form)
    } catch (e) {
      throw Error('SAVE_ERROR')
    }
  }

  const v = useVuelidate(rules, form)

  return { v, saveSettings, saving }
}
