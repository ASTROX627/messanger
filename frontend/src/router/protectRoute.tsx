import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";




const ProtectRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAppContext()


  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated, loading])

  if(loading){
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : null
}

export default ProtectRoute;