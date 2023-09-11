import { object, string, array, InferType } from 'yup'

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
