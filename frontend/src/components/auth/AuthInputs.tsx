import { useEffect, type FC, type JSX } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import toast from "react-hot-toast"

interface AuthInputsProps {
  label: string
  type: "text" | "password"
  placeholder: string
  register: UseFormRegisterReturn
  error: string | undefined
}

const AuthInputs: FC<AuthInputsProps> = ({ label, type, placeholder, register, error }): JSX.Element => {

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  })

  return (
    <>
      <div>
        <label className="label p-2 text-white">
          <span className="text-base">{label}</span>
        </label>
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full input h-10 border-1 placeholder:text-gray-500"
        />
      </div>
    </>
  )
}

export default AuthInputs;