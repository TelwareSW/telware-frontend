export async function verifyEmail({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  const API = import.meta.env.VITE_BACKEND_API;
  console.log(JSON.stringify(email));
  const res = await fetch(`${API}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  console.log(data);

  return data.data;
}
