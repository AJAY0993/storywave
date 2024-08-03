import { Link } from "react-router-dom"

function AuthHeader({ type }: { type: "signin" | "signup" }) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-extrabold">
          {type === "signin"
            ? "Sign in to your account"
            : "Create your Account"}
        </h1>
      </div>
      <div>
        <p>
          {type === "signin"
            ? "Are you new Here? "
            : "Already have an account? "}
          <Link
            className="underline"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </>
  )
}

export default AuthHeader
