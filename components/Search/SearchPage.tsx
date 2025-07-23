'use client'

import { BusinessInfo, isNullOrEmpty } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import SearchInputComponent from "./SearchInputComponent"
import SearchListComponent from "./SearchListComponent"
import useSWR from "swr"
import { SearchBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"


export default function SearchMainComponent() {

  const [searchParam, setSeachParam] = useState('')


  const {data, isLoading, error, mutate} = useSWR<BusinessInfo[]>('initialSearchUsers', () => SearchBusiness(searchParam,  10))

  const handleSearchChange = (cad:string) =>{
    setSeachParam(cad)
  }

  useEffect(()=>{
    async function FetchInitial(cad:string) {
      if(isNullOrEmpty(cad)) return
      try {
        mutate(undefined, true)
      } catch (error) {
        if(error instanceof Error) toast.error(error.message) 
      }
    }

    FetchInitial(searchParam)
  },[searchParam, mutate])

  

  return (
      <div className={`flex flex-col h-screen w-full`} >
        <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">Search</h1>
        <div className="w-full flex justify-center items-center px-3">
          <SearchInputComponent setSearch={handleSearchChange}/>
        </div>
        {error && <p className="text-center mt-7">There was an error while loading users</p>}
        {isLoading && <div className=" w-full flex justify-center">
          <span className="mt-7 loading-lg loading loading-spinner text-primary"></span>
        </div>}
        {
          data &&
        <SearchListComponent initialBusiness={data} keyword={searchParam}/>
        }
      </div>
  )
}