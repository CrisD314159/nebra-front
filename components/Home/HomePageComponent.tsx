'use client'

import { GetNearBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import { BusinessInfo } from "@/lib/types/types"
import { useState } from "react"
import useSWR from "swr"
import BusinessList from "../Business/BusinessList"
import { useRoleStore } from "@/store/userRoleStore"
import AdminPanelPage from "../AdminPanel/AdminPanelPage"

export default function HomePageComponent() {
  const [latitude] = useState(0)
  const [longitude] = useState(0)

  const { data, error, isLoading } = useSWR<BusinessInfo[]>('homeBusiness', () => GetNearBusiness(latitude, longitude))

  const {role} = useRoleStore()

 // In further updates, business using geolocation will be available

  return (
    <div className="h-screen w-full">
      {
        role ==='MODERATOR' &&
        <AdminPanelPage/>
      }
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
          <p className="text-center">There was an error while loading suggested businesses</p>
        } 

        {
          data && data.length === 0 &&
          <p className="text-center">No businesses found</p>
        }

        {
          data && data.length > 0 &&
          <BusinessList initialBusiness={data}/>
        }

    
    </div>
  )
  
}