"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CheckoutHeader from "@/components/Headers/CheckoutHeader";
import { useCart } from "@/lib/hook/useCart";
import Link from "next/link";
import { useState } from "react";

const SHIPPING = 4.0;
const TAX = 4.0;

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-()\s]+$/, "Enter a valid phone number"),
  address: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  zip: z.string().min(3, "ZIP / Postal code is required"),
  country: z.string().min(1, "Please select a country"),
  paymentMethod: z.enum(["card", "paypal", "esewa"], {
    error: "Select a payment method",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const countryOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
];

const inputClass = (hasError: boolean) =>
  `w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
  }`;

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

type CheckoutStatus = "idle" | "success" | "error";

function SuccessView({ total }: { total: number }) {
  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-md rounded-md border border-slate-300 bg-white p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Order Placed Successfully!
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Thank you for your purchase. A confirmation has been sent to your
          email.
        </p>
        <p className="mt-4 text-sm font-medium text-slate-900">
          Total paid:{" "}
          <span className="font-semibold">${total.toFixed(2)}</span>
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block w-full rounded-md bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckOut() {
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<CheckoutStatus>("idle");

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      paymentMethod: "card",
    },
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + SHIPPING + TAX;

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setStatus("idle");
      // Simulate API call — throw from here to trigger the error state
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Checkout submitted:", data);
      saveOrder();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const saveOrder = () => {
    const order = {
      _id: `${Date.now()}`,
      orderNumber: `${Date.now()}`,
      user: "",
      products: cart.map((item) => ({
        _id: `${item.id}`,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.thumbnail,
      })),
      totalPrice: total,
      status: "pending",
      paymentMethod: "card",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem("orders");
      const orders = stored ? JSON.parse(stored) : [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }
  };

  const goToStep2 = async () => {
    const valid = await trigger([
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zip",
      "country",
    ]);
    if (valid) {
      setStep(2);
    }
  };

  const goToStep3 = async () => {
    const valid = await trigger("paymentMethod");
    if (valid) {
      setStep(3);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-6">
      <CheckoutHeader activeStep={step} />

      {status === "success" ? (
        <SuccessView total={total} />
      ) : (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-3 gap-6 mt-6"
        noValidate
      >
        {/* Shipping + Payment form */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`bg-white rounded-md border border-slate-300 p-6 ${step === 1 ? "" : "hidden"}`}>
              <h2 className="text-base font-semibold text-slate-900 mb-6">
                Shipping Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First Name
                      </label>
                      <input
                        {...field}
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className={inputClass(!!errors.firstName)}
                      />
                      {errors.firstName && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last Name
                      </label>
                      <input
                        {...field}
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className={inputClass(!!errors.lastName)}
                      />
                      {errors.lastName && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        {...field}
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className={inputClass(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <div className="sm:col-span-2">
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <div>
                        <label htmlFor="address" className={labelClass}>
                          Street Address
                        </label>
                        <input
                          {...field}
                          id="address"
                          type="text"
                          placeholder="123 Main St, Apt 4B"
                          className={inputClass(!!errors.address)}
                        />
                        {errors.address && (
                          <p className="mt-1.5 text-sm text-red-600">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="city" className={labelClass}>
                        City
                      </label>
                      <input
                        {...field}
                        id="city"
                        type="text"
                        placeholder="New York"
                        className={inputClass(!!errors.city)}
                      />
                      {errors.city && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="state" className={labelClass}>
                        State / Province
                      </label>
                      <input
                        {...field}
                        id="state"
                        type="text"
                        placeholder="NY"
                        className={inputClass(!!errors.state)}
                      />
                      {errors.state && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="zip"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="zip" className={labelClass}>
                        ZIP / Postal Code
                      </label>
                      <input
                        {...field}
                        id="zip"
                        type="text"
                        placeholder="10001"
                        className={inputClass(!!errors.zip)}
                      />
                      {errors.zip && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <div>
                      <label htmlFor="country" className={labelClass}>
                        Country
                      </label>
                      <select
                        {...field}
                        id="country"
                        className={inputClass(!!errors.country)}
                      >
                        <option value="">Select a country</option>
                        {countryOptions.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
               <div className="flex items-center justify-center m-5 ">
              <button
                type="button"
                onClick={goToStep2}
                className="bg-red-500 rounded-md border border-slate-300 p-3 text-white hover:bg-red-700 flex items-center justify-center"
              >
                <p> Continue to Payment</p>
              </button>
            </div>
            </div>

          {/* Payment Method */}
          <div className={`bg-white rounded-md border border-slate-300 p-6 ${step === 2 ? "" : "hidden"}`}>
              <h2 className="text-base font-semibold text-slate-900 mb-6">
                Payment Method
              </h2>

              <Controller
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label
                        className={`flex items-center gap-3 rounded-md border p-4 cursor-pointer transition ${
                          field.value === "card"
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 hover:border-blue-400"
                        }`}
                      >
                        <input
                          type="radio"
                          value="card"
                          checked={field.value === "card"}
                          onChange={field.onChange}
                          className="accent-red-500"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Credit / Debit Card
                        </span>
                      </label>

                      <label
                        className={`flex items-center gap-3 rounded-md border p-4 cursor-pointer transition ${
                          field.value === "esewa"
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 hover:border-blue-400"
                        }`}
                      >
                        <input
                          type="radio"
                          value="esewa"
                          checked={field.value === "esewa"}
                          onChange={field.onChange}
                          className="accent-red-500"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          eSewa
                        </span>
                      </label>
                    </div>

                    {field.value === "card" && (
                      <div className="mt-6 grid gap-4">
                        <div>
                          <label htmlFor="cardNumber" className={labelClass}>
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className={inputClass(false)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className={labelClass}>
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              placeholder="MM/YY"
                              className={inputClass(false)}
                            />
                          </div>
                          <div>
                            <label htmlFor="cvc" className={labelClass}>
                              CVC
                            </label>
                            <input
                              type="text"
                              id="cvc"
                              placeholder="123"
                              className={inputClass(false)}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="cardholder" className={labelClass}>
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            id="cardholder"
                            placeholder="John Doe"
                            className={inputClass(false)}
                          />
                        </div>
                      </div>
                    )}

                    {field.value === "esewa" && (
                      <div className="mt-6 rounded-md border border-slate-300 bg-slate-50 p-6 text-center">
                        <p className="text-sm text-slate-600">
                          You will be redirected to eSewa to securely complete
                          your payment.
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                          Amount to pay ={" "}
                          <span className="font-semibold">RS {total.toFixed(2)}</span>
                        </p>
                        <a
                          href="https://esewa.com.np"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md bg-red-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Pay with eSewa
                        </a>
                      </div>
                    )}
                  </div>
                )}
              />
              {errors.paymentMethod && (
                <p className="mt-3 text-sm text-red-600">
                  {errors.paymentMethod.message}
                </p>
              )}

               <div className="flex items-center justify-center m-5 ">
              <button
                type="button"
                onClick={goToStep3}
                className="bg-red-500 rounded-md border border-slate-300 p-3 text-white hover:bg-red-700 flex items-center justify-center"
              >
                <p> Review Order</p>
              </button>
            </div>
            </div>
            

          {/* Review Order */}
          <div className={`bg-white rounded-md border border-slate-300 p-6 ${step === 3 ? "" : "hidden"}`}>
              <h2 className="text-base font-semibold text-slate-900 mb-6">
                Review Order
              </h2>

              <ul className="divide-y divide-slate-300 text-sm">
                {cart.length === 0 && (
                  <li className="py-3 text-center text-slate-500">
                    Your cart is empty
                  </li>
                )}
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 py-3 text-slate-600"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-14 w-14 rounded-md object-cover border border-slate-300"
                    />
                    <div className="flex-1">
                      <span className="block line-clamp-1 font-medium">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-400">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              
            </div>

         

        </div>

        {/* Order Summary */}
        <div className="h-max">
          <div className="bg-white rounded-md p-6 border border-slate-300 sticky top-0">
            <h3 className="text-base font-semibold text-slate-900">
              Order Summary
            </h3>

            {status === "error" && (
              <div
                role="alert"
                className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700"
              >
                Something went wrong while placing your order. Please try again.
              </div>
            )}

            <ul className="mt-4 max-h-64 overflow-auto divide-y divide-slate-300 text-sm">
              {cart.length === 0 && (
                <li className="py-3 text-center text-slate-500">
                  Your cart is empty
                </li>
              )}
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 py-3 text-slate-600 font-medium"
                >
                  <span className="line-clamp-1 flex-1">{item.title}</span>
                  <span className="text-slate-400">x{item.quantity}</span>
                  <span className="font-semibold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

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
                Total <span className="ml-auto">${total.toFixed(2)}</span>
              </li>
            </ul>

            <button
              type="submit"
              disabled={step !== 3 || isSubmitting}
              className="mt-6 w-full px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-red-500 hover:bg-red-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>

            <Link
              href="/cart"
              className="mt-5 flex items-center justify-center hover:text-red-500"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </form>
      )}
    </section>
  );
}
