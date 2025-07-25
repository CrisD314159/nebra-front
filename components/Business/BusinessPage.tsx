import { BusinessInfo } from "@/lib/types/types";
import { AnimatePresence, motion } from "framer-motion";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { ArrowLeft } from "lucide-react";
import RatingBusiness from "./RatingBusiness";
import MapboxMap from "../Maps/MapboxMap";

interface BusinessPage{
  selected: boolean
  business: BusinessInfo
  setSelected: (value:boolean) => void
}

export default function BusinessPage({business, selected, setSelected}:BusinessPage) {
  return (
      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={business.id}
            className="fixed top-0 left-0 backdrop-blur-2xl bg-white/10  dark:bg-black/5  w-screen h-screen p-8 z-50 rounded-none  overflow-y-scroll  shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="btn btn-circle btn-primary absolute left-4 top-4 z-50" onClick={() => setSelected(false)}>
              <ArrowLeft/>
            </button>
            <div className="w-full flex-1 flex flex-col pt-10 gap-5">
              <ImageCarousel images={business.images}/>
              <h3 className="text-3xl font-bold">{business.name}</h3>
              <p className="mt-4 text-lg font-bold">Created by {business.ownerName}</p>
              <p className="from-neutral-900 dark:from-neutral-400 mt-2">
                {business.description}
              </p>

              <p className="font-bold text-purple-800 dark:text-purple-300">
                {business.category}
              </p>

              <RatingBusiness rating={business.averageScore}/>


              <MapboxMap editable={false} initialLat={business.latitude} initialLng={business.longitude} onSelectLocation={() => {}}/>

              <h2 className="text-3xl font-bold">Comments</h2>

              <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-2xl">
                h
                
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}