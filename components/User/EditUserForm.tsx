'use client'
import { startTransition, useActionState, useEffect, useState } from "react"

import toast from "react-hot-toast"
import { UserInfo } from "@/lib/types/types"
import { UpdateUser } from "@/lib/serverActions/UserActions/UserActions"
import ProfilePictureComponent from "../ImageInputs/ProfilePictureComponent"

interface UserSettingsEditFormProps{
  user:UserInfo
  mutate:()=> void
  handleClose:() => void
}

export default function EditUserForm({handleClose, user, mutate}:UserSettingsEditFormProps) {
  const [state, action, pending] = useActionState(UpdateUser, undefined)
  const [imageReady, setFormImage] = useState<File | null>(null)
  const [googleUser, setGoogleUser] = useState(user.createdWithGoogle)


  useEffect(()=>{
    if(state?.success === false && state.message){
      toast.error(state.message ?? "Unexpected error")
    }else if (state?.success === true){
      mutate()
      handleClose()
    }
  }, [state, handleClose])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formdata = new FormData(event.currentTarget)
    if(googleUser){
    }else{

    }
    formdata.set('id', user.id)

    startTransition(() => {
      action(formdata)
    })


  }



  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ProfilePictureComponent setFormImageFile={setFormImage}/>
        <div className="flex flex-col w-full justify-center items-center gap-3">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100" >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                required
                maxLength={60}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
              Location
            </label>
            <div className="mt-2">
              <input
                id="country"
                name="country"
                defaultValue={user.location}
                type="text"
                required
                maxLength={30}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

        </div>
        <div className="w-full flex justify-center gap-5">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md dark:bg-indigo-600 bg-[#000080] hover:bg-[#1e1e34] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs dark:hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
      <button 
      className="btn btn-soft btn-error"
      onClick={handleClose}
      >
        Cancel
      </button>
    </>

  )
}