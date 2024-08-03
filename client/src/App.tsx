import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import Blogs from "./pages/Blogs"
import CreateBlog from "./pages/CreateBlog"
import AuthProvider from "./context/authContext"
import PageForEachBlog from "./pages/PageForEachBlog"
import BlogProvider from "./context/blogContext"
import PageNotFound from "./pages/404"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" replace />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<PageForEachBlog />} />
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
