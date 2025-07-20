import {z} from 'zod'

export const createReportValidation = z.object({
  businessId:z.string(),
  reason: z.email()
})