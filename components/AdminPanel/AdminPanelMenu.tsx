'use client'

import dynamic from "next/dynamic"
import { useState } from "react"
import { motion } from 'framer-motion'
import { useRoleStore } from "@/store/userRoleStore"
import UnauthorizedPage from "../Unauthorized/UnauthorizedPage"
import { X } from "lucide-react"

const PendingReportsDynamic = dynamic(() => import("@/components/AdminPanel/PendingReportsComponent"), {
  ssr: false
})
const AccpetedReportsDynamic = dynamic(() => import("@/components/AdminPanel/AcceptedReports"), {
  ssr: false
})
const RejectedReportsDynamic = dynamic(() => import("@/components/AdminPanel/RejectedReports"), {
  ssr: false
})


const TABS = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Accepted', value: 'ACCEPTED' }
] as const

type TabType = (typeof TABS)[number]["value"]


interface AdminPanelMenuProps {
  setClose : (value:boolean) => void
}

export default function AdminPanelMenu({setClose}:AdminPanelMenuProps) {
  const { isLoggedIn } = useRoleStore()
  const [tab, setTab] = useState<TabType>('PENDING')

  if (!isLoggedIn) {
    return <UnauthorizedPage title="Log in to view reports" />
  }

  const renderTitle = () => {
   if(tab === 'ACCEPTED') return 'Accepted'
   if(tab === 'PENDING') return 'Pending'
   if(tab === 'REJECTED') return 'Rejected'
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <button className="btn btn-soft btn-circle btn-primary absolute top-1 left-1"
      onClick={()=> setClose(false)}
      >
        <X/>
      </button>


      <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20 mx-6">{renderTitle()}</h1>

      <div className="w-[95%] sm:w-[400px] flex items-center justify-center gap-4 h-[70px] mx-auto mt-4 mb-6 rounded-full shadow-xl bg-base-200">
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

      <div className="h-full w-full">
        {tab === 'PENDING' && <PendingReportsDynamic />}
        {tab === 'REJECTED' && <RejectedReportsDynamic />}
        {tab === 'ACCEPTED' && <AccpetedReportsDynamic />}
      </div>
    </div>
  )
}