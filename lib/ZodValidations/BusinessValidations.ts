import {z} from 'zod'

export const createBusinessValidation = z.object({
  desciption: z.string(),
  name:z.string(),
  phoneContact: z.string(),
  category: z.string(),
  latitude: z.number(),
  longitude: z.number()
  // Schedule will be added later
})

export const updateBusinessValidation = z.object({
  id:z.uuid(),
  desciption: z.string(),
  name:z.string(),
  phoneContact: z.string(),
  category: z.string(),
  latitude: z.number(),
  longitude: z.number()
  // Schedule will be added later
})