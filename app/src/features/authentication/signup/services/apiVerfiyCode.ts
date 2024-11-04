import { API_URL } from "@constants";

export async function verifyEmail({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}) {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, verificationCode }),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  return data.data;
}
