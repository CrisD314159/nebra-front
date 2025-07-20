import {z} from 'zod'

export const createUserValidation = z.object({
  name:z.string(),
  email: z.email(),
  password: z.string(),
  location: z.string()
})

export const updateUserValidation = z.object({
  id:z.uuid(),
  name:z.string(),
  location: z.string()
})