'use client'

import { LucideProps, Plus } from "lucide-react"
import React, { ForwardRefExoticComponent, RefAttributes, useState } from "react"
import CreateBusinessForm from "./Create/CreateBusinessForm"
import { BusinessInfo } from "@/lib/types/types"


interface BusinesActionModal{
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  ActionComponent : React.ComponentType<{ handleClose: () => void, initialComponent?: BusinessInfo }>
  floating: boolean
}

export default function BusinessActionModal({ActionComponent, Icon, floating}:BusinesActionModal) {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
      <button className={`btn z-50 btn-circle btn-primary ${floating ? 'absolute left-[50%] bottom-28': ''}`} style={ floating ? {transform:'translate(-50%)'} :{}} onClick={handleOpen}><Icon/></button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box overflow-y-scroll">
          <ActionComponent handleClose={handleClose}/>
        </div>
      </dialog>
    </>
  )
}