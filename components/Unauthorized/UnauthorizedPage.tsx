'use client'

import Link from "next/link"
import { Lock } from "lucide-react"

interface UnauthorizedPageProps{
  title:string
}

export default function UnauthorizedPage({title}:UnauthorizedPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-gray-600  dark:from-gray-900 via-[#5839ac] dark:to-black to-white text-white px-4 text-center">
      <Lock className="w-16 h-16 mb-6 text-indigo-400" />
      <h1 className="text-2xl font-bold mb-2">{title} </h1>
      <Link
        href="/account/login"
        className="bg-indigo-800 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition"
      >
        Login
      </Link>
    </div>
  )
}