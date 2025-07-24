'use client'

import { CommentInfo } from "@/lib/types/types"
import { AnimatePresence } from "framer-motion"

interface CommentDetailComponentProps{
  selected:boolean
  setSelected: (value:boolean) => void
  comment: CommentInfo
}


export default function CommentDetailComponent({selected, setSelected, comment}:CommentDetailComponentProps) {
  return (
    <AnimatePresence>
      {
        selected && (
        <div className="fixed top-0 bottom-0">
          <h1>{comment.authorName} commented</h1>

          <div>
            {comment.content}
          </div>


          <div>
            <button className="btn btn-error" onClick={()=> setSelected(false)}>
              Cancel
            </button>
            <button className="btn btn-primary">
              Answer Comment
            </button>
          </div>
        </div>
        )
      }
    </AnimatePresence>
  )
}