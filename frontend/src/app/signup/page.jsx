"use client";

import React, { useState } from "react";
import { z } from "zod";

import Form from "../Forms/Form";

import { registerUsers } from "@/services/RegisterUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const radioBtn = [
  { opt: "Regular User", sub: "Join an existing organization" },
  { opt: "Administrator", sub: "Create and manage your organization" },
];

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    accountType: z.enum(["Regular User", "Administrator"], {
      errorMap: () => ({
        message: "Please select a valid account type",
      }),
    }),
    organizationName: z.string().optional(),
  })
  .refine(
    (data) =>
      data.accountType !== "Administrator" ||
      (data.accountType === "Administrator" &&
        data.organizationName?.length > 0),
    {
      message: "Organization name is required for Administrator",
      path: ["organizationName"],
    }
  );

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
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
      showPassDetail: true,
    },
    {
      fieldName: "accountType",
      fieldLabel: "Account Type",
      type: "radiobtn",
      options: radioBtn.map((item) => ({
        value: item.opt,
        label: item.opt,
        subheading: item.sub,
      })),
    },
    {
      fieldName: "organizationName",
      fieldLabel: "Organization Name",
      type: "text",
      placeholder: "Your Organization (Optional)",
      subtext: "Leave empty to join an existing organization later",
    },
  ];

  const defaultValues = {
    email: "",
    password: "",
    accountType: "",
    organizationName: "",
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUsers(data);
      console.log("Form data:", data);
      setResetTrigger(true);
      toast.success("You have Registered Sucessfully 🥳", {
        action: { label: "Undo" },
        description: (
          <p className="mb-0 text-sm">
            Kindly login with the registered Email and Password do not forget it
            😉
          </p>
        ),
      });
      router.push("/login");
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
      formTitle="Create Account"
      formSubTitle="Sign up to get started with Task Management"
      submitButtonText="Sign Up"
      linkRoute="/login"
      linkText="Already have an account? Log in"
      grid="grid grid-cols-1 gap-y-4 max-w-md mx-auto"
    />
  );
}
