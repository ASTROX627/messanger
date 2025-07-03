import { useCallback, useEffect, useMemo, useReducer, type FC, type PropsWithChildren } from "react";
import { AppContext } from "./appContext";
import { io, type Socket } from "socket.io-client";
import { initialState } from "./appContext";
import { appReducer, type AppState } from "./appReducer";
import { Action } from "./appReducer";
import { httpService } from "../core/httpService";
import { AxiosError } from "axios";

export interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

export interface SocketState {
  socket: Socket | null
  onlineUser: string[]
}

const getInitialState = (): AppState => {
  const savedState = localStorage.getItem("appState");
  if(savedState){
    try {
      const parsedState = JSON.parse(savedState);
      return{
        ...initialState,
        isAuthenticated: parsedState.isAuthenticated || false,
        user: parsedState.user || null,
        loading: true
      }
    } catch (error) {
      console.error("Error in parsing saved state:", error);
      return{
        ...initialState,
        loading: true
      }
    }
  }
  return{
    ...initialState,
    loading: true
  }
}

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  const setAuth = useCallback((isAuthenticated: boolean, user: User | null = null) => {
    const newState = { isAuthenticated, user, loading: false };
    dispatch({
      type: Action.SET_AUTH,
      payload: newState,
    });

    const timeOutId = setTimeout(() => {
          try {
      localStorage.setItem("appState", JSON.stringify({isAuthenticated, user, loading: false}));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
    }, 100)

    return () => clearTimeout(timeOutId);
  }, []);

  const contextValue = useMemo(() => ({
    ...state,
    setAuth,
  }), [state, setAuth])


  useEffect(() => {
    const checkAuth = async () => {
      if(!state.loading) return;
      try {
        const response = await httpService.get("/auth/verify");
        const { isAuthenticated, user } = response.data;
        dispatch({
          type: Action.SET_AUTH,
          payload: { isAuthenticated, user, loading: false },
        });
        localStorage.setItem(
          "appState",
          JSON.stringify({isAuthenticated, user, loading: false })
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          dispatch({
            type: Action.SET_AUTH,
            payload: { isAuthenticated: false, user: null, loading: false },
          });
          localStorage.setItem(
            "appState",
            JSON.stringify({ isAuthenticated: false, user: null, loading: false })
          );
        }
      }
    };
    checkAuth();

    const interval = setInterval(() => {
      if(state.isAuthenticated){
        checkAuth();
      }
    }, 900_000);

    return () => clearInterval(interval);
  }, [state.loading, state.isAuthenticated]);


  useEffect(() => {
    if(!state.user){
      if(state.socket){
        state.socket.close();
        dispatch({
          type: Action.SET_SOCKET,
          payload: {socket: null, onlineUser: []}
        })
      }
      return;
    }

    if(state.socket?.connected){
      return
    }

    const socket = io("http://localhost:5000", {
      query: {userId: state.user._id},
      transports: ["websocket"],
      timeout: 5000,
    })

    let isComponentMounted = true;

    socket.on("connect", () => {
      if(isComponentMounted){
        dispatch({
          type: Action.SET_SOCKET,
          payload: {socket, onlineUser: state.onlineUser}
        })
      }
    })

    socket.on("getOnlineUsers", (users: string[]) => {
      
      if(isComponentMounted){
        dispatch({
          type: Action.SET_SOCKET,
          payload: {socket: state.socket, onlineUser: users}
        })
      }
    })

    socket.on("disconnet", () => {
      if(isComponentMounted){
        dispatch({
          type: Action.SET_SOCKET,
          payload: {socket: null, onlineUser:[]}
        })
      }
    })

    return () => {
      isComponentMounted = false;
      socket.close();
      dispatch({
        type: Action.SET_SOCKET,
        payload: {socket: null, onlineUser: []}
      })
    }
  }, [state.user?._id])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}