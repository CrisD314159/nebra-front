'use client'

import {BusinessInfo, CommentInfo } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"
import CommentCard from "@/components/Comments/CommentCard"
import BusinessCard from "@/components/Business/BusinessCard"

interface SearchListComponentProps{
  initialElements: CommentInfo[] | BusinessInfo[]
  FetchMethod: (int:number) => Promise< CommentInfo[] | BusinessInfo[]>
}

let CURRENT_PAGE = 0

export default function PaginationList({initialElements, FetchMethod}:SearchListComponentProps) {

  const [elements, setElements] = useState<(CommentInfo | BusinessInfo)[]>(initialElements)
  const [hasMore, setHasMore] = useState(false)
  const [pending, setPending] = useState(false)

  const {ref, inView} = useInView({
    threshold:0.1,
  })


  const handleUsersFetching = async () =>{
    if(!hasMore) return
    try {
      CURRENT_PAGE = CURRENT_PAGE+1
      setPending(true)
      const newElements = await FetchMethod(CURRENT_PAGE)
      if(newElements.length > 0) {
        setElements([...elements, ...newElements])
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
        elements.map(element => {
          // Assuming CommentInfo has a unique property, e.g., 'content'
          if ('content'in element ) {
            return (
              <CommentCard comment={element as CommentInfo} key={element.id}/>
            )
          }
          if ('businessCategory'in element ) {
            return (
              <BusinessCard business={element as BusinessInfo} key={element.id}/>
            )
          }
          return null
        })
      }
    {
      pending ?
      (
        <div className=" w-full flex justify-center">
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      )
      :
      <div ref={ref}>

      </div>
    }
    </div>
  )
}