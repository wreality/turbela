import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable'

export function useSettings() {
  const { result } = useQuery(
    gql`
      query GeneralSettings {
        generalSettings {
          site_name
        }
      }
    `,
    {},
    { clientId: 'cachedClient', fetchPolicy: 'cache-and-network' }
  )
  const generalSettings = useResult(result, {}, (data) => data.generalSettings)

  return { generalSettings }
}
