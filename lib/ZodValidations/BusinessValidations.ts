import { z } from "zod";

export const createBusinessValidation = z.object({
  description: z.string({
    required_error: "Please enter a description for the business.",
  }),
  name: z.string({
    required_error: "Please enter the business name."
  }),
  phoneContact: z.string({
    required_error: "Please provide a phone number for contact."
  }),
  category: z.string({
    required_error: "Please select a business category."
  }),
  latitude: z.string({
    required_error: "Latitude is required."
  }),
  longitude: z.string({
    required_error: "Longitude is required."
  }),
});

export const updateBusinessValidation = z.object({
  id: z.
  string({
    required_error:"Enter a valid business id"
  }).uuid(),
  description: z.string({
    required_error: "Please enter a description for the business.",
  }),
  name: z.string({
    required_error: "Please enter the business name."
  }),
  phoneContact: z.string({
    required_error: "Please provide a phone number for contact."
  }),
  category: z.string({
    required_error: "Please select a business category."
  }),
  latitude: z.string({
    required_error: "Latitude is required."
  }),
  longitude: z.string({
    required_error: "Longitude is required."
  }),
});