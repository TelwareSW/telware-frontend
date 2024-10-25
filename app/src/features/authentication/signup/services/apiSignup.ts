import { User } from "../SignupForm";
export async function Signup(user: User) {
  const API = import.meta.env.VITE_BACKEND_API;
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  console.log(data);

  return user.email;
}
