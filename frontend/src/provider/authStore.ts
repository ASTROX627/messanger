import { create } from "zustand"
import type { AuthState } from "./provider.types"
import { httpService } from "../core/httpService";
import { AxiosError } from "axios";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
  setAuth: (isAuthenticated) => {
    set({ isAuthenticated });
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  },
  checkAuth: async () => {
    try {
      const response = await httpService.get('/auth/verify');
      const authStatus = response.data.isAuthenticated || false;
      set({ isAuthenticated: authStatus });
      localStorage.setItem('isAuthenticated', authStatus.toString());
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ isAuthenticated: false });
        localStorage.setItem('isAuthenticated', 'false');
      }
    }
  },
}))