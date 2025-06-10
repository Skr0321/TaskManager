import { useQuery } from "@tanstack/react-query";

async function getCompletedTask() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/auth/task/completed`;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated: No token found in localStorage");
  }

  let userEmail = null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    userEmail = payload.sub;
    if (!userEmail) {
      throw new Error("No email found in JWT payload");
    }
  } catch (error) {
    console.error("Error decoding JWT:", error.message);
    throw new Error(`User not authenticated: ${error.message}`);
  }

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

export function useGetCompletedTasks() {
  return useQuery({
    queryKey: ["getCompletedTasks"],
    queryFn: getCompletedTask,
  });
}
