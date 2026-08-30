"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(10, "Your message should be at least 10 characters")
    .max(500, "Your message should not exceed 500 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: "order", label: "Order & Shipping" },
  { value: "returns", label: "Returns & Refunds" },
  { value: "product", label: "Product Inquiry" },
  { value: "account", label: "Account & Payments" },
  { value: "other", label: "Other" },
];

export default function ContactUs() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
      resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // API integration will go here
    console.log("Contact form submitted:", data);
    reset();
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-3 text-base text-slate-600">
            Have a question or feedback? Send us a message and our team will get
            back to you shortly.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.name
                        ? "border-red-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.name.message}
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
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
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
              name="subject"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Subject
                  </label>
                  <select
                    {...field}
                    id="subject"
                    className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.subject
                        ? "border-red-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    {...field}
                    id="message"
                    rows={5}
                    placeholder="Write your query here..."
                    className={`w-full resize-none rounded-md border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                      errors.message
                        ? "border-red-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
