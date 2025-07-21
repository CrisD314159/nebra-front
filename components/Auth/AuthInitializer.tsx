'use client'

import { GetUserRole } from "@/lib/serverActions/Auth/AuthServerActions"
import { useEffect } from "react"
import { useRoleStore } from "@/store/userRoleStore"

export default function AuthInitializer() {

  const {setRole, role} = useRoleStore()


  useEffect(()=>{
    async function checkUserRole() {
      if(role === undefined){
        const cookieRoleValue = await GetUserRole()
        setRole(cookieRoleValue)
      }
    }

    checkUserRole()


  }, [role, setRole])
  

  return (
    <></>
  )
}