import { createContext, useContext } from "react";
import type { User } from "./appProvider";
import type { AppState } from "./appReducer";

export interface AppContextType extends AppState{
  setAuth: (isAuthenticated: boolean, user?: User | null) => void
}

export const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  socket: null,
  onlineUser: []
}


export const AppContext = createContext<AppContextType>({
  ...initialState,
  setAuth: () => {}
}
);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};