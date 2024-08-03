import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import { BiSolidEdit } from "react-icons/bi"
import { useBlog } from "../context/blogContext"
import { Button2 } from "./Button"
import { IoIosLogOut } from "react-icons/io"
import { useAuth } from "../context/authContext"

function Header() {
  const { editing, createBlog } = useBlog()
  const { signout, user } = useAuth()
  return (
    <header className="flex max-w-[1100px] m-auto py-2 lg:py-4 justify-between items-center p-4 lg:p-8 border-b-2">
      <div>
        <Link className="text-xl font-bold font-tanis" to="/">
          StoryWave
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        {!editing ? (
          <div>
            <Link
              className="flex items-center gap-1 font-thin text-lg text-stone-500 hover:text-black cursor-pointer"
              to="/blogs/create"
            >
              <BiSolidEdit /> Write
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <Button2 color="green" onClick={() => createBlog()}>
              publish
            </Button2>
          </div>
        )}
        {/* @ts-expect-error user will always profile pic in this case*/}
        <Avatar profilePic={user?.profilePic} />
        <button
          className=" text-red-400 text-xl font-medium hover:text-red-600"
          onClick={signout}
        >
          <IoIosLogOut />
        </button>
      </div>
    </header>
  )
}

export default Header
