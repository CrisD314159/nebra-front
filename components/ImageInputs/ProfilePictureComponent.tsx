'use client'
import { ChangeEvent, useState } from "react"
import { CloudUpload } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface ImageUploadProps {
  setFormImageFile: (file: File | null) => void
  initialUrl?: string | null
}

export default function ProfilePictureComponent({ setFormImageFile, initialUrl }: ImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>( null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (file.type.split('/')[0] !== 'image' || file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe ser válida y menor a 5MB");
      return;
    }
    setFormImageFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Mostrar imagen local temporalmente
  };


  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-48 h-48 rounded-full overflow-hidden bg-neutral-900" style={{ boxShadow: '0 0 30px #5e03fc', border: '0.5px solid #5e03fc' }}>
        {previewImage ? (
          <Image src={previewImage} alt="Preview" width={192} height={192}/>
        ) : (
          <span className="text-white">No image Selected</span>
        )}
      </div>

      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-32 h-10 rounded-lg cursor-pointer hover:bg-[#5e03fc] border my-5" style={{ borderColor: '#5e03fc' }}>
        <CloudUpload />
        <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
      </label>

    </div>
  )
}