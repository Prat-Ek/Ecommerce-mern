import z from "zod";

export const catDataDTO = z.object({
  name: z.string().min(2, 'Category name must be of at least 2 character long').max(50, 'Category name must not exceed 50 characters'),
  status: z.string().regex(/^(published|unpublished)$/,'Status can be either publised or unpublished').nonempty().nonoptional(),
  parent: z.string().nullable().optional()
  // image
})