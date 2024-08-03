import { Hono } from "hono"
import { signIn, signUp } from "../controller/auth"
import validate from "../middleware/validation"
import { signinInput, signupInput } from "@ajay0993/medium-common"

const authRouter = new Hono()

authRouter.post("/signup", validate(signupInput), signUp)
authRouter.post("/signin", validate(signinInput), signIn)

export default authRouter
