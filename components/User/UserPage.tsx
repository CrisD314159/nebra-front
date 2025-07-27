'use client'
import { UserInfo } from "@/lib/types/types"
import { Vibrant } from "node-vibrant/browser";
import { useEffect, useState } from "react"
import useSWR from "swr"


import Image from "next/image";
import LogoutModal from "../Logout/LogoutModal";
import EditUserModal from "./EditUserModal";
import { GetUserProfile } from "@/lib/serverActions/UserActions/UserActions";
import DeleteAccountModal from "../DeleteAccount/DeleteAccountModal";
import { useRoleStore } from "@/store/userRoleStore";
import UnauthorizedPage from "../Unauthorized/UnauthorizedPage";

export default function UserPage() {
  const { data, error, isLoading, mutate } = useSWR<UserInfo>('userOverview', GetUserProfile)

  const [color, setColor] = useState('#fff')

  const {isLoggedIn} = useRoleStore()


  useEffect(()=>{
    if(data){
      Vibrant.from(data.profilePicture.link).getPalette().then((palette)=> setColor(`${palette.Vibrant?.hex ?? "#3b82f6"}`) )
    }
  },[data])
  

  if(!isLoggedIn){
    return (
      <UnauthorizedPage title="Log in yo view your profile"/>
    )
  }

  return (
      <div className={`flex flex-col h-screen w-full`} >
        <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">User Settings</h1>
          {isLoading && (
            <div className="w-full flex justify-center">
              <span className="mt-7 loading-lg loading loading-spinner text-primary"></span>
            </div>
            )}
          {error && <p className="text-center">There was an error while loading your profile</p>}
          {data&&
          (
            <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[110px]">
              <div className="px-5 flex flex-col items-center justify-center">
                <div className="avatar">
                  <div className="w-50 h-50 rounded-full" style={{boxShadow:`0px 20px 30px 7px ${color}`}}>
                    <Image width={100} height={100} src={data.profilePicture.link} alt={data.name} />  
                  </div>
                </div>
                  <h2 className="text-2xl font-semibold mt-10">{data.name}</h2>
                  <h3 className="text-lg menu-title font-semibold mt-5">{data.email}</h3>

                <p className="text-xl dark:text-indigo-300 text-indigo-600 my-10  font-medium">📍 {data.location}</p>

              <div className="flex flex-col items-center gap-2">
                <EditUserModal user={data} mutate={mutate}/>
                <LogoutModal/>
                <DeleteAccountModal/>
              </div>

              </div>

            </div>
          )
          }

      </div>
  )
}