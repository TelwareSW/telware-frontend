import { API_URL } from "@constants";

async function DeleteStory(storyId: string) {
  const res = await fetch(`${API_URL}/users/stories/${storyId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data;
}

export { DeleteStory };
