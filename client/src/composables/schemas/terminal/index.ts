import { object, string } from 'yup'

export const terminalSchema =  object({
    slug: string()
      .required()
      .matches(/[a-z]+-[a-z]+-[a-z]+/, "Code doesn't appear to be valid."),
    name: string().required(),
  })

