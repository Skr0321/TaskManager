"use client";

import { useState } from "react";
import Form from "../Forms/Form";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";

const formSchema = z.object({
  emailAddress: z
    .string()
    .min(3, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password is requried" }),
});

function page() {
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const fields = [
    {
      fieldName: "emailAddress",
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
    emailAddress: "",
    password: "",
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.emailAddress, data.password);
      setResetTrigger(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
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
      linkRoute="/signup"
      isGoogle="Sign in whith Google"
      linkText="Don't have an account? Sign up now"
      grid="grid grid-cols-1 gap-y-4 max-w-md mx-auto"
    />
  );
}

export default page;
