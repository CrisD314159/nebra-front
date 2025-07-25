'use client'
import { ChangeEvent, useState, useCallback, useEffect } from "react"
import { CloudUpload, X, Plus } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"

interface MultipleImageUploadProps {
  setFormImageFiles: (files: File[]) => void
  initialUrls?: string[]
  maxImages?: number
  maxFileSize?: number // in MB
}

export default function BusinessImagesUploader({ 
  setFormImageFiles, 
  initialUrls = [], 
  maxImages = 5,
  maxFileSize = 5 
}: MultipleImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<string[]>(initialUrls)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Cleanup object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      previewImages.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [])

  const validateFile = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return `${file.name} is not a valid file type`
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      return `${file.name} reaches the maximum file size: ${maxFileSize}MB`
    }

    return null
  }, [maxFileSize])

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setIsLoading(true)
    const fileArray = Array.from(files)
    const validFiles: File[] = []
    const newPreviewUrls: string[] = []
    const errors: string[] = []

    // Check if adding these files would exceed the maximum
    if (selectedFiles.length + fileArray.length > maxImages) {
      toast.error(`You can upload only ${maxImages} images`)
      setIsLoading(false)
      return
    }

    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
        continue
      }

      validFiles.push(file)
      newPreviewUrls.push(URL.createObjectURL(file))
    }

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
    }

    if (validFiles.length === 0) {
      setIsLoading(false)
      return
    }

    const updatedFiles = [...selectedFiles, ...validFiles]
    const updatedPreviews = [...previewImages, ...newPreviewUrls]

    setSelectedFiles(updatedFiles)
    setPreviewImages(updatedPreviews)
    setFormImageFiles(updatedFiles)

    toast.success(`${validFiles.length} image added`)
    setIsLoading(false)
  }, [selectedFiles, previewImages, maxImages, validateFile, setFormImageFiles])

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    processFiles(e.target.files)
    // Reset input value to allow selecting the same files again
    e.target.value = ''
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFiles(files)
    }
  }, [processFiles])

  const removeImage = useCallback((index: number) => {
    const imageToRemove = previewImages[index]
    
    // Revoke object URL if it's a blob
    if (imageToRemove && imageToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove)
    }

    const updatedFiles = selectedFiles.filter((_, i) => i !== index)
    const updatedPreviews = previewImages.filter((_, i) => i !== index)

    setSelectedFiles(updatedFiles)
    setPreviewImages(updatedPreviews)
    setFormImageFiles(updatedFiles)
  }, [selectedFiles, previewImages, setFormImageFiles])

  const canAddMore = selectedFiles.length < maxImages

  return (
    <div className="flex flex-col  items-center justify-center w-full space-y-4">
      {/* Image Previews */}
      <div className="w-full max-w-4xl">
        {previewImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative group">
                <div className="relative w-full aspect-square rounded overflow-hidden border border-[#5e03fc] shadow-lg">
                  <Image 
                    src={src} 
                    alt={`Preview ${idx + 1}`} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105" 
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute z-[99] right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-opacity shadow-lg"
                    aria-label={`Delete image ${idx + 1}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add More Button */}
            {canAddMore && (
              <label 
                htmlFor="multi-image-upload" 
                className="flex flex-col items-center justify-center w-full aspect-square rounded-lg cursor-pointer border-2 border-dashed border-[#5e03fc] hover:bg-[#5e03fc]/10 transition-colors"
              >
                <Plus size={24} className="text-[#5e03fc] mb-2" />
                <span className="text-sm text-[#5e03fc] text-center">Add More</span>
              </label>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <CloudUpload size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No hay imágenes seleccionadas</p>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full max-w-md border-2 border-dashed rounded-lg p-5 transition-all ${
          isDragOver 
            ? 'border-[#5e03fc] bg-[#5e03fc]/10' 
            : 'border-gray-300 hover:border-[#5e03fc]'
        } ${!canAddMore ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label 
          htmlFor="multi-image-upload" 
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <CloudUpload size={32} className="text-[#5e03fc] mb-4" />
          <p className="text-center text-sm text-gray-600 mb-2">
            {isDragOver ? 'Drag images here' : 'Drag images here or click this box to upload images'}
          </p>
          <p className="text-xs text-gray-500">
            Maximum {maxImages} images, {maxFileSize}MB each
          </p>
          {selectedFiles.length > 0 && (
            <p className="text-xs text-[#5e03fc] mt-2">
              {selectedFiles.length} of {maxImages} selected images
            </p>
          )}
        </label>
        
        <input 
          id="multi-image-upload" 
          type="file" 
          multiple 
          accept="image/*" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          onChange={handleFileInput}
          disabled={!canAddMore || isLoading}
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5e03fc]"></div>
          </div>
        )}
      </div>
    </div>
  )
}