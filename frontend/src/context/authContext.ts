import { createContext, useContext } from "react";
import type { AuthContextType, AuthState } from "./authProvider";

export const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
  user: null,
  loading: true
};


export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  setAuth: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};