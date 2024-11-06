import { API_URL } from "@constants";

export async function sendEmailVerification(email: string) {
  const res = await fetch(`${API_URL}/auth/send-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  console.log(data);

  return data.data;
}
