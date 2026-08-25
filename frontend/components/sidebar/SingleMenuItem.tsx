import Link from "next/link";
import { IAdminMenuFeature } from "./IAdminMenuFeature";


export const SingleMenuItem = ({row}: Readonly<{row: IAdminMenuFeature}>) => {
  return (
    <>
      <li
        className="w-full bg-white rounded-md p-3 my-3 flex gap-3 items-center"
        key={row.label}
      >
        {row.icon}
        <Link href={row.url}>{row.label}</Link>
      </li>
    </>
  );
}