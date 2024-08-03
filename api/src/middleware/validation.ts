import { Context, Next } from "hono"
import { ZodError, ZodSchema } from "zod"

const validate = (validationSchema: ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json()
      await validationSchema.parseAsync(body)
      await next()
    } catch (error) {
      //@ts-ignore
      if (error.issues) {
        //@ts-ignore
        return c.body(error.issues[0].message, 400)
      }
      return c.body("something went wrong", 500)
    }
  }
}

export default validate
