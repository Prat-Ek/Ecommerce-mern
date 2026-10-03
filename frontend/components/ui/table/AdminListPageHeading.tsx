import Link from "next/link"
import { ReactNode } from "react"

type AdminListPageHeadingProps = {
  pageTitle:string, 
  url?: string | null,
  linkText?: ReactNode | null
}

export const AdminListPageHeading =({pageTitle, url=null, linkText=null}: Readonly<AdminListPageHeadingProps>) => {
  return (<div className="flex justify-between items-center">
    
    <h1 className="text-3xl font-semibold text-teal-900 text-shadow-lg">
      {pageTitle}
    </h1>
    
    {
      url && linkText ? <Link href={url} className="flex items-center justify-center p-2 bg-teal-900 text-white text-center  font-semibold rounded-full px-5">
        {linkText}
      </Link> : <></>
    }
  </div>)
}