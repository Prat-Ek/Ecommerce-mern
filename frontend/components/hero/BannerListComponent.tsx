'use client';


import Link from "next/link";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Image from "next/image";
import RowSkeleton from "../ui/table/Skeleton";
import { Icon } from "@iconify/react";
import axiosClient from "@/lib/services/apiclient";
import AdminPageSearchForm from "../ui/table/AdminPageSearchForm";
import { IPaginationType } from "@/lib/types/GlobalType";


export interface IBannerDetail {
  image: {
    url: string;
  };

  links: {
    label: string;
    link: string;
  }[];

  status: "active" | "inactive";

  subTitle: string;
  title: string;
  _id: string;
}

export const BannerListComponent = () => {
  const [banners, setBanners]  = useState<Array<IBannerDetail>>();
  const [loading, setLoading] = useState<boolean>(true)
  const [pagination, setPagination]= useState<IPaginationType>({
    limit:15,
    page:1,
    total:0,
    totalPages:1
  })

  const getBannerList = async (page:number=1, limit=15, search='') => {
    try {
      const token = Cookies.get("auAc_59")

      const response = await axiosClient.get("/banners", {
        headers: {
          "Authorization": "Bearer "+token
        },
        params: {
          page: page, limit: limit, search:search
        }
      }) as {data: Array<IBannerDetail>, meta:{pagination:IPaginationType}}
      console.log(response.data);
      setBanners(response.data)
      setPagination(response.meta.pagination)
    } catch {
      toast.error("Error fetching Banner Detail")
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   return () => {
  //     getBannerList(pagination.page, pagination.limit, '')
  //   }
  // }, [])
  useEffect(() => {
    getBannerList(pagination.page, pagination.limit, '')
  }, [])
  const handleDeleteRequest = async(rowId:string)=>{
    try{
      const confirmed = confirm("Are you sure you want delete?")
      if (confirmed){
        setLoading(true)
          await axiosClient.delete('/banners/'+rowId,{
            headers:{
              "Authorization": "Bearer " + Cookies.get("auth_59")
            }
          })
          toast.success("Banner deleted Successfuly")
          await getBannerList()
      }

    } catch(exception){
      console.log (exception)
      toast.error("Sorry! Banner  could not be deleted")
    } finally{
      setLoading(false)
    }

  }

  return (

    <>
     <AdminPageSearchForm loadData={getBannerList}/>
    <div className="flex flex-col gap-5">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Title
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Subtitle
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Link
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Image
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Status
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
             <RowSkeleton cols={6}/>
            </>
          ) : (
            <>
              {banners && banners.length? banners.map((row: IBannerDetail, index: number) => (
                  <tr key={index}>
                    <td className="p-3 border border-gray-800">{row.title}</td>
                    <td className="p-3 border border-gray-800">
                      {row.subTitle}
                    </td>
                    <td className="p-3 border border-gray-800">
                      <div className="flex gap-2">
                        {row.links &&
                          row.links.map((link) => (
                            <a
                            key={link.label}
                              href={link.link}
                              className="bg-blue-500 text-white p-2 rounded-full px-5"
                              target="_banner"
                            >
                              {link.label}
                            </a>
                          ))}
                      </div>
                    </td>
                    <td className="p-3 border border-gray-800">
                      <Image
                        src={row.image.url}
                        width={100}
                        height={50}
                        className="aspect-2/1"
                        alt="banner Image"
                        crossOrigin="anonymous"
                      />
                      {/* <img crossOrigin="" src={row.image.url} className="w-25"/> */}
                    </td>
                    <td className="p-3 border border-gray-800">
                      <span
                        className={`${row.status === "active" ? "bg-teal-100 text-teal-800" : "bg-red-100 text-red-800"} text-lg p-2 rounded-full w-full px-5`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-800 ">
  <div className="flex items-center gap-2">
    <Link
      href={`/admin/banners/${row._id}`}
      className="bg-teal-800 text-white text-sm px-4 py-2 rounded-full hover:bg-teal-900 transition-all duration-200"
    >
      Edit
    </Link>

    <Link
      href={`/admin/banners/${row._id}`}
      onClick={(e) => {
        e.preventDefault();
        handleDeleteRequest(row._id);
      }}
      className="bg-red-800 text-white text-sm p-2 rounded-full hover:bg-red-900 transition-all duration-200 flex items-center justify-center"
    >
      <Icon className="size-5" icon="line-md:trash" />
    </Link>
  </div>
</td>
                  </tr>
                )): <tr>
                  <td className="text-center p-2 border border-gray-800" colSpan={6}>
                    "Data not Found"
                  </td>
                </tr>
                }
            </>
          )}
        </tbody>
      </table>

     {
      banners && banners.length ? <>
       <div className="flex w-full justify-end">
        <ul className="flex gap-3">
          {
            pagination.totalPages && pagination.totalPages>1 ?(
              [...Array(pagination.totalPages)].map((_,index:number)=>(
                  <li
                  key={index}
                  onClick={(e:BaseSyntheticEvent)=>{
                    getBannerList(index+1)
                  }}
                  className={`${pagination.page === (index+1)? "text-gray-900  bg-white" :" bg-gray-400 text-gray-900" }  font-bold size-7 text-sm flex items-center justify-center shadow-xl border border-gray-300 rounded-full`}>
            <Link href={"/admin/banners"}>{index+1}</Link>
          </li>
              ))
            ):<></>
          }
        
          
        </ul>
      </div>
      </>: <></>
     }
    </div>
  </>
  );
}