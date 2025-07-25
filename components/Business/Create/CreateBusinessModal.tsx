'use client'

import { Plus } from "lucide-react"
import { useState } from "react"
import CreateBusinessForm from "./CreateBusinessForm"


export default function CreateBusinessModal() {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
      <button className="btn  btn-circle btn-primary absolute left-[50%] bottom-28" style={{transform:'translate(-50%)'}} onClick={handleOpen}><Plus/></button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box overflow-y-scroll">
          <CreateBusinessForm handleClose={handleClose}/>
        </div>
      </dialog>
    </>
  )
}