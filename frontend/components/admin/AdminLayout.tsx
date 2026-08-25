import React from 'react'
import AdminHeader from '../Headers/AdminHeader'
import AdminSidebar from '../sidebar/AdminSidebar'

export default function AdminLayout({children}: {children: React.ReactNode}) {
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
}
