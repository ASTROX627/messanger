import { Action, type AuthAction, type AuthState } from "./authProvider";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case Action.SET_AUTH:
      return { 
        ...state, 
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user || null,
        loading: action.payload.loading ?? state.loading
      };
    default:
      return state;
  }
};