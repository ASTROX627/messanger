import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../provider/authStore";



const ProtectRoute = () => {
  const navigate = useNavigate();
  const{isAuthenticated} = useAuthStore()
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated])

  return isAuthenticated? <Outlet/>: null
}

export default ProtectRoute;