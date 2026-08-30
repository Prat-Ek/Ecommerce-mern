"use client";

import { useCart } from "@/lib/hook/useCart";
import { useWishlist } from "@/lib/hook/useWishlist";
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const categories = [
//   "Electronics",
//   "Fashion",
//   "Home & Garden",
//   "Sports",
//   "Books",
//   "Beauty",
// ];
export type HeaderProps = {
  categories: { name: string; slug: string }[];
};

export default  function Header({ categories }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();


 const { cart } = useCart();
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const {wishlist} = useWishlist();
  const wishlistCount = wishlist.length;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 text-xl font-bold ">
            ShopHub
          </Link>

          {/* Categories Dropdown */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              onBlur={() => setTimeout(() => setIsCategoryOpen(false), 150)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-gray-100 "
            >
              <Menu className="h-4" />
              Categories
             <ChevronDown className="h-4" />
            </button>
            {isCategoryOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md bg-white py-1 shadow-lg">
                {categories.map((cat: { name: string; slug: string }) => (
                  <Link
                    key={cat.slug}
                    // href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    {cat.name}
                   
                  </Link>
                ))}
                 <Link href={'/products/categories'}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100">All Category</Link>
              </div>
            )}
          </div>
         
            
         

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 max-w-lg sm:block"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-foreground placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2 relative">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              className="rounded-full p-2 text-foreground hover:bg-gray-100 sm:hidden"
              onClick={() => {
                const q = document.getElementById("mobile-search");
                q?.classList.toggle("hidden");
              }}
            >
              <Search />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-full p-2 text-foreground hover:bg-gray-100"
            >
              <Heart />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {wishlistCount}
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-foreground hover:bg-gray-100"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                onBlur={() => setTimeout(() => setIsAccountOpen(false), 150)}
                className="rounded-full p-2 text-foreground hover:bg-gray-100"
              >
                <User />
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md bg-white py-1 shadow-lg">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/account/settings"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-foreground hover:bg-gray-100 md:hidden"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Search (hidden by default) */}
        <div id="mobile-search" className="hidden pb-3 sm:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-foreground placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <Search />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 pb-4 md:hidden">
            <div className="space-y-1 pt-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                Categories
              </p>
              {categories.map((cat: { name: string; slug: string }) => (
                <Link
                  key={cat.slug}
                  // href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  href={`/category/${cat.slug}`}
                  className="block px-3 py-2 text-sm text-foreground hover:bg-gray-100"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
