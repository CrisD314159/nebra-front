'use client'

import { CommentInfo, isNullOrEmpty } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"
import { SearchBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import CommentListComponent from "./CommentListComponent"


export default function CommentsPage() {

  const [searchParam] = useState('')

  const {data, isLoading, error, mutate} = useSWR<CommentInfo[]>('initialSearchUsers', () => SearchBusiness(searchParam,  10))


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
        <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">Comments</h1>
        {error && <p className="text-center mt-7">There was an error while loading comments</p>}
        {isLoading && <div className=" w-full flex justify-center">
          <span className="mt-7 loading-lg loading loading-spinner text-primary"></span>
        </div>}
        {
          data &&
        <CommentListComponent initialComments={data} />
        }
      </div>
  )
}