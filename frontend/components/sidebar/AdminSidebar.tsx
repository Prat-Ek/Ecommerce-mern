import Link from 'next/link'
import React from 'react'
import { IAdminMenuFeature } from './IAdminMenuFeature'
import { Icon } from '@iconify/react';
import { SingleMenuItem } from './SingleMenuItem';

const adminFeatures: Array<IAdminMenuFeature> = [
  {
    icon: <Icon icon={"hugeicons:home-07"} />,
    label: "Dashboard",
    url: "/admin",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:image-01"} />,
    label: "Banner",
    url: "/admin/banners",
    children: null,
  },
  {
    icon: <Icon icon={"wordpress:category"} />,
    label: "Categories",
    url: "/admin/categories",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:home-07"} />,
    label: "Brands",
    url: "/admin/brands",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:brandfetch"} />,
    label: "Users",
    url: "/admin/users",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:shopping-bag-02"} />,
    label: "Products",
    url: "/admin/products",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:shopping-cart-01"} />,
    label: "Orders",
    url: "/admin/orders",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:coins-dollar"} />,
    label: "Invoices",
    url: "/admin/invoices",
    children: null,
  },
  {
    icon: (
      <Icon
        icon={"material-symbols-light:featured-seasonal-and-gifts-rounded"}
        // icon={"hugeicons:gift-icons"}
      />
    ),
    label: "Offers",
    url: "/admin/offers",
    children: null,
  },
  {
    icon: <Icon icon={"hugeicons:files-02"} />,
    label: "Pages",
    url: "/admin/pages",
    children: null,
  },
];

export default function AdminSidebar() {
  return (
    <>
   <aside className="hidden lg:block lg:w-1/5 bg-gray-200 p-7">
        <ul className="w-full min-h-screen">
          {adminFeatures &&
            adminFeatures.map((row: IAdminMenuFeature) => (
              <SingleMenuItem row={row} key={row.label} />
            ))}
        </ul>
        <li className="w-full sticky bottom-0 bg-white rounded-md p-3 my-3 flex gap-3 items-center">
         
          <button  >{"Logout"}</button>
        </li>
      </aside></>
  )
}
