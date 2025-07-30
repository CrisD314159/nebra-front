import { z } from "zod";

export const createReportValidation = z.object({
  businessId: z.string({
    required_error: "Business ID is required."
  }),
  reason: z.string({
    required_error: "Please provide a reason for the report."
  }),
});