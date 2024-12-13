import { API_URL } from "@constants";

export async function forgotPassword(email: string) {
  const emailObj = { email: email };
  const result = await fetch(`${API_URL}/auth/password/forget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": localStorage.getItem("sessionId") || "",
    },

    body: JSON.stringify(emailObj),
  });
  const data = await result.json();
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
