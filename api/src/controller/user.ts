import { Context } from "hono"
import { generateClient } from "../utils"

const getMe = async (c: Context) => {
  try {
    const userId = c.get("userId")
    const client = generateClient(c)
    const user = await client.user.findFirst({
      where: {
        id: userId
      }
    })
    return c.json({
      user
    })
  } catch (error) {
    return c.body("something went wrong", 500)
  }
}

export default getMe
