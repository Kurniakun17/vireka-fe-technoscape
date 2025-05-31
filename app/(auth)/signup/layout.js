"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import dynamic from "next/dynamic";

const SignupLayout = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isAuthenticated()) {
      router.push("/");
    }
  }, [router, isAuthenticated, isClient]);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(SignupLayout), { ssr: false });
