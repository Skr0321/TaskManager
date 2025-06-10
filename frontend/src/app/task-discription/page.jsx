"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Check,
  Clock,
  FilePenLine,
  Trash2,
  UserRound,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { useGetTasksById } from "@/services/getTaskById";
import { completedTask } from "@/services/putCompleted";
import { deleteTask } from "@/services/deleteTask";
import { toast } from "sonner";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function TaskDiscription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: task,
    isLoading: isUserLoading,
    error: userError,
  } = useGetTasksById();

  const tasks = Array.isArray(task) ? task : [task];

  function handleEdit() {
    router.push(`/edit-task?id=${encodeURIComponent(id)}`);
  }

  function handleCompleted() {
    completedTask(id);
    toast.success("Task Completed ✔️", {
      action: { label: "close" },
      description: "Task had me moved to completed 😉",
    });
    router.push("/tasks");
  }

  function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    deleteTask(id);
    toast.success("Task Deleted❌", {
      description: "Youve successfully removed the task.",
      action: { label: "close" },
    });
    router.push("/tasks");
  }

  if (isUserLoading) {
    return <Loader />;
  }
  if (userError) return <div>Error fetching users</div>;
  return (
    <div className="min-h-screen flex items-center justify-center">
      {tasks.map((item) => (
        <Card
          className="rounded-md max-w-[800px] mx-auto m-4 bg-2  border border-main flex flex-col flex-1 p-4 "
          key={item.id}
        >
          <CardHeader className="flex flex-col primary-text border border-main p-4 rounded-md gap-8">
            <div className="flex justify-between items-center w-full">
              <CardTitle className="max-w-[400px] text-3xl overflow-hidden">
                {item.taskTitle}
              </CardTitle>
              <CardTitle
                className={` text-md font-bold m-0 rounded-full p-2  flex justify-center items-center gap-2 primary-text ${
                  item.completed === true
                    ? "text-[#2ed01c] bg-[#71f8763a]"
                    : "text-[#d01c85] bg-[#f871d43a]"
                }`}
              >
                <Clock strokeWidth={2} />
                {item.completed === false ? "In Progress" : "Completed"}
              </CardTitle>
            </div>
            <div className="flex justify-start gap-4">
              <CardTitle className=" text-[#1c1cd0] bg-[#7671f839] primary-text font-semibold rounded-sm flex justify-center items-center gap-2 px-2">
                <Calendar strokeWidth={2} /> {item.deadline}
              </CardTitle>
              <CardTitle
                className={` px-6 py-2 rounded-sm font-semibold flex  items-center ${
                  item.priority === "LOW"
                    ? "text-[#40d01c] bg-[#93f8713a]"
                    : item.priority === "HIGH"
                    ? "text-[#d01c1c] bg-[#f871713a]"
                    : "text-[#bbd01c] bg-[#edf8713a]"
                } `}
              >
                {item.priority}
              </CardTitle>
              <CardTitle className=" text-[#1cd08e] bg-[#71f8d939] primary-text font-semibold px-2 rounded-sm flex  items-center gap-2 ">
                <UserRound strokeWidth={2} />
                {item.assignToEmail}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 p-6 bg-4 rounded-md border border-hover ">
            <h3 className="">Description</h3>
            <p className="p-3 bg-2 rounded-sm w-full overflow-hidden">
              {item.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-start gap-4 p-4">
            {!item.completed && (
              <Button className={"bg-green-700"} onClick={handleCompleted}>
                {" "}
                <Check />
                Mark as Complete
              </Button>
            )}
            <Button className={"bg-blue-700"} onClick={handleEdit}>
              {" "}
              <FilePenLine />
              Edit Task
            </Button>
            <Button className={"bg-red-700"} onClick={handleDelete}>
              {" "}
              <Trash2 />
              Delete task
            </Button>
            <Button onClick={() => router.back()}>Close</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default TaskDiscription;
