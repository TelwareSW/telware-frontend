import { API_URL } from "@constants";

async function postStory(story: File, caption: string) {
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("file", story);

  try {
    const response = await fetch(`${API_URL}/users/stories`, {
      method: "POST",
      body: formData,
      headers: {
        "X-Session-Token": localStorage.getItem("sessionId") || "",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

export { postStory };
