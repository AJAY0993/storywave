import { useState } from "react"
import { SigninInput } from "@ajay0993/medium-common"
import Input from "./Input"
import Button from "./Button"
import AuthHeader from "./AuthHeader"
import axios from "../utils/axios"
import { AxiosError } from "axios"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const dummyAccount = {
  email: "test@email.com",
  password: "12345678"
}

function SignInForm() {
  const navigate = useNavigate()
  const { signin } = useAuth()
  const [inputs, setInputs] = useState<SigninInput>({
    email: "",
    password: ""
  })

  const continueAsGuest = async (): Promise<void> => {
    try {
      const res = await axios.post("auth/signin", dummyAccount)
      const token = res.data.token
      const user = res.data
      localStorage.setItem("jwt", token)
      signin(user)
      navigate("/blogs")
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        alert(error.response?.data)
      }
    }
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      const res = await axios.post("auth/signin", inputs)
      const token = res.data.token
      const user = res.data
      localStorage.setItem("jwt", token)
      signin(user)
      navigate("/blogs")
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data)
      }
    }
  }

  return (
    <section className="w-full p-4 lg:p-8 lg:h-screen lg:w-1/2 flex flex-col justify-center items-center">
      <AuthHeader type="signin" />
      <form className="w-full max-w-96 mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
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
        <Button>Sign In</Button>
      </form>
      <button
        className="bg-black  max-w-96 font-medium text-white text-sm rounded-lg my-4 block w-full p-2.5"
        onClick={continueAsGuest}
      >
        Continue as guest
      </button>
    </section>
  )
}

export default SignInForm
