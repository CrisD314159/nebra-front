'use client'

import useSWR from "swr"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"

interface PaginationListProps<T> {
  swrKey: string
  fetcher: (page: number) => Promise<T[]>
  CardComponent: React.ComponentType<{ item: T; mutate: () => void }>
}

let CURRENT_PAGE = 0

export default function PaginationList<T>({
  swrKey,
  fetcher,
  CardComponent,
}: PaginationListProps<T>) {
  const { data, error, isLoading, mutate } = useSWR<T[]>(swrKey, () => fetcher(0))
  const [items, setItems] = useState<T[]>(data ?? [])
  const [hasMore, setHasMore] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (data && data.length > 0) {
      setItems(data)
      setHasMore(true)
    }
  }, [data])

  const { ref, inView } = useInView({ threshold: 0.1 })

  const handleFetching = async () => {
    if (!hasMore) return
    try {
      CURRENT_PAGE += 1
      setPending(true)
      const newItems = await fetcher(CURRENT_PAGE)
      if (newItems.length > 0) {
        setItems(prev => [...prev, ...newItems])
      } else {
        setHasMore(false)
      }
    } catch (err) {
      if (err instanceof Error) toast.error(err.message)
    } finally {
      setPending(false)
    }
  }

  useEffect(() => {
    if (inView && hasMore) handleFetching()
  }, [inView, hasMore])

  return (
    <div className="overflow-y-scroll w-[90%] flex flex-col items-center gap-4 flex-1 mx-auto max-md:pb-[92px]">
      {(isLoading || pending) && (
        <div className="w-full flex justify-center">
          <span className="mt-7 loading-lg loading loading-spinner text-primary"></span>
        </div>
      )}

      {error && <p className="text-center mt-3">There was an error while loading data</p>}

      {data && data.length === 0 && <p className="text-center mt-3">No items found</p>}

      {items.map((item, index) => (
        <CardComponent key={index} item={item} mutate={mutate} />
      ))}

      <div ref={ref} />
    </div>
  )
}