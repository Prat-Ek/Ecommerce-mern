import Link from "next/link";


const categories = [
   {
      id: 1,
      title: "Smart Phones",
       slug: "smartphones",
      offer: "Up to 40% off",
      img: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
      alt: "Ethnic Collection clothing",
   },
   {
      id: 2,
      title: "Festive Styles",
       slug: "festive-styles",
      offer: "Fresh looks",
      img: "https://readymadeui.com/images/fashion-img-2.webp",
      alt: "Festive Styles outfits",
   },
   {
      id: 3,
      title: "Casual Wear",
       slug: "casual-wear",
      offer: "Up to 30% off",
      img: "https://readymadeui.com/images/fashion-img-7.webp",
      alt: "Casual Wear",
   },
   {
      id: 4,
      title: "Streetwear",
       slug: "streetwear",
      offer: "Exclusive styles",
      img: "https://readymadeui.com/images/fashion-img-4.webp",
      alt: "Streetwear collection",
   },
   {
      id: 5,
      title: "Winter Essentials",
       slug: "winter-essentials",
      offer: "Top picks for less",
      img: "https://readymadeui.com/images/fashion-img-5.webp",
      alt: "Winter Essentials",
   },
   {
      id: 6,
      title: "Summer Collection",
       slug: "summer-collection",
      offer: "Shop & save 40%",
      img: "https://readymadeui.com/images/fashion-img-6.webp",
      alt: "Summer Collection",
   }
];


export default function CategorySection() {

   return (
      <section className="mt-6 px-4 md:px-8" aria-labelledby="category-heading">
         <div className="max-w-7xl mx-auto">
            <h2
               id="category-heading"
               className="text-2xl font-bold text-slate-900 mb-8"
            >
               Top Categories
            </h2>

            <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
               {categories.map((category) => (
                  <li key={category.id}>
                     <Link
                        href={"/category/" + category.slug}
                        className="block bg-gray-50 p-3 rounded-md border border-slate-300 shadow-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all hover:shadow-md"
                     >
                        <div className="aspect-square rounded-full overflow-hidden mx-auto">
                           <img
                              src={category.img}
                              alt={category.alt}
                              className="h-full w-full object-cover object-top"
                           />
                        </div>

                        <div className="mt-4 text-center">
                           <h3 className="text-slate-900 text-sm font-semibold">
                              {category.title}
                           </h3>
                           <p className="text-xs mt-1 text-slate-600">
                              {category.offer}
                           </p>
                        </div>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
};