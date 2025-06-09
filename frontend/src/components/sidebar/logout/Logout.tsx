import { LogOut } from "lucide-react"
import { useEffect, type FC, type JSX } from "react"
import toast from "react-hot-toast";
import { useActionData, useNavigate, useSubmit } from "react-router-dom"
import type { LogoutActionResponse } from "./logoutAction";

const Logout: FC = (): JSX.Element => {

  const submitForm = useSubmit();
  const navigate = useNavigate();
  const actionData = useActionData() as LogoutActionResponse;

  useEffect(() => {
    if (actionData) {
      if ("error" in actionData && actionData.error) {
        toast.error(actionData.errorMessage, { duration: 4000 });
      } else if ("success" in actionData && actionData.success) {
        toast.promise(
          new Promise<string>((resolve) => {
            setTimeout(() => {
              resolve(actionData.successMessage);
              navigate("/login")
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
  }, [actionData, navigate])

  const handleLogout = () => {
    submitForm(null, { method: "POST", action: "/" })
  };

  return (
    <div className="mt-auto mx-1">
      <LogOut className="cursor-pointer" onClick={handleLogout} />
    </div>
  )
}

export default Logout;