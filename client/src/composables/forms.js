import { computed, watch, ref } from 'vue'
export function useFormState({
  validator,
  query = undefined,
  mutation = undefined,
}) {
  const justSaved = ref(false)
  if (mutation) {
    mutation.onDone(() => {
      console.log('JUSTSAVED')
      justSaved.value = true
    })
  }

  watch(
    () => {
      const b = (v) => (v ? 1 : 0)
      const $v = validator.value
      return (
        Math.pow(2, 0) * b($v.$dirty) +
        Math.pow(2, 1) * b($v.value) +
        Math.pow(2, 2) * b(query ? query.loading.value : 0) +
        Math.pow(2, 3) * b(mutation ? mutation.loading.value : 0)
      )
    },
    (newValue, oldValue) => {
      //Only concern ourselves with values which have become true
      if (~(oldValue | ~newValue)) {
        console.log('JUSTUNSAVED')
        console.log(newValue, oldValue)
        justSaved.value = false
      }
    }
  )

  const formState = computed(() => {
    if (justSaved.value) {
      return 'saved'
    }
    if (mutation && mutation.loading.value === true) {
      return 'saving'
    }
    if (query && query.loading.value === true) {
      return 'loading'
    }
    if (validator.value.$error) {
      return 'error'
    }
    if (validator.value.$dirty) {
      return 'dirty'
    }
    return 'idle'
  })

  return { formState }
}
