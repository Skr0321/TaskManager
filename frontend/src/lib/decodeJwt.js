import { useUserInOrg } from "@/services/usersInOrg";

export function decodeJwtToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return "np";
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
  return { token, userEmail };
}
