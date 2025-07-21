'use client'

import { BusinessInfo } from "@/lib/types/types"
import BusinessCard from "./BusinessCard"

interface BusinessListProps{
  initialBusiness: BusinessInfo[]
}


export default function BusinessList({initialBusiness}:BusinessListProps) {
  return (
    <div className="w-full flex flex-col items-center overflow-y-auto flex-1 h-full pb-52">
      {
        initialBusiness.map((business) =>{
          return (
            <BusinessCard business={business} key={business.id}/>
          )
        })
      }
    </div>
  )
}