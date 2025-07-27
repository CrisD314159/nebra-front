'use client'

import { GetNearBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import { BusinessInfo } from "@/lib/types/types"
import { useState } from "react"
import useSWR from "swr"
import BusinessList from "../Business/BusinessList"

export default function HomePageComponent() {
  const [latitude] = useState(0)
  const [longitude] = useState(0)

  const { data, error, isLoading } = useSWR<BusinessInfo[]>('homeBusiness', () => GetNearBusiness(latitude, longitude))

 // In further updates, business using geolocation will be available

  return (
    <div className="h-screen w-full">
      <div className="w-full">
        <h1 className="text-3xl font-bold p-9">
          Suggested Businesses
        </h1>        
      </div>

        {isLoading
         && (
          <div className="w-full flex justify-center">

            <span className="loading loading-xl loading-spinner text-primary"></span>
          </div>
         )
        }

        {
          error &&
          <p className="text-center">{error.message}</p>
        } 

        {
          data && data.length > 0 &&
          <BusinessList initialBusiness={data}/>
        }

    
    </div>
  )
  
}