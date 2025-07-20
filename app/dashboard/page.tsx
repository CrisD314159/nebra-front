'use client'

import Dock from "@/components/Dock/Dock"
import Tab from "@/components/Dock/Tab"
import { HouseIcon, MagnifyingGlassIcon, StorefrontIcon, UserIcon } from "@phosphor-icons/react"
import { Suspense } from "react"

export default function DashboardPage() {
  return (
    <Suspense>
      <Dock>
        <Tab title="Home" tabkey="home" icon={HouseIcon}>
          Home page
        </Tab>

        <Tab title="Search" tabkey="search" icon={MagnifyingGlassIcon}>
          Search
        </Tab>

        <Tab title="Saved" tabkey="saved" icon={StorefrontIcon}>
          Saved Page
        </Tab>

        <Tab title="Search" tabkey="search" icon={UserIcon}>
          User Page
        </Tab>
      </Dock>
    </Suspense>
  )
  
}