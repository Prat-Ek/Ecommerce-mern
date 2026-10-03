"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/services/apiclient";
import Cookies from "js-cookie";
import { IBannerDetail } from "./BannerListComponent";
import BannerFromComponent, { IBannerData } from "./BannerFormComponent";
import axiosClient from "@/lib/services/apiclient";

export default function BannerEditComponent() {
  const [detail, setDetail] = useState<IBannerDetail>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
  const getBannerDetail = async () => {
    try {
      const response = await axiosClient.get(
        "/banners/" + params.bannerId,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("auAc_59"),
          },
        }
      );

      setDetail(response.data);
    } catch {
      toast.error("Error while loading banner");
      router.push("/admin/banners");
    } finally {
      setLoading(false);
    }
  };

  getBannerDetail();
}, [params.bannerId, router]);

  const submitEvent = async (data: IBannerData) => {
    try {
      await axiosClient.put(`/banners/${params.bannerId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + Cookies.get("auAc_59"),
        },
      });
      toast.success("Banner Updated Successfully");
      // router.push('/admin/banner')
    } catch (excpetion) {
      console.log(excpetion);
      toast.error("Error updating banner");
      // router.push("/admin/banner")
    } finally {
      router.push("/admin/banners");
    }
  };

  return loading ? (
    <>Loading...</>
  ) : (
    <BannerFromComponent submitEvent={submitEvent} detail={detail} />
  );
}
