import { API_URL } from "@constants";

import { BlockedUserProps } from "../BlockItem";

async function apiGetBlockList() {
  const response = await fetch(`${API_URL}/users/blocked`, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);
  return data.users as BlockedUserProps[];
}

export default apiGetBlockList;
