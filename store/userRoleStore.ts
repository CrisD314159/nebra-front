'use client'
import {create} from 'zustand';


type RoleType = {
  role: string | undefined
  setRole: (role: string | undefined) => void
}

export const useRoleStore = create<RoleType>((set) =>({
  role: undefined,
  setRole: (role:string | undefined) => set({role: role})
}))