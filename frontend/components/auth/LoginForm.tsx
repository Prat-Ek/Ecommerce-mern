'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Store, LockIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { CredentialType, LoginDTO } from "@/lib/types/AuthTypes";

import { useAuth } from "@/lib/hook/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
  }`;

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function LoginForm() {
  const router = useRouter()
    const [visible, setVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CredentialType>({
      defaultValues: {
          //email: "",
          username:"",
          password: "",
        },
        resolver: zodResolver(LoginDTO),
    });
    const {login} = useAuth()

  const onSubmit = async (data: CredentialType) => {
    // console.log("Form Submitted:", data);
    // Handle authentication logic here
   try {
    const loggedInUser= await login(data);
    router.push("/admin")
   } catch (exception) {
    toast.error("Error login in",{description:"Please check your credentials"})
    
   }
  };


  return (
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
            {errors.username && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}

             <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="usrname"
                      type="text"
                      placeholder="Enter your username"
                      autoComplete="username"
                      className={`${inputClass(Boolean(errors.username))} pl-10 pr-10`}
                    />
                  )}
                />
              </div>
              {errors.username && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.username.message}
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
            <Link href="/register" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
  )
}
