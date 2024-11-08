import { API_URL } from "@constants";

interface requestType {
  id: string;
}

async function blockUser(data: requestType) {
  const res = await fetch(`${API_URL}/users/block/${data.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
}

export { blockUser };
