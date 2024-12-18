import { API_URL } from "@constants";

async function apiGetGroups() {
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
async function apiFilterGroup(groupId: string) {
  const res = await fetch(`${API_URL}/admin/filter/${groupId}`, {
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

async function apiUnfilterGroup(groupId: string) {
  const res = await fetch(`${API_URL}/admin/unfilter/${groupId}`, {
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

export { apiGetGroups, apiFilterGroup, apiUnfilterGroup };
