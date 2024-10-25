export async function sendEmailVerification(email: string) {
  const API = import.meta.env.VITE_BACKEND_API;

  const res = await fetch(`${API}/auth/send-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  console.log(data);

  return data.data;
}
