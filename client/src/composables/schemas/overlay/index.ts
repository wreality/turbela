import { object, mixed, string } from 'yup'

import { OverlayType } from 'src/generated/graphql'

function useOverlaySchema(mode: 'create' | 'update' = 'create') {
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

export const createOverlaySchema = useOverlaySchema('create')

export const updateOverlaySchema = useOverlaySchema('update')
