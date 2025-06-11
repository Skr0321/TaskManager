"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  if (userError)
    return <div className="text-center text-red-500">Error fetching users</div>;

  const currentUser = users.filter((item) => item.email === userEmail);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-6">
      {currentUser.map((item) => (
        <div
          key={item.userId}
          className="relative w-full max-w-[400px] mx-auto"
        >
          <Card className="flex flex-col gap-6 w-full p-4 sm:p-6 bg-2 rounded-3xl my-6 border border-main">
            <CardHeader className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center bg-4 rounded-md p-4 sm:p-6 mt-6">
              <User
                strokeWidth={3}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-2 p-2 rounded-full"
                style={{ color: "#8aff31" }}
              />
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl sm:text-3xl primary-text truncate">
                  My Profile
                </CardTitle>
                <p className="text-sm sm:text-base break-all">{item.email}</p>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-4 p-4 sm:p-6 rounded-md border border-active">
              <div>
                <p className="mb-0 text-sm sm:text-base">Role</p>
                <h6 className="mt-0 p-0 text-base sm:text-lg truncate">
                  {item.accountType}
                </h6>
              </div>
              <div>
                <p className="mb-0 text-sm sm:text-base">Organization</p>
                <h6 className="mt-0 p-0 text-base sm:text-lg truncate">
                  {item.organizationName}
                </h6>
              </div>
              <div>
                <p className="mb-0 text-sm sm:text-base">Organization Role</p>
                <h6 className="mt-0 p-0 text-base sm:text-lg truncate">
                  {item.role}
                </h6>
              </div>
              <div>
                <p className="mb-0 text-sm sm:text-base">Joined</p>
                <h6 className="mt-0 p-0 text-base sm:text-lg truncate">
                  {item.joinedDate}
                </h6>
              </div>
            </CardContent>
          </Card>
          <Button
            className="absolute top-8 right-4"
            onClick={() => router.back()}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 " />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Profile;