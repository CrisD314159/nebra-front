'use client'

import { CommentInfo } from "@/lib/types/types"
import {motion} from "framer-motion"
import { useState } from "react"
import CommentDetailComponent from "./CommentDetailComponent"

interface CommentCardProps{
  comment:CommentInfo
}


export default function CommentCard({comment}:CommentCardProps) {
  const [selected, setSelected] = useState(false)


  return(
    <>
    <motion.div
      layoutId={comment.id}
     
      className="flex flex-col justify-center w-[90%] rounded-xl shadow-2xl"
    >

      <h1>New comment on {comment.businessName}</h1>

      <p>{comment.authorName} has posted a new comment on your business</p>

      <div>
        <button onClick={()=>setSelected(true)}>
          Read comment
        </button>
      </div>
    </motion.div>
    
    <CommentDetailComponent comment={comment} selected={selected} setSelected={setSelected}/>
    </>
  )
}