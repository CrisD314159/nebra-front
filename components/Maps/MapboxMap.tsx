'use client'

import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

interface MapProps {
  initialLat: number
  initialLng: number
  onSelectLocation: (lat: number, lng: number) => void
  editable:boolean
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN 

export default function MapboxMap({ initialLat, initialLng, onSelectLocation, editable }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialLng, initialLat],
      zoom: 13,
    })

    // Agregar marcador inicial
    markerRef.current = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([initialLng, initialLat])
      .addTo(mapInstance.current)

    if(editable){
      mapInstance.current.on('click', (e) => {
        const { lng, lat } = e.lngLat
        markerRef.current?.setLngLat([lng, lat])
        onSelectLocation(lat, lng)
      })
    }

    return () => {
      mapInstance.current?.remove()
    }
  }, [editable])

  return (
    <div className="h-64 w-full rounded-md border" ref={mapContainer} />
  )
}