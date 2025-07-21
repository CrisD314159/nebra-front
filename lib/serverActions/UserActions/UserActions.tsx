'use server'

import { FormResponse } from "@/lib/types/types";
import { createUserValidation, updateUserValidation } from "@/lib/ZodValidations/UserValidations";
import { FetchActionMethod, GetEntityMethod, ImageUploading } from "../GlobalServerActions/GlobalServerActions";

export async function CreateUser(formdata:FormData, formstate:FormResponse) {

  const validations = createUserValidation.safeParse({
    name: formdata.get('name'),
    email: formdata.get('email'),
    password: formdata.get('password'),
    location: formdata.get('location'),
  })

  if(!validations.success){
    return {
      success:false,
      message: validations.error.flatten.toString()
    }
  }

  try {
    const imagesFormData = new FormData()
    const image = formdata.get('image')
    if (image instanceof Blob || typeof image === 'string') {
      imagesFormData.append('file', image)
    }

    const id = await ImageUploading('api/user/uploadProfilePicture', 'POST', imagesFormData)
    await FetchActionMethod('api/user/create', 'POST', {...validations.data, profilePicture:id })
    
  } catch (error){
    if(error instanceof Error){
      return {
        success:false,
        message: error.message
      }
    }
    
  }
}

export async function UpdateUser(formdata:FormData, formstate:FormResponse) {
    const validations = updateUserValidation.safeParse({
      id:formdata.get('id'),
      name: formdata.get('name'),
      location: formdata.get('location')
  })

  if(!validations.success){
    return {
      success:false,
      message: validations.error.flatten.toString()
    }
  }

  try {
    const imagesFormData = new FormData()
    const image = formdata.get('image')
    if (image instanceof Blob || typeof image === 'string') {
      imagesFormData.append('file', image)
    }

    const id = await ImageUploading('api/user/uploadProfilePicture', 'POST', imagesFormData)
    await FetchActionMethod('api/user/update', 'PUT', {...validations.data, profilePicture:id })
    
  } catch (error){
    if(error instanceof Error){
      return {
        success:false,
        message: error.message
      }
    }
    
  }
  
}

export async function GetUserProfile() {
 return await GetEntityMethod('api/user', true)
  
}


export async function SearchUsers(name:string, page:number) {
  const url = `api/user/search?name=${name}&page${page}`
  return await GetEntityMethod(url, false)  
}