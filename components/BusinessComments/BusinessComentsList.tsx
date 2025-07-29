'use client'

import { GetBusinessComments } from "@/lib/serverActions/CommentActions/CommentActions"
import { CommentInfo } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"
import useSWR from "swr"
import BusinessComentCard from "./BusinessComentCard"
import CreateBusinessComment from "./CreateBusinessComment"

interface BusinessComentsListProps {
  businessId: string
}

let CURRENT_PAGE = 0

export default function BusinessComentsList({ businessId }: BusinessComentsListProps) {
  const { data, error, isLoading, mutate } = useSWR<CommentInfo[]>(
    ['businessComments', businessId],
    () => GetBusinessComments(businessId, CURRENT_PAGE)
  )

  const [comments, setComments] = useState<CommentInfo[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [pending, setPending] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1 })

  // Sync initial SWR data
  useEffect(() => {
    if (data && data.length > 0) {
      setComments(data)
      setHasMore(true)
    }
  }, [data])

  const handleUsersFetching = async () => {
    if (!hasMore || pending) return
    try {
      CURRENT_PAGE = CURRENT_PAGE + 1
      setPending(true)
      const newComments = await GetBusinessComments(businessId, CURRENT_PAGE)
      if (newComments.length > 0) {
        setComments(prev => [...prev, ...newComments])
      } else {
        setHasMore(false)
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      setPending(false)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      handleUsersFetching()
    }
  }, [inView, hasMore])

  return (
    <div className="flex flex-col items-center w-full bg-gray-200 rounded-2xl p-3 gap-6 dark:bg-gray-800">
      <CreateBusinessComment businessId={businessId} mutate={mutate}/>

      {comments.map(comment => (
        <BusinessComentCard comment={comment} key={comment.id} />
      ))}

      {error && (
        <p className="text-center text-red-500">
          An error occurred while loading comments
        </p>
      )}

      {(pending || isLoading) ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      ) : (
        <div ref={ref} />
      )}
    </div>
  )
}