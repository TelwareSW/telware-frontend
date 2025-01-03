import { API_URL } from "@constants";

async function apiGetBlockList() {
  const response = await fetch(`${API_URL}/users/block`, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);
  return data.data.users;
}

export default apiGetBlockList;
