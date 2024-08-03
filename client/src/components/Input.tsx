interface InputProps {
  label: string
  placeholder: string
  name: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ label, name, placeholder, onChange, type }: InputProps) {
  return (
    <div className="my-2">
      <label
        htmlFor={name}
        className="block w-full mb-2 text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  )
}

export default Input
