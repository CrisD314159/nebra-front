import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nebra',
    short_name: 'Nebra',
    description: '',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    orientation:'portrait',
    
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}