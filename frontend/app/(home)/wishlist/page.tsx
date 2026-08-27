"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useCart } from "@/lib/hook/useCart";
import { useWishlist } from "@/lib/hook/useWishlist";
import { WishlistItem } from "@/lib/context/WishlistContext";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-3 shrink-0 fill-gray-400 hover:fill-red-500"
    viewBox="0 0 320.591 320.591"
  >
    <path
      d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
      data-original="#000000"
    />
    <path
      d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
      data-original="#000000"
    />
  </svg>
);

function WishlistCard({
  item,
  onRemove,
  onAddToCart,
}: {
  item: WishlistItem;
  onRemove: (id: number) => void;
  onAddToCart: () => void;
}) {
  const discountedPrice = item.discountPercentage
    ? item.price * (1 - item.discountPercentage / 100)
    : item.price;

  return (
    <li className="p-6 bg-white border border-slate-300 rounded-md relative">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <Link href={`/products/${item.id}`} className="w-36 h-36 shrink-0 block">
          <img
            src={item.thumbnail}
            className="w-full h-full object-contain"
            alt={item.title}
          />
        </Link>

        <div className="w-full sm:border-l sm:pl-6 sm:border-slate-300">
          <h3 className="text-base font-semibold text-slate-900">
            <Link href={`/products/${item.id}`} className="hover:text-blue-700">
              {item.title}
            </Link>
          </h3>

          {item.rating !== undefined && (
            <div
              className="flex items-center gap-2 mt-2"
              role="img"
              aria-label={`Rated ${item.rating} out of 5 stars`}
            >
              <p className="text-sm font-semibold text-slate-700 font-medium">
                {item.rating.toFixed(1)}
              </p>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`size-3.5 ${
                    i < Math.floor(item.rating!)
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
          )}

          <div className="flex items-center gap-3 mt-2">
            <p className="text-slate-900 font-bold text-lg">
              ${discountedPrice.toFixed(2)}
            </p>
            {item.originalPrice && (
              <p className="text-slate-500 text-sm">
                <s>${item.originalPrice.toFixed(2)}</s>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              type="button"
              onClick={onAddToCart}
              className="px-4 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="px-4 py-2 text-slate-900 text-sm font-semibold rounded-md cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Remove
            </button>

            {/* Remove button */}
            <button
              type="button"
              aria-label={`Remove ${item.title} from wishlist`}
              onClick={() => onRemove(item.id)}
              className="absolute top-3.5 right-3.5 w-max cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({ ...item, quantity: 1 });
    toast.success(`${item.title} added to cart`);
  };

  return (
    <main className="px-4 md:px-8 mt-6">
      <div className="max-w-4xl mx-auto lg:max-w-7xl">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-slate-900">
            My Wishlist
            {wishlist.length > 0 && (
              <span className="text-lg font-medium text-slate-500 ml-2">
                ({wishlist.length} items)
              </span>
            )}
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-slate-300 rounded-md p-12 text-center">
            <svg
              className="size-12 mx-auto text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-slate-600 mt-4 font-medium">
              Your wishlist is empty
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Add products you love to your wishlist and find them here.
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={removeFromWishlist}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
