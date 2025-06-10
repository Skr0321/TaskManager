import { decodeJwtToken } from "@/lib/decodeJwt";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

async function getTaskById(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/auth/task/${id}`;
  const { token } = decodeJwtToken();

  const fullUrl = url;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Getting users in organization failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json();
}

export function useGetTasksById() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return useQuery({
    queryKey: ["getTaskById", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}
