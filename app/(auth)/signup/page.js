"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signup } from "@/utils/api/auth";
import useAuthStore from "@/store/authStore";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const Signup = () => {
  const router = useRouter();
  const { setToken, setUser, isAuthenticated } = useAuthStore();
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
    phone: "",
    puskesmas_id: "",
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      try {
        setToken(data.access_token);
        setUser(data.user);
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push("/");
      } catch (error) {
        setError("Failed to store authentication data");
      }
    },
    onError: (error) => {
      setError(error.message || "Failed to sign up");
    },
  });

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isClient && isAuthenticated()) {
      router.push("/");
    }
  }, [router, isAuthenticated, isClient]);

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
    // Convert phone to number
    const submitData = {
      ...formData,
      phone: parseInt(formData.phone) || 0,
    };
    signupMutation.mutate(submitData);
  };

  // Don't render anything until client-side code is ready
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Banner */}
      <div className="w-1/2 bg-blue-600 relative">
        <div className="absolute inset-0 z-10" />
        <Image
          src="/hero-banner.png"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Signup Form */}
      <div className="w-1/2 flex items-center justify-center bg-background">
        <div className="w-fit px-8">
          {/* Logo */}
          <div className="text-center flex gap-4 justify-center items-center mb-8">
            <Image
              src="/logo-vireka.png"
              alt="Logo"
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
            <h2 className="font-bold mb-1 text-[32px]">Join Our Community</h2>
            <p className="text-center">Create your account to get started </p>

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
                htmlFor="name"
                className="block text-base font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

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

            <div>
              <label
                htmlFor="phone"
                className="block text-base font-medium text-gray-900"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="puskesmas_id"
                className="block text-base font-medium text-gray-900"
              >
                Puskesmas ID (Optional)
              </label>
              <input
                type="text"
                id="puskesmas_id"
                name="puskesmas_id"
                value={formData.puskesmas_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full rounded-lg font-bold bg-primary py-2.5 mt-1 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signupMutation.isPending ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="flex justify-center">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-primary">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the component with dynamic import and no SSR
export default dynamic(() => Promise.resolve(Signup), { ssr: false });
