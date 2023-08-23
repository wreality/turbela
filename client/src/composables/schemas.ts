import { InferType, array, boolean, mixed, object, string } from 'yup'

export const userSchema = object({
  email: string()
    .required()
    .email()
    .label('Email'),
  name: string().required().label('Full name'),
  preferred_name: string(),
  address: object({
    line1: string().required().label('Street'),
    line2: string(),
    city: string().label('City'),
    state: string().label('State'),
    postal_code: string().label('postal_code'),
  }),
  phones: array()
    .ensure()
    .of(
      object()
        .shape({
          number: string().required().label('Phone Number'),
          type: string().matches(
            /(WORK|HOME|MOBILE)/,
            'Invalid phone type option.'
          ),
        })
        .required()
    )
    .min(1),
})

export type UserSchema = InferType<typeof userSchema>

export const badgeAssignUsersSchema = object({
  user_ids: array().of(string()).required().label('Users'),
  instructor_id: string().required().label('Instructor'),
  note: string().label('Note'),
})


export type badgeAssignUsersSchema = InferType<typeof badgeAssignUsersSchema>


export const userAssignBadgeSchema = object({
  badge_id: string().required().label('Badge'),
  instructor_id: string().required().label('Instructor'),
  note: string().label('Note'),
})


export type UserAssignBadgeSchema = InferType<typeof userAssignBadgeSchema>

export function useTerminalSchema() {
  return object({
    slug: string()
      .required()
      .matches(/[a-z]+-[a-z]+-[a-z]+/, "Code doesn't appear to be valid."),
    name: string().required(),
  })
}

import { OverlayType } from 'src/generated/graphql'

export function useOverlaySchema(mode: 'create' | 'update' = 'create') {
  return object().shape({
    name: string().required().label('Name'),
    type: mixed<OverlayType>()
      .oneOf(['GENERIC_USER', 'IDCARD'])
      .required()
      .label('Type'),
    upload: mixed<File>().when([], {
      is: () => mode === 'create',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    spec: string().required().label('spec'),
  })
}

export function useBadgeSchema() {
  return object().shape({
    name: string().required().label('Name'),
  })
}

import { FeatureType } from 'src/generated/graphql'
export function useFeatureSchema() {
  return object().shape({
    name: string().required().label('Name'),
    type: string()
      .required('You must select a type')
      .oneOf(Object.values(FeatureType), 'You must select a type'),
  })
}

export function usePlanSchema() {
  return object().shape({
    name: string().required().label('Name'),
    public: boolean().required().label('Public Visibility'),
  })
}
