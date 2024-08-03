import { Hono } from "hono"
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog
} from "../controller/blog"
import { isAuthenticated } from "../middleware/auth"
import validate from "./../middleware/validation"
import { createBlogInput, updateBlogInput } from "@ajay0993/medium-common"

const blogRouter = new Hono()
blogRouter.use(isAuthenticated)
blogRouter.get("/", getBlogs)
blogRouter.post("/", validate(createBlogInput), createBlog)
blogRouter.get("/:id", getBlogById)
blogRouter.delete("/:id", deleteBlog)
blogRouter.put("/:id", validate(updateBlogInput), updateBlog)

export default blogRouter
