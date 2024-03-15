import type { DocumentNode } from 'graphql'
import { omit } from 'lodash'
import { object, string } from 'yup'

export enum SettingsKey {
  General = 'general',
  Admin = 'admin',
  Payment = 'payment',
  PublicPayment = 'pubPayment',
}
type SettingConfig = {
  queryDoc: DocumentNode
  mutateDoc?: DocumentNode
  schema?: any | undefined
}
const settingsConfig: Record<SettingsKey, SettingConfig> = {
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
  [SettingsKey.Payment]: {
    mutateDoc: SavePaymentSettingsDocument,
    queryDoc: PaymentSettingsDocument,
    schema: object().shape({
      stripe_pk: string()
        .matches(
          /^pk_/,
          'Invalid key: Make sure to paste your PUBLISHABLE key here'
        )
        .optional()
        .label('Publishable Key'),
      stripe_sk: string()
        .matches(/^sk_/, 'Invalid key: Make sure to paste your SECRET key here')
        .optional()
        .label('Secret Key'),
    }),
  },
  [SettingsKey.PublicPayment]: {
    queryDoc: PublicPaymentSettingsDocument,
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
async function useSettingsSync(page: SettingsKey) {
  const { resolveClient } = useApolloClient('cachedClient')
  const client = resolveClient()
  const settings = await client.query({
    query: settingsConfig[page].queryDoc,
  })
  const field = Object.keys(settings.data)[0] as keyof typeof settings.data
  return settings.data[field] ?? undefined
}
export { useSettingsSync }

export async function useSettingsSyncKey(page: SettingsKey, key: string) {
  const settings = await useSettingsSync(page)
  if (!settings) {
    return undefined
  }
  return settings[key] ?? undefined
}

export function useSettingsValue(page: SettingsKey, key: string) {
  const { settings } = useSettings(page)
  return computed(() => settings.value[key] ?? undefined)
}

/**
 * State
 *   saving<ref>: current saving state of the mutation
 *
 * Methods:
 *   saveSettings: Save the settings.
 *
 */
export function useSettingsValidator(page: SettingsKey) {
  const { mutateDoc, queryDoc, schema: validationSchema } = settingsConfig[page]
  if (typeof mutateDoc === 'undefined') {
    throw new Error('Setting config does not have a mutateDoc parameter.')
  }
  const { settings } = useSettings(page)

  const initialValues = computed(() => {
    //@ts-ignore No overload matches.
    return omit(settings.value, ['__typename'])
  })

  const form = useForm({
    initialValues,
    validationSchema,
  })

  const { mutate } = useMutation(mutateDoc, {
    clientId: 'cachedClient',
    update: (cache, { data }: any) => {
      const field = Object.keys(data)[0]
      const savedSettings = data[field]

      cache.writeQuery({
        query: queryDoc,
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

graphql(`
  query GeneralSettings {
    generalSettings {
      site_name
    }
  }
`)

graphql(`
  mutation SaveGeneralSettings($site_name: String) {
    saveGeneralSettings(settings: { site_name: $site_name }) {
      site_name
    }
  }
`)

graphql(`
  query AdminSettings {
    adminSettings {
      maps_api_key
    }
  }
`)

graphql(`
  mutation SaveAdminSettings($maps_api_key: String) {
    saveAdminSettings(settings: { maps_api_key: $maps_api_key }) {
      maps_api_key
    }
  }
`)

graphql(`
  query PaymentSettings {
    paymentSettings {
      stripe_pk
      stripe_sk
    }
  }
`)

graphql(`
  query PublicPaymentSettings {
    publicPaymentSettings {
      stripe_pk
    }
  }
`)

graphql(`
  mutation SavePaymentSettings($stripe_sk: String, $stripe_pk: String) {
    savePaymentSettings(
      settings: { stripe_sk: $stripe_sk, stripe_pk: $stripe_pk }
    ) {
      stripe_pk
      stripe_sk
    }
  }
`)
