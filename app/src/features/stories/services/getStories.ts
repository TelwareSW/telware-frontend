import { API_URL } from "@constants";

async function getStories() {
  try {
    const response = await fetch(`${API_URL}/users/contacts/stories`, {
      method: "GET",
      credentials: "include",
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

export { getStories };
