import { Hono } from "hono"
import { isAuthenticated } from "../middleware/auth"
import getMe from "../controller/user"

const userRouter = new Hono()

userRouter.get("/me", isAuthenticated, getMe)

export default userRouter
