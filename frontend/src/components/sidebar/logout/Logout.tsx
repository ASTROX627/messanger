import { LogOut } from "lucide-react"
import { useState, type FC, type JSX } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../../context/appContext";
import { httpService } from "../../../core/httpService";
import { AxiosError } from "axios";


const Logout: FC = (): JSX.Element => {
  const { setAuth } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = async() => {
    const response = await httpService.post("/auth/logout");

    if(response.status === 200){
      return response.data;
    }

    throw new Error("Logout failed");
  }



  const handleLogout = async() => {
    if(isLoading) return;
    setIsLoading(true);
    const logoutPromise = logoutUser();

    toast.promise(
      logoutPromise,
      {
        loading: "Signing you out...",
        success: () => {
          setAuth(false);
          localStorage.removeItem("appState");
          setTimeout(() => {
            navigate("/login", {replace: true});
          }, 1000);
          return 'Logged out successfully! Redirecting to login page...';
        },
        error: (error) => {
          if(error instanceof AxiosError){
            return error.response?.data?.error || "Something went wrong, please try again";
          }
          return error.message || "Unexpected error occurred";
        }
      },{duration: 3000}
    ).finally(() => [
      setIsLoading(false)
    ])
    localStorage.removeItem("isAuthenticated")

  };

  return (
    <div className="mt-auto mx-1">
      <LogOut className="cursor-pointer" onClick={handleLogout} />
    </div>
  )
}

export default Logout;