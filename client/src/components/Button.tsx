import { MouseEventHandler } from "react"

interface ButtonProps {
  children: React.ReactNode
  color?: "green" | "red" | "blue"
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({ children }: ButtonProps) {
  return (
    <button className="bg-black  max-w-96 font-medium text-white text-sm rounded-lg my-4 block w-full p-2.5">
      {children}
    </button>
  )
}

export function Button2({ children, color, onClick }: ButtonProps) {
  if (color === "green") {
    return (
      <button
        className="rounded-2xl px-4 py-1 bg-green-600 font-medium capitalize text-white"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  if (color === "blue") {
    return (
      <button
        className="rounded-2xl px-4 py-1 bg-blue-600 font-medium capitalize text-white"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return null
}

export default Button
