'use client'
import React, { useEffect } from 'react'
import AdminHeader from '../Headers/AdminHeader'
import AdminSidebar from '../sidebar/AdminSidebar'
import { useAuth } from '@/lib/hook/useAuth'
import { useRouter } from 'next/navigation'

export default function AdminLayout({children}: {children: React.ReactNode}) {
  // const router  = useRouter()
  // const {loggedInUser}= useAuth()

  
  // if (loggedInUser){
  return (
     <section className="w-full h-screen flex flex-col">
        <AdminHeader />

        <section className="flex w-full h-full">
          <AdminSidebar />

          <section className="w-full m-5 rounded-md overflow-y-scroll bg-gray-100 p-5 ">
            {children}
          </section>
        </section>

        <footer className="w-full bg-gray-100 flex p-3 items-center justify-center">
          &copy; PRATIK ADHIKARI
        </footer>
      </section>
  )
//}
// else {
// useEffect(()=>{
//   return router.push("/login")
// },[])
// }
}