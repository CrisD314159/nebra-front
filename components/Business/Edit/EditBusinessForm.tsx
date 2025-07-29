'use client'

import { useEffect, useState, startTransition, useActionState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxMap from '@/components/Maps/MapboxMap';
import toast from 'react-hot-toast';
import BusinessImagesUploader from '@/components/ImageInputs/BusinessImagesInput';
import { UpdateBusiness } from '@/lib/serverActions/BusinessActions/BusinessActions';
import { BusinessInfo, ImageInfo } from '@/lib/types/types';

const categories = [
  'RESTAURANT', 'CAFETERIA', 'MUSEUM', 'HOTEL', 'BAR'
]

interface EditBusinessFormProps {
  handleClose: () => void
  initialBusiness: BusinessInfo
}

export default function EditBusinessForm({ handleClose, initialBusiness }: EditBusinessFormProps) {
  const [state, action, pending] = useActionState(UpdateBusiness, undefined)
  const [images, setImages] = useState<File[] | null>(null)
  const [currentImages, setCurrentImages] = useState<ImageInfo[]>(initialBusiness.images)
  const [latitude, setLatitude] = useState<number>(initialBusiness.latitude)
  const [longitude, setLongitude] = useState<number>(initialBusiness.longitude)

  const handleMapChange = (lat: number, long: number) => {
    setLatitude(lat)
    setLongitude(long)
  }

  const handleImageRemoval = (imageUrl: string) =>{
    const newArray = currentImages.filter((img) => img.link != imageUrl)
    setCurrentImages(newArray)
  }

  useEffect(() => {
    if (state?.success === false) {
      toast.error(state.message)
    }
    if (state?.success === true) {
      toast.success(state.message)
      handleClose()
    }
  }, [state, handleClose])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("id", initialBusiness.id)
    formData.append("latitude", latitude.toString())
    formData.append("longitude", longitude.toString())

    const currentImagesIds = currentImages.map(img => img.id)

    currentImagesIds.forEach((img)=>{
      formData.append('currentImages', img )
    })

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image)
      })
    }

    startTransition(() => {
      action(formData)
    })
  }

  return (
    <div className='max-w-xl mx-auto p-6'>
        <h2 className="text-2xl font-bold text-center mb-2">Edit Business</h2>
        <BusinessImagesUploader 
        setFormImageFiles={setImages}
        initialUrls={initialBusiness.images.map(img => img.link)}
        removeImageMethodFromEdit={handleImageRemoval}
        />
      <form onSubmit={handleSubmit} className="space-y-4">


        <div className="flex flex-col">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            defaultValue={initialBusiness.name}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            defaultValue={initialBusiness.description}
            rows={3}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="label font-semibold">Phone Contact</label>
          <input
            type="tel"
            name="phoneContact"
            className="input input-bordered w-full"
            defaultValue={initialBusiness.phoneContact}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            defaultValue={initialBusiness.category}
            required
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <MapboxMap
          initialLat={latitude}
          initialLng={longitude}
          onSelectLocation={handleMapChange}
          editable
        />

        <button type="submit" disabled={pending} className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>

      <button onClick={handleClose} className="btn btn-error w-full mt-4">
        Cancel
      </button>
    </div>
  )
}