'use client'
import { BaseSyntheticEvent, ReactNode, useEffect, useState } from "react";
import { CartContext, CartItem } from "../context/CartContext";

export default function CartProvider({children}:Readonly<{children:ReactNode}>) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const addToCart = (item: CartItem, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id)

      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + item.quantity}
            : cartItem,
        )
      }

      return [...currentCart, item]
    })
  }

  const removeFromCart = (id: CartItem['id']) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }

  const increaseQuantity = (id: CartItem['id']) => {
    setCart(currentCart => currentCart.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    ))
  }

  const decreaseQuantity = (id: CartItem['id']) => {
    setCart(currentCart => currentCart
      .map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item)
      .filter(item => item.quantity > 0))
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>

  )
}
