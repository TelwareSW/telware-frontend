export async function forgotPassword(email: string) {
  const API = import.meta.env.VITE_BACKEND_API;
  const emailObj = { email: email };
  const result = await fetch(`${API}/auth/password/forget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(emailObj),
  });
  const data = await result.json();
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
