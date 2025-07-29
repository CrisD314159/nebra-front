'use client'

import { ImageInfo } from "@/lib/types/types"
import Image from "next/image"

interface ImageCarouselProps{
  images: ImageInfo[]
}


export default function ImageCarousel({images}:ImageCarouselProps) {
  return (
  <div className="carousel md:w-96 md:h-96 w-72 h-72">
    {images.map((image, id) =>{
      return (
      <div id={`slide${id}`} key={image.id} className="carousel-item relative w-full h-full">
        <Image
          src={image.link}
          alt="Business image"
          fill />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href={`#slide${id-1}`} className="btn btn-circle">❮</a>
          <a href={`#slide${id+1}`}  className="btn btn-circle">❯</a>
        </div>
    </div>
      )
    })}
  </div>
  )
  
}