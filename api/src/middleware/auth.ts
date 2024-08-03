import { Context, Next } from "hono"
import { verify } from "hono/jwt"

export const isAuthenticated = async (c: Context, next: Next) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1]
    if (!token) {
      return c.body("Please provide token", 401)
    }
    let decode
    try {
      decode = await verify(token, c.env.JWT_SECRET)
    } catch (error) {
      return c.body("Invalid token", 401)
    }
    c.set("userId", decode.id)
    await next()
  } catch (error) {
    return c.body("something went wrong", 500)
  }
}
