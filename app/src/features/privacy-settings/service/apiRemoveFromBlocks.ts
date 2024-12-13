import { API_URL } from "@constants";

interface requestType {
  id: string;
}

async function removeFromBlock(data: requestType) {
  const res = await fetch(`${API_URL}/users/block/${data.id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
}

export { removeFromBlock };
