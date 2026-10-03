'use client'
import { BaseSyntheticEvent, useEffect, useState } from "react"

interface IAdminPageSearchProps {
 loadData:( page?:number,
  limit?:number,search?:string) =>Promise<void>

}

const AdminPageSearchForm = ({loadData}:Readonly<IAdminPageSearchProps>) => {
  const [search, setSearch]= useState<string | null>(null)
const handleSearchRequest =(e:BaseSyntheticEvent)=>{
          setSearch(e.target.value)
}
 // debounce 
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(1, 15, search as string)
    },500)
    return () => {
      clearTimeout(timer);
    }
  }, [search])
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
    }}
     action="" className="flex w-full justify-end">
        <input type="search" name="q" 
        onChange={handleSearchRequest}
        placeholder="Enter your keyword "
        className="w-1/2 border border-gray-300 p-2 bg-white rounded-full px-3 shadow-lg" />
    </form>
  )
}

export default AdminPageSearchForm