import { useEffect, useReducer, type PropsWithChildren } from "react";
import { httpService } from "../core/httpService";
import { AxiosError } from "axios";
import { authReducer } from "./authReducer";
import { AuthContext, initialState } from "./authContext";

export interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

export interface AuthContextType extends AuthState {
  setAuth: (isAuthenticated: boolean, user?: User | null) => void;
}


export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean
}


export type AuthAction = {
  type: typeof Action.SET_AUTH; payload: {
    loading: boolean; isAuthenticated: boolean; user?: User | null
  }
};

export const Action = {
  SET_AUTH: "SET_AUTH",
} as const;

const getInitialState = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  return savedState ? JSON.parse(savedState) : initialState;
};

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const setAuth = (isAuthenticated: boolean, user: User | null = null) => {
    dispatch({
      type: Action.SET_AUTH,
      payload: { isAuthenticated, user, loading: false },
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await httpService.get("/auth/verify");
        const { isAuthenticated, user } = response.data;
        dispatch({
          type: Action.SET_AUTH,
          payload: { isAuthenticated, user, loading: false },
        });
        localStorage.setItem(
          "authState",
          JSON.stringify({ isAuthenticated, user, loading: false })
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          dispatch({
            type: Action.SET_AUTH,
            payload: { isAuthenticated: false, user: null, loading: false },
          });
          localStorage.setItem(
            "authState",
            JSON.stringify({ isAuthenticated: false, user: null, loading: false })
          );
        }
      }
    };
    checkAuth();
    const interval = setInterval(checkAuth, 900000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;