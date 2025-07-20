'use client'

import { Icon } from "@phosphor-icons/react"

interface TabProps {
  icon: Icon
  title: string
  tabkey: string
  children: React.ReactNode
  onClick?: () => void
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>
}

export default Tab