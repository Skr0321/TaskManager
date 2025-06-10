import { decodeJwtToken } from "@/lib/decodeJwt";
import { useQuery } from "@tanstack/react-query";

async function getUsersInOrg() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/auth/users/organization`;
  const { token, userEmail } = decodeJwtToken();
  const params = new URLSearchParams({ email: userEmail });
  const fullUrl = `${url}?${params.toString()}`;

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

export function useUserInOrg() {
  return useQuery({
    queryKey: ["userInOrg"],
    queryFn: getUsersInOrg,
  });
}
