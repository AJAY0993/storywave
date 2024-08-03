import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Header from "./Header"

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/signin" replace />
  return (
    <>
      <Header />
      <div className="max-w-[1100px] m-auto flex items-center justify-center">
        {children}
      </div>
    </>
  )
}
export default AppLayout
