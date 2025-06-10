export async function completedTask(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/auth/task/${id}/complete`;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Adding new task Failed: ${response.status} ${response.statusText} - ${
          errorText || "No additional error details provided"
        }`
      );
    }

    return response;
  } catch (error) {
    console.error("Fetch error details:", error.message);
    throw error;
  }
}
