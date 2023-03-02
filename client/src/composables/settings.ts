import { useMutation, useQuery } from '@vue/apollo-composable'
import { DocumentNode } from 'graphql'
import { gql } from 'graphql-tag'
import { omit } from 'lodash'
import {
  GeneralSettingsDocument,
  PaymentSettingsDocument,
  PublicPaymentSettingsDocument,
  SaveGeneralSettingsDocument,
  SavePaymentSettingsDocument,
} from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { object, string } from 'yup'
import {
  AdminSettingsDocument,
  SaveAdminSettingsDocument,
} from './../generated/graphql'

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

gql`
  query PaymentSettings {
    paymentSettings {
      stripe_pk
      stripe_sk
    }
  }
`

gql`
  query PublicPaymentSettings {
    publicPaymentSettings {
      stripe_pk
    }
  }
`

gql`
  mutation SavePaymentSettings($stripe_sk: String, $stripe_pk: String) {
    savePaymentSettings(
      settings: { stripe_sk: $stripe_sk, stripe_pk: $stripe_pk }
    ) {
      stripe_pk
      stripe_sk
    }
  }
`
