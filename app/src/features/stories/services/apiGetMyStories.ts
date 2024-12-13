import { API_URL } from "@constants";

async function getMyStories() {
  try {
    const response = await fetch(`${API_URL}/users/stories`, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-Session-Token": localStorage.getItem("sessionId") || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch stories", error);
    throw error;
  }
}

export { getMyStories };
