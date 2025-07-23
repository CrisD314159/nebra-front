'use client'

import Dock from "@/components/Dock/Dock"
import Tab from "@/components/Dock/Tab"
import { BellRing, CircleUser, House, Search, Store } from "lucide-react"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const HomePageDynamic = dynamic(() => import('@/components/Home/HomePageComponent'), {
  ssr:false
})

const SearchPageDynamic = dynamic(() => import('@/components/Search/SearchPage'), {
  ssr:false
})

const UserPageDynamic = dynamic(() => import('@/components/User/UserPage'), {
  ssr:false
})

export default function DashboardPage() {


  return (
    <Suspense>
      <Dock>
        <Tab title="Home" tabkey="home" icon={House}>
          <HomePageDynamic/>
        </Tab>

        <Tab title="Search" tabkey="search" icon={Search}>
          <SearchPageDynamic/>
        </Tab>

        <Tab title="Notifications" tabkey="notifications" icon={BellRing}>
          Notifications
        </Tab>

        <Tab title="Saved" tabkey="saved" icon={Store}>
          Saved Page
        </Tab>

        <Tab title="User" tabkey="user" icon={CircleUser}>
          <UserPageDynamic/>
        </Tab>
      </Dock>
    </Suspense>
  )
  
}