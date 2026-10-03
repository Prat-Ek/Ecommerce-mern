
import BannerCreateComponent from '@/components/hero/BannerCreateComponent'
import { AdminListPageHeading } from '@/components/ui/table/AdminListPageHeading'


export default function BannerCreate() {
  return (
   <div className='flex flex-col w-full gap-5'>
     <AdminListPageHeading pageTitle='Banner Create'/>
     <BannerCreateComponent />
   </div>
  )
}
