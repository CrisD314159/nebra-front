import AuthInitializer from "@/components/Auth/AuthInitializer";


export default function DashboardLayout({children}:Readonly<{children:React.ReactNode}>){
  return (
    <div className="h-full w-full">
      <AuthInitializer/>
      {children}
    </div>
    
  )

}