'use client'

import { LucideProps } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ForwardRefExoticComponent, ReactElement, RefAttributes, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TabProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  title: string
  tabkey: string
  children: React.ReactNode
  onClick?: () => void
}

interface TabsProps {
  children: ReactElement<TabProps>[]
}

const Dock = ({ children }: TabsProps) => {
  const params = useSearchParams()
  const router = useRouter()
  const [activeTabKey, setActiveTabKey] = useState(children[0]?.props.tabkey)

  const tabFromUrl = params.get('tab')

  useEffect(() => {
    if (tabFromUrl) {
      const exists = children.some(child => child?.props?.tabkey === tabFromUrl)
      if (exists) setActiveTabKey(tabFromUrl)
    }
  }, [tabFromUrl, children])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tabKey: string,
    cb?: () => void
  ) => {
    e.preventDefault()
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('tab', tabKey)
    router.push(`${window.location.pathname}?${searchParams.toString()}`)
    setActiveTabKey(tabKey)
    cb?.()
  }

  const activeChild = children.find(child => child?.props?.tabkey === activeTabKey)

  return (
    <div className="flex flex-col h-full w-full relative ">
      <div className="flex flex-row justify-center w-[97%] gap-2 mx-auto bg-white/10
        py-5 px-5 absolute bottom-6 left-0 right-0 items-center z-50 shadow-2xl  backdrop-blur-sm  dark:bg-black/5 rounded-full">
        
        {children.map(child => {
          if (!child?.props) return null
          const isActive = activeTabKey === child.props.tabkey

          return (
            <motion.a
              key={child.props.tabkey}
              href="#"
              onClick={e => handleClick(e, child.props.tabkey, child.props.onClick)}
              className="relative sm:w-[19%] w-[80%] flex items-center  justify-center py-2 rounded-3xl"
              animate={{
                scale: isActive ? 1.15 : 1,
                backgroundColor: isActive ? '#5839ac' : 'transparent',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <child.props.icon
                className={`transition-colors duration-300 w-5 h-5 ${isActive ? 'text-white' : ''}`}
              />

            </motion.a>
          )
        })}
      </div>

      {/* Contenido con transición */}
      <div className="w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
            className="h-full"
          >
            {activeChild}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Dock