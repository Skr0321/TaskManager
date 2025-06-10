"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { decodeJwtToken } from "@/lib/decodeJwt";
import { useGetCompletedTasks } from "@/services/getCompletedTask";
import { useGetTasks } from "@/services/getTasks";
import { useUserInOrg } from "@/services/usersInOrg";
import { Arrow } from "@radix-ui/react-popover";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Tasks() {
  const router = useRouter();
  const { userEmail } = decodeJwtToken();

  const {
    data: tasks,
    isLoading: isTaskLoading,
    error: taskError,
  } = useGetTasks();

  const {
    data: completedTask,
    isLoading: isComletedTaskLoading,
    error: completedTaskError,
  } = useGetCompletedTasks();

  const {
    data: userDetails,
    isLoading: isUrserLoading,
    error: userDetailsError,
  } = useUserInOrg();

  const authUser = userDetails?.find((item) => item.email === userEmail);
  const filterdTask = tasks?.filter((item) => !item.completed);

  function handleEdit(id) {
    router.push(`/task-discription?id=${encodeURIComponent(id)}`);
  }

  function handleAddTask() {
    router.push("/new-task");
  }

  if (isTaskLoading || isComletedTaskLoading || isUrserLoading) {
    return <Loader />;
  }
  if (taskError || completedTaskError || userDetailsError)
    return <div>Error fetching users</div>;

  return (
    <div>
      {authUser.role === "admin" && (
        <span className="flex justify-end p-4">
          <Button onClick={handleAddTask} className=" py-4 text-black bg-3">
            <Plus className=" " strokeWidth={3} />
            Add Tasks
          </Button>
        </span>
      )}
      <div className="flex flex-col lg:flex-row justify-center  gap-4 p-4  ">
        <section className=" bg-amber-100/5 rounded-sm  flex-1 overflow-hidden min-h-[300px] ">
          <h2
            style={{
              backgroundImage: "url('/headerTasks1.svg')",
              backgroundSize: "40%",
            }}
            className="rounded-md p-4 font-bold "
          >
            Ongoing Tasks 🗓️
          </h2>
          {filterdTask.length > 0 ? (
            filterdTask.map((item, id) => (
              <div
                className="flex justify-between items-center rounded-sm  mt-4 gap-8 cursor-pointer bg-2 border border-main"
                key={id}
                onClick={() => handleEdit(item.id)}
              >
                <section className="overflow-hidden flex flex-col gap-4 p-4">
                  <h4 className="mb-0 p-0">{item.taskTitle}</h4>
                  <p className="secondry-text mb-0">{item.description}</p>
                </section>
                <section className=" flex flex-col items-end gap-4 p-4">
                  <span
                    className={`  font-bold rounded-md px-4 py-1 ${
                      item.priority === "LOW"
                        ? "text-[#40d01c] bg-[#93f8713a]"
                        : item.priority === "HIGH"
                        ? "text-[#d01c1c] bg-[#f871713a]"
                        : "text-[#bbd01c] bg-[#edf8713a]"
                    }`}
                  >
                    {item.priority}
                  </span>
                  <p className="m-0"> {item.assignToEmail}</p>
                </section>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h5>There is no task assigned</h5>
              {authUser.role === "admin" ? (
                <Link href={"/new-task"} className="underline p-4">
                  Add new Tasks
                </Link>
              ) : (
                <h5>Just Chill 🥳</h5>
              )}
            </div>
          )}
        </section>
        <section className=" bg-green-200/5 rounded-md flex-1 overflow-hidden  min-h-[300px]">
          <h2
            className=" rounded-sm  p-4"
            style={{
              backgroundImage: "url('/headerTasks2.svg')",
              backgroundSize: "40%",
            }}
          >
            Completed Tasks ✔️
          </h2>
          {completedTask.length > 0 ? (
            completedTask.map((item, id) => (
              <div
                className="flex mt-4 justify-between items-center rounded-sm  overflow-hidden cursor-pointer bg-2 border border-main"
                key={id}
                onClick={() => handleEdit(item.id)}
              >
                <section className=" overflow-hidden flex flex-col gap-4 p-4">
                  <h4 className="mb-0 p-0">{item.taskTitle}</h4>
                  <p className="secondry-text mb-0">{item.description}</p>
                </section>
                <section className=" flex flex-col gap-4 p-4 items-end ">
                  <span
                    className={`  font-bold rounded-md px-4 py-1 ${
                      item.priority === "LOW"
                        ? "text-[#40d01c] bg-[#93f8713a]"
                        : item.priority === "HIGH"
                        ? "text-[#d01c1c] bg-[#f871713a]"
                        : "text-[#bbd01c] bg-[#edf8713a]"
                    }`}
                  >
                    {item.priority}
                  </span>
                  <p className="m-0"> {item.assignToEmail}</p>
                </section>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h5>There nothing to be completed all done ✔️😐</h5>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Tasks;
