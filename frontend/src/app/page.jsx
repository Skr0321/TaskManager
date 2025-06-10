"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { decodeJwtToken } from "@/lib/decodeJwt";
import { useUserInOrg } from "@/services/usersInOrg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold mb-4">
              Hi there{" "}
              <span className="text-red-400">{currentUser?.email}</span>,
              <br />
              Welcome back!
            </h1>
            <h2 className="text-2xl mb-2">
              Org: {currentUser?.organizationName}
            </h2>

            <div className="space-y-6 max-w-xl">
              <p className="text-xl text-slate-300">
                "Productivity is never an accident. It is always the result of a
                commitment to excellence, intelligent planning, and focused
                effort."
              </p>
              <p className="text-slate-400 italic">— Paul J. Meyer</p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3">Today's Focus</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Complete high-priority tasks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Review project milestones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Plan tomorrow's schedule</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Button
                  className="text-xl bg-green-700 px-6 py-6 rounded-md hover:bg-green-800 transition flex items-center gap-2"
                  onClick={() => router.push("/tasks")}
                >
                  Go to Tasks <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/imgg.jpg?height=500&width=500"
                alt="Productivity illustration"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
                style={{
                  objectFit: "cover",
                  filter: "drop-shadow(0 0 0.75rem rgba(0, 255, 0, 0.2))",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
