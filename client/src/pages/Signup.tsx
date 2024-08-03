import { Navigate } from "react-router-dom"
import Quote from "../components/Quote"
import SignUpForm from "../components/SignUpForm"
import { useAuth } from "../context/authContext"

function SignUp() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/blogs" replace />
  return (
    <section className="h-screen bg-white flex flex-col lg:flex-row wrap">
      <SignUpForm />
      <Quote />
    </section>
  )
}
export default SignUp
