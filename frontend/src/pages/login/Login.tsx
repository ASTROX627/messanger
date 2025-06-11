import { useEffect, type FC, type JSX } from "react"
import { Link, useActionData, useNavigate, useSubmit } from "react-router-dom"
import AuthInputs from "../../components/auth/AuthInputs"
import * as Yup from "yup"
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import type { LoginActionResponse } from "./loginAction"
import { useAuthStore } from "../../provider/authStore"

type LoginFormValue = {
  username: string,
  password: string
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required").min(6, "password must be at least 6 chracters")
})

const Login: FC = (): JSX.Element => {

  const{setAuth} = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValue>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const navigate = useNavigate();
  const submitForm = useSubmit();
  const actionData = useActionData() as LoginActionResponse;

  useEffect(() => {
    if (actionData) {
      if ("error" in actionData && actionData.error) {
        toast.error(actionData.errorMessage, { duration: 4000 });
      } else if ("success" in actionData && actionData.success) {
        toast.promise(
          new Promise<string>((resolve) => {
            setTimeout(() => {
              setAuth(true)
              resolve(actionData.successMessage);
              navigate("/");
            }, 2000);
          }),
          {
            loading: "Logging user...",
            success: (message: string) => message,
            error: (error) => error.message || "Something went wrong, Please try again",
          },
          { duration: 4000 }
        );
      }
    }
  }, [actionData, navigate, setAuth]);

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    submitForm(data, { method: "POST", action: "/login" });
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-w-96 h-screen">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400/10 backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500 mx-2">Chat App</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          {/* USERNAME_INPUT */}
          <AuthInputs
            register={register("username")}
            label="Username"
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
          />
          <Link to="/register" className="text-sm hover:underline hover:text-blue-600 my-4 inline-block mx-0.5">{"Don't"} have an account?</Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 btn-outline">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;