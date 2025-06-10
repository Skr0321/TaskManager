export async function loginUser(userDetails) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(baseUrl);
  if (!baseUrl) {
    throw new Error("API base URL is not defined. Check your .env file.");
  }
  const url = `${baseUrl}/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Login failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    const jwtToken = data.token;
    if (!jwtToken) {
      throw new Error("No JWT token received in response");
    }

    localStorage.setItem("token", jwtToken);
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timed out after 5 seconds");
      throw new Error(
        "Login request timed out. Please check the server and network."
      );
    }
    console.error("Fetch error details:", error.message);
    throw error;
  }
}
