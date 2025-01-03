import { API_URL } from "@constants";

interface requestType {
  id: string;
}

async function apiBlockUser(data: requestType) {
  const res = await fetch(`${API_URL}/users/block/${data.id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
}

export { apiBlockUser };
