import {z} from 'zod'

export const createCommentValidation = z.object({
  businessId:z.string(),
  title: z.string(),
  content: z.string(),
  score: z.number()
})

export const answerCommentValidations = z.object({
  commentId:z.string(),
  answer: z.string()
})