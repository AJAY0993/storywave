import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import { CreateBlogInput } from "@ajay0993/medium-common"
import { useNavigate } from "react-router-dom"
import axios from "../utils/axios"
import { AxiosError } from "axios"
import { Blog } from "../types"

const emptyBlog = {
  content: "",
  title: "",
  published: false
}
interface BlogContextProviderProps {
  blog: CreateBlogInput
  loading: boolean
  editing: boolean
  blogs: Blog[]
  createBlog: () => Promise<void>
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setBlog: Dispatch<React.SetStateAction<CreateBlogInput>>
  setEditing: Dispatch<React.SetStateAction<boolean>>
}
interface BlogProviderProps {
  children: ReactNode
}

const BlogContext = createContext<BlogContextProviderProps | undefined>(
  undefined
)

function BlogProvider({ children }: BlogProviderProps) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)
  const [blog, setBlog] = useState<CreateBlogInput>(emptyBlog)
  const navigate = useNavigate()

  const createBlog = async () => {
    setLoading(true)
    const token = localStorage.getItem("jwt")
    if (!token) {
      return navigate("/signin")
    }
    const published = confirm("Want to make blog public")
    try {
      const config = {
        method: "POST",
        url: "blogs",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { ...blog, published }
      }
      const res = await axios(config)
      alert("Blog created")
      setEditing(false)
      setBlog(emptyBlog)
      navigate(`/blogs/${res.data.blog.id}`)
      setLoading(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data)
      }
      setLoading(false)
    }
  }

  const getBlogs = async () => {
    setLoading(true)
    const token = localStorage.getItem("jwt")
    const config = {
      method: "GET",
      url: "blogs",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios(config)
    setBlogs(res.data.blogs)
    setLoading(false)
  }

  const value = {
    loading,
    blog,
    editing,
    blogs,
    setLoading,
    createBlog,
    setBlog,
    setEditing
  }

  useEffect(() => {
    getBlogs()
  }, [])
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export const useBlog = (): BlogContextProviderProps => {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("Blog context used outside the provider")
  }
  return context
}

export default BlogProvider
