import { object, string, boolean } from 'yup'
import { FeatureType } from 'src/generated/graphql'

export const featureSchema =
  object().shape({
    name: string().required().label('Name'),
    type: string()
      .required('You must select a type')
      .oneOf(Object.values(FeatureType), 'You must select a type'),
  })

export const planSchema =
   object().shape({
    name: string().required().label('Name'),
    public: boolean().required().label('Public Visibility'),
  })
