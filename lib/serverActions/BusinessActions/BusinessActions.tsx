'use server'

import { FormResponse } from "@/lib/types/types"
import { createBusinessValidation, updateBusinessValidation } from "@/lib/ZodValidations/BusinessValidations"
import { FetchActionMethod, GetEntityMethod, ImageUploading } from "../GlobalServerActions/GlobalServerActions"


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


  if(!validations.success){
    return {
      success: false,
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

  try {
    const newImagesIds = await UploadBusinessBlobPhotos(formdata) 
    await FetchActionMethod('api/business', 'POST', {...validations.data, imagesIds:newImagesIds }, true)

    return {
      success:true,
      message:"Business Created"
    }

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
      message: validations.error.errors.map(error => `${error.message}`).join('\n')
    }
  }

    try {
 

    const currendIds = formdata.getAll('currentImages');
    const newImagesIds = await UploadBusinessBlobPhotos(formdata)

    const unifiedImagesId =  [...currendIds, ...newImagesIds]

    await FetchActionMethod('api/business', 'PUT', {...validations.data, imagesIds:unifiedImagesId }, true)

    return {
      success:true,
      message: "Business updated"
    }

  } catch (error) {
    if (error instanceof Error){
      return {
        success: false,
        message: error.message
      }
    }
  }

}

async function UploadBusinessBlobPhotos(formdata:FormData) {
  const imagesFormData = new FormData()
  const images = formdata.getAll('images')
  if(images.length === 0) {
    throw new Error("You have not selected any photos")
  }

  images.forEach((blob)=>{
    if (blob instanceof Blob || typeof blob === 'string') {
      imagesFormData.append('files', blob) 
    }
  })

  return await ImageUploading('api/business/uploadBusinessPhotos', 'POST', imagesFormData, true, true) 

}

export async function DeleteBusiness(businessId:string) {
  return await FetchActionMethod(`api/business/${businessId}`, 'DELETE', {}, true)

}


export async function SearchBusiness(name:string, page:number) {
  if(name === '' || !name) return 
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