import { useEffect, useRef } from "react"
import { useBlog } from "../context/blogContext"

function TextEditor() {
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const { setEditing, setBlog, blog } = useBlog()
  useEffect(() => {
    setEditing(true)
  }, [])

  const defaultTitle = localStorage.getItem("title") || ""
  const defaultContent = localStorage.getItem("content") || ""

  const handleBlur = () => {
    if (contentRef.current && titleRef.current) {
      setBlog({
        content: contentRef.current.value,
        title: titleRef.current.value
      })
      console.log(blog)
    }
  }

  return (
    <div className="">
      <textarea
        className="text-xl lg:text-5xl font-tanis w-full focus:outline-0 m-0 block"
        defaultValue={defaultTitle}
        onBlur={handleBlur}
        placeholder="Title"
        ref={titleRef}
      />
      <textarea
        className="text-base lg:text-lg font-tanis w-full focus:outline-0 m-0 block"
        defaultValue={defaultContent}
        onBlur={handleBlur}
        placeholder="Tell us your story..."
        ref={contentRef}
      ></textarea>
    </div>
  )
}

export default TextEditor
