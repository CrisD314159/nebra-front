import {z} from 'zod'

export const createBusinessValidation = z.object({
  description: z.string(),
  name:z.string(),
  phoneContact: z.string(),
  category: z.string(),
  latitude: z.string(),
  longitude: z.string()
  // Schedule will be added later
})

export const updateBusinessValidation = z.object({
  id:z.uuid(),
  description: z.string(),
  name:z.string(),
  phoneContact: z.string(),
  category: z.string(),
  latitude: z.string(),
  longitude: z.string()
  // Schedule will be added later
})