import { Loader } from '@googlemaps/js-api-loader'
import { Ref, computed, onMounted, ref } from 'vue'
export type Suggestion = Partial<google.maps.places.AutocompletePrediction>
type AddressSuggestionOptions = {
  apiKey: string,
  debounce?: number
}
type Address = {
  city: string
  state: string
  postal_code: string
  line1: string
  line2: string
}

export function useAddressSuggestions(attributionsRef: Ref<HTMLDivElement | null>, options: AddressSuggestionOptions) {
  const opts = Object.assign({ debounce: 100 }, options)
  const suggestions = ref<Suggestion[]>([])
  let autoCompleteService: google.maps.places.AutocompleteService | null = null
  let placesService: google.maps.places.PlacesService | null = null

  const loader = new Loader({
    apiKey: opts.apiKey,
    libraries: ['places'],
  })
  onMounted(() => {
    loader.importLibrary('places').then((placesLibrary) => {
      autoCompleteService = new placesLibrary.AutocompleteService()
      if (!attributionsRef.value) {
        console.error('Attributions ref not set')
        return
      }
      placesService = new placesLibrary.PlacesService(attributionsRef.value)
    })
  })




  return {
    suggestions: computed(() => [...suggestions.value, {
      description: 'Enter manual addres'}]),
    filterFn(val: string, update: (cb: () => void) => void, abort: () => void) {
      if (!autoCompleteService) {
        suggestions.value = []
        abort()
        return
      }
      if (typeof val !== 'string') {
        suggestions.value = []
        abort()
        return
      }
      if (val.length < 3) {
        suggestions.value = []
        abort()
        return
      }
      autoCompleteService.getPlacePredictions({ input: val }, (result, status) => {
        console.log(status)
        if (status === 'ZERO_RESULTS') {
          update(() => {
            suggestions.value = [
              { description: "Can't find your address? Enter it manually" }
            ]
          })
          return
        }

        if (!result) {
          suggestions.value = []
          abort()
          return
        }
        update(() => {
          suggestions.value = result
        })
      })
    },
    async selectPlace(placeId: string): Promise<Address> {
      return new Promise((resolve, reject) => {
        if (placesService === null) {
          reject('Places service not initialized')
          return
        }
        placesService.getDetails({ placeId, fields: ['address_components'] }, (result, status) => {
          console.log(status)
          if (!result?.address_components) {
            reject('No address components')
            return
          }
          const address = result.address_components.reduce((acc: Record<string, string>, component) => {
            return Object.assign(acc, { [component.types[0]]: component.short_name })
          }, {})

          resolve({
            line1: `${address.street_number} ${address.route}`,
            line2: `${address.subpremise ?? ''}`,
            city: `${address.locality}`,
            state: `${address.administrative_area_level_1}`,
            postal_code: `${address.postal_code}-${address.postal_code_suffix}`,
          })
        })
      })
    }
  }
}
