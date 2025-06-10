"use client";
import { useState } from "react";
import Form from "../Forms/Form";
import { z } from "zod";
import { createTask } from "@/services/addTask";
import { useUserInOrg } from "@/services/usersInOrg";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { decodeJwtToken } from "@/lib/decodeJwt";
import { toast } from "sonner";

const formSchema = z.object({
  taskTitle: z.string().min(3, { message: "Task is required to enter 😂" }),
  description: z.string().min(3, { message: "Please describe the task 🫀" }),
  deadline: z.date({ message: "Provide the deadline 🗓️" }),
  priority: z.string().min(1, { message: "Provide the Priority" }),
  assignTo: z.string().min(1, { message: "Who to assign this task to?" }),
});

const priority = [
  { priority: "High" },
  { priority: "Medium" },
  { priority: "Low" },
];

function NewTask() {
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const {
    data: users,
    isLoading: isUserLoading,
    error: userError,
  } = useUserInOrg();
  const router = useRouter();
  const { userEmail } = decodeJwtToken();

  const currentUser = users?.find((item) => item.email === userEmail);
  console.log(currentUser);

  console.log(users);

  if (isUserLoading) {
    return <Loader />;
  }
  if (userError) return <div>Error fetching users</div>;
  const fields = [
    {
      fieldName: "taskTitle",
      fieldLabel: "Task",
      type: "text",
      placeholder: "Enter task...",
    },
    {
      fieldName: "description",
      fieldLabel: "Task Description",
      type: "textarea",
      placeholder: "Enter description...",
    },
    {
      fieldName: "deadline",
      fieldLabel: "Deadline",
      type: "date-picker",
      placeholder: "MM/DD/YYYY",
    },
    {
      fieldName: "priority",
      fieldLabel: "Priority",
      type: "select",
      options: priority.map((item) => ({
        value: item.priority,
        label: item.priority,
      })),
      placeholder: "Select priority...",
    },
    ...(currentUser.role === "admin"
      ? [
          {
            fieldName: "assignTo",
            fieldLabel: "Assign to",
            type: "select",
            options: users.map((item) => ({
              value: item.userId,
              label: item.email,
            })),
            placeholder: "Select user...",
          },
        ]
      : []),
  ];

  const defaultValues = {
    taskTitle: "",
    description: "",
    deadline: undefined,
    priority: "",
    assignTo: "",
  };

  async function onSubmit(data) {
    setLoading(true);
    try {
      const purchaseDate = new Date(data.deadline);
      purchaseDate.setHours(0, 0, 0, 0);
      const year = purchaseDate.getFullYear();
      const month = String(purchaseDate.getMonth() + 1).padStart(2, "0");
      const day = String(purchaseDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const newTasks = {
        taskTitle: data.taskTitle,
        description: data.description,
        deadline: formattedDate,
        priority: data.priority.toUpperCase(),
        assignTo: data.assignTo,
      };

      console.log(newTasks);
      await createTask(newTasks);
      setResetTrigger(true);
      toast.success("New Task Created 🥳", {
        action: { label: "Close" },
      });
      router.push("/tasks");
    } catch (error) {
      toast.error(error.message, {
        description: "There is an error while adding task",
        action: { label: "Close" },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading}
      resetTrigger={resetTrigger}
      setResetTrigger={setResetTrigger}
      schema={formSchema}
      formTitle="Create New Task"
      formSubTitle="Fill in the details below to create a task"
      submitButtonText="Create Task"
      linkRoute="/"
      cancelButtonText="Go back"
      grid="grid grid-cols-1 gap-y-4 max-w-md mx-auto"
    />
  );
}

export default NewTask;
