import { API_URL } from "@constants";

export async function apiGoogleOauth() {
  const res = await fetch(`${API_URL}/auth/oauth/google`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
