import { z } from "zod"

export const signupInput = z.object({
  username: z.string().optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ required_error: "Please provide password" })
    .min(8, { message: "Password Must be 8 chracters long" })
    .max(20, { message: "Password must not be more than 20 chracters" }),
  about: z.string().optional()
})

export const signinInput = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ required_error: "Please provide password" })
    .min(8, { message: "Password Must be 8 chracters long" })
    .max(20, { message: "Password must not be more than 20 chracters" })
})

export const createBlogInput = z.object({
  title: z.string({ required_error: "Please provide title for the blog" }),
  content: z
    .string({
      required_error: "Please provide content of the blog"
    })
    .min(10, "Blog is too short"),
  published: z.boolean().optional()
})

export const updateBlogInput = z.object({
  title: z
    .string({ required_error: "Please provide title for the blog" })
    .optional(),
  content: z
    .string({
      required_error: "Please provide content of the blog"
    })
    .min(10, "Blog is too short")
    .optional(),
  published: z.boolean().optional()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
