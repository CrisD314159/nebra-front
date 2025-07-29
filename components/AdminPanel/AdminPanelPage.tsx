import { AnimatePresence, motion } from "framer-motion";
import {  ShieldUser } from "lucide-react";
import { useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";


export default function AdminPanelPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        layoutId={"admin"}
        className={`btn btn-soft btn-primary absolute right-6 top-6`}
        onClick={() => setOpen(true)}
      >

        <ShieldUser/>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId={"admin"}
            className="fixed top-0 left-0 backdrop-blur-2xl bg-white/10  dark:bg-black/5  w-screen h-screen z-50 rounded-none  overflow-y-scroll  shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            
            <AdminPanelMenu setClose={setOpen}/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}