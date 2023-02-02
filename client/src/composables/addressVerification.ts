import { isEqual } from 'lodash'
import { SettingsKey, useSettings } from './settings'
import { computed } from 'vue'
import { AdminSettings } from 'src/generated/graphql'

export type Address = {
  line1: string
  line2: string
  city: string
  state: string
  postal_code: string
}

export type VerificationResult = {
  verdict: {
    hasUnconfirmedComponents?: boolean
    hasInferredComponents?: boolean
    addressComplete?: boolean
  }
  address: {
    formattedAddress: string
    postalAddress: {
      regionCode?: string
      languageCode?: string
      administrativeArea?: string
      postalCode?: string
      addressLines?: string[]
      locality?: string
    }
    addressComponents: AddressComponent[]
  }
}

type AddressComponent = {
  componentType: string
  confirmationLevel: string
  componentName: {
    text: string
    languageCode: string
  }
  inferred?: boolean
}

function createCorrectedAddress(result: VerificationResult) {
  const postalAddress = result?.address?.postalAddress
  if (!postalAddress) {
    return null
  }
  return {
    line1: postalAddress?.addressLines?.[0] ?? '',
    line2: postalAddress?.addressLines?.[1] ?? '',
    city: postalAddress?.locality ?? '',
    state: postalAddress?.administrativeArea ?? '',
    postal_code: postalAddress?.postalCode ?? '',
  }
}
export function useAddressVerification() {
  const { settings } = useSettings(SettingsKey.Admin)

  const apiKey = computed(() => {
    const adminSettings = settings.value as AdminSettings
    return adminSettings?.maps_api_key ?? ''
  })
  const enabled = computed(() => apiKey.value.length > 0)

  return {
    enabled,
    verify: async (address: Address) => {
      if (!enabled.value) {
        return
      }
      const body = {
        address: {
          regionCode: 'US',
          addressLines: [
            address.line1,
            address.line2,
            `${address.city}, ${address.state} ${address.postal_code}`,
          ],
        },
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
      const response = await fetch(
        `https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey.value}`,
        requestOptions
      )
      const { result }: { result: VerificationResult } = await response.json()
      const correctedAddress = createCorrectedAddress(result)
      return {
        correctedAddress,
        noIssues:
          correctedAddress &&
          result.verdict?.addressComplete &&
          !result.verdict?.hasInferredComponents,
        unchanged: isEqual(address, correctedAddress),
        result,
      }
    },
  }
}
