import { Context } from "hono"
import { generateClient } from "../utils"

export const createBlog = async (c: Context) => {
  const { title, content, published } = await c.req.json()
  const authorId = c.get("userId")
  const client = generateClient(c)
  const newBlog = await client.blog.create({
    data: {
      title,
      content,
      authorId,
      published: published === true ? true : false
    }
  })
  return c.json({
    blog: newBlog
  })
}

export const getBlogById = async (c: Context) => {
  const blogId = c.req.param("id")
  const client = generateClient(c)
  const blog = await client.blog.findFirst({
    where: {
      id: blogId,
      published: true
    },
    include: {
      author: true
    }
  })
  if (blog !== null) blog.author.password = ""
  return c.json({
    blog
  })
}

export const getBlogs = async (c: Context) => {
  const client = generateClient(c)
  const page = parseInt(c.req.query("page") || "1", 10) - 1
  const limit = parseInt(c.req.query("limit") || "10", 10)
  const blogs = await client.blog.findMany({
    where: {
      published: true
    },
    skip: page * limit,
    take: limit,
    include: {
      author: true
    }
  })

  blogs.forEach((b) => (b.author.password = ""))
  return c.json({
    blogs
  })
}

export const updateBlog = async (c: Context) => {
  const blogId = c.req.param("id")
  const authorId = c.get("userId")
  const { title, content, published } = await c.req.json()
  const client = generateClient(c)
  const blog = await client.blog.update({
    data: {
      title,
      content,
      published
    },
    where: {
      id: blogId,
      authorId
    }
  })
  return c.json({
    blog
  })
}

export const deleteBlog = async (c: Context) => {
  const blogId = c.req.param("id")
  const authorId = c.req.param("userId")
  const client = generateClient(c)
  const blog = await client.blog.delete({
    where: {
      id: blogId,
      authorId
    }
  })
  return c.body("", 204)
}
