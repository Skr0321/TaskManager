"use client";

import Loader from "@/components/Loader";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, AlertCircle } from "lucide-react";
import { useUserInOrg } from "@/services/usersInOrg";
import { Badge } from "@/components/ui/badge";

function OrgMember() {
  const { data, loading, error } = useUserInOrg();

  const totalMembers = data?.length || 0;
  console.log(data);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-muted-foreground">
        Unable to load organization members. Please try again later.
      </p>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage and view all organization members
        </p>
      </div>

      <Card className={"bg-2 text-white border-main"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registered Users ({totalMembers})
          </CardTitle>
          <CardDescription>
            Showing page 1 of 1 • {totalMembers} total members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-main">
            <Table>
              <TableCaption>
                A list of all organization members and their roles
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white text-center">
                    Email
                  </TableHead>
                  <TableHead className="text-center text-white">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={item.userId}>
                      <TableCell className="font-medium text-center">
                        {item.email}
                      </TableCell>
                      <TableCell className="text-center">
                        <p
                          className={` inline-block px-2 py-1 rounded-full ${
                            item.accountType === "Administrator"
                              ? "text-[#9c0b89] bg-[#e023d320]"
                              : "text-[#0b9c1c] bg-[#23e03920]"
                          }`}
                        >
                          {item.accountType}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No members found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrgMember;
