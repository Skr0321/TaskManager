export async function createTask(newTask) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/auth/task/create`;
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  console.log("Request body:", newTask);

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Adding new task Failed: ${response.status} ${response.statusText} - ${
          errorText || "No additional error details provided"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error details:", error.message);
    throw error;
  }
}
