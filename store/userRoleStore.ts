'use client'
import {create} from 'zustand';


type RoleType = {
  role: string | undefined
  isLoggedIn: boolean
  setRole: (role: string | undefined) => void
  setIsLoggedIn: (value: boolean) => void
}

export const useRoleStore = create<RoleType>((set) =>({
  role: undefined,
  isLoggedIn:false,
  setRole: (role:string | undefined) => set({role: role}),
  setIsLoggedIn: (value: boolean) => set({isLoggedIn:value})
}))