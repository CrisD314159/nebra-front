'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Suspense } from "react"

export default function ChangePasswordPage() {
  return (
    <Suspense>
      <LoginErrorPage />
    </Suspense>
  )
}

function LoginErrorPage() {
  const params = useSearchParams()
  const router = useRouter()

  const error = params.get('error')

  useEffect(() => {
    if (error) {
  
      router.push('/account/login')
    }
  }, [error, router])

  return (
    <div className="w-full h-full flex justify-center items-center">
      Redirecting...
    </div>
  )
}