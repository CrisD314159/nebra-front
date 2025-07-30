import { z } from "zod";

export const createCommentValidation = z.object({
  businessId: z.string({
    required_error: "Business ID is required."
  }),
  title: z.string({
    required_error: "Please enter a title for your comment."
  }).max(100, {message: "Title must be at most 100 characters long."}),
  content: z.string({
    required_error: "Please enter the content of your comment."
  }).max(200, {message: "Content must be at most 200 characters long."}),
  score: z.string({
    required_error: "Please provide a score."
  }),
});

export const answerCommentValidations = z.object({
  commentId: z.string({
    required_error: "Comment ID is required."
  }),
  answer: z.string({
    required_error: "Please enter your response to the comment."
  }).max(200, {message: "Answer must be at most 200 characters long."}),
});