"use client";
import { BaseSyntheticEvent, createContext } from "react";

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  thumbnail: string;
  discountPercentage?: number;
};

export type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem, e?: BaseSyntheticEvent) => void;
  removeFromWishlist: (id: WishlistItem["id"]) => void;
  isInWishlist: (id: WishlistItem["id"]) => boolean;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);
