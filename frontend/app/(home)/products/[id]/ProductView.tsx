"use client";

import { useCart } from "@/lib/hook/useCart";
import { useWishlist } from "@/lib/hook/useWishlist";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
};

export default function ProductView({ product }: { product: Product }) {
  const [mainImage, setMainImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
    const {addToCart} = useCart();
    const {addToWishlist} = useWishlist();

  const handleAddToCart = () => {
    addToCart({...product, quantity});
    toast.success(`${product.title} added to cart`, {
      description: `${quantity} × $${discountedPrice.toFixed(2)}`,
      action: {
        label: "View cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.price,
      rating: product.rating,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
    });
    toast.success(`${product.title} added to wishlist`);
  };
  

  return (
    <section className="px-4 md:px-8 mt-6" aria-label="Product detail">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">
        {/* IMAGE GALLERY */}
        <div className="w-full lg:sticky top-0 lg:col-span-3">
          <div className="w-full">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full aspect-square object-contain rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-md overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  mainImage === img
                    ? "border-blue-600"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} view ${i + 1}`}
                  className="w-full aspect-square object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="w-full lg:col-span-2" id="product-main">
          <div>
            {product.brand && (
              <p className="text-sm text-slate-500 font-medium">
                {product.brand}
              </p>
            )}
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl mt-1">
              {product.title}
            </h1>
            <p className="text-slate-600 mt-2 text-sm">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <div
                className="flex items-center gap-2"
                role="img"
                aria-label={`Rated ${product.rating} out of 5 stars`}
              >
                <p
                  className="text-base font-semibold text-slate-700"
                  aria-hidden="true"
                >
                  {product.rating.toFixed(1)}
                </p>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-[#ffc107]"
                        : "fill-slate-300"
                    }`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-400" aria-hidden="true">
                |
              </span>
              <p className="text-sm text-slate-600">
                {product.reviews.length} Reviews
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-4 mt-6">
              <p className="text-slate-900 font-bold text-2xl md:text-3xl">
                <span className="sr-only">Sale price:</span>$
                {discountedPrice.toFixed(2)}
              </p>
              <p className="text-slate-600 text-lg">
                <s aria-label={`Original price: $${product.price}`}>
                  <span aria-hidden="true">${product.price}</span>
                </s>
                <span className="text-sm ml-1.5 text-green-600 font-medium">
                  {product.discountPercentage}% off
                </span>
              </p>
            </div>

            <p className="text-sm mt-2">
              <span
                className={`font-semibold ${
                  product.availabilityStatus === "Low Stock"
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {product.availabilityStatus}
              </span>
              <span className="text-slate-500 ml-2">
                ({product.stock} left)
              </span>
            </p>
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="text-lg font-semibold text-slate-900"
            >
              Quantity
            </label>
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 text-lg font-bold rounded-md border border-slate-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Math.min(product.stock, Number(e.target.value) || 1),
                    ),
                  )
                }
                className="w-16 text-center py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="w-10 h-10 text-lg font-bold rounded-md border border-slate-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                +
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Minimum order quantity: {product.minimumOrderQuantity}
            </p>
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleAddToWishlist}
              className="w-[45%] px-4 py-2.5 text-slate-900 text-sm font-semibold rounded-md cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Add to wishlist
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-[45%] px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Add to cart
            </button>
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Product Details */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Product Details
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <span className="font-medium text-slate-900">Category:</span>{" "}
                {product.category}
              </li>
              <li>
                <span className="font-medium text-slate-900">SKU:</span>{" "}
                {product.sku}
              </li>
              <li>
                <span className="font-medium text-slate-900">Weight:</span>{" "}
                {product.weight}g
              </li>
              <li>
                <span className="font-medium text-slate-900">Dimensions:</span>{" "}
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth} cm
              </li>
              <li>
                <span className="font-medium text-slate-900">Warranty:</span>{" "}
                {product.warrantyInformation}
              </li>
              <li>
                <span className="font-medium text-slate-900">Shipping:</span>{" "}
                {product.shippingInformation}
              </li>
              <li>
                <span className="font-medium text-slate-900">
                  Return Policy:
                </span>{" "}
                {product.returnPolicy}
              </li>
            </ul>
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <hr className="my-6 border-slate-300" />

          {/* Reviews */}
          <div id="customer-reviews">
            <h2 className="text-lg font-semibold text-slate-900">
              Customer Reviews ({product.reviews.length})
            </h2>
            <div className="mt-6 space-y-6">
              {product.reviews.map((review, i) => (
                <article
                  key={i}
                  className="flex items-start gap-3 flex-col sm:flex-row"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">
                      {review.reviewerName}
                    </p>
                    <div
                      className="flex items-center space-x-1 mt-1"
                      role="img"
                      aria-label={`Rated ${review.rating} out of 5 stars`}
                    >
                      {[...Array(5)].map((_, j) => (
                        <svg
                          key={j}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-3 h-3 ${
                            j < review.rating
                              ? "fill-[#ffc107]"
                              : "fill-[#CED5D8]"
                          }`}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                        </svg>
                      ))}
                      <time
                        dateTime={review.date}
                        className="text-slate-600 text-xs ml-2 font-medium"
                      >
                        {new Date(review.date).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="text-[13px] text-slate-600 mt-3 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
