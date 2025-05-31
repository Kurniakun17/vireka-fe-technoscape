import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => {
        // Set token in cookie
        Cookies.set("auth_token", token, { expires: 7 }); // expires in 7 days
        set({ token });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        Cookies.remove("auth_token");
        set({ token: null, user: null });
      },
      isAuthenticated: () => {
        const state = useAuthStore.getState();
        return !!state.token;
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => ({
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      }),
    }
  )
);

export default useAuthStore;
