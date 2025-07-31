'use server'

import { FormResponse } from "@/lib/types/types";
import { changePasswordValidation, createUserValidation, recoverAccountValidation, updateUserValidation, verifyAccountValidation } from "@/lib/ZodValidations/UserValidations";
import { FetchActionMethod, FetchFormMethodWithAuthorizeBool, GetEntityMethod, ImageUploading } from "../GlobalServerActions/GlobalServerActions";
import { Logout } from "../Auth/AuthServerActions";


export async function CreateUser(formstate:FormResponse, formdata:FormData ) {

  const validations = createUserValidation.safeParse({
    name: formdata.get('name'),
    email: formdata.get('email'),
    password: formdata.get('password'),
    location: formdata.get('location'),
  })

  if(!validations.success){
    return {
      success:false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  try {
    const imagesFormData = new FormData()
    const image = formdata.get('image')
    if (image instanceof Blob || typeof image === 'string') {
      imagesFormData.append('file', image)
    }

    const id = await ImageUploading('api/user/uploadProfilePicture', 'POST', imagesFormData, false, false)
    await FetchActionMethod('api/user/create', 'POST', {...validations.data, profilePicture:id }, false)
    return {
      success: true,
      message: "Thanks for sign up"
    }
    
  } catch (error){
    if(error instanceof Error){
      return {
        success:false,
        message: error.message
      }
    }
    
  }
}

export async function UpdateUser(formResponse:FormResponse, formdata:FormData ) {
    const validations = updateUserValidation.safeParse({
      name: formdata.get('name'),
      location: formdata.get('location')
  })


  if(!validations.success){
    return {
      success:false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  try {
    const imagesFormData = new FormData()
    const image = formdata.get('image')
    if (image instanceof Blob || typeof image === 'string') {
      imagesFormData.append('file', image)
    }

    const imageId = await ImageUploading('api/user/uploadProfilePicture', 'POST', imagesFormData, true, false)
    await FetchActionMethod('api/user/update', 'PUT', {...validations.data, profilePicture:imageId }, true)
    return {
      success: true,
      message: "Account updated successfully"
    }
    
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


export async function ChangePassword(formResponse:FormResponse, formdata:FormData) {
    const validations = changePasswordValidation.safeParse({
      email:formdata.get("email"),
      newPassword:formdata.get("newPassword"),
      code:formdata.get("code")
    })
  
    if(!validations.success){
      return {
        success: false,
        message: validations.error.errors.map(error => `${error.message}`).join('\n')
      }
    }

    return await FetchFormMethodWithAuthorizeBool("api/account/changePassword", 'PUT', {...validations.data}, false)

}

export async function ResetAccount(formResponse:FormResponse, formdata:FormData){
    const validations = recoverAccountValidation.safeParse({
    email: formdata.get("email")
  })

  if(!validations.success){
    return {
      success: false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  return await FetchFormMethodWithAuthorizeBool("api/account/sendRecoveryLink", 'POST', {...validations.data}, false)


}

export async function SearchUsers(name:string, page:number) {
  const url = `api/user/search?name=${name}&page${page}`
  return await GetEntityMethod(url, false)  
}


export async function VerifyAccount(formstate:FormResponse, formdata:FormData) {
  const validations = verifyAccountValidation.safeParse({
    email: formdata.get('email'),
    code: formdata.get('code')
  })

  if(!validations.success){
    return {
      success:false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  return await FetchFormMethodWithAuthorizeBool('api/account/verifyAccount', 'PUT', {...validations.data}, false)
  
}

export async function DeleteAccount() {
  const url = `api/account`

  await FetchActionMethod(url, 'DELETE', {}, true)  
  await Logout()
}