import { API_URL } from "@constants";
import { Session } from "../types/sessions";

async function GetCurrentSession(): Promise<Session> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  const session = data.data as Session;

  return session;
}

export { GetCurrentSession };
