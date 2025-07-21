'use client'

import { GetNearBusiness } from "@/lib/serverActions/BusinessActions/BusinessActions"
import { BusinessInfo } from "@/lib/types/types"
import { useEffect, useState } from "react"
import useSWR from "swr"
import BusinessList from "../Business/BusinessList"

export default function HomePageComponent() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const { data, error, isLoading, mutate } = useSWR<BusinessInfo[]>('homeBusiness', () => GetNearBusiness(latitude, longitude))

const exampleBusinesses: BusinessInfo[] = [
  {
    id: "1",
    name: "Panadería La Espiga",
    description: "Deliciosos panes artesanales y pasteles frescos cada mañana.",
    images: [
      {
        id: '1',
        link: 'https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w='
      }
    ],
    category: "Panadería",
    averageScore: 2,
    latitude: 0,
    longitude: 0,
    phoneContact: "555-0001",
    businessCategory: "Panadería",
    scheduleList: [],
    ownerId: "owner-1",
    ownerName: "pepe",
    businessState: "active"
  },
  {
    id: "2",
    name: "Librería El Saber",
    description: "Encuentra los mejores libros y material de estudio en un solo lugar.",
    images: [
      {
        id: '1',
        link: 'https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w='
      }
    ],
    category: "Librería",
    averageScore: 4,
    latitude: 0,
    longitude: 0,
    phoneContact: "555-0002",
    businessCategory: "Librería",
    scheduleList: [],
    ownerId: "owner-2",
    ownerName: "ana",
    businessState: "active"
  },
  {
    id: "3",
    name: "Restaurante El Buen Sabor",
    description: "Comida casera con el mejor sazón de la ciudad.",
    images: [
      {
        id: '1',
        link: 'https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w='
      }
    ],
    category: "Restaurante",
    averageScore: 4,
    latitude: 0,
    longitude: 0,
    phoneContact: "555-0003",
    businessCategory: "Restaurante",
    scheduleList: [],
    ownerId: "owner-3",
    ownerName: "juan",
    businessState: "active"
  },
  {
    id: "4",
    name: "Floristería Rosas y Tulipanes",
    description: "Arreglos florales para toda ocasión y entrega a domicilio.",
    images: [
      {
        id: '1',
        link: 'https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w='
      }
    ],
    category: "Floristería",
    averageScore: 2,
    latitude: 0,
    longitude: 0,
    phoneContact: "555-0004",
    businessCategory: "Floristería",
    scheduleList: [],
    ownerId: "owner-4",
    ownerName: "maría",
    businessState:"active"
  },
];



  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        mutate()

      },
      (error) =>{
        console.error("Could not get the exact user position", error)
      }
    )
  }, [mutate])

  return (
    <div className="h-screen w-full">
      <div className="w-full">
        <h1 className="text-3xl font-bold p-9">
          Suggested Businesses
        </h1>        
      </div>

              {/* {isLoading
         && (
          <span className="loading loading-xl loading-spinner text-primary"></span>
         )
        }

        {
          error &&
          <p className="text-center">{error.message}</p>
        } */}

    
          <BusinessList initialBusiness={exampleBusinesses}/>
    </div>
  )
  
}