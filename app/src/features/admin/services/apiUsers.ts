import { API_URL } from "@constants";

async function apiGetUsers() {
  const res = await fetch(`${API_URL}/admin/groups`, {
    method: "GET",
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
async function apiDeactivateUser(userId: string) {
  const res = await fetch(`${API_URL}/admin/deactivate/${userId}`, {
    method: "PATCH",
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
async function apiBanUser(userId: string) {
  const res = await fetch(`${API_URL}/admin/ban/${userId}`, {
    method: "PATCH",
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

async function apiActivateUser(userId: string) {
  const res = await fetch(`${API_URL}/admin/activate/${userId}`, {
    method: "PATCH",
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

export { apiGetUsers, apiDeactivateUser, apiBanUser, apiActivateUser };
