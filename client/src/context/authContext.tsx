import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import Skeleteon from "../components/Skeleton"
import axios from "../utils/axios"
import { useNavigate } from "react-router-dom"
import { User } from "../types"

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextProviderProps {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signin: (user: User) => void
  signup: (user: User) => void
  signout: () => void
  setUser: Dispatch<React.SetStateAction<User | null>>
  setLoading: Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProviderProps | undefined>(
  undefined
)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()

  const getUser = async () => {
    setLoading(true)
    const token = localStorage.getItem("jwt")
    if (!token) {
      setLoading(false)
      navigate("/signin")
    }
    try {
      const config = {
        method: "GET",
        url: "users/me",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const res = await axios(config)
      const data = res.data
      console.log(data)
      signin(data.user)
      setLoading(false)
      setIsAuthenticated(true)
    } catch (error) {
      setLoading(false)
      navigate("/signin")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const signin = (user: User) => {
    setUser(user)
    setIsAuthenticated(true)
  }
  const signup = async (user: User) => {
    setUser(user)
    setIsAuthenticated(true)
    navigate("/blogs")
  }

  const signout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.setItem("jwt", "")
    navigate("/signin")
  }
  const value = {
    signin,
    signup,
    signout,
    setUser,
    setLoading,
    user,
    loading,
    isAuthenticated
  }

  if (loading)
    return (
      <>
        <Skeleteon />
        <Skeleteon />
        <Skeleteon />
      </>
    )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextProviderProps {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("Auth context was used outside the AuthProvider")
  }
  return context
}

export { useAuth }
export default AuthProvider
