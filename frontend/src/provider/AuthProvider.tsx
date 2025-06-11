import { useEffect, type FC, type PropsWithChildren } from "react";
import { useAuthStore } from "./authStore";

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const{checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 900000);
    return () => clearInterval(interval);
  }, [checkAuth]);

  return(
    <>
      {children}
    </>
  )
}