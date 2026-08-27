"use client";
import { BaseSyntheticEvent, ReactNode, useState } from "react";
import { WishlistContext, WishlistItem } from "../context/WishlistContext";

export default function WishlistProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    setWishlist((currentWishlist) => {
      const existingItem = currentWishlist.find(
        (wishlistItem) => wishlistItem.id === item.id,
      );
      if (existingItem) {
        return currentWishlist;
      }
      return [...currentWishlist, item];
    });
  };

  const removeFromWishlist = (id: WishlistItem["id"]) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== id),
    );
  };

  const isInWishlist = (id: WishlistItem["id"]) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
