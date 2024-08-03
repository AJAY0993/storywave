import { useNavigate } from "react-router-dom"
import { Blog } from "../types"

interface BlogCardProps {
  blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
  const navigate = useNavigate()
  const time = Math.ceil(blog.content.length / 100)
  return (
    <article
      className="max-w-[50rem] flex-wrap justify-between lg:flex-nowrap gap-4 py-12 flex cursor-pointer"
      onClick={() => navigate(blog.id)}
    >
      <div className="min-w-72">
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 aspect-square rounded-full"
            src={blog.author?.profilePic}
            alt="icon"
          />
          <span className="font-medium">{blog.author?.username}</span>
          <span>.</span>
          <span className="text-stone-500 font-light">{}</span>
        </div>
        <div className="mt-1">
          <p className="font-bold text-xl lg:text-2xl leading-6">
            {blog.title}
          </p>
          <p className=" leading-6 font-tanis text-lg">
            {blog.content.slice(0, 120) + "..."}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-2 ">
          <span className="rounded-2xl bg-stone-200 flex items-center justify-center grow-0 w-fit py-1 px-2 text-sm font-medium">
            Some tag
          </span>
          <span className=" text-sm font-medium">{time} min read</span>
        </div>
      </div>
      <div>
        <div className="w-32 aspect-square bg-slate-400"></div>
      </div>
    </article>
  )
}

export default BlogCard
