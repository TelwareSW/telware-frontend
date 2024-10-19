import { User } from "../SignupForm";
export async function Signup(user: User) {
  const API = import.meta.env.VITE_BACKEND_API;
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.status !== "sucess") throw new Error(data.message);
  return data.data;
}
