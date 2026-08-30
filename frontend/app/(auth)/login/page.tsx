"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Store, LockIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
  }`;

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function LoginPage() {
    const [visible, setVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
      defaultValues: {
          email: "",
          password: "",
        },
        resolver: zodResolver(loginSchema),
    });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form Submitted:", data);
    // Handle authentication logic here
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* ── Hero / Branding panel ── */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1470&q=80"
          alt="Fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Store className="h-6 w-6" />
            ShopHub
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight">
              Discover your next favorite thing
            </h1>
            <p className="mt-4 text-white/80">
              Shop thousands of products across fashion, electronics, home and
              more — delivered right to your door.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
                Free shipping on orders over $50
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
                30-day easy returns
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
                Secure checkout with eSewa & cards
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 text-xl font-bold text-slate-900 lg:hidden">
            <Store className="h-6 w-6" />
            ShopHub
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to your account to continue shopping.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`${inputClass(Boolean(errors.email))} pl-10`}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

             <div>
              <label htmlFor="email" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type={visible ? "text" : "password"}
                      placeholder="*************"
                      autoComplete="password"
                      className={`${inputClass(Boolean(errors.password))} pl-10 pr-10`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div> */}

          <p className="mt-8 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}