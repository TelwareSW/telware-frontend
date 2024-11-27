import { User } from "../SignupForm";
import { API_URL } from "@constants";
export async function Signup(user: User) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);

  return user.email;
}
