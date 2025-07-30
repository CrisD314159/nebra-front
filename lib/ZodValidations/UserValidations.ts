import { z } from 'zod';

export const createUserValidation = z.object({
  name: z.string({
    required_error: "Please enter your name."
  }).max(50, {message:"Name must be at most 50 characters long."}),
  email: z.
  string({
    required_error: "Enter a valid email"
  }).email(),
  password: z.string({
    required_error: "Please enter a password."
  }),
  location: z.string({
    required_error: "Please enter your location."
  }),
});

export const updateUserValidation = z.object({
  name: z.string({
    required_error: "Please enter your name."
  }).max(50, {message:"Name must be at most 50 characters long."}),
  location: z.string({
    required_error: "Please enter your location."
  }),
});

export const changePasswordValidation = z.object({
  email: z.string({
    required_error: "Please enter your email address."
  }).email("Invalid email address."),
  password: z.string({
    required_error: "Please enter your new password."
  }),
  code: z.string({
    required_error: "Please enter the verification code."
  }),
});

export const recoverAccountValidation = z.object({
  email: z.string({
    required_error: "Please enter your email address."
  }).email("Invalid email address."),
});

export const verifyAccountValidation = z.object({
  email: z.string({
    required_error: "Please enter your email address."
  }).email("Invalid email address."),
  code: z.string({
    required_error: "Please enter the verification code."
  }),
});