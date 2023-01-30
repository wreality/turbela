import type { ValidationRuleWithoutParams, ValidatorFn } from '@vuelidate/core'

type RawValidators = Record<string, ValidatorFn<any>>

const raw: RawValidators = {
  validFeatureType: (value: string): boolean =>
    ['LIMIT', 'GRANT', 'TRACK'].includes(value),
}

export const validFeatureType: ValidationRuleWithoutParams<string> = {
  $validator: raw.validFeatureType,
  $message: 'Invalid feature type',
}
