'use client'

import { GetUserBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import { BusinessInfo } from "@/lib/types/types"
import useSWR from "swr"
import BusinessCard from "../Business/BusinessCard"
import BusinessActionModal from "../Business/BusinessActionModal"
import CreateBusinessForm from "../Business/Create/CreateBusinessForm"
import { Plus } from "lucide-react"


export default function MyBusinessesComponent() {
  const {data, error, isLoading, mutate} = useSWR<BusinessInfo[]>('myBusiness', GetUserBusiness)



  return (
    <>
      <BusinessActionModal floating ActionComponent={CreateBusinessForm} Icon={Plus}/>
      <div className="overflow-y-scroll w-[90%] flex flex-col items-center flex-1 mx-auto pb-[100px] relative">
        {
          isLoading &&
          <div className="w-full flex justify-center">
            <span className="mt-7 loading-lg loading loading-spinner text-primary"></span>
          </div>
          
        }
        {
          error &&
          <p className="text-center mt-3">There was an error while loading your businesses</p>

        }
        {
          data && data.length === 0 && <p className="text-center mt-3">No active businesses found</p>
        }
        
        {
          data && data.length > 0 &&
          data.map(business => {
            return(
              <BusinessCard business={business} key={business.id} editable mutate={mutate}/>
            )

          })
        }
      </div>

    </>
  )
}