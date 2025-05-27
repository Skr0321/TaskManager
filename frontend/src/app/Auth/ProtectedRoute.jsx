"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/services/firebase";
import AuthLayout from "./AuthLayout";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Define public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/about", "/contact"];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        // Redirect authenticated users away from public auth routes
        if (publicRoutes.includes(pathname)) {
          router.push("/");
        }
      } else {
        setIsAuthenticated(false);
        // Redirect unauthenticated users to login for non-public routes
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
