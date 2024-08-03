import { useEffect, useState } from "react"
import AppLayout from "../components/AppLayout"
import Avatar from "../components/Avatar"
import { Blog, User } from "../types/index"
import { useParams } from "react-router-dom"
import axios from "./../utils/axios"
import Spinner from "../components/Spinner"
import formatDate from "../utils/formateDate"

const notFoundBlog: Blog = {
  id: "",
  title: "Not found",
  content: "The blog you are looking for does not exist",
  published: true,
  publishedDate: "30 Feb 2030",
  author: {
    id: "",
    username: "Unknown",
    password: "",
    profilePic: "",
    email: ""
  }
}

function PageForEachBlog() {
  const [blog, setBlog] = useState<Blog>(notFoundBlog)
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()

  const getBlog = async () => {
    setLoading(true)
    const token = localStorage.getItem("jwt")
    const config = {
      url: `blogs/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios(config)
    if (res.data.blog) {
      setBlog(res.data.blog)
    } else {
      setBlog(notFoundBlog)
    }
    setLoading(false)
  }
  useEffect(() => {
    getBlog()
  }, [])

  return (
    <AppLayout>
      {loading && <Spinner />}
      {!loading && (
        <section className="p-4 lg:p-8 flex wrap items-start gap-4">
          <div className="text-left max-w-[80ch] min-w-80">
            <h3 className="font-tanis text-lg md:text-xl lg:text-2xl font-semibold">
              {blog.title}
            </h3>
            <span className="text-stone-400 text-lg">
              Posted on {formatDate(blog.publishedDate)}
            </span>
            <p className="mt-2  text-justify text-black lg:text-lg ">
              {blog.content}
            </p>
          </div>
          {blog.author && <Author author={blog.author} />}
        </section>
      )}
    </AppLayout>
  )
}

function Author({ author }: { author: User }) {
  return (
    <div className="max-w-80">
      <h4 className="font-medium">Author</h4>
      <div className="flex items-center gap-2">
        <Avatar profilePic={author.profilePic} />
        <div>
          <h5 className="font-bold text-xl">{author.username}</h5>
          <p className="text-stone-500">{author.about}</p>
        </div>
      </div>
    </div>
  )
}
export default PageForEachBlog
