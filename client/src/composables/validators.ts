import type { Price } from './../generated/graphql'
import type { ValidationRuleWithoutParams, ValidatorFn } from '@vuelidate/core'

type RawValidators = Record<string, ValidatorFn<any>>

const raw: RawValidators = {
  hasPrice: (value: Array<Price>): boolean => {
    const currency = /^[A-Z]{3}$/
    return !value.some((p) => {
      return p.currency.match(currency) === null || !Number.isInteger(p.amount)
    })
  },

  isDuration: (value: string): boolean => {
    const regex =
      /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
    return value.match(regex) !== null
  },

  notEmptyDuration: (value: string): boolean => {
    return value !== 'PT0S'
  },

  validFeatureType: (value: string): boolean =>
    ['LIMIT', 'GRANT', 'TRACK'].includes(value),
}
export const hasPrice: ValidationRuleWithoutParams<Array<Price>> = {
  $validator: raw.hasPrice,
  $message: 'Price is required',
}
export const isDuration: ValidationRuleWithoutParams<string> = {
  $validator: raw.isDuration,
  $message: 'Duration is required',
}
export const notEmptyDuration: ValidationRuleWithoutParams<string> = {
  $validator: raw.notEmptyDuration,
  $message: 'Duration cannot be 0',
}

export const validFeatureType: ValidationRuleWithoutParams<string> = {
  $validator: raw.validFeatureType,
  $message: 'Invalid feature type',
}
