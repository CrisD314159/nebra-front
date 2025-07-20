
export const APIURL = process.env.API_URL

export type FormResponse =
|{

  success:boolean 
  message:string

}|undefined


export interface UserInfo{
  id: string,
  name: string,
  email:string
  profilePicture: string,
  biography: string,
  country: string
  createdWithGoogle:boolean
}

export interface ChatTokenResponse{
  token: string
}

export interface ImageInfo{
  id:string
  link:string
}

export interface Schedule{
  id:string
  day:string
  openShour:string
  closeHour:string
}

export interface BusinessInfo{
  id: string,
  name:string,
  description:string,
  images: ImageInfo[],
  phoneContact:string,
  businessCategory:string
  latitude:number
  longitide:number
  scheduleList: Schedule[]
  averageScore: number
  ownerId:string
  ownerName:string
  businessState:string
}


export const isNullOrEmpty = (cad:string) => {

  if (cad ==='' || cad === undefined || cad === null){
    return true
  }
  return false

}