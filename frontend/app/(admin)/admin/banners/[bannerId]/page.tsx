import BannerEditComponent from '@/components/hero/BannerEditComponent'
import { AdminListPageHeading } from '@/components/ui/table/AdminListPageHeading'
import React from 'react'

export default function EditBanner() {
  return (
   <>
   <div>
    <AdminListPageHeading pageTitle='Banner Update'/>
    <BannerEditComponent/>
   </div>
   </>
  )
}
