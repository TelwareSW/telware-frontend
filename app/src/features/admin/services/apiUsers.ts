import { API_URL } from "@constants";

async function apiGetUsers() {
  try {
    const res = await fetch(`${API_URL}/users`, {
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
    console.error("Failed to fetch users", error);
    throw error;
  }
}
async function apiDeactivateUser(userId: string) {
  try {
    const res = await fetch(`${API_URL}/users/deactivate/${userId}`, {
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
    console.error("Failed to deactivate user", error);
    throw error;
  }
}
async function apiBanUser(userId: string) {
  try {
    const res = await fetch(`${API_URL}/users/ban/${userId}`, {
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
    console.error("Failed to ban user", error);
    throw error;
  }
}

async function apiActivateUser(userId: string) {
  try {
    const res = await fetch(`${API_URL}/users/activate/${userId}`, {
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
    console.error("Failed to activate user", error);
    throw error;
  }
}

export { apiGetUsers, apiDeactivateUser, apiBanUser, apiActivateUser };
