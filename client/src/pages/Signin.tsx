import { Navigate } from "react-router-dom"
import Quote from "../components/Quote"
import SignInForm from "../components/SignInForm"
import { useAuth } from "../context/authContext"

function SignIn() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/blogs" replace />
  return (
    <section className="h-screen bg-white flex flex-col lg:flex-row wrap">
      <SignInForm />
      <Quote />
    </section>
  )
}
export default SignIn
