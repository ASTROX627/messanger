import type { FC, JSX } from "react"

const Login: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-w-96 h-screen">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400/10 backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500 mx-2">Chat App</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full input h-10 border-1"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full input h-10 border-1"
            />
          </div>
          <a href="#" className="text-sm hover:underline hover:text-blue-600 my-4 inline-block mx-0.5">{"Don't"} have an account?</a>
          <div>
            <button className="btn btn-block btn-sm mt-2 btn-outline">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login