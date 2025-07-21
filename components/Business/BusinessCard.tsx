'use client'

import { BusinessInfo } from "@/lib/types/types"
import {motion} from 'framer-motion'
import Image from "next/image"
import { useState } from "react"
import RatingBusiness from "./RatingBusiness"
import BusinessPage from "./BusinessPage"

interface BusinessCardProps{
  business: BusinessInfo
}


export default function BusinessCard({business}:BusinessCardProps) {

    const [selected, setSelected] = useState(false)

  return (
    <>
      <motion.div
        layoutId={business.id}
        className="w-[80%] p-4 h-[600px] my-10 rounded-xl shadow-2xl cursor-pointer"
        onClick={() => setSelected(true)}
      >
        <div className="flex flex-col w-full h-full sm:flex-row items-center">
          <Image src={'/example.jpg'} alt="Business Image" height={230} width={230}/>
          <div className="sm:ml-3">
            <h3 className="text-xl mt-3 font-bold sm:text-2xl">{business.name}</h3>
            <p className="text-gray-500 sm:text-shadow-2xs">{business.description}</p>
            <RatingBusiness rating={business.averageScore}/>

          </div>
        </div>
      </motion.div>

      <BusinessPage business={business} selected={selected} setSelected={setSelected}/>
    </>
  )
  
}