import { pick } from 'lodash'
import { array, object, string } from 'yup'
import { useLogin } from './user'

export function useUserSchema() {
  const { userExists } = useLogin()
  const userSchema = {
    email: string()
      .required()
      .email()
      .label('Email')
      .test(
        'unused-email',
        'This email is already registered.',
        async (value) => {
          try {
            if (!value) {
              return false
            }
            return !(await userExists(value))
          } catch {
            return false
          }
        }
      ),
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
  }
  return {
    complete: () => object(userSchema),
    pick: (fields: Array<string>) => object(pick(userSchema, fields)),
    raw: () => userSchema,
  }
}

export function useTerminalSchema() {
  return object().shape({
    slug: string()
      .required()
      .matches(/[a-z]+-[a-z]+-[a-z]+/, "Code doesn't appear to be valid."),
    name: string().required(),
  })
}
