// INSTEAD OF USING THIS CONTEXT I USE ZUSTAND


// import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from "react";
// import { httpService } from "../core/httpService";
// import { AxiosError } from "axios";

// export interface AuthContextType extends AuthState {
//   setAuth: (isAuthenticated: boolean) => void;
// }

// export const initialState: AuthState = {
//   isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
// };

// export interface AuthState {
//   isAuthenticated: boolean;
// }


// export type AuthAction = { type: typeof Action.SET_AUTH; payload: boolean };

// export const Action ={
//   SET_AUTH: "SET_AUTH",
// } as const;

// export const AuthContext = createContext<AuthContextType>({
//   ...initialState,
//   setAuth: () => {},
// });

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };


// export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case Action.SET_AUTH:
//       return { ...state, isAuthenticated: action.payload };
//     default:
//       return state;
//   }
// };



// const getInitialState = (): AuthState => {
//   const savedState = localStorage.getItem("isAuthenticated");
//   const state = savedState ? { isAuthenticated: savedState === "true" } : initialState;
//   return state;
// };

// const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, getInitialState());

//   const setAuth = (isAuthenticated: boolean) => {
//     dispatch({ type: Action.SET_AUTH, payload: isAuthenticated });
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await httpService.get("/auth/verify");
//         const authStatus = response.data.isAuthenticated || false;
//         dispatch({ type: Action.SET_AUTH, payload: authStatus });
//         localStorage.setItem("isAuthenticated", authStatus.toString());
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           dispatch({ type: Action.SET_AUTH, payload: false });
//           localStorage.setItem("isAuthenticated", "false");
//         }
//       }
//     };
//     checkAuth();
//     const interval = setInterval(checkAuth, 900000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", state.isAuthenticated.toString());
//   }, [state.isAuthenticated]);

//   return (
//     <AuthContext.Provider value={{ ...state, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;