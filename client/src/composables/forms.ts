import { computed, watch, ref, unref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { Validation } from '@vuelidate/core'
import { UseQueryReturn, UseMutationReturn } from '@vue/apollo-composable'

export const ALL_STATES = [
  'idle',
  'error',
  'dirty',
  'saving',
  'loading',
  'saved',
] as const
export type StateTuple = typeof ALL_STATES
export type FormState = StateTuple[number]

interface FormStateParam {
  validator: MaybeRef<Validation<any, any>>
  query?: UseQueryReturn<any, any>
  mutation?: UseMutationReturn<any, any>
}

export function useFormState({
  validator,
  query = undefined,
  mutation = undefined,
}: FormStateParam) {
  const justSaved = ref(false)
  if (mutation) {
    mutation.onDone(() => {
      justSaved.value = true
    })
  }

  watch(
    () => {
      const b = (v: any) => (v ? 1 : 0)
      const $v = unref(validator)
      return (
        1 * b($v.$anyDirty) +
        2 * b($v.value) +
        4 * b(query ? query.loading.value : 0) +
        8 * b(mutation ? mutation.loading.value : 0)
      )
    },
    (newValue, oldValue) => {
      //Only concern ourselves with values which have become true
      if (~(oldValue | ~newValue)) {
        justSaved.value = false
      }
    }
  )

  const formState = computed((): FormState => {
    if (justSaved.value) {
      return 'saved'
    }
    if (mutation && mutation.loading.value === true) {
      return 'saving'
    }
    if (query && query.loading.value === true) {
      return 'loading'
    }
    if (validator.value.$invalid) {
      return 'error'
    }
    if (validator.value.$anyDirty) {
      return 'dirty'
    }
    return 'idle'
  })

  return { formState }
}
