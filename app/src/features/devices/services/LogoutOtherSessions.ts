import { API_URL } from "@constants";

async function LogoutOtherSessions() {
  const res = await fetch(`${API_URL}/auth/logout/others`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.status !== 200 && res.status !== 204) {
    throw new Error("Failed to logout other sessions");
  }
}

export { LogoutOtherSessions };
