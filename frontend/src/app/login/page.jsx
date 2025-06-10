"use client";

import { useState } from "react";
import Form from "../Forms/Form";
import { z } from "zod";
import { loginUser } from "@/services/loginUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: "Password is requried" }),
});

function Login() {
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const fields = [
    {
      fieldName: "email",
      fieldLabel: "Email Address",
      type: "email",
      placeholder: "Enter email..",
    },
    {
      fieldName: "password",
      fieldLabel: "Password",
      type: "password",
      placeholder: "Enter Password..",
      showPassDetail: false,
    },
  ];

  const defaultValues = {
    email: "",
    password: "",
  };

  async function onSubmit(data) {
    setLoading(true);
    try {
      await loginUser(data);
      setResetTrigger(true);
      toast("Loged in Sucessfully ", {
        action: { label: "Undo" },
        description: "Your now logded in 🥳",
      });
      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className=" absolute z-0 ">
        <Image
          width={100}
          height={100}
          src={"/background.svg"}
          alt="background pattern"
          className="w-full h-full object-cover "
        />
      </div>
      <div className=" p-8 relative  ">
        <Form
          fields={fields}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          loading={loading}
          resetTrigger={resetTrigger}
          setResetTrigger={setResetTrigger}
          schema={formSchema}
          formTitle="Welcome Back"
          formSubTitle="Sign in to your account to continue"
          submitButtonText="Sign in"
          error={error}
          linkRoute="/signup"
          linkText="Don't have an account? Sign up now"
          grid="grid grid-cols-1 gap-y-4 max-w-md mx-auto"
        />
      </div>
    </div>
  );
}

export default Login;
