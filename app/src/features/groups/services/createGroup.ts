import { API_URL } from "@constants";

type dataType = {
  name: string;
  picture: string;
  members: [];
};

async function createGroup(group: dataType) {
  //TODO: change when the backend rename it😆
  const res = await fetch(`${API_URL}/group`, {
    method: "POST",
    body: JSON.stringify(group),
    headers: {
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to create group");
  }

  const data = await res.json();
  return data;
}

export { createGroup };
