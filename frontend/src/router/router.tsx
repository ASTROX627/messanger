import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ProtectRoute from "./protectRoute";

const router = createBrowserRouter([
  {
    element: <ProtectRoute />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  }
])

export default router;