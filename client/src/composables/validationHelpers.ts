import { clone } from 'lodash'
import { watch } from 'vue'

/**
 * Returns the validator name if the error is from a local validator or the message
 * returned from the external validator if the error is external.
 *
 * @param {Object} $error Error object to extract key or message from.
 * @returns String
 */
export function getErrorMessageKey($error: any) {
  if ($error.$validator === '$externalResults') {
    return $error.$message
  }
  return $error.$validator
}

/**
 * Remove the externalValidation errors when the field changes value.
 *
 * @param {reactive} data
 * @param {reactive} externalValidation
 * @param {String} field
 */
export function externalFieldWatcher(
  data: any,
  externalValidation: Record<string, Array<string>>,
  field: string
) {
  oneShotPropertyWatch(data, field, () => {
    externalValidation[field] = []
  })
}

/**
 * Add a one-shot watcher to a reactive property field that removes itself after
 * being called once when the property values changes.
 *
 * @param {reactive} data
 * @param {reactive} property
 * @param {Function} callback
 */
export function oneShotPropertyWatch(
  data: any,
  property: string,
  callback: () => void
) {
  const cancel = watch(
    () => clone(data),
    (data, oldValue) => {
      if (data[property] != oldValue[property]) {
        callback()
        cancel()
      }
    }
  )
}

/**
 * Parses a GraphQL error object for any validation errors and applies them to the
 * provided externalValidation reactive.  Apply the externalValidation reactive to
 * vuelidate's $externalResults option to include GraphQL validation errors in
 * vuelidate error responses.
 *
 * @param {reactive} data Form data reactive
 * @param {reactive} externalValidation External validation reactive
 * @param {Object} error Error object returned by ApolloClient
 * @param {String} strip String to strip from the beginning of the GraphQL field name
 * @returns
 */
export function applyExternalValidationErrors(
  data: any,
  externalValidation: any,
  error: any,
  strip = ''
) {
  const gqlErrors = error?.graphQLErrors ?? []
  const validationErrors = gqlErrors
    .map((gError: any) => {
      const fields = gError?.extensions?.validation ?? null
      if (!fields) return null
      const errors: Record<string, any> = {}
      for (const [key, value] of Object.entries(fields)) {
        errors[key.replace(strip, '')] = value
      }
      return errors
    })
    .filter((e: any) => e)
  if (validationErrors.length === 0) {
    return false
  }
  Object.assign(externalValidation, ...validationErrors)
  for (const [key] of Object.entries(externalValidation)) {
    externalFieldWatcher(data, externalValidation, key)
  }
  return true
}
