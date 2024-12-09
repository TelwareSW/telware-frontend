import { API_URL } from "@constants";

async function viewStory(storyId: string) {
  try {
    const response = await fetch(`${API_URL}/stories/${storyId}/views`, {
      method: "POST",
      headers: {
        "X-Session-Token": localStorage.getItem("sessionId") || "",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to view image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Image view error:", error);
    throw error;
  }
}

export { viewStory };
