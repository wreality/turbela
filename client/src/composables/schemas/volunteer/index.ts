import { string, object } from 'yup';


export const activateSchema = object({
  user: object({ id: string().required() }).required().label('Volunteer Name'),
})
