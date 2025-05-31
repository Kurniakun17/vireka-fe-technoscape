"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Cookies from "js-cookie";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const authToken = Cookies.get("auth_token");
    if (!authToken) {
      router.push("/login");
    }
  }, [router]);

  // Add token to all fetch requests
  useEffect(() => {
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      // Add token to all fetch requests
      const originalFetch = window.fetch;
      window.fetch = function (...args) {
        const [resource, config] = args;
        const newConfig = {
          ...config,
          headers: {
            ...config?.headers,
            Authorization: `Bearer ${authToken}`,
          },
        };
        return originalFetch(resource, newConfig);
      };
    }
  }, []);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
