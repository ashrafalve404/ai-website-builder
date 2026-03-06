import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          role: "user",
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      register: async (email, password, name) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: "1",
          email,
          name,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
