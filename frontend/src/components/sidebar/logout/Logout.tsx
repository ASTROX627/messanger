import { LogOut } from "lucide-react"
import { useEffect, type FC, type JSX } from "react"
import toast from "react-hot-toast";
import { useActionData, useNavigate, useSubmit } from "react-router-dom"
import type { LogoutActionResponse } from "./logoutAction";
import { useAppContext } from "../../../context/appContext";


const Logout: FC = (): JSX.Element => {
  const { setAuth } = useAppContext();

  const submitForm = useSubmit();
  const navigate = useNavigate();
  const actionData = useActionData() as LogoutActionResponse;

  useEffect(() => {
    if (actionData) {
      if ("error" in actionData && actionData.error) {
        toast.error(actionData.errorMessage, { duration: 4000 });
        console.log("error in action data");

      } else if ("success" in actionData && actionData.success) {
        toast.promise(
          new Promise<string>((resolve) => {
            setTimeout(() => {
              setAuth(false);
              resolve(actionData.successMessage);
              navigate("/login");
              console.log("success in action data");

            }, 2000);
          }),
          {
            loading: "Logging out user...",
            success: (message: string) => message,
            error: (error) => error.message || "Something went wrong, Please try again",
          }, { duration: 4000 }
        )
      }
    }
  }, [actionData, navigate, setAuth])

  const handleLogout = () => {
    submitForm(null, { method: "POST", action: "/" })
    localStorage.removeItem("isAuthenticated")

  };

  return (
    <div className="mt-auto mx-1">
      <LogOut className="cursor-pointer" onClick={handleLogout} />
    </div>
  )
}

export default Logout;