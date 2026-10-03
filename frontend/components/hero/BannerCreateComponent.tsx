'use client'

import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/services/apiclient";
import BannerFromComponent, { IBannerData } from "./BannerFormComponent";




export default function BannerCreateComponent() {
    const router = useRouter();
    const submitEvent = async (data: IBannerData) => {
    try {
      await axiosClient.post("/banners", data, {
        headers: {
          Authorization: "Bearer " + Cookies.get("auAc_59"),
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Banner Created successfully")
      router.push("/admin/banners")
    } catch(excpetion) {
      console.log(excpetion)
    }
  };
  return (
   <>
   <BannerFromComponent submitEvent={submitEvent}/>
   </>
  )
}
