'use server'

import { FormResponse } from "@/lib/types/types"
import { createBusinessValidation, updateBusinessValidation } from "@/lib/ZodValidations/BusinessValidations"
import { FetchActionMethod, FetchFormMethod, GetEntityMethod, ImageUploading } from "../GlobalServerActions/GlobalServerActions"


export async function GetNearBusiness(latitude:number, longitude:number) {
  const url = `api/business/near?latitude=${latitude}&longitude=${longitude}`
  return await GetEntityMethod(url, false)
}
export async function CreateBusiness(formstate:FormResponse, formdata:FormData) {
  const validations = createBusinessValidation.safeParse({
    name:formdata.get('name'),
    description: formdata.get('description'),
    phoneContact: formdata.get('phoneContact'),
    category: formdata.get('category'),
    latitude: formdata.get('latitude'),
    longitude: formdata.get('longitude')
  })

  console.log(validations.success);

  if(!validations.success){
    return {
      success: false,
      message: validations.error.message
    }
  }

  try {
    const imagesFormData = new FormData()
    const images = formdata.get('images')
    if (images instanceof Blob || typeof images === 'string') {
      imagesFormData.append('files', images)
    }

    const ids = await ImageUploading('api/business/uploadBusinessPhotos', 'POST', imagesFormData, false)  
    console.log(ids);
    await FetchActionMethod('api/business', 'POST', {...validations.data, imagesIds:ids }, true)

  } catch (error) {
    if (error instanceof Error){
      return {
        success: false,
        message: error.message
      }
    }
  }

}
export async function UpdateBusiness(formstate: FormResponse, formdata: FormData) {
  // TODO: Gestionar la eliminación de imágenes
    const validations = updateBusinessValidation.safeParse({
    id:formdata.get('id'),
    name:formdata.get('name'),
    description: formdata.get('description'),
    phoneContact: formdata.get('phoneContact'),
    category: formdata.get('category'),
    latitude: formdata.get('latitude'),
    longitude: formdata.get('longitude')
  })

  if(!validations.success){
    return {
      success: false,
      message: validations.error.flatten.toString()
    }
  }

    try {
    const imagesFormData = new FormData()
    const images = formdata.get('images')
    if (images instanceof Blob || typeof images === 'string') {
      imagesFormData.append('files', images)
    }

    const ids = await ImageUploading('api/business/uploadBusinessPhotos', 'POST', imagesFormData, true)  
    await FetchActionMethod('api/business', 'PUT', {...validations.data, imagesIds:ids }, true)

  } catch (error) {
    if (error instanceof Error){
      return {
        success: false,
        message: error.message
      }
    }
  }


  return await FetchFormMethod('api/business', 'PUT', {...validations.data})

}
export async function DeleteBusiness(businessId:string) {
  return await FetchActionMethod(`api/business/${businessId}`, 'DELETE', {}, true)

}


export async function SearchBusiness(name:string, page:number) {
  const url = `api/business/search?name=${name}&page=${page}`
  return await GetEntityMethod(url, true)

}

export async function GetUserArchivedBusiness() {
  const url = `api/business/archived`
  return await GetEntityMethod(url, true)

}

export async function GetBusinessByCategory(page:number, category:string) {
  const url = `api/business/category?page=${page}&category=${category}`
  return await GetEntityMethod(url, false)

}

export async function GetUserBusiness() {
  const url = `api/business/user`
  return await GetEntityMethod(url, true)

}

export async function ArchiveBusiness(businessId:string) {
  return await FetchActionMethod(`api/business/archive/${businessId}`, 'PUT', {}, true)

}

export async function RepublishBusiness(businessId:string) {
  return await FetchActionMethod(`api/business/republish/${businessId}`, 'PUT', {}, true)

}

export async function AddBusinessToFavorites(businessId:string) {
  return await FetchActionMethod(`api/business/favorites/add/${businessId}`, 'PUT', {}, true)

}

export async function RemoveBusinessFromFavorites(businessId:string) {
  return await FetchActionMethod(`api/business/favorites/remove/${businessId}`, 'PUT', {}, true)

}

export async function GetUserFavoriteBusiness() {
  const url = `api/business/favorites`
  return await GetEntityMethod(url, true)

}