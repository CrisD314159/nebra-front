'use client'

import { checkIsLoggedIn, GetUserRole } from "@/lib/serverActions/Auth/AuthServerActions"
import { useEffect } from "react"
import { useRoleStore } from "@/store/userRoleStore"

export default function AuthInitializer() {

  const {setRole, role, setIsLoggedIn} = useRoleStore()


  useEffect(()=>{
    async function checkUserRole() {
      if(role === undefined){
        const cookieRoleValue = await GetUserRole()
        const isLoggedIn = await checkIsLoggedIn()
        
        setIsLoggedIn(isLoggedIn === true)
        setRole(cookieRoleValue)
      }
    }

    checkUserRole()


  }, [role, setRole, setIsLoggedIn])
  

  return (
    <></>
  )
}