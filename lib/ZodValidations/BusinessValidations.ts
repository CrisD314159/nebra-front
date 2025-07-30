import { z } from "zod";

export const createBusinessValidation = z.object({
  description: z.string({
    required_error: "Please enter a description for the business.",
  }).max(250, { message: "Description must be at most 250 characters long." }),
  name: z.string({
    required_error: "Please enter the business name."
  }).max(200, {message:"Name must be at most 200 characters long."}),
  phoneContact: z.string({
    required_error: "Please provide a phone number for contact."
  }).max(15, {message:"Name must be at most 200 characters long."}),
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
  }).max(250, { message: "Description must be at most 250 characters long." }),
  name: z.string({
    required_error: "Please enter the business name."
  }).max(200, {message:"Name must be at most 200 characters long."}),
  phoneContact: z.string({
    required_error: "Please provide a phone number for contact."
  }).max(15, {message:"Phone contact must be at most 15 characters long."}),
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