import {z} from 'zod'

export const createUserValidation = z.object({
  name:z.string(),
  email: z.email(),
  password: z.string(),
  location: z.string()
})

export const updateUserValidation = z.object({
  name:z.string(),
  location: z.string()
})


export const changePasswordValidation = z.object({
    email:z.email(),
    password:z.string(),
    code:z.string()
})

export const recoverAccountValidation = z.object({
    email:z.email()
})

export const verifyAccountValidation = z.object({
    email:z.email(),
    code:z.string()
})