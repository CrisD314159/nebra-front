'use client'

import { CommentInfo } from "@/lib/types/types"
import { motion } from "framer-motion"
import { useState } from "react"
import { User, Star } from "lucide-react"
import { AnswerComment } from "@/lib/serverActions/CommentActions/CommentActions"
import FormModal from "../Modals/FormModal"

interface CommentCardProps {
  comment: CommentInfo
}

export default function CommentCard({ comment }: CommentCardProps) {

  return (
    <>
      <motion.div
        layoutId={comment.id}
        className="w-[90%] max-w-xl bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 flex flex-col gap-4 transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">
            New comment on  <span className="text-base-content font-bold">{comment.businessName}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span className="font-medium">{comment.authorName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-300" />
          <span className="font-semibold">{comment.score} / 5</span>
        </div>

        <p className="line-clamp-3 text-sm text-base-content/80">
          {comment.content}
        </p>

        <div className="flex justify-end">
          <FormModal 
          inputName="answer"
          SubmitMethod={AnswerComment} 
          entity={comment} 
          entityIdKey="commentId" 
          actionButtonTitle="Answer comment" 
          placeholder="Write here your answer" 
          title="Answer comment"/>
        </div>
      </motion.div>

    </>
  )
}