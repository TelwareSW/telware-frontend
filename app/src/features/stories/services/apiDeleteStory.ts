import { API_URL } from "@constants";

async function DeleteStory(storyId: string) {
  const res = await fetch(`${API_URL}/users/stories/${storyId}`, {
    method: "DELETE",
    headers: {
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  if (res.status === 204) {
    return { status: "success", message: "Story deleted successfully." };
  }

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data;
}

export { DeleteStory };
