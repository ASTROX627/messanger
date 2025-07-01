import type { Socket } from "socket.io-client";
import type { AuthState, SocketState, User } from "./appProvider";

export const Action = {
  SET_AUTH: "SET_AUTH",
  SET_SOCKET: "SET_SOCKET"
} as const

export type AppAction =
  | { type: "SET_AUTH"; payload: { isAuthenticated: boolean, user?: User | null, loading: boolean } }
  | { type: "SET_SOCKET"; payload: { socket: Socket | null, onlineUser: string[] } }

export interface AppState extends AuthState, SocketState {}


export const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case Action.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user || null,
        loading: action.payload.loading,
      }
    case Action.SET_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
        onlineUser: action.payload.onlineUser,
      }
    default:
      return state
  }
}