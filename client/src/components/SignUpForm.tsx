import { useState } from "react"
import { SignupInput } from "@ajay0993/medium-common"
import Input from "./Input"
import Button from "./Button"
import axios from "../utils/axios"
import AuthHeader from "./AuthHeader"
import { useAuth } from "../context/authContext"
import { AxiosError } from "axios"

function SignUpForm() {
  const { signup } = useAuth()
  const [inputs, setInputs] = useState<SignupInput>({
    username: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      const res = await axios.post("auth/signup", inputs)
      const user = res.data.user
      const token = res.data.token
      localStorage.setItem("jwt", token)
      signup(user)
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data)
      }
    }
  }

  return (
    <div className="w-full p-4 lg:p-8 lg:h-screen lg:w-1/2 flex flex-col justify-center items-center">
      <AuthHeader type="signup" />
      <form className="w-full max-w-96 mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <Input
            name="username"
            label="Username"
            placeholder="Enter Username"
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <Input
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <Button>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
