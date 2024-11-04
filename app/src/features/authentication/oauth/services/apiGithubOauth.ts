import { API_URL } from "@constants";

export async function apiGithubOauth(code: string) {
  const res = await fetch(`${API_URL}/auth/oauth/github`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
