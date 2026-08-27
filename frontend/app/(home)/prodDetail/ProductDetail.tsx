import React, { useState } from 'react';
  // Product Data Mapping
  const product = {
    title: "Women Embroidered A-line Kurta",
    description: "Women Embroidered Georgette A-line Kurta With Attached Dupatta (Maroon)",
    price: 12,
    originalPrice: 16,
    rating: 4.0,
    totalRatings: 76,
    totalReviews: 50,
    images: [
      { id: 1, src: "https://readymadeui.com/images/fashion-img-1.webp", alt: "Product view 1" },
      { id: 2, src: "https://readymadeui.com/images/fashion-img-2.webp", alt: "Product view 2" },
      { id: 3, src: "https://readymadeui.com/images/fashion-img-3.webp", alt: "Product view 3" },
      { id: 4, src: "https://readymadeui.com/images/fashion-img-4.webp", alt: "Product view 4" },
    ],
    sizes: ["SM", "MD", "LG", "XL"],
    colors: [
      { name: "Black", class: "bg-black" },
      { name: "Red", class: "bg-red-600" },
      { name: "Blue", class: "bg-blue-600" },
    ]
  };

export default function ProductView() {

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('MD');
  const [selectedColor, setSelectedColor] = useState('Red');

  return (
    <section className="px-4 md:px-8 mt-6" aria-label="Product detail">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">
        
        {/* ── IMAGE GALLERY ── */}
        <div className="w-full lg:sticky top-0 lg:col-span-3">
          <div className="grid grid-cols-2 gap-0.5">
            {product.images.map((img) => (
              <div key={img.id}>
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full aspect-182/243 object-top object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── PRODUCT INFO ── */}
        <div className="w-full lg:col-span-2" id="product-main">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
              {product.title}
            </h1>
            <p className="text-slate-600 mt-2 text-sm">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2" role="img" aria-label={`Rated ${product.rating} out of 5 stars`}>
                <p className="text-base font-semibold text-slate-700" aria-hidden="true">{product.rating.toFixed(1)}</p>
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`size-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ffc107]' : 'fill-slate-300 '}`} 
                    viewBox="0 0 24 24" 
                    aria-hidden="true" 
                    focusable="false"
                  >
                    <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-400" aria-hidden="true">|</span>
              <p className="text-sm text-slate-600">{product.totalRatings} Ratings</p>
              <span className="text-slate-400" aria-hidden="true">|</span>
              <p className="text-sm text-slate-600">{product.totalReviews} Reviews</p>
            </div>

            <div className="flex items-center flex-wrap gap-4 mt-6">
              <p className="text-slate-900 font-bold text-2xl md:text-3xl">
                <span className="sr-only">Sale price:</span>${product.price}
              </p>
              <p className="text-slate-600 text-lg">
                <s aria-label={`Original price: $${product.originalPrice}`}><span aria-hidden="true">${product.originalPrice}</span></s>
                <span className="text-sm ml-1.5">Tax included</span>
              </p>
            </div>
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Sizes Selection */}
          <div>
            <fieldset>
              <legend className="text-lg font-semibold text-slate-900">Sizes</legend>
              <div className="flex flex-wrap gap-4 mt-4">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    type="button" 
                    onClick={() => setSelectedSize(size)}
                    aria-label={`Size: ${size}`}
                    aria-pressed={selectedSize === size}
                    className={`w-10 h-9 text-sm rounded-md cursor-pointer flex items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border transition-all ${ selectedSize === size ? 'border-blue-600 ring-1 ring-blue-600 text-blue-600' : 'text-slate-900 border-slate-300   hover:border-blue-600' }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Colors Selection */}
            <div className="mt-6">
              <fieldset>
                <legend className="text-lg font-semibold text-slate-900">Colors</legend>
                <div className="flex flex-wrap gap-4 mt-4">
                  {product.colors.map((color) => (
                    <button 
                      key={color.name}
                      type="button" 
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Color: ${color.name}`}
                      aria-pressed={selectedColor === color.name}
                      className={`w-10 h-9 border rounded-md cursor-pointer flex items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all ${color.class} ${ selectedColor === color.name ? 'border-blue-600 ring-2 ring-offset-2 ring-blue-600' : 'border-slate-300 ' }`}
                    ></button>
                  ))}
                </div>
              </fieldset>
            </div>

            <hr className="my-6 border-slate-300" />

            <div className="flex flex-wrap gap-4">
              <button type="button" className="w-[45%] px-4 py-2.5 text-slate-900 text-sm font-semibold rounded-md cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Add to wishlist
              </button>
              <button type="button" className="w-[45%] px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Add to cart
              </button>
            </div>
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Delivery Section */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Select Delivery Location</h2>
            <p className="text-slate-600 text-sm mt-2" id="pincode-desc">
              Enter the pincode of your area to check product availability.
            </p>
            <div className="max-w-sm mt-6 flex flex-col gap-4 sm:flex-row">
              <label htmlFor="pincode" className="sr-only">Pincode</label>
              <input 
                type="text" 
                id="pincode" 
                placeholder="Enter pincode" 
                autoComplete="postal-code"
                aria-describedby="pincode-desc"
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" 
              />
              <button type="button" className="py-2 px-3.5 text-sm w-max rounded-md font-semibold cursor-pointer text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Apply
              </button>
            </div>
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Review Section */}
          <div id="customer-reviews">
            <h2 className="text-lg font-semibold text-slate-900">Customer Reviews</h2>
            <div className="mt-6">
              <article className="flex items-start gap-3 flex-col sm:flex-row">
                <img 
                  src="https://readymadeui.com/team-2.webp"
                  className="w-12 h-12 rounded-full shrink-0 border-2 border-slate-200"
                  alt="John Doe's profile" 
                />
                <div>
                  <p className="text-slate-900 text-sm font-semibold">John Doe</p>
                  <div className="flex items-center space-x-1 mt-1" role="img" aria-label="Rated 3 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-3 h-3 ${i < 3 ? 'fill-[#ffc107]' : 'fill-[#CED5D8] '}`} 
                        viewBox="0 0 24 24" 
                        aria-hidden="true" 
                        focusable="false"
                      >
                        <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                      </svg>
                    ))}
                    <time dateTime="2026-04-01" className="text-slate-600 text-xs ml-2 font-medium">2 mins ago</time>
                  </div>
                  <p className="text-[13px] text-slate-600 mt-3 leading-relaxed">
                    The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.
                  </p>
                </div>
              </article>

              <a href="#" className="inline-block text-blue-600 hover:underline text-sm mt-6 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                Read all reviews<span className="sr-only"> for {product.title}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};