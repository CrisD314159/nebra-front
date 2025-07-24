'use client'
import { ChangeEvent, useState } from "react"
import { CloudUpload } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"

interface MultipleImageUploadProps {
  setFormImageFiles: (files: File[]) => void
  initialUrls?: string[]
}

export default function BusinessImagesUploader({ setFormImageFiles, initialUrls = [] }: MultipleImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<string[]>(initialUrls)

  const handleMultipleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files)
    const validImages: File[] = []
    const previewUrls: string[] = []

    selectedFiles.forEach((file) => {
      if (file.type.split('/')[0] !== 'image') {
        toast.error(`${file.name} no es un archivo de imagen válido`)
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} excede el tamaño máximo de 5MB`)
        return
      }

      validImages.push(file)
      previewUrls.push(URL.createObjectURL(file))
    })

    if (validImages.length === 0) {
      toast.error("No se seleccionaron imágenes válidas")
      return
    }

    setFormImageFiles(validImages)
    setPreviewImages(previewUrls)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-3 gap-4 my-4">
        {previewImages.length > 0 ? (
          previewImages.map((src, idx) => (
            <div key={idx} className="relative w-32 h-32 rounded overflow-hidden border border-[#5e03fc] shadow-lg">
              <Image src={src} alt={`Preview ${idx}`} fill className="object-cover" />
            </div>
          ))
        ) : (
          <span className="text-white">No images selected</span>
        )}
      </div>

      <label htmlFor="multi-image-upload" className="flex flex-col items-center justify-center w-48 h-12 rounded-lg cursor-pointer hover:bg-[#5e03fc] border my-3" style={{ borderColor: '#5e03fc' }}>
        <CloudUpload />
        <input id="multi-image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleMultipleImageUpload} />
      </label>
    </div>
  )
}