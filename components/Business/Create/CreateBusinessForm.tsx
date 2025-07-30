'use client'

import { CreateBusiness } from '@/lib/serverActions/BusinessActions/BusinessActions'
import { startTransition, useActionState, useEffect, useState, } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxMap from '@/components/Maps/MapboxMap';
import toast from 'react-hot-toast';
import BusinessImagesUploader from '@/components/ImageInputs/BusinessImagesInput';

const categories = [
  'RESTAURANT', 'CAFETERIA', 'MUSEUM', 'HOTEL', 'BAR'
] // Puedes sincronizar esto con tu backend

interface CreateBusinessFormProps {
  handleClose: () => void
}

export default function CreateBusinessForm({handleClose}:CreateBusinessFormProps) {

  const [state, action, pending] = useActionState(CreateBusiness, undefined)
  const [images, setImages] = useState<File[] | null> (null)
  const [latitude, setLatitude] = useState<number>(6.230833)
  const [longitude, setLongitude] = useState<number>(-75.590553)

  const handleMapChange = (lat:number, long:number) => {
    setLatitude(lat)
    setLongitude(long)
  }

  useEffect(()=>{
    if(state?.success === false){
      toast.error(state.message)
    }
    if(state?.success === true){
      toast.success(state.message)
      handleClose()
    }

  },[state])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)

    formdata.append("latitude", latitude.toString());
    formdata.append("longitude", longitude.toString());
    if(images && images.length > 0) {
      images.forEach((image) => {
        formdata.append("images", image);
      });
    }

    console.log("Started transition");
    startTransition(()=>{
      action(formdata)
    })
  }


  return ( 
    <div className='max-w-xl mx-auto p-6'>
        <h2 className="text-2xl font-bold text-center mb-2">New Business</h2>

        <BusinessImagesUploader setFormImageFiles={setImages}/>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">


        <div className="flex flex-col">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
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
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="label font-semibold">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>


        <MapboxMap initialLat={latitude} initialLng={longitude} onSelectLocation={handleMapChange} editable/>

        <button type="submit" disabled={pending} className="btn btn-primary w-full">Create Business</button>
      </form>
        <button onClick={handleClose} className="btn btn-error w-full mt-4">Cancel</button>
    </div>
  )
}