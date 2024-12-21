import { API_URL } from "@constants";

async function apiGetGroups() {
  try {
    const res = await fetch(`${API_URL}/users/all-groups`, {
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
}
async function apiFilterGroup(groupId: string) {
  try {
    const res = await fetch(`${API_URL}/chats/groups/filter/${groupId}`, {
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to filter group", error);
    throw error;
  }
}

async function apiUnfilterGroup(groupId: string) {
  try {
    const res = await fetch(`${API_URL}/chats/groups/unfilter/${groupId}`, {
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to unfilter group", error);
    throw error;
  }
}

export { apiGetGroups, apiFilterGroup, apiUnfilterGroup };
