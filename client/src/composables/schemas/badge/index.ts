import { object, string, array, InferType } from 'yup'


export const badgeSchema = object()
  .shape({
    name: string().required().label('Name'),
  })


export const assignUsersSchema = object({
  user_ids: array().of(object({ id: string().required() })).required().label('Users'),
  instructor_id: object({ id: string().required() }).required().label('Instructor'),
  note: string().label('Note'),
})
export type BadgeAssignUsersSchema = InferType<typeof assignUsersSchema>


export const assignBadgeSchema = object({
  badge_id: string().required().label('Badge'),
  instructor_id: object({id: string().required()}).required().label('Instructor'),
  notes: string().label('Note'),
})
export type UserAssignBadgeSchema = InferType<typeof assignBadgeSchema>

export const revokeBadgeSchema = object({
  notes: string().required().label('Note'),
});
export type UserRevokeBadgeSchema = InferType<typeof revokeBadgeSchema>


