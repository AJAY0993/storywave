import { CreateBlogInput, SignupInput } from "@ajay0993/medium-common"

export interface Blog extends CreateBlogInput {
  id: string
  authorId?: string
  author?: User
  publishedDate: string
}

export interface User extends SignupInput {
  id: string
  profilePic: string
  blogs?: Blog[]
}
