
export const APIURL = process.env.API_URL

export type FormResponse =
|{

  success:boolean 
  message:string

}|undefined


export interface CommentInfo{
  id:string
  title:string
  score:number
  content:string
  businessId:string
  businessName:string
  authorId:string
  authorName:string
  answer:string
}

export interface UserInfo{
  id: string,
  name: string,
  email:string
  profilePicture: ImageInfo,
  location: string
  createdWithGoogle:boolean
  userRole:string
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
  longitude:number
  scheduleList: Schedule[]
  averageScore: number
  ownerId:string
  ownerName:string
  businessState:string
  category:string
}


export const isNullOrEmpty = (cad:string) => {

  if (cad ==='' || cad === undefined || cad === null){
    return true
  }
  return false

}