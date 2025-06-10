"use client";
import { Button } from "@/components/ui/button";

import {
  Bell,
  BellElectric,
  CalendarDays,
  CircleCheck,
  Layers2,
  ListChecks,
  LogIn,
  Plus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Hero() {
  const route = useRouter();

  function handleLogin() {
    route.push("/login");
  }

  function handleSignUp() {
    route.push("/signup");
  }

  const breafing = [
    {
      icon: <CircleCheck strokeWidth={3} />,
      title: "Easy task organization",
      color: "#6fff00",
    },
    {
      icon: <Bell strokeWidth={3} />,
      title: "Priority management",
      color: "#ffff00",
    },
    {
      icon: <CalendarDays strokeWidth={3} />,
      title: "User assignment",
      color: "#f003e0",
    },
    {
      icon: <Users strokeWidth={3} />,
      title: "Deadline tracking",
      color: "#006aff",
    },
  ];

  const working = [
    {
      logo: <Plus strokeWidth={4} />,
      work: "Create Tasks",
      workDis:
        "Add new tasks with titles, descriptions, deadlines, and priority levels.",
      color: "#ff6a00",
    },
    {
      logo: <ListChecks strokeWidth={4} />,
      work: "Track Progress",
      workDis:
        "Monitor ongoing and completed tasks with an intuitive dashboard.",
      color: "#00f2ff",
    },
    {
      logo: <Layers2 strokeWidth={4} />,
      work: "Complete Tasks",
      workDis: "Mark tasks as complete and keep track of your accomplishments.",
      color: "#ff0066",
    },
  ];

  return (
    <div>
      <Header />
      <div className="relative rounded-2xl m-4 p-8">
        <div className="absolute inset-0 bg-[url('/blackImg.jpg')] bg-cover bg-center opacity-10 rounded-2xl z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-around items-center gap-8">
          <div>
            <h1>Hello Wellcome !! </h1>
            <h2>Simplify Your Task Management</h2>
            <p className=" font-extrabold">
              <span className="text-6xl font-serif text-red-600">T</span>rack,
              organize, and complete your tasks efficiently with our
              user-friendly platform.
            </p>
            <div className="flex gap-4 mb-5">
              <Button
                onClick={handleLogin}
                className="px-10 py-6 bg-amber-50 text-black hover:text-white "
              >
                <LogIn />
                Login
              </Button>
              <Button onClick={handleSignUp} className="px-10 py-6 ">
                <BellElectric />
                Sign Up
              </Button>
            </div>
            <div className="grid  sm:grid-cols-2 grid-cols-1  w-3/4">
              {breafing.map((item, id) => (
                <div key={id} className="flex gap-3 items-center">
                  <p style={{ color: item.color }} className="font-bold">
                    {item.icon}
                  </p>
                  <p className="font-extrabold">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
      </div>
      <section className="text-center">
        <h2 className="mb-5">How It Works</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 items-center gap-4 p-4">
          {working.map((item, id) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center bg-2 p-8 rounded-2xl mb-8 border border-main"
            >
              <span
                className="p-4 color-3 rounded-full"
                style={{ color: item.color }}
              >
                {item.logo}
              </span>
              <h3>{item.work}</h3>
              <p>{item.workDis}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Hero;
