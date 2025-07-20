

export default function DashboardLayout({children}:Readonly<{children:React.ReactNode}>){
  return (
    <div className="max-h-screen max-w-screen">
      {children}
    </div>
    
  )

}