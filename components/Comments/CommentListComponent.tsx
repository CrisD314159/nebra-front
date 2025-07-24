'use client'

import {CommentInfo } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"
import { GetUserBusinessLatestComments } from "@/lib/serverActions/CommentActions/CommentActions"
import CommentCard from "./CommentCard"

interface SearchListComponentProps{
  initialComments: CommentInfo[] 
}

let CURRENT_PAGE = 0

export default function CommentListComponent({initialComments}:SearchListComponentProps) {

  const [comments, setComments] = useState<CommentInfo[]>(initialComments)
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
      const newComments = await GetUserBusinessLatestComments()
      if(newComments.length > 0) {
        setComments([...comments, newComments])
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
        comments.map(comment =>{
          return (
            <CommentCard comment={comment} key={comment.id}/>
          )
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