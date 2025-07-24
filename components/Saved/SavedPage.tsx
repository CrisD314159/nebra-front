'use client'

import dynamic from "next/dynamic"
import { useState } from "react"
import {motion} from 'framer-motion'

const MyBusinessesDynamic = dynamic(() => import("@/components/Saved/MyBusinessesComponent"), {
  ssr:false
})
const SavedBusinessesDynamic = dynamic(() => import("@/components/Saved/SavedBusinessesComponent"), {
  ssr:false
})
const ArchivedBusinessesDynamic = dynamic(() => import("@/components/Saved/ArchivedBusinessesComponent"), {
  ssr:false
})


export default function SavedPage() {

  const [tab, setTab] = useState<'MYBUSINESSES' | 'SAVEDBUSINESSES' | 'ARCHIVED'>('MYBUSINESSES')


  return(
      <div className={`flex flex-col h-screen w-full`} >


        {
          tab === 'MYBUSINESSES' &&
          <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">My Businesses</h1>
        }
        {
          tab === 'ARCHIVED' &&
          <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">Archived</h1>
        }
        {
          tab === 'SAVEDBUSINESSES' &&
          <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">Saved Businesses</h1>
        }
        <div className="w-[90%] sm:w-[400px] flex items-center justify-center gap-7 h-[70px] mx-auto rounded-full shadow-2xl">
          <motion.button 
          className={`rounded-3xl ${tab === 'MYBUSINESSES' ? 'bg-blue-700 text-white' : ''} p-3`} 
          onClick={() => setTab('MYBUSINESSES')}
          animate={{
            scale: tab === 'MYBUSINESSES' ? 1.15 : 1,
            backgroundColor: tab === 'MYBUSINESSES' ? '#5839ac' : '',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >Active</motion.button>

          <motion.button 
          className={`rounded-3xl ${tab === 'SAVEDBUSINESSES' ? 'bg-blue-700 text-white' : ''} p-3`}  
          animate={{
            scale: tab === 'SAVEDBUSINESSES' ? 1.15 : 1,
            backgroundColor: tab === 'SAVEDBUSINESSES' ? '#5839ac' : '',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => setTab('SAVEDBUSINESSES')}>Saved</motion.button>

          <motion.button 
          className={`rounded-3xl ${tab === 'ARCHIVED' ? 'bg-blue-700 text-white' : ''} p-3`}  
          animate={{
            scale: tab === 'ARCHIVED' ? 1.15 : 1,
            backgroundColor: tab === 'ARCHIVED' ? '#5839ac' : '',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => setTab('ARCHIVED')}>Archived</motion.button>
        </div>
        {
          tab === 'MYBUSINESSES' &&
          <MyBusinessesDynamic/>
        }
        {
          tab === 'SAVEDBUSINESSES' &&
          <SavedBusinessesDynamic/>
        }
        {
          tab === 'ARCHIVED' &&
          <ArchivedBusinessesDynamic/>
        }
      </div>
  )
}