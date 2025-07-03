import { useEffect, useState, type FC, type JSX } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthInputs from "../../components/auth/AuthInputs"
import * as Yup from "yup"
import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { useAppContext } from "../../context/appContext"
import { httpService } from "../../core/httpService"
import { AxiosError } from "axios"



type LoginFormValue = {
  username: string,
  password: string
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required").min(6, "password must be at least 6 chracters")
})

const Login: FC = (): JSX.Element => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValue>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const { setAuth, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const loginUser = async(data: LoginFormValue) => {
    if(!data.username || !data.password){
      throw new Error("Username and password are required");
    }

    const cleanData = {
      username: data.username.trim().toLowerCase(),
      password: data.password
    }

    const response = await httpService.post("/auth/login", cleanData);

    if(response.status === 200){
      return response.data
    }

    throw new Error("Login failed");
  }

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    if(isLoading) return;
    setIsLoading(true);

    const loginPromise = loginUser(data);

    toast.promise(
      loginPromise,
      {
        loading: "Signing you in...",
        success: (result) => {
          setAuth(true, result.user);
          setTimeout(() => {
            navigate("/", {replace: true});
          }, 1000);
          return 'Login successful! Redirecting to home page...';
        },
        error: (error) => {
          if(error instanceof AxiosError){
            const statusCode = error.response?.status;
            if(statusCode === 401){
              return "Invalid username or password";
            }else if(statusCode === 400){
              return error.response?.data?.error || "Invalid input data";
            }else if(statusCode && statusCode >= 500){
              return "Server error. Please try again later";
            }
          }
          return error.message || "Something went wrong, please try again";
        }
      },{duration: 3000}
    ).finally(() => {
      setIsLoading(false);
    })
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
            showPassword={showPassword}
            togglePassword
            toggle={() => setShowPassword(!showPassword)}
          />
          <Link to="/register" className="text-sm hover:underline hover:text-blue-600 my-4 inline-block mx-0.5">{"Don't"} have an account?</Link>
          <div>
            <button disabled={isLoading} className="btn btn-block btn-sm mt-2 btn-outline">
              {isLoading? "Signing In...": "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;