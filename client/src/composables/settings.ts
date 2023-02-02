import { useMutation, useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import {
  GeneralSettingsDocument,
  SaveGeneralSettingsDocument,
} from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { object, string } from 'yup'
import {
  AdminSettingsDocument,
  SaveAdminSettingsDocument,
} from './../generated/graphql'
import { omit } from 'lodash'

export enum SettingsKey {
  General = 'general',
  Admin = 'admin',
}

const settingsConfig = {
  [SettingsKey.General]: {
    mutateDoc: SaveGeneralSettingsDocument,
    queryDoc: GeneralSettingsDocument,
    schema: object().shape({
      site_name: string().required().label('Site Name'),
    }),
  },
  [SettingsKey.Admin]: {
    mutateDoc: SaveAdminSettingsDocument,
    queryDoc: AdminSettingsDocument,
    schema: object().shape({
      maps_api_key: string().label('Google Maps API Key'),
    }),
  },
}

/**
 * State
 *   generalSettings<ref>: General application settings loaded from cachedClient
 *   query<ApolloQuery>: Query used to fetch general settings
 *
 */
export function useSettings(page: SettingsKey) {
  const query = useQuery(
    settingsConfig[page].queryDoc,
    {},
    { clientId: 'cachedClient', fetchPolicy: 'cache-and-network' }
  )
  const settings = computed(() => {
    if (!query.result.value) {
      return {}
    }
    const field = Object.keys(
      query.result.value
    )[0] as keyof typeof query.result.value
    return query.result.value?.[field] ?? {}
  })

  return { settings, query }
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
export function useSettingsValidator(page: SettingsKey) {
  const { settings } = useSettings(page)

  const initialValues = computed(() => {
    //@ts-ignore No overload matches.
    return omit(settings.value, ['__typename'])
  })
  const form = useForm({
    initialValues,
    validationSchema: settingsConfig[page].schema,
  })

  const { mutate } = useMutation(settingsConfig[page].mutateDoc, {
    clientId: 'cachedClient',
    update: (cache, { data }: any) => {
      const field = Object.keys(data)[0]
      const savedSettings = data[field]

      cache.writeQuery({
        query: settingsConfig[page].queryDoc,
        data: { [`${page}Settings`]: { ...savedSettings } },
      })
    },
  })

  /**
   * Save settings stored in state.  This
   *
   * @returns void
   * @throws Error if unable to save.
   */
  const submit = form.handleSubmit(async (values) => {
    await mutate(values)
  })

  return { form, submit, settings }
}

gql`
  query GeneralSettings {
    generalSettings {
      site_name
    }
  }
`

gql`
  mutation SaveGeneralSettings($site_name: String) {
    saveGeneralSettings(settings: { site_name: $site_name }) {
      site_name
    }
  }
`

gql`
  query AdminSettings {
    adminSettings {
      maps_api_key
    }
  }
`

gql`
  mutation SaveAdminSettings($maps_api_key: String) {
    saveAdminSettings(settings: { maps_api_key: $maps_api_key }) {
      maps_api_key
    }
  }
`
