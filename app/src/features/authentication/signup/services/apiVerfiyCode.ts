import { API_URL } from "@constants";

export async function verifyEmail({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  return data.data;
}
