"use client"
import { BaseSyntheticEvent, createContext } from "react";

export type Products={
    id:number,
    title:string,
    price:number,
    thumbnail:string
}
export type CartItem= Products &{
    quantity:number,
}
export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem, e?: BaseSyntheticEvent) => void;
  removeFromCart: (id: CartItem["id"]) => void;
  increaseQuantity: (id: CartItem["id"]) => void;
  decreaseQuantity: (id: CartItem["id"]) => void;
};

 export const CartContext = createContext<CartContextType | undefined>(undefined);
 