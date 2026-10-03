import z from "zod"

export const BannerCreateDTO = z.object({
    title:z.string().min(3, "Title must have atleast 3 characters").nonempty("Title is requilred"),
    subTitle:z.string().min(3, "Subtitle must have atleast 3 characters").nonempty("subTitle is requilred"),
    //links:z.string().min(3, "links must have atleast 3 characters").nonempty("Links is requilred"),
    links : z.array(z.object({
       label: z.string().nullable().optional() ,
       link : z.url().nullable().optional(),
    }).optional()).nullable().optional(),
    status:z.string().regex(/^(active|inactive)$/, 'Status should be either active or inactive only')
})