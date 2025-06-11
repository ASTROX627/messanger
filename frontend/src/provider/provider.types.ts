export interface AuthState {
  isAuthenticated: boolean;
  setAuth : (isAuthenticated: boolean) => void;
  checkAuth: () => Promise<void>;
}
