"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { emailByToken } from "@/services/emailByToken";
import { useUserInOrg } from "@/services/usersInOrg";
import { User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Profile() {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  const {
    data: users,
    isLoading: isUserLoading,
    error: userError,
  } = useUserInOrg();

  useEffect(() => {
    async function fetchUserEmail() {
      const email = await emailByToken();
      setUserEmail(email);
    }
    fetchUserEmail();
  }, []);

  if (isUserLoading) {
    return <Loader />;
  }
  if (userError) return <div>Error fetching users</div>;

  const currentUser = users.filter((item) => item.email === userEmail);

  return (
    <div className="min-h-screen flex justify-center items-center ">
      {currentUser.map((item) => (
        <div key={item.userId} className="relative">
          <Card className="flex flex-col gap-12 w-[400px] min-h-[400px] p-4 bg-2 rounded-3xl  mb-8 border border-main   ">
            {" "}
            <CardHeader className="flex gap-12 items-center justify-center bg-4 rounded-md p-4">
              <User
                strokeWidth={3}
                size={70}
                className="bg-2 p-2 bg-4 rounded-full"
                style={{ color: "#8aff31" }}
              />
              <div>
                <CardTitle className="text-3xl primary-text">
                  My Profile
                </CardTitle>
                <p>{item.email}</p>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-4 p-4 rounded-md border border-active">
              <div>
                <p className="mb-0 ">Role</p>
                <h6 className="mt-0 p-0">{item.accountType}</h6>
              </div>
              <div>
                <p className="mb-0 ">Organization</p>
                <h6 className="mt-0 p-0">{item.organizationName}</h6>
              </div>
              <div>
                <p className="mb-0 ">Organization Role</p>
                <h6 className="mt-0 p-0">{item.role}</h6>
              </div>
              <div>
                <p className="mb-0 ">Joined</p>
                <h6 className="mt-0 p-0">{item.joinedDate}</h6>
              </div>
            </CardContent>
          </Card>
          <Button
            className="absolute top-2 right-2"
            onClick={() => router.back()}
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Profile;
