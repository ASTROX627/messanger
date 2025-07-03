import { useState, type FC, type JSX } from "react"
import GenderCheckbox from "./GenderCheckbox"
import { Link, useNavigate } from "react-router-dom"
import AuthInputs from "../../components/auth/AuthInputs";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { httpService } from "../../core/httpService";
import { AxiosError } from "axios";

export type RegisterFormValue = {
  fullName: string,
  username: string,
  password: string,
  confirmPassword: string,
  gender: string
}

export type ActionResponseType = {
  success?: boolean
  error?: boolean
}


const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  username: Yup.string().required("username is required"),
  password: Yup.string().required("Password is required").min(6, "password must be at least 6 characters"),
  confirmPassword: Yup.string().required("Please Confirm your password").oneOf([Yup.ref("password")], "Password and confirm password do not match"),
  gender: Yup.string().required("Please select your gender")
})


const Register: FC = (): JSX.Element => {

  const methods = useForm<RegisterFormValue>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    }
  })

  const { register, handleSubmit, formState: { errors } } = methods;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (data: RegisterFormValue) => {
    if (data.password !== data.confirmPassword) {
      throw new Error("Password and confirm password do not match");
    }

    const response = await httpService.post("/auth/register", data);

    if (response.status === 201) {
      return response.data;
    }

    throw new Error("Registration failed");
  }

  const onSubmit: SubmitHandler<RegisterFormValue> = (data) => {
    if (isLoading) return;
    setIsLoading(true);
    const registerPromise = registerUser(data);

    toast.promise(
      registerPromise,
      {
        loading: "Creating your account...",
        success: () => {
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 1000);
          return 'Registration successful! Redirecting to login page...';
        },
        error: (error) => {
          if (error instanceof AxiosError) {
            const statusCode = error.response?.status;
            if (statusCode === 400) {
              return error.response?.data?.error || "Invalid input data";
            } else if (statusCode && statusCode >= 500) {
              return "Server error. Please try again later";
            }
          }
          return error.message || "Something went wrong, please try again";
        }
      }, { duration: 3000 }
    ).finally(() => {
      setIsLoading(false)
    })
  };


  return (
    <div className="flex flex-col items-center justify-center mx-auto min-w-96 h-screen">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400/10 backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Register
          <span className="text-blue-500 mx-2">Chat App</span>
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">

            {/* FULL_NAME_INPUT */}
            <AuthInputs
              register={register("fullName")}
              label="Full Name"
              type="text"
              placeholder="Enter your full name."
              error={errors.fullName?.message}
            />

            {/* username_INPUT */}
            <AuthInputs
              register={register("username")}
              label="username"
              type="text"
              placeholder="Enter your username."
              error={errors.username?.message}
            />

            {/* Password_INPUT */}
            <AuthInputs
              register={register("password")}
              label="password"
              type="password"
              placeholder="Enter your password."
              error={errors.password?.message}
              showPassword={showPassword}
              togglePassword
              toggle={() => setShowPassword(!showPassword)}
            />

            {/* CONFIRM_PASSWORD_INPUT */}
            <AuthInputs
              register={register("confirmPassword")}
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password."
              error={errors.confirmPassword?.message}
              showPassword={showConfirmPassword}
              togglePassword
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* GENDER_CHECK_BOX */}
            <GenderCheckbox />

            <Link to="/login" className="text-sm hover:underline hover:text-blue-600 my-4 inline-block mx-0.5">Already have an account?</Link>
            <div>
              <button disabled={isLoading} className="btn btn-block btn-sm mt-2 btn-outline">
                {isLoading ? "Creating Account" : "Register"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Register