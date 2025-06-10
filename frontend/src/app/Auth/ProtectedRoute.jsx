"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthLayout from "./AuthLayout";

// Utility function to check if JWT token is valid
export function isTokenValid() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    return Date.now() <= expiry;
  } catch (error) {
    return false;
  }
}

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/signup", "/about", "/contact", "/hero"];

  useEffect(() => {
    const checkAuth = () => {
      const isValid = isTokenValid();
      setIsAuthenticated(isValid);

      if (isValid) {
        if (publicRoutes.includes(pathname)) {
          router.push("/tasks");
        }
      } else {
        // Redirect unauthenticated users to /hero for non-public routes
        if (!publicRoutes.includes(pathname)) {
          router.push("/hero");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Render AuthLayout for public auth routes if not authenticated
  if (!isAuthenticated && publicRoutes.includes(pathname)) {
    return <AuthLayout />;
  }

  // Render children for authenticated users or non-auth public routes
  return isAuthenticated || publicRoutes.includes(pathname) ? (
    <>{children}</>
  ) : null;
}
