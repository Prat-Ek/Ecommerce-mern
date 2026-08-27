import Link from "next/link";


export default async function CategorySection() {
  const resposne = await fetch(
    "https://dummyjson.com/products/categories",
  );
  const categories = await resposne.json();
  //const sixCategories = categories.slice(0, 6);

  return (
    <section className="mt-6 px-4 md:px-8" aria-labelledby="category-heading">
      <div className="max-w-7xl mx-auto">
        <h2
          id="category-heading"
          className="text-2xl font-bold text-slate-900 mb-8"
        >
          All Categories
        </h2>

        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
          {categories.map(
            (category: {
              slug: string;
              name: string;
            }) => (
              <li key={category.slug}>
                <Link
                  href={"/category/" + category.slug}
                  className="block bg-gray-50 p-3 rounded-md border border-slate-300 shadow-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all hover:shadow-md"
                >
                  <div className="aspect-square rounded-full overflow-hidden mx-auto">
                    <img
                      src={""}
                      alt={category.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-slate-900 text-sm font-semibold">
                      {category.name}
                    </h3>
                    {/* <p className="text-xs mt-1 text-slate-600">
                      {category.discountPercentage}
                    </p> */}
                  </div>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
