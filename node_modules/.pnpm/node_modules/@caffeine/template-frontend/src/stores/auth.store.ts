import type { Company, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  token: string | null;
  forgotPasswordEmail: string | null;
  login: (user: User, company: Company, token?: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setCompany: (company: Company) => void;
  setForgotPasswordEmail: (email: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      isAuthenticated: false,
      token: null,
      forgotPasswordEmail: null,

      login: (user, company, token = "mock-token-xyz") =>
        set({
          user,
          company,
          isAuthenticated: true,
          token,
          forgotPasswordEmail: null,
        }),

      logout: () =>
        set({
          user: null,
          company: null,
          isAuthenticated: false,
          token: null,
          forgotPasswordEmail: null,
        }),

      setUser: (user) => set({ user }),

      setCompany: (company) => set({ company }),

      setForgotPasswordEmail: (email) => set({ forgotPasswordEmail: email }),
    }),
    {
      name: "sync-auth",
    },
  ),
);
