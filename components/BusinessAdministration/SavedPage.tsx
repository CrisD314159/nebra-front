'use client'

import dynamic from "next/dynamic"
import { useState } from "react"
import { motion } from 'framer-motion'
import { useRoleStore } from "@/store/userRoleStore"
import UnauthorizedPage from "../Unauthorized/UnauthorizedPage"

const MyBusinessesDynamic = dynamic(() => import("@/components/BusinessAdministration/MyBusinessesComponent"), {
  ssr: false
})

const ArchivedBusinessesDynamic = dynamic(() => import("@/components/BusinessAdministration/ArchivedBusinessesComponent"), {
  ssr: false
})

const TABS = [
  { label: 'Active', value: 'MYBUSINESSES' },
  { label: 'Archived', value: 'ARCHIVED' }
] as const

type TabType = (typeof TABS)[number]["value"]

export default function SavedPage() {
  const { isLoggedIn } = useRoleStore()
  const [tab, setTab] = useState<TabType>('MYBUSINESSES')

  if (!isLoggedIn) {
    return <UnauthorizedPage title="Log in to view your saved businesses" />
  }

  const renderTitle = () => {
    return tab === 'MYBUSINESSES' ? 'My Businesses' : 'Archived'
  }

  return (
    <div className="flex flex-col h-screen w-full bg-base-100">
      <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20 mx-6">{renderTitle()}</h1>

      <div className="w-[90%] sm:w-[300px] flex items-center justify-center gap-4 h-[70px] mx-auto mt-4 mb-6 rounded-full shadow-xl bg-base-200">
        {TABS.map(({ label, value }) => {
          const isActive = tab === value
          return (
            <motion.button
              key={value}
              onClick={() => setTab(value)}
              className={`rounded-3xl px-4 py-2 font-medium transition-colors duration-300 ${
                isActive ? "bg-primary text-white" : "text-base-content"
              }`}
              animate={{
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {label}
            </motion.button>
          )
        })}
      </div>

      <>
        {tab === 'MYBUSINESSES' && <MyBusinessesDynamic />}
        {tab === 'ARCHIVED' && <ArchivedBusinessesDynamic />}
      </>
    </div>
  )
}