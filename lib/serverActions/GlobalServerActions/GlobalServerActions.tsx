'use server'

import { cookies } from "next/headers"
import { checkIsLoggedIn } from "../Auth/AuthServerActions"
import { APIURL } from "@/lib/types/types"


export async function GetEntityMethod(path:string, authorize:boolean){

  await checkIsLoggedIn()
  const token = (await cookies()).get('token')?.value

  let response: Response

  try {
    response = await fetch(`${APIURL}/${path}`, {
      method:'GET',
      headers: authorize
        ? { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json', }
        : {'Content-Type':'application/json',},
    })
  } catch {
    throw new Error("An error occured while connecting to server")
  }

  if(response.ok){
    const data = await response.json()
    return data
  } else{
    const {message} = await response.json()
    throw new Error(message)
  }

}

export async function FetchFormMethod(path:string, method:string, body:object) {
    await checkIsLoggedIn()
  const token = (await cookies()).get('token')?.value

  let response: Response

  try {
    response = await fetch(`${APIURL}/${path}`, {
      method:method,
      headers: { 
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({...body})

    })
  } catch {
    return {
      success:false,
      message:"An error occured while connecting to server"
    }
  }

  const {success, message} = await response.json()

  return {
    success,
    message
  }
  
}

export async function FetchActionMethod(path:string, method:string, body:object, authorize:boolean) {
  await checkIsLoggedIn()
  const token = (await cookies()).get('token')?.value

  let response: Response

  try {
    response = await fetch(`${APIURL}/${path}`, {
      method:method,
      headers: authorize
        ? { 'Authorization': `Bearer ${token}`,'Content-Type':'application/json', }
        : {'Content-Type':'application/json',},
      body: JSON.stringify(body)

    })
  } catch {
    throw new Error("An error occured while connecting to server")
  }

  if(response.status !== 200 && response.status !== 201){
    const {message} = await response.json()
    throw new Error(message);
  }
}


export async function ImageUploading(path:string, method:string, blob:FormData, authorize:boolean, list:boolean) {
  await checkIsLoggedIn()
  const token = (await cookies()).get('token')?.value

  let response: Response

  try {
    response = await fetch(`${APIURL}/${path}`, {
      method:method,
      headers: authorize ? {
        Authorization: `Bearer ${token}`
      }
      : {},
      body: blob

    })
  } catch {
    throw new Error("An error occured while connecting to server")
  }

  if(response.ok){
    if(list){
      const ids = await response.json()
      return ids
      
    }
    const {id} = await response.json()
    return id
  }else{
    const {message} = await response.json()
    throw new Error(message);
  }
  
}



export async function FetchFormMethodWithAuthorizeBool(path:string, method:string, body:object, authorize:boolean) {
    await checkIsLoggedIn()
  const token = (await cookies()).get('token')?.value

  let response: Response


  try {
    response = await fetch(`${APIURL}/${path}`, {
      method:method,
      headers:  authorize
        ? { Authorization: `Bearer ${token}`, 'Content-Type':'application/json', }
        : {'Content-Type':'application/json',},
      body: JSON.stringify({...body})

    })
  } catch {
    return {
      success:false,
      message:"An error occured while connecting to server"
    }
  }

  const {success, message} = await response.json()

  return {
    success,
    message
  }
  
}