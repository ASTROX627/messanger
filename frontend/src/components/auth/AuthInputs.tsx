import { Eye, EyeOff } from "lucide-react"
import { memo, useEffect, type FC, type JSX } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import toast from "react-hot-toast"

interface AuthInputsProps {
  label: string
  type: "text" | "password"
  placeholder: string
  register: UseFormRegisterReturn
  error: string | undefined
  showPassword?: boolean
  togglePassword?: boolean
  toggle?: () => void
}

const AuthInputs: FC<AuthInputsProps> = memo(({ label, type, placeholder, register, error, showPassword, togglePassword, toggle }): JSX.Element => {

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <>
      <div>
        <label className="label p-2 text-white">
          <span className="text-base">{label}</span>
        </label>
        <div className="relative">
          <input
            {...register}
            type={togglePassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className="w-full input h-10 border-1 placeholder:text-gray-500"
          />
          {
            togglePassword && toggle && (
              showPassword ? (
                <EyeOff size={20} onClick={toggle} className="absolute cursor-pointer right-2.5 top-2.5 z-1" />
              ) : (
                <Eye size={20} onClick={toggle} className="absolute cursor-pointer right-2.5 top-2.5 z-1" />
              )
            )
          }
        </div>
      </div>
    </>
  )
})

AuthInputs.displayName = "AuthInputs";

export default AuthInputs;