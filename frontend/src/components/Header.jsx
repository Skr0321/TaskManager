"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { isTokenValid } from "@/app/Auth/ProtectedRoute";
import {
  ListChecks,
  LogOut,
  UserRound,
  Menu,
  X,
  Plus,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = isTokenValid();

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    router.push("/hero");
    setIsOpen(!isOpen);
  }

  function handleLogin() {
    router.push("/login");
    setIsOpen(!isOpen);
  }

  function handleSignUp() {
    router.push("/signup");
    setIsOpen(!isOpen);
  }

  function handleCreateTask() {
    setIsOpen(!isOpen);

    router.push("/new-task");
  }

  function hadleOrg() {
    setIsOpen(!isOpen);
    router.push("org-member");
  }

  function handleTask() {
    setIsOpen(!isOpen);
    router.push("/tasks");
  }

  return (
    <header className="bg-2 p-4 w-full ">
      <div className="flex justify-between items-center relative">
        <h3 className="text-xl font-bold">Task Manager</h3>

        <Button className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>

        <div className="hidden md:flex gap-3">
          {isLogin ? (
            <>
              <Button onClick={() => router.push("/profile")}>
                <UserRound className="text-yellow-600 mr-2" strokeWidth={4} />
                Profile
              </Button>

              <Button onClick={handleCreateTask}>
                <Plus className="text-green-600 mr-2" strokeWidth={4} />
                Add Task
              </Button>

              <Button onClick={hadleOrg}>
                <Building className="text-pink-600 mr-2" strokeWidth={4} />
                Organization
              </Button>

              <Button onClick={handleTask}>
                <ListChecks className="text-red-600 mr-2" strokeWidth={4} />
                Tasks
              </Button>
              <Button onClick={handleLogout}>
                <LogOut className="text-blue-600 mr-2" strokeWidth={4} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleSignUp}>Sign up</Button>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 absolute w-full bg-2 p-4 left-0">
          {isLogin ? (
            <>
              <Button onClick={() => router.push("/profile")}>
                <UserRound className="text-yellow-600 mr-2" strokeWidth={4} />
                Profile
              </Button>
              <Button onClick={handleCreateTask}>
                <Plus className="text-green-600 mr-2" strokeWidth={4} />
                Add Task
              </Button>

              <Button onClick={hadleOrg}>
                <Building className="text-pink-600 mr-2" strokeWidth={4} />
                Organization
              </Button>

              <Button onClick={handleTask}>
                <ListChecks className="text-red-600 mr-2" strokeWidth={4} />
                Tasks
              </Button>
              <Button onClick={handleLogout}>
                <LogOut className="text-blue-600 mr-2" strokeWidth={4} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleSignUp}>Sign up</Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
