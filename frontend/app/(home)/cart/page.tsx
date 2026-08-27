"use client";

import { useCart } from "@/lib/hook/useCart";
import { CartItem as CartItemType } from "@/lib/context/CartContext";

const SHIPPING = 4.0;
const TAX = 4.0;

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2.5 fill-current"
    viewBox="0 0 124 124"
  >
    <path
      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
      data-original="#000000"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2.5 fill-current"
    viewBox="0 0 42 42"
  >
    <path
      d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
      data-original="#000000"
    />
  </svg>
);

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

function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: CartItemType;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, qty: number) => void;
}) {
  return (
    <li className="p-6 bg-white border border-slate-300 rounded-md relative">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="w-32 h-32 shrink-0">
          <img
            src={item.thumbnail}
            className="w-full h-full object-contain"
            alt={item.title}
          />
        </div>

        <div className="w-full sm:border-l sm:pl-6 sm:border-slate-300">
          <h3 className="text-base font-semibold text-slate-900">
            {item.title}
          </h3>

          <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center px-2.5 py-1.5 border border-slate-300 text-slate-900 font-medium text-xs rounded-md">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                <MinusIcon />
              </button>
              <span className="mx-3">{item.quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                <PlusIcon />
              </button>
            </div>

            <div className="flex items-center">
              <p className="text-base font-semibold text-slate-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove button */}
              <button
                type="button"
                aria-label={`Remove ${item.title} from cart`}
                onClick={() => onRemove(item.id)}
                className="ml-4 w-max cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ShoppingCart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }
    if (newQty > cart.find((item) => item.id === id)!.quantity) {
      increaseQuantity(id);
    } else {
      decreaseQuantity(id);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + SHIPPING + TAX;

  return (
    <main className="px-4 md:px-8 mt-6">
      <div className="max-w-4xl mx-auto lg:max-w-7xl">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 relative">
          {/* Cart Items */}
          <ul className="lg:col-span-2 space-y-4">
            {cart.length === 0 && (
              <li className="p-6 bg-white border border-slate-300 rounded-md text-center text-slate-500">
                Your cart is empty
              </li>
            )}
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </ul>

          {/* Order Summary */}
          <div className="sticky top-0 h-max">
            <div className="bg-white rounded-md p-6 border border-slate-300">
              <h3 className="text-base font-semibold text-slate-900">
                Order Summary
              </h3>
              <ul className="text-slate-600 font-medium text-sm divide-y divide-slate-300 mt-4">
                <li className="flex flex-wrap gap-4 py-3">
                  Subtotal{" "}
                  <span className="ml-auto font-semibold text-slate-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 py-3">
                  Shipping{" "}
                  <span className="ml-auto font-semibold text-slate-900">
                    ${SHIPPING.toFixed(2)}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 py-3">
                  Tax{" "}
                  <span className="ml-auto font-semibold text-slate-900">
                    ${TAX.toFixed(2)}
                  </span>
                </li>
                <li className="flex flex-wrap gap-4 py-3 font-semibold text-slate-900">
                  Total{" "}
                  <span className="ml-auto">${total.toFixed(2)}</span>
                </li>
              </ul>
              <button
                type="button"
                className="mt-6 w-full px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Payment Methods */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
