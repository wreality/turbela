import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { reactive } from 'vue'
import { GENERAL_SETTINGS, SAVE_GENERAL_SETTINGS } from 'src/graphql/queries'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

/**
 * State
 *   generalSettings<ref>: General application settings loaded from cachedClient
 *   query<ApolloQuery>: Query used to fetch general settings
 *
 */
export function useSettings() {
  const query = useQuery(
    GENERAL_SETTINGS,
    {},
    { clientId: 'cachedClient', fetchPolicy: 'cache-and-network' }
  )
  const generalSettings = useResult(
    query.result,
    {},
    (data) => data.generalSettings
  )

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
  const { mutate, loading: saving } = useMutation(SAVE_GENERAL_SETTINGS, {
    clientId: 'cachedClient',
    update: (cache, { data: { saveGeneralSettings } }) => {
      cache.writeQuery({
        query: GENERAL_SETTINGS,
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
