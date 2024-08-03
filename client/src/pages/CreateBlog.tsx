import AppLayout from "../components/AppLayout"
import TextEditor from "../components/TextEditor"

function CreateBlog() {
  return (
    <AppLayout>
      <section className="w-full m-auto  p-4 lg:p-8 divide-y">
        <TextEditor />
      </section>
    </AppLayout>
  )
}

export default CreateBlog
