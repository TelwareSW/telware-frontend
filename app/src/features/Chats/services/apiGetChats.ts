import { API_URL } from "@constants";

export async function getAllChatsApi() {
  const res = await fetch(`${API_URL}/chats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}

export async function getChatApi(id: string) {
  const res = await fetch(`${API_URL}/chat/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
