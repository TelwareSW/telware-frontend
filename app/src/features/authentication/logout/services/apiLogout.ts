import { API_URL } from "@constants";

export async function logout() {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to logout");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
