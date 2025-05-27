"use client";

import { usePathname } from "next/navigation";
import Login from "@/app/login/page";
import Signup from "@/app/signup/page";
import Image from "next/image";

export default function AuthLayout() {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/login" ? (
        <Login />
      ) : pathname === "/signup" ? (
        <Signup />
      ) : null}
    </>
  );
}
