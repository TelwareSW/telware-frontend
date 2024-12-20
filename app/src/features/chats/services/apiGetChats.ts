import { API_URL } from "@constants";

export async function getAllChatsApi() {
  const res = await fetch(`${API_URL}/chats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
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
  if (!id) return;
  const res = await fetch(`${API_URL}/chats/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
    credentials: "include",
  });

  const data = await res.json();

  console.log(data);

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data?.chat;
}
