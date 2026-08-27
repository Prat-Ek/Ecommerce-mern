
import Link from "next/link";
export type HomeProductListProps = {
  limit?: number;
  pageTitle:string;
};
export default async function HomeProductList({
  pageTitle,
  limit ,
}: HomeProductListProps) {
  // dataa fetch
  const resposne = await fetch("https://dummyjson.com/products?limit=42");
  const productList = await resposne.json();
  const latestProducts =productList.products
  .sort((a:any, b:any) => b.id - a.id)
  .slice(0, limit);

  return (
    <>
      <section className="mt-6 px-4 md:px-8" aria-labelledby="products-heading">
        <div className="mx-10 w-full">
          <div className="border-b border-slate-300 pb-6 mb-8 md:mb-12">
            <h2
              id="products-heading"
              className="text-2xl font-bold text-slate-900"
            >
             {pageTitle}
            </h2>
            <p className="text-base text-slate-600 mt-4">
              Explore the most popular and high-performance laptops available
              right now.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8">
            {latestProducts &&
  latestProducts.map(
    (prod: {
      id: number;
      thumbnail: string;
      title: string;
      price: number;
      rating: number;
      reviews: Array<Record<string, string>>;
    }) => (
      <li
        key={prod.id}
        className="bg-gray-50 transition-all duration-300 relative rounded-md hover:shadow-lg"
      >
        <Link
          href={`/products/${prod.id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          <div className="w-full aspect-8/6 p-4 pb-0">
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="w-full h-full object-contain object-bottom"
            />
          </div>

          <div className="p-6">
            <hr className="border-slate-300 mb-6" />

            <div>
              <h3 className="text-base text-slate-900 font-semibold leading-relaxed">
                {prod.title}
              </h3>

              <p className="text-base text-slate-600 font-semibold mt-4">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(prod.price)}
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-3 mt-6">
              <div
                className="flex justify-center gap-2"
                role="img"
                aria-label={`Rated ${prod.rating} out of 5 stars`}
              >
                {[1, 2, 3, 4, 5].map((rate) => (
                  <svg
                    key={rate}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-4 ${
                      Math.ceil(prod.rating) >= rate
                        ? "fill-[#ffc107]"
                        : "fill-[#CED5D8]"
                    }`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm font-medium text-slate-600">
                ({prod.reviews.length})
              </p>
            </div>
          </div>
        </Link>
      </li>
    )
  )}

          </ul>
        </div>
      </section>
    </>
  );
}
