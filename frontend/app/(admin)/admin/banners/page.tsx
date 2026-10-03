


import { BannerListComponent } from "@/components/hero/BannerListComponent"
import { AdminListPageHeading } from "@/components/ui/table/AdminListPageHeading"
import { Metadata } from "next"

export const metadata:Metadata={
    title:"Banner List",
    description:"This is the banner listing page"
}

export default function AdminBannerList() {
  return (
    <section className="flex flex-col w-full gap-5">
    <AdminListPageHeading pageTitle="Banner Listing" url={'/admin/banners/create'} linkText={'Add Banner'}/>
   
    <BannerListComponent/>
    </section>
  )
}
