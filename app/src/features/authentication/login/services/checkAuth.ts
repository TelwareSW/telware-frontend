import { API_URL } from "@constants";

export async function checkAuth() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    return false;
  } else {
    return true;
  }
}
