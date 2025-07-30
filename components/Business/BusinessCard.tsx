'use client'

import { BusinessInfo } from "@/lib/types/types"
import {motion} from 'framer-motion'
import Image from "next/image"
import { useState } from "react"
import BusinessPage from "./BusinessPage"
import GlobalModal from "../Modals/GlobalModal"
import { Archive, ArchiveRestore, Edit, Eye, Trash } from "lucide-react"
import { ArchiveBusiness, DeleteBusiness, RepublishBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import BusinessActionModal from "./BusinessActionModal"
import EditBusinessForm from "./Edit/EditBusinessForm"

interface BusinessCardProps{
  business: BusinessInfo,
  editable:boolean
  mutate?: () => void
}


export default function BusinessCard({business, editable, mutate}:BusinessCardProps) {

    const [selected, setSelected] = useState(false)

  return (
    <>
      <motion.div
        layoutId={business.id}
        className={`w-[80%] p-4 ${editable ? 'h-[550px] relative':'h-[450px] cursor-pointer'} sm:h-[300px] my-4 rounded-xl shadow-2xl `}
        onClick={editable? () => {} : () => setSelected(true)}
      >
        <div className="flex flex-col w-full h-full sm:flex-row items-center">
          <Image src={business.images[0].link} alt="Business Image" height={230} width={230}/>
          <div className="sm:ml-3 w-full">
            <h3 className="text-xl mt-3 font-bold sm:text-2xl">{business.name}</h3>
            <div className="w-[90%]">

            <p className="text-gray-500 sm:text-shadow-2xs w-[85%] h-14 overflow-hidden truncate">{business.description}</p>
            </div>

            {editable &&
            <div className="mt-5 flex gap-5 max-md:justify-center ">
              <GlobalModal 
              Icon={Trash} 
              actionButtonName="Delete Business" 
              entity={business} 
              method={DeleteBusiness} 
              mutate={mutate ?? (() => {})} 
              title="Are you sure you want to delete this business?"/>

              {
                business.businessState === 'ARCHIVED' ?
                (
                  <GlobalModal 
                  Icon={ArchiveRestore} 
                  actionButtonName="Unarchive Business" 
                  entity={business} 
                  method={RepublishBusiness} 
                  mutate={mutate ?? (() => {})} 
                  title="Are you sure you want to republish this business?"/>

                )
                :
                (
                <GlobalModal 
                  Icon={Archive} 
                  actionButtonName="Archive Business" 
                  entity={business} 
                  method={ArchiveBusiness} 
                  mutate={mutate ?? (() => {})} 
                  title="Are you sure you want to archive this business?"/>
                )

              }
              
              <div className="absolute top-0 right-0">
                <BusinessActionModal
                  Icon={Edit}
                  floating={false}
                  ActionComponent={({ handleClose, initialComponent }) => (
                    <EditBusinessForm
                      handleClose={handleClose}
                      initialBusiness={initialComponent ?? business}
                    />
                  )}
                />
              </div>

              <button className="btn btn-soft btn-primary" onClick={()=> setSelected(true)}>
                <Eye/>
              </button>

            
            </div>
            }

          </div>
        </div>
      </motion.div>

      <BusinessPage business={business} selected={selected} setSelected={setSelected}/>
    </>
  )
  
}