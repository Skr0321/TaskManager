"use client";
import { useState } from "react";
import Form from "../Forms/Form";
import { number, z } from "zod";
import { useUserInOrg } from "@/services/usersInOrg";
import Loader from "@/components/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetTasksById } from "@/services/getTaskById";
import { updateTask } from "@/services/updateTasl";
import { toast } from "sonner";
import { decodeJwtToken } from "@/lib/decodeJwt";

const formSchema = z.object({
  taskTitle: z.string().min(3, { message: "Task is required to enter 😂" }),
  description: z.string().min(3, { message: "Please describe the task 🫀" }),
  deadline: z.date({ message: "Provide the deadline 🗓️" }),
  priority: z.string().min(1, { message: "Provide the Priority" }),
  assignTo: z.union([
    z.string().min(1, { message: "Who to assign this task to?" }),
    z.number(),
  ]),
});

const priority = [
  { priority: "High" },
  { priority: "Medium" },
  { priority: "Low" },
];

function EditTask() {
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const router = useRouter();

  const {
    data: users,
    isLoading: isUserLoading,
    error: userError,
  } = useUserInOrg();
  const {
    data: task,
    isLoading: isTaskLoading,
    error: taskError,
  } = useGetTasksById();

  const { userEmail } = decodeJwtToken();

  const currentUser = users?.find((item) => item.email === userEmail);
  console.log(currentUser);
  const role = currentUser?.role;
  console.log(role);

  if (isUserLoading || isTaskLoading) {
    return <Loader />;
  }
  if (userError || taskError) return <div>Error fetching users</div>;

  const normalizedPriority = task.priority
    ? task.priority.charAt(0).toUpperCase() +
      task.priority.slice(1).toLowerCase()
    : "";

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
    ...(role === "admin"
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

  // Set defaultValues based on the first task
  const defaultValues = {
    taskTitle: task.taskTitle || "",
    description: task.description || "",
    deadline: task.deadline ? new Date(task.deadline) : undefined,
    priority: normalizedPriority || "",
    assignTo: task.assignTo || "",
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

      await updateTask(newTasks, id);
      setResetTrigger(true);
      toast.success("Task as been updated 🔄️", { action: { label: "close" } });
      router.push("/tasks");
    } catch (error) {
      toast.error("You cannot update the tasks assigned to other members 😐", {
        description: <p className="mb-0 text-sm">Update your task😉</p>,
        action: { label: "close" },
      });
      router.push("/tasks");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form
        fields={fields}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        loading={loading}
        resetTrigger={resetTrigger}
        setResetTrigger={setResetTrigger}
        schema={formSchema}
        formTitle="Edit Task "
        formSubTitle="Fill in the details below to Edit a task"
        submitButtonText="Edit Task"
        linkRoute="/"
        cancelButtonText="Cancle"
        grid="grid grid-cols-1 gap-y-4 max-w-md mx-auto"
      />
    </div>
  );
}

export default EditTask;
