import AppLayout from "../components/AppLayout"
import BlogCard from "../components/BlogCard"
import Spinner from "../components/Spinner"
import { useBlog } from "../context/blogContext"

function Blogs() {
  const { blogs, loading } = useBlog()
  return (
    <AppLayout>
      {loading && <Spinner />}
      <section className="p-4 lg:p-8 divide-y">
        {!loading && blogs && blogs.map((blog) => <BlogCard blog={blog} />)}
      </section>
    </AppLayout>
  )
}

export default Blogs
