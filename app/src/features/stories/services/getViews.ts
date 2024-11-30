import { API_URL } from "@constants";

async function getViews(storyId: string) {
  try {
    const response = await fetch(`${API_URL}/stories/${storyId}/views`, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-Session-Token": localStorage.getItem("sessionId") || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch views");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch views", error);
    throw error;
  }
}

export { getViews };
