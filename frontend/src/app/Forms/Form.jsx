"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./FormFields";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for App Router
import Loader from "@/components/Loader";
import { X } from "lucide-react";

const Form = ({
  fields,
  onSubmit,
  defaultValues,
  loading,
  resetTrigger,
  setResetTrigger,
  schema,
  grid,
  inViewMode = false,
  submitButtonText = "Submit",
  cancelButtonText,
  showCancelButton = true,
  cancelRoute,
  linkRoute,
  linkText,
  formTitle,
  formSubTitle,
  error,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
  });

  const router = useRouter();

  useEffect(() => {
    if (resetTrigger) {
      reset();
      setResetTrigger(false);
    }
  }, [resetTrigger, reset, setResetTrigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 ">
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <div className="flex flex-col justify-center items-center  ">
        <div className="bg-2 p-8 rounded-xl ">
          {/* <span className="flex justify-end mb-2">
            <Button onClick={() => router.back()}>
              <X />
            </Button>
          </span> */}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div
            className={cn(
              grid
                ? typeof grid === "string"
                  ? grid
                  : "grid grid-cols-2 gap-x-6 gap-y-5"
                : "flex flex-col gap-3"
            )}
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="mb-2">{formTitle}</h2>
              {formSubTitle && <h5>{formSubTitle}</h5>}
            </div>

            {fields.map((field) => (
              <FormField
                key={field.fieldName}
                field={field}
                formRegister={register}
                formControl={control}
                errors={errors}
              />
            ))}
          </div>

          {!inViewMode && (
            <>
              <div className="flex flex-col justify-center gap-4 mt-6 items-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white"
                >
                  {loading ? "Submitting..." : submitButtonText}
                </Button>

                {linkRoute && linkText && (
                  <Link
                    href={linkRoute}
                    className="text-blue-500 hover:underline"
                  >
                    {linkText}
                  </Link>
                )}
              </div>

              <div className="flex justify-end">
                {" "}
                {showCancelButton && cancelButtonText && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      cancelRoute ? router.push(cancelRoute) : router.back()
                    }
                    className="bg-2 border-main text-secondarry"
                  >
                    {cancelButtonText}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
