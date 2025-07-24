'use client'

import { GetUserArchivedBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import { BusinessInfo } from "@/lib/types/types"
import useSWR from "swr"
import BusinessCard from "../Business/BusinessCard"


export default function ArchivedBusinessesComponent() {
  const {data, error, isLoading} = useSWR<BusinessInfo[]>('myBusiness', GetUserArchivedBusiness)



  return (
    <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[92px]">
      {
        isLoading &&
        <div className="w-full flex justify-center">
          <span className="mt-7 loading-lg loading loading-spinner text-primary"></span>
        </div>
        
      }
      {
        error &&
        <p className="text-center mt-3">There was an error while loading your archived businesses</p>

      }
      
      {
        data && data.length > 0 &&
        data.map(business => {
          return(
            <BusinessCard business={business} key={business.id}/>
          )

        })
      }
    </div>
  )
}