import { ChevronLeft, ChevronRight } from "lucide-react";
import HomeProductList from "./HomeProduct";


export default function page() {
  return (
 <>
   <HomeProductList pageTitle="All Products"/>
   <div className="flex items-center justify-center gap-2 m-10">
    <button type="button" aria-label="Previous" className="mr-4">
         <ChevronLeft />
    </button>

    <div className="flex gap-2 text-gray-500 text-sm md:text-base">
        <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">1</button>
        <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-indigo-500 text-white rounded-md transition-all">2</button>
        <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">3</button>
        <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">4</button>
        <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">5</button>
        <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">6</button>
    </div>

    <button type="button" aria-label="Next" className="ml-4">
         <ChevronRight />
    </button>
</div>
 </>
  )
}
