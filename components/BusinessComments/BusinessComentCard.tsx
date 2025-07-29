'use client'

import { CommentInfo } from "@/lib/types/types"

interface BusinessComentCardProps{
  comment: CommentInfo
}


export default function BusinessComentCard({ comment }: BusinessComentCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md space-y-3 w-full">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
          {comment.authorName}
        </p>
        <p className="text-gray-800 dark:text-gray-100">{comment.content}</p>
      </div>

      {comment.answer != "" && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl border-l-4 border-blue-500">
          <p className="text-gray-700 dark:text-gray-200 mt-1">{comment.answer}</p>
        </div>
      )}
    </div>
  );
}