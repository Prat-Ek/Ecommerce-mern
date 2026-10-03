'use client';
import { useRouter } from "next/navigation";
import {useForm, Controller} from "react-hook-form"
import { FormLabel } from "../ui/form/Label";
import z from "zod";
import { FormInput } from "../ui/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { IBannerDetail } from "./BannerListComponent";
import { useEffect } from "react";




export interface IBannerFormComponentProps{
  submitEvent: (data:IBannerData)=>Promise<void>
  detail?:IBannerDetail | undefined
}
const BannerDTO = z.object({
  title: z
    .string()
    .min(3, "Title must have at least 3 characters"),

  subTitle: z
    .string()
    .min(3, "Subtitle must have at least 3 characters"),

  links: z.array(
    z.object({
      label: z.string().optional(),
      link: z
        .string()
        .url("Invalid URL")
        .or(z.literal(""))
        .optional(),
    })
  ),

  status: z.enum(["active", "inactive"]),

  image: z.file().optional(),
});

export type IBannerData = z.infer<typeof BannerDTO>;

export default function BannerFromComponent({submitEvent, detail}:Readonly<IBannerFormComponentProps>) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },setValue
  } = useForm<IBannerData>({
    defaultValues: {
      title: "",
      subTitle: "",
     links: [
  { label: "", link: "" },
  { label: "", link: "" },
],
      // links:null,
      status: "inactive",
      image: undefined,
    },
     resolver: zodResolver(BannerDTO),
  });
  
   
  useEffect(()=>{
    if (detail){
      setValue("title",detail.title)
      setValue("subTitle",detail.subTitle)
      setValue ('status',detail.status)
     setValue(
  "links",
  (Array.isArray(detail.links) ? detail.links : []).map((item) => ({
    label: item?.label ?? "",
    link: item?.link ?? "",
  }))
)
      
    }
    console.log(detail)
  },[detail,setValue])


  return (
    <>
      <form
        onSubmit={handleSubmit(submitEvent)}
        className="w-full flex flex-col gap-5 p-5"
      >
        {/* Title */}
        <div className="flex items-center w-full">
          <FormLabel htmlFor="title" className="w-1/3">
            Banner Title:
          </FormLabel>
          <div className="w-2/3">
            <FormInput
              control={control}
              name="title"
              errMsg={errors?.title?.message}
              placeholder="Enter banner title"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="flex items-center w-full">
          <FormLabel htmlFor="subtitle" className="w-1/3">
            Subtitle:
          </FormLabel>
          <div className="w-2/3">
            <FormInput
              control={control}
              name="subTitle"
              errMsg={errors?.subTitle?.message}
              placeholder="Enter banner subtitle"
            />
          </div>
        </div>

        {/* Links: up to 3 (optional) */}
        <div className="flex items-start w-full">
          <FormLabel htmlFor="link" className="w-1/3 pt-2">
            Links:
          </FormLabel>
          <div className="w-2/3 flex flex-col gap-4">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className="flex gap-2 border-b pb-2 last:border-b-0 last:pb-0"
              >
                <div className="w-1/3">
                <FormInput
                  control={control}
                  name={`links.${idx}.label`}
                  errMsg={errors?.links?.[idx]?.label?.message}
                  placeholder={`Link Label${idx > 0 ? ` (${idx + 1})` : ""}`}
                />
                </div>
                <div className="w-full">
                 
                <FormInput
                  control={control}
                  name={`links.${idx}.link`}
                  errMsg={errors?.links?.[idx]?.link?.message}
                  placeholder="https://link.url"
                  type="url"
                />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center w-full">
          <FormLabel htmlFor="status" className="w-1/3">
            Status:
          </FormLabel>
          <div className="w-2/3">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 rounded-md border border-gray-300"
                >
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                </select>
              )}
            />
            {errors?.status?.message && (
              <span className="text-red-600 text-sm">
                {errors.status.message}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center w-full">
          <FormLabel htmlFor="image" className="w-1/3">
            Image:
          </FormLabel>
          <div className="w-2/3">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="block w-full text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              )}
            />
            {errors?.image?.message && (
              <span className="text-red-600 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-3">
          {/* Suggestion: Use a Link for Cancel if it should navigate; otherwise keep as button with type="button" */}
          <button
            disabled={isSubmitting}
            type="button"
            className="disabled:cursor-not-allowed disabled:bg-red-800/50 font-semibold text-lg cursor-pointer hover:underline transition hover:scale-102 duration-500 bg-red-800 p-2 w-full flex rounded-md items-center justify-center text-white hover:bg-red-700"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="disabled:cursor-not-allowed disabled:bg-teal-800/50 font-semibold text-lg cursor-pointer hover:underline transition hover:scale-102 duration-500 bg-teal-800 p-2 w-full flex rounded-md items-center justify-center text-white hover:bg-teal-700"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}