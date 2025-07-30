'use server'

import { FormResponse } from "@/lib/types/types";
import { answerCommentValidations, createCommentValidation } from "@/lib/ZodValidations/CommentValidations";
import { FetchFormMethod, GetEntityMethod } from "../GlobalServerActions/GlobalServerActions";


export async function CreateComment(formstate: FormResponse, formdata:FormData) {
  const validations = createCommentValidation.safeParse({
    businessId: formdata.get('businessId'),
    title: formdata.get('title'),
    content: formdata.get('content'),
    score: formdata.get('score')
  })

  if(!validations.success){
    return {
      success:false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  return await FetchFormMethod('api/comment', 'POST', {...validations.data})

}


export async function AnswerComment(formstate: FormResponse, formdata:FormData ) {
  const validations = answerCommentValidations.safeParse({
    commentId: formdata.get('commentId'),
    answer: formdata.get('answer')
  })

  if(!validations.success){
    return {
      success:false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  return await FetchFormMethod('api/comment/answer', 'PUT', {...validations.data})

}


export async function GetBusinessComments(businessId:string, page:number) {

  const url = `api/comment/business-comments/${businessId}?page=${page}`

  return await GetEntityMethod(url, false)

}

export async function GetUserBusinessLatestComments(page:number) {
  const url = `api/comment/user-comments?page=${page}`
  return await GetEntityMethod(url, true)  
}