"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { login } from "@/utils/api/auth";
import useAuthStore from "@/store/authStore";

const Login = () => {
  const router = useRouter();
  const { setToken, setUser, isAuthenticated } = useAuthStore();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "valvaltrizt@gmail.com",
    password: "valvinna2908",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      try {
        setToken(data.access_token);
        // Store the user data
        setUser(data.user);

        await new Promise((resolve) => setTimeout(resolve, 100));

        // Redirect to dashboard
        router.push("/");
      } catch (error) {
        setError("Failed to store authentication data");
      }
    },
    onError: (error) => {
      setError(error.message || "Invalid email or password");
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [router, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Banner */}
      <div className="w-1/2 bg-blue-600 relative">
        <div className="absolute inset-0 z-10" />
        <Image
          src="/hero-banner.png"
          alt="Hero Banner"
          fill
          unoptimized={true}
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-background">
        <div className="w-fit px-8">
          {/* Logo */}
          <div className="text-center flex gap-4 justify-center items-center mb-8">
            <Image
              src="/logo-vireka.png"
              alt="Logo"
              unoptimized={true}
              width={120}
              height={120}
              className=""
            />
            <h1 className="text-[60px] font-medium h-fit text-white">Vireka</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl bg-white py-9 px-14 w-full"
          >
            <h2 className="font-bold mb-1 text-[32px]">
              Save Funds, Save lives
            </h2>
            <p className="text-center">
              Allocate Healthcare Resources Smarter{" "}
            </p>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-lg font-bold bg-primary py-2.5 mt-1 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </button>

            {/* <div className="flex justify-center">
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
