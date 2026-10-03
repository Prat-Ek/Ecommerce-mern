import { AdminListPageHeading } from "@/components/ui/table/AdminListPageHeading";
import ListAllUsers from "@/components/user/UserList";



export default function UserList() {
  return (
   <section className="flex flex-col w-full gap-5">
    <AdminListPageHeading pageTitle="User Listing"/>
    <ListAllUsers/>
   </section>
  )
}
