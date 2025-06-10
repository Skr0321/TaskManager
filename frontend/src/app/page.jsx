"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { decodeJwtToken } from "@/lib/decodeJwt";
import { useUserInOrg } from "@/services/usersInOrg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, isLoading, error } = useUserInOrg();
  const { userEmail } = decodeJwtToken();

  const currentUser = data?.find((item) => item.email === userEmail);

  if (isLoading) {
    return <Loader />;
  }

  if (error) return <div>Error fetching users</div>;

  return (
    <div className=" p-8 min-h-screen ">
      <h1 className="text-4xl font-bold mb-4">
        Hi there <span className="text-red-400">{currentUser?.email}</span>,
        Welcome back!
      </h1>
      <h2 className="text-2xl mb-2">Org: {currentUser?.organizationName}</h2>
      <p className="mb-6 text-lg">Click below to see your tasks 👇</p>
      <Button
        className="text-xl bg-green-700 px-6 py-3 rounded-md hover:bg-green-800 transition"
        onClick={() => router.push("/tasks")}
      >
        Go to Tasks
      </Button>
    </div>
  );
}
