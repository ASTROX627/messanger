import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";




const ProtectRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext()


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated])

  return isAuthenticated ? <Outlet /> : null
}

export default ProtectRoute;