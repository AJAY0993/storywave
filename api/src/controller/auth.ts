import { Context } from "hono"
import { sign } from "hono/jwt"
import { hashPassword } from "../utils"
import { generateClient } from "../utils"

interface signupInput {
  username: string
  email: string
  password: string
}

export const signUp = async (c: Context) => {
  const client = generateClient(c)
  const { username, email, password }: signupInput = await c.req.json()
  const hashedPassword = await hashPassword(password)
  const profilePic = `https://avatar.iran.liara.run/public/?username=${username}`
  const newUser = await client.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      profilePic
    }
  })

  const token = await sign({ id: newUser.id }, c.env.JWT_SECRET)
  return c.json({ user: newUser, token })
}

export const signIn = async (c: Context) => {
  const client = generateClient(c)
  const { email, password } = await c.req.json()
  const user = await client.user.findFirst({
    where: {
      email
    }
  })
  if (!user) {
    return c.body("Invalid email or password", 401)
  }

  const isPasswordCorrect = user.password === (await hashPassword(password))
  if (!isPasswordCorrect) {
    return c.body("Invalid email or password", 401)
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  console.log(token)
  return c.json({
    user,
    token
  })
}
