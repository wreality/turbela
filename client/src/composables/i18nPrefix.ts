import { inject, provide, ref } from 'vue'

const PrefixSymbol = Symbol('tPrefix')
export { PrefixSymbol }

export function usei18nPrefix() {
  const tPrefix = ref(inject(PrefixSymbol, ''))

  return {
    prefix: tPrefix,
    fullKey: (key: string) => `${tPrefix.value}.${key}`,
    provide: (prefix: string) => {
      tPrefix.value = prefix
      provide(PrefixSymbol, prefix)
    },
  }
}
