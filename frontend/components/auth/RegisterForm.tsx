"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  Calendar,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosClient from "@/lib/services/apiclient";
import { UserRegisterDTO, UserRegisterType } from "@/lib/types/AuthTypes";

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
  }`;

const selectClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
  }`;

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1.5 text-sm text-red-600";

const defaultValues: UserRegisterType = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  gender: "",
  phone: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  address: {
    address: "",
    city: "",
    state: "",
    country: "",
  },
  role: "customer",
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterType>({
    defaultValues,
    resolver: zodResolver(UserRegisterDTO),
  });

  const onSubmit = async (data: UserRegisterType) => {
    try {
      await axiosClient.post("/auth/register", data);
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { msg?: string; message?: string } } })
          ?.response?.data?.msg ??
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ??
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-1 flex-col px-4 py-10 sm:px-8 lg:h-screen lg:overflow-y-auto lg:px-16">
      <div className="mx-auto my-auto w-full max-w-xl">
        <div className="mb-8 flex items-center gap-2 text-xl font-bold text-slate-900 lg:flex xl:flex">
          <Store className="h-6 w-6 " />
          ShopHub
        </div>

        <div className="mb-8 lg:block xl:block">
          <h2 className="text-2xl font-bold text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join ShopHub to start shopping smarter.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* ── Name ── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="firstName"
                      type="text"
                      placeholder="John"
                      autoComplete="given-name"
                      className={inputClass(Boolean(errors.firstName))}
                    />
                  )}
                />
              </div>
              {errors.firstName && (
                <p className={errorClass}>{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      autoComplete="family-name"
                      className={inputClass(Boolean(errors.lastName))}
                    />
                  )}
                />
              </div>
              {errors.lastName && (
                <p className={errorClass}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* ── Email + Username ── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
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
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={inputClass(Boolean(errors.email))}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="username"
                      type="text"
                      placeholder="johndoe123"
                      autoComplete="username"
                      className={inputClass(Boolean(errors.username))}
                    />
                  )}
                />
              </div>
              {errors.username && (
                <p className={errorClass}>{errors.username.message}</p>
              )}
            </div>
          </div>

          {/* ── Gender + Phone + DOB ── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="gender" className={labelClass}>
                Gender
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="gender"
                      className={selectClass(Boolean(errors.gender))}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
              </div>
              {errors.gender && (
                <p className={errorClass}>{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="98XXXXXXXX"
                      autoComplete="tel"
                      className={inputClass(Boolean(errors.phone))}
                    />
                  )}
                />
              </div>
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="birthDate" className={labelClass}>
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="birthDate"
                      type="date"
                      className={inputClass(Boolean(errors.birthDate))}
                    />
                  )}
                />
              </div>
              {errors.birthDate && (
                <p className={errorClass}>{errors.birthDate.message}</p>
              )}
            </div>
          </div>

          {/* ── Passwords ── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`${inputClass(Boolean(errors.password))} pr-10`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={errorClass}>{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={`${inputClass(Boolean(errors.confirmPassword))} pr-10`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* ── Address ── */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="mb-4 text-sm font-semibold text-slate-800">Address</p>
            <div className="space-y-5">
              <div>
                <label htmlFor="address.address" className={labelClass}>
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Controller
                    name="address.address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="address.address"
                        type="text"
                        placeholder="123 Main St, Ward 5"
                        autoComplete="street-address"
                        className={inputClass(Boolean(errors.address?.address))}
                      />
                    )}
                  />
                </div>
                {errors.address?.address && (
                  <p className={errorClass}>{errors.address.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="address.city" className={labelClass}>
                    City
                  </label>
                  <Controller
                    name="address.city"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="address.city"
                        type="text"
                        placeholder="Kathmandu"
                        autoComplete="address-level2"
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                          errors.address?.city
                            ? "border-red-400 focus:ring-red-200"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                    )}
                  />
                  {errors.address?.city && (
                    <p className={errorClass}>{errors.address.city.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address.state" className={labelClass}>
                    State
                  </label>
                  <Controller
                    name="address.state"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="address.state"
                        type="text"
                        placeholder="Bagmati"
                        autoComplete="address-level1"
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                          errors.address?.state
                            ? "border-red-400 focus:ring-red-200"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                    )}
                  />
                  {errors.address?.state && (
                    <p className={errorClass}>{errors.address.state.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address.country" className={labelClass}>
                    Country
                  </label>
                  <Controller
                    name="address.country"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="address.country"
                        type="text"
                        placeholder="Nepal"
                        autoComplete="country-name"
                        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                          errors.address?.country
                            ? "border-red-400 focus:ring-red-200"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                      />
                    )}
                  />
                  {errors.address?.country && (
                    <p className={errorClass}>
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Role ── */}
          <div>
            <label htmlFor="role" className={labelClass}>
              Role
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="role"
                    className={selectClass(Boolean(errors.role))}
                  >
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                  </select>
                )}
              />
            </div>
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export { RegisterForm };
