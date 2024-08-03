import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Context } from "hono"

const encoder = new TextEncoder()

export const hashPassword = async (password: string): Promise<string> => {
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

export const generateClient = (c: Context) =>
  new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
