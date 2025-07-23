'use client'

import { BusinessInfo, isNullOrEmpty } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"
import BusinessCard from "../Business/BusinessCard"
import { SearchBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"

interface SearchListComponentProps{
  initialBusiness: BusinessInfo[]
  keyword:string
}

let CURRENT_PAGE = 0

export default function SearchListComponent({initialBusiness, keyword}:SearchListComponentProps) {

  const [businesses, setBusinesses] = useState<BusinessInfo[]>(initialBusiness)
  const [hasMore, setHasMore] = useState(false)
  const [pending, setPending] = useState(false)

  const {ref, inView} = useInView({
    threshold:0.1,
  })


  const handleUsersFetching = async () =>{
    if(!hasMore || isNullOrEmpty(keyword)) return
    try {
      CURRENT_PAGE = CURRENT_PAGE+1
      setPending(true)
      const newBusinesses = await SearchBusiness(keyword, CURRENT_PAGE)
      if(newBusinesses.length > 0) {
        setBusinesses([...businesses, newBusinesses])
      }else{
        setHasMore(false)
      }
    } catch (error) {
      if(error instanceof Error) toast.error(error.message)
      
    }finally{
      setPending(false)
    }
  }

  useEffect(()=>{
    if(inView && hasMore) handleUsersFetching()

  }, [inView, hasMore])

  return (
    <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[92px]">
      {
        businesses.map(business =>{
          return (
            <BusinessCard business={business} key={business.id}/>
          )
        })
      }
    {
      pending ?
      (
        <div className=" w-full flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )
      :
      <div ref={ref}>

      </div>
    }
    </div>
  )
}