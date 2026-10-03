'use client'
import { toast } from 'sonner'
import AdminPageSearchForm from '../ui/table/AdminPageSearchForm'
import axiosClient from '@/lib/services/apiclient'
import Cookies from 'js-cookie'
import { BaseSyntheticEvent, useState } from 'react'
import Skeleton from '../ui/table/Skeleton'
import { IUserDetail } from '@/lib/types/AuthTypes'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { IPaginationType } from '@/lib/types/GlobalType'


export default function ListAllUsers() {
    const [loading, setLoading]= useState<boolean>(true)
    const [users, setUsers]= useState<Array<IUserDetail>>()
    const [pagination, setPagination]= useState<IPaginationType>({
        limit:20,
        page:1,
        total:0,
        totalPages:1
    })
    const getUserList=async(page:number=1,limit:number=20,search:string='')=>{
        try {
            const response= await axiosClient.get ("/user",{
                headers:{
                    "Authorization":"Bearer "+Cookies.get('auAc_59')
                },
                params:{
                    page,limit,search
                }
            })as {data:Array<IUserDetail>,meta:{pagination:IPaginationType}}
            setUsers(response.data)
            setPagination(response.meta.pagination)
            
        } catch  {
            toast.error ("error fetching the user list")
        }finally{
            setLoading(false)
        }
    }
    const handleDeleteRequest=async(id:string)=>{

    }
  return (
  <>
  <AdminPageSearchForm loadData={getUserList}/>

   <div className="flex flex-col gap-5">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Name
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Email
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
             Role
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Phone Number
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
             Image
            </th>
            <th className="bg-gray-900 text-white font-semibold text-lg border border-gray-500 p-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
             <Skeleton cols={6}/>
            </>
          ) : (
            <>
              {users && users.length? users.map((row: IUserDetail, index: number) => (
                  <tr key={index}>
                    <td className="p-3 border border-gray-800">{`${row.firstName} ${row.lastName}`}</td>
                    <td className="p-3 border border-gray-800">
                      {row.email}
                    </td>
                    <td className="p-3 border border-gray-800">
                      {row.role}
                    </td>
                    <td className="p-3 border border-gray-800">
                     {row.phone}
                      {/* <img crossOrigin="" src={row.image.url} className="w-25"/> */}
                    </td>
                    <td className="p-3 border border-gray-800">
                       {/* <Image
                        src={row.image.url}
                        width={100}
                        height={50}
                        className="aspect-2/1"
                        alt="users Image"
                        crossOrigin="anonymous"
                      /> */}
                    </td>
                    <td className="p-3 border border-gray-800 ">
  <div className="flex items-center gap-2">
    {/* <Link
      href={`/admin/users/${row._id}`}
      className="bg-teal-800 text-white text-sm px-4 py-2 rounded-full hover:bg-teal-900 transition-all duration-200"
    >
      Edit
    </Link>

    <Link
      href={`/admin/users/${row._id}`}
      onClick={(e) => {
        e.preventDefault();
        handleDeleteRequest(`{row.id}`);
      }}
      className="bg-red-800 text-white text-sm p-2 rounded-full hover:bg-red-900 transition-all duration-200 flex items-center justify-center"
    >
      <Icon className="size-5" icon="line-md:trash" />
    </Link> */}
    <Link href={'/admin/users/'+ row.username}
          className="bg-teal-800 text-white text-sm px-4 py-2 rounded-full hover:bg-teal-900 transition-all duration-200">
            <Icon className="size-5" icon={"hugeicons:message-01"}/>
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
      users && users.length ? <>
       <div className="flex w-full justify-end">
        <ul className="flex gap-3">
          {
            pagination.totalPages && pagination.totalPages>1 ?(
              [...Array(pagination.totalPages)].map((_,index:number)=>(
                  <li
                  key={index}
                  onClick={(e:BaseSyntheticEvent)=>{
                    getUserList(index+1)
                  }}
                  className={`${pagination.page === (index+1)? "text-gray-900  bg-white" :" bg-gray-400 text-gray-900" }  font-bold size-7 text-sm flex items-center justify-center shadow-xl border border-gray-300 rounded-full`}>
            <Link href={"/admin/users"}>{index+1}</Link>
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
  )
}
