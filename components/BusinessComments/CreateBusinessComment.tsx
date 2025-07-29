'use client'

import { CreateComment } from "@/lib/serverActions/CommentActions/CommentActions"
import { startTransition, useActionState, useEffect } from "react"
import { useState } from "react"
import toast from "react-hot-toast"

interface CreateBusinessCommentProps {
  businessId: string
  mutate: () => void
}

export default function CreateBusinessComment({ businessId, mutate }: CreateBusinessCommentProps) {
  const [rating, setRating] = useState(0)


  const [state, action, isPending] = useActionState(CreateComment, undefined)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    formdata.append('businessId', businessId)
    if(rating === 0){
      toast.error("You forgot to rate this business ")
      return
    }
    console.log(rating);
    formdata.append('score', rating.toString())


    startTransition(() =>{
      action(formdata)
    })
  }

  useEffect(()=>{
    if(state?.success === false) toast.error(state.message)
    if(state?.success === true) {
      toast.success(state.message)
      mutate()
    }
  }, [state])

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4 mb-10 ">
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-900 dark:text-gray-100">
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            title="title"
            name="title"
            type="text"
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <textarea
        name="content"
        placeholder="Escribe tu comentario..."
        className="textarea textarea-bordered w-full"
        required
      />

  <div className="rating rating-lg mt-5">
    <input
      type="radio"
      name="rating"
      className="rating-hidden"
      aria-label="clear"
      value="0"
      checked={rating === 0}
      onChange={() => setRating(0)}
    />
    {[1, 2, 3, 4, 5].map((value) => (
      <input
        key={value}
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-yellow-400"
        aria-label={`${value} star`}
        value={value}
        checked={rating === value}
        onChange={() => setRating(value)}
      />
    ))}
  </div>

      <input type="hidden" name="rating" value={rating} />

      <button type="submit" disabled={isPending} className="btn btn-primary self-start">
         Publish
      </button>

    </form>
  )
}