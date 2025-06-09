import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import { registerAction } from "../pages/register/registerAction";
import { loginAction } from "../pages/login/loginAction";
import { logoutAction } from "../components/sidebar/logout/logoutAction";



const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home/>,
    action: logoutAction
  },
  {
    path:"/register",
    element: <Register/>,
    action: registerAction
  },
  {
    path: "/login",
    element: <Login/>,
    action: loginAction
  }
])

export default router;