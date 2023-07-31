import { MaybeRefOrGetter, toValue } from '@vueuse/core'
import { inject, provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const PrefixSymbol = Symbol('tPrefix')
export { PrefixSymbol }

export function usei18nPrefix(name: MaybeRefOrGetter<string>) {
  const i18n = useI18n()
  const tPrefix = ref(inject(PrefixSymbol, ''))
  //NOTE: This regex strips out the array index from the name of multiple option fields.
  const fullKey = (key: string) => `${tPrefix.value}.${toValue(name).replace(/\[[0-9]+\]/, '')}.${key}`
  const t = (key: string) => i18n.t(fullKey(key))
  const te = (key: string) => i18n.te(fullKey(key))
  const ot = (key: string) => te(key) ? t(key) : undefined
  return {
    prefix: tPrefix,
    fullKey,
    provide: (prefix: string) => {
      tPrefix.value = prefix
      provide(PrefixSymbol, prefix)
    },
    t, te, ot
  }
}
